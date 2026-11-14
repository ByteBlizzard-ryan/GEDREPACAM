import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import BadgeConference from './BadgeConference';
import { construireUrlBadge } from './utils/badgeUtils';

function Paiement() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmedTransId, setConfirmedTransId] = useState(null);

  const donnees = location.state?.donneesInscription;
  const montant = location.state?.montant;

  if (!donnees || !montant) {
    return (
      <div className="pt-32 text-center font-sans">
        <p>Aucune inscription en cours.</p>
        <button onClick={() => navigate('/inscription')} className="mt-4 text-[#c11236] underline font-bold">
          Retour à l'inscription
        </button>
      </div>
    );
  }

  const handlePayment = async () => {
    setIsProcessing(true);
    setMessage("Initialisation du paiement en cours...");

    try {
      const API_URL = import.meta.env.VITE_FAPSHI_API_URL;
      const API_USER = import.meta.env.VITE_FAPSHI_API_USER;
      const API_KEY = import.meta.env.VITE_FAPSHI_API_KEY;

      const externalId = `GEDREPACAM_${Date.now()}`;
      const userId = `USER_${Date.now()}`;
      const cleanPhone = donnees.telephone.replace(/\s+/g, '').replace(/^(\+237|237)/, '');

      // 1. Appel Direct Pay Fapshi
      const directPayResponse = await fetch(`${API_URL}/direct-pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apiuser': API_USER,
          'apikey': API_KEY
        },
        body: JSON.stringify({
          amount: montant,
          phone: cleanPhone,
          externalId: externalId,
          userId: userId,
          message: `Inscription GEDREPACAM - ${donnees.email}`
        })
      });

      const paymentData = await directPayResponse.json();
      if (!directPayResponse.ok) {
        throw new Error(paymentData.message || "Échec de l'initialisation du paiement direct.");
      }

      const transId = paymentData.transId;

      // 2. Vérification du statut
      setMessage("Veuillez valider le paiement sur votre téléphone (Code secret Mobile Money)...");
      let paymentStatus = 'PENDING';
      let attempts = 0;
      const maxAttempts = 12;

      while (paymentStatus === 'PENDING' || paymentStatus === 'CREATED') {
        if (attempts >= maxAttempts) {
          throw new Error("Délai d'attente dépassé. Si vous avez été débité, contactez le support.");
        }

        await new Promise(resolve => setTimeout(resolve, 5000));
        attempts++;

        const statusResponse = await fetch(`${API_URL}/payment-status/${transId}`, {
          method: 'GET',
          headers: {
            'apiuser': API_USER,
            'apikey': API_KEY
          }
        });

        const statusData = await statusResponse.json();
        if (statusResponse.ok) {
          paymentStatus = statusData.status;
        }
      }

      if (paymentStatus === 'FAILED') {
        throw new Error("Le paiement a échoué ou a été annulé.");
      }

      // 3. Enregistrement Google Forms + E-mail avec lien badge + Affichage du badge
      if (paymentStatus === 'SUCCESSFUL') {
        setMessage("Paiement reçu ! Génération de votre badge...");

        const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe162SiUM-eBUW62iGd-psJTnxyxX_eXN5w0yJpGvmihHdG_A/formResponse";
        const formBody = new URLSearchParams();

        formBody.append('entry.45420605', donnees.noms);
        formBody.append('entry.627195857', donnees.titre);
        formBody.append('entry.911358404', donnees.statut);
        formBody.append('entry.2129644551', donnees.email);
        formBody.append('entry.600935535', donnees.prenoms);
        formBody.append('entry.1249499698', donnees.profession);
        formBody.append('entry.1525826361', donnees.institution);
        formBody.append('entry.203174067', donnees.telephone);

        await fetch(GOOGLE_FORM_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formBody.toString()
        });

        const lienBadge = construireUrlBadge({ transId, donnees });

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
              montant: `${montant} FCFA`,
              trans_id: transId,
              badge_url: lienBadge
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
          );
        } catch (emailError) {
          console.error("Paiement validé, mais erreur d'envoi de l'e-mail :", emailError);
        }

        // Affiche le badge directement sur la page au lieu de rediriger vers l'accueil
        setConfirmedTransId(transId);
      }
    } catch (error) {
      console.error("Erreur de paiement", error);
      alert(error.message || "Une erreur est survenue lors du processus de paiement.");
    } finally {
      setIsProcessing(false);
      setMessage("");
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
              Terminer et retourner à l'accueil
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-[#c11236] mb-6 text-center">Règlement</h2>

          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <p className="text-sm text-gray-500 mb-1">Candidat :</p>
            <p className="font-bold text-gray-800 mb-4">{donnees.titre} {donnees.prenoms} {donnees.noms}</p>

            <p className="text-sm text-gray-500 mb-1">Profession :</p>
            <p className="font-bold text-gray-800 mb-4">{donnees.profession}</p>

            <p className="text-sm text-gray-500 mb-1">E-mail de confirmation :</p>
            <p className="font-bold text-gray-800 mb-4">{donnees.email}</p>

            <div className="border-t border-gray-200 pt-4 mt-2 flex justify-between items-center">
              <span className="text-gray-600 font-bold">Total à payer</span>
              <span className="text-xl font-extrabold text-[#00765a]">{montant} FCFA</span>
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
            className={`w-full py-3.5 rounded-md font-bold text-white transition-all shadow-sm ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#c11236] hover:bg-[#9c0e2a] hover:shadow-md'}`}
          >
            {isProcessing ? 'Traitement en cours...' : 'Payer maintenant'}
          </button>

          <p className="text-center text-xs text-gray-400 mt-4">
            Environnement Sandbox - Utilisez le numéro de test 670000000
          </p>
        </div>
      )}
    </main>
  );
}

export default Paiement;