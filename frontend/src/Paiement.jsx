import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import BadgeConference from './BadgeConference';
import { construireUrlBadge } from './utils/badgeUtils';
import { useLang } from './context/LanguageContext';
import { API_BASE, reveillerServeur } from './lib/api';

const attendre = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Paiement() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');
  const [confirmedTransId, setConfirmedTransId] = useState(null);
  const { t } = useLang();

  // Au cas où le visiteur arrive ici sans passer par la page Inscription
  useEffect(() => {
    reveillerServeur();
  }, []);

  const donnees = location.state?.donneesInscription;
  const montant = location.state?.montant;
  const justificatif = location.state?.justificatif;

  if (!donnees || !montant) {
    return (
      <div className="pt-32 text-center font-sans">
        <p>{t('Aucune inscription en cours.', 'No registration in progress.')}</p>
        <button
          onClick={() => navigate('/inscription')}
          className="mt-4 text-[#c11236] underline font-bold"
        >
          {t("Retour à l'inscription", 'Back to registration')}
        </button>
      </div>
    );
  }

  const handlePayment = async () => {
    setIsProcessing(true);
    setMessage(t('Initialisation du paiement en cours...', 'Initialising payment...'));

    try {
      // Les clés Fapshi sont sur le serveur Laravel : le site n'appelle plus Fapshi directement.
      // Le serveur calcule aussi le montant à partir de la catégorie (backend/backend/config/congres.php).
      const lireJson = async (res) => {
        try {
          return await res.json();
        } catch {
          return {};
        }
      };

      // 1. Demande de paiement envoyée sur le téléphone.
      // Si le serveur gratuit sort de veille, Render peut répondre 502/503/504 :
      // la demande n'a alors pas atteint le serveur, on peut réessayer sans risque.
      const messageLent = setTimeout(
        () => setMessage(t('Connexion au service de paiement… merci de patienter', 'Connecting to the payment service… please wait')),
        4000
      );
      let initRes;
      try {
        const debut = Date.now();
        for (;;) {
          initRes = await fetch(`${API_BASE}/api/paiements/initier`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
              profession: donnees.profession,
              telephone: donnees.telephone,
              email: donnees.email
            })
          });
          const enDemarrage = [502, 503, 504].includes(initRes.status);
          if (!enDemarrage || Date.now() - debut > 120000) break;
          await attendre(5000);
        }
      } finally {
        clearTimeout(messageLent);
      }

      const paymentData = await lireJson(initRes);
      if (!initRes.ok || !paymentData.transId) {
        throw new Error(
          paymentData.message || t("Échec de l'initialisation du paiement direct.", 'Failed to initialise direct payment.')
        );
      }

      const transId = paymentData.transId;
      const montantPaye = paymentData.montant ?? montant;

      // 2. Vérification du statut
      setMessage(
        t(
          'Veuillez valider le paiement sur votre téléphone (Code secret Mobile Money)...',
          'Please confirm the payment on your phone (Mobile Money PIN)...'
        )
      );
      let paymentStatus = 'PENDING';
      let attempts = 0;
      const maxAttempts = 12;

      while (paymentStatus === 'PENDING' || paymentStatus === 'CREATED') {
        if (attempts >= maxAttempts) {
          throw new Error(
            t(
              "Délai d'attente dépassé. Si vous avez été débité, contactez le support.",
              'Request timed out. If you have been charged, please contact support.'
            )
          );
        }

        await new Promise((resolve) => setTimeout(resolve, 5000));
        attempts++;

        const statusResponse = await fetch(
          `${API_BASE}/api/paiements/${encodeURIComponent(transId)}/statut`,
          { headers: { Accept: 'application/json' } }
        );

        const statusData = await lireJson(statusResponse);
        if (statusResponse.ok && statusData.status) {
          paymentStatus = statusData.status;
        }
      }

      if (paymentStatus !== 'SUCCESSFUL') {
        throw new Error(t('Le paiement a échoué ou a été annulé.', 'The payment failed or was cancelled.'));
      }

      // 3. Archivage Drive + Nouveau Google Form + E-mail + Badge
      if (paymentStatus === 'SUCCESSFUL') {
        setMessage(
          t(
            'Paiement reçu ! Archivage du dossier et génération du badge...',
            'Payment received! Saving your file and generating your badge...'
          )
        );

        let lienJustificatif = justificatif?.fileName || 'Non fourni';
        const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

        if (APPS_SCRIPT_URL && justificatif?.fileBase64) {
          try {
            const uploadRes = await fetch(APPS_SCRIPT_URL, {
              method: 'POST',
              body: JSON.stringify({
                noms: donnees.noms,
                prenoms: donnees.prenoms,
                email: donnees.email,
                profession: donnees.profession,
                transId,
                fileName: justificatif.fileName,
                mimeType: justificatif.mimeType,
                fileBase64: justificatif.fileBase64
              })
            });
            const uploadData = await uploadRes.json();
            if (uploadData.status === 'ok' && uploadData.fileUrl) {
              lienJustificatif = uploadData.fileUrl;
            }
          } catch (uploadErr) {
            console.error('Erreur archivage Drive :', uploadErr);
          }
        }

        const rawBadgeUrl = construireUrlBadge({ transId, donnees });
        const lienBadge = rawBadgeUrl.startsWith('http')
          ? rawBadgeUrl
          : `${window.location.origin}${rawBadgeUrl.startsWith('/') ? '' : '/'}${rawBadgeUrl}`;

        const GOOGLE_FORM_URL =
          'https://docs.google.com/forms/d/e/1FAIpQLSfwwWOHa_LCbGFAiVFzycNoBbgXw5JTLkBNH9MqeLzk511BYw/formResponse';
        const formBody = new URLSearchParams();

        formBody.append('entry.45420605', donnees.noms);
        formBody.append('entry.627195857', donnees.titre);
        formBody.append('entry.911358404', donnees.statut);
        formBody.append('entry.2129644551', donnees.email);
        formBody.append('entry.600935535', donnees.prenoms);
        formBody.append('entry.1249499698', donnees.profession);
        formBody.append('entry.1525826361', donnees.institution);
        formBody.append('entry.203174067', donnees.telephone);
        formBody.append('entry.26771134', lienBadge);
        formBody.append('entry.1200204970', lienJustificatif);

        await fetch(GOOGLE_FORM_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formBody.toString()
        });

        try {
          await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            {
              to_email: donnees.email,
              to_name: `${donnees.titre} ${donnees.prenoms} ${donnees.noms}`,
              statut: donnees.statut,
              profession: donnees.profession,
              institution: donnees.institution,
              montant: `${montantPaye} FCFA`,
              trans_id: transId,
              badge_url: lienBadge
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
          );
        } catch (emailError) {
          console.error(
            "Paiement validé, mais erreur d'envoi de l'e-mail :",
            emailError
          );
        }

        setConfirmedTransId(transId);
      }
    } catch (error) {
      console.error('Erreur de paiement', error);
      alert(
        error.message || t('Une erreur est survenue lors du processus de paiement.', 'An error occurred during the payment process.')
      );
    } finally {
      setIsProcessing(false);
      setMessage('');
    }
  };

  return (
    <main className="pt-32 pb-16 px-4 max-w-lg mx-auto font-sans">
      {confirmedTransId ? (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-100">
          <BadgeConference donnees={donnees} transId={confirmedTransId} />
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-xs font-bold text-gray-500 hover:text-gray-800 underline"
            >
              {t("Terminer et retourner à l'accueil", 'Finish and return to home')}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-[#c11236] mb-6 text-center">
            {t('Règlement', 'Payment')}
          </h2>

          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <p className="text-sm text-gray-500 mb-1">{t('Candidat :', 'Applicant:')}</p>
            <p className="font-bold text-gray-800 mb-4">
              {donnees.titre} {donnees.prenoms} {donnees.noms}
            </p>

            <p className="text-sm text-gray-500 mb-1">{t('Profession :', 'Profession:')}</p>
            <p className="font-bold text-gray-800 mb-4">{donnees.profession}</p>

            <p className="text-sm text-gray-500 mb-1">{t('Justificatif joint :', 'Supporting document:')}</p>
            <p className="font-bold text-gray-800 mb-4 truncate">
              {justificatif?.fileName || t('Aucun fichier', 'No file')}
            </p>

            <p className="text-sm text-gray-500 mb-1">
              {t('E-mail de confirmation :', 'Confirmation email:')}
            </p>
            <p className="font-bold text-gray-800 mb-4">{donnees.email}</p>

            <div className="border-t border-gray-200 pt-4 mt-2 flex justify-between items-center">
              <span className="text-gray-600 font-bold">{t('Total à payer', 'Total to pay')}</span>
              <span className="text-xl font-extrabold text-[#00765a]">
                {montant} FCFA
              </span>
            </div>
          </div>

          {message && (
            <div className="text-center p-3 mb-4 rounded-md bg-blue-50 text-[#00765a] text-sm font-bold animate-pulse border border-blue-100">
              {message}
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className={`w-full py-3.5 rounded-md font-bold text-white transition-all shadow-sm ${
              isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#c11236] hover:bg-[#9c0e2a] hover:shadow-md'
            }`}
          >
            {isProcessing ? t('Traitement en cours...', 'Processing...') : t('Payer maintenant', 'Pay now')}
          </button>

          <p className="text-center text-xs text-gray-400 mt-4">
            {t('Environnement Sandbox - Utilisez le numéro de test 670000000', 'Sandbox environment - Use test number 670000000')}
          </p>
        </div>
      )}
    </main>
  );
}

export default Paiement;