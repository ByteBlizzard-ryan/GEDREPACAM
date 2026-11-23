import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
  Phone,
  Briefcase,
  Building2,
  Hash,
  CalendarCheck
} from 'lucide-react';
import { genererSignatureBadge } from './utils/badgeUtils';
import { useLang } from './context/LanguageContext';

function VerifierBadge() {
  const [searchParams] = useSearchParams();
  const { t } = useLang();
  const [etatScan, setEtatScan] = useState('LOADING'); // LOADING | VALID | ALREADY_USED | OUT_OF_DATES | INVALID
  const [infoPassage, setInfoPassage] = useState('');
  const [joursPresents, setJoursPresents] = useState(null);
  const [alerteSynchro, setAlerteSynchro] = useState('');

  // Empêche React StrictMode d'exécuter le scan deux fois au montage
  const scanDejaLance = useRef(false);

  const transId = searchParams.get('id') || '';
  const noms = searchParams.get('nom') || '';
  const prenoms = searchParams.get('prenom') || '';
  const telephone = searchParams.get('tel') || '';
  const profession = searchParams.get('prof') || '';
  const institution = searchParams.get('inst') || '';
  const signatureRecue = searchParams.get('sig') || '';

  useEffect(() => {
    if (scanDejaLance.current) return;
    scanDejaLance.current = true;

    const verifierEtEnregistrer = async () => {
      const signatureAttendue =
        transId && noms && prenoms && telephone
          ? genererSignatureBadge({ transId, noms, prenoms, telephone })
          : '';

      if (!signatureRecue || signatureRecue !== signatureAttendue) {
        setEtatScan('INVALID');
        return;
      }

      const scriptUrl =
        import.meta.env.VITE_CHECKIN_SCRIPT_URL ||
        import.meta.env.VITE_APPS_SCRIPT_URL;

      if (!scriptUrl) {
        setAlerteSynchro('NO_SCRIPT');
        setEtatScan('VALID');
        return;
      }

      try {
        const query = new URLSearchParams({
          id: transId,
          nom: noms,
          tel: telephone
        });

        const response = await fetch(`${scriptUrl}?${query.toString()}`);
        const result = await response.json();

        if (result.status === 'VALID') {
          setInfoPassage(result.details);
          setJoursPresents(result.joursPresents || 1);
          setEtatScan('VALID');
        } else if (result.status === 'ALREADY_USED') {
          setInfoPassage(result.details);
          setEtatScan('ALREADY_USED');
        } else if (result.status === 'OUT_OF_DATES') {
          setInfoPassage(result.details);
          setEtatScan('OUT_OF_DATES');
        } else {
          setEtatScan('INVALID');
        }
      } catch (err) {
        console.error("Erreur de connexion au registre Google Sheets :", err);
        setAlerteSynchro('UNREACHABLE');
        setEtatScan('VALID');
      }
    };

    verifierEtEnregistrer();
  }, [transId, noms, prenoms, telephone, signatureRecue]);

  return (
    <main className="pt-28 pb-16 px-4 max-w-md mx-auto font-sans">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {etatScan === 'LOADING' && (
          <div className="p-10 text-center space-y-3">
            <Loader2 size={44} className="mx-auto animate-spin text-[#00765a]" />
            <p className="font-bold text-gray-700">{t('Vérification du pointage journalier...', 'Checking daily attendance...')}</p>
          </div>
        )}

        {etatScan === 'VALID' && (
          <>
            <div className="bg-[#00765a] text-white p-6 text-center">
              <CheckCircle2 size={52} className="mx-auto mb-2" />
              <h1 className="text-2xl font-extrabold tracking-tight">{t('ACCÈS AUTORISÉ', 'ACCESS GRANTED')}</h1>
              {infoPassage && <p className="text-xs opacity-90 mt-1">{infoPassage}</p>}
              {joursPresents && (
                <span className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-white/20 text-xs font-bold">
                  <CalendarCheck size={14} /> {t('Présence enregistrée :', 'Attendance recorded:')} {joursPresents} / 3 {t('jours', 'days')}
                </span>
              )}
              {alerteSynchro && (
                <p className="mt-3 rounded-lg bg-black/25 px-3 py-1.5 text-[11px] font-semibold text-amber-200">
                  {alerteSynchro === 'NO_SCRIPT'
                    ? t('URL du script de pointage non configurée (pointage non enregistré).', 'Check-in script URL not configured (check-in not recorded).')
                    : t('Registre Google Sheets injoignable (pointage non enregistré).', 'Google Sheets register unreachable (check-in not recorded).')}
                </p>
              )}
            </div>
            <DetailsParticipant
              prenoms={prenoms}
              noms={noms}
              telephone={telephone}
              profession={profession}
              institution={institution}
              transId={transId}
            />
          </>
        )}

        {etatScan === 'ALREADY_USED' && (
          <>
            <div className="bg-amber-600 text-white p-6 text-center">
              <AlertTriangle size={52} className="mx-auto mb-2" />
              <h1 className="text-2xl font-extrabold tracking-tight">{t("DÉJÀ SCANNÉ AUJOURD'HUI", 'ALREADY SCANNED TODAY')}</h1>
              <p className="text-sm font-semibold mt-1">{infoPassage}</p>
              <p className="text-xs opacity-90 mt-2">
                {t(
                  "Ce badge a déjà été validé pour la journée en cours. Vérifiez la pièce d'identité du porteur.",
                  "This badge has already been validated today. Please check the holder's ID."
                )}
              </p>
            </div>
            <DetailsParticipant
              prenoms={prenoms}
              noms={noms}
              telephone={telephone}
              profession={profession}
              institution={institution}
              transId={transId}
            />
          </>
        )}

        {etatScan === 'OUT_OF_DATES' && (
          <>
            <div className="bg-slate-700 text-white p-6 text-center">
              <AlertTriangle size={52} className="mx-auto mb-2" />
              <h1 className="text-xl font-extrabold tracking-tight">{t('HORS DATES DU CONGRÈS', 'OUTSIDE CONGRESS DATES')}</h1>
              <p className="text-sm opacity-90 mt-1">{infoPassage}</p>
            </div>
            <DetailsParticipant
              prenoms={prenoms}
              noms={noms}
              telephone={telephone}
              profession={profession}
              institution={institution}
              transId={transId}
            />
          </>
        )}

        {etatScan === 'INVALID' && (
          <>
            <div className="bg-[#c11236] text-white p-6 text-center">
              <XCircle size={52} className="mx-auto mb-2" />
              <h1 className="text-2xl font-extrabold tracking-tight">{t('BADGE INVALIDE', 'INVALID BADGE')}</h1>
              <p className="text-sm opacity-90 mt-1">
                {t(
                  'Ce QR code est falsifié ou absent de la liste des inscriptions payées.',
                  'This QR code is forged or not on the list of paid registrations.'
                )}
              </p>
            </div>
            <div className="p-6 text-center text-sm text-gray-600">
              {t(
                "Orientez la personne vers le secrétariat d'accueil pour contrôle manuel du reçu Fapshi.",
                'Direct the person to the reception desk for a manual check of the Fapshi receipt.'
              )}
            </div>
          </>
        )}

        <div className="bg-gray-50 px-6 py-4 text-center border-t border-gray-100">
          <Link to="/" className="text-xs font-bold text-gray-500 hover:text-gray-800 underline">
            {t('Retour au portail GEDREPACAM', 'Back to the GEDREPACAM portal')}
          </Link>
        </div>
      </div>
    </main>
  );
}

function DetailsParticipant({ prenoms, noms, telephone, profession, institution, transId }) {
  const { t } = useLang();
  return (
    <div className="p-6 space-y-4">
      <div className="text-center border-b border-gray-100 pb-4">
        <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">{t('Titulaire du badge', 'Badge holder')}</p>
        <h2 className="text-2xl font-extrabold text-gray-900 mt-1">
          {prenoms} <span className="uppercase">{noms}</span>
        </h2>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-3 text-gray-700">
          <Phone size={18} className="text-[#00765a] shrink-0" />
          <div>
            <span className="text-xs text-gray-400 block">{t('Téléphone', 'Phone')}</span>
            <span className="font-bold">{telephone}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <Briefcase size={18} className="text-[#00765a] shrink-0" />
          <div>
            <span className="text-xs text-gray-400 block">Profession</span>
            <span className="font-semibold">{profession}</span>
          </div>
        </div>

        {institution && (
          <div className="flex items-center gap-3 text-gray-700">
            <Building2 size={18} className="text-[#00765a] shrink-0" />
            <div>
              <span className="text-xs text-gray-400 block">Institution</span>
              <span className="font-semibold">{institution}</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 text-gray-700">
          <Hash size={18} className="text-[#c11236] shrink-0" />
          <div>
            <span className="text-xs text-gray-400 block">{t('Référence Transaction', 'Transaction reference')}</span>
            <span className="font-mono font-bold text-[#c11236]">{transId}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifierBadge;