import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { toPng } from 'html-to-image';
import { Download, CheckCircle2, MapPin } from 'lucide-react';
import { construireUrlVerification } from './utils/badgeUtils';
import { useLang } from './context/LanguageContext';

function BadgeConference({ donnees, transId }) {
  const badgeRef = useRef(null);
  const { t } = useLang();
  const verificationUrl = construireUrlVerification({ transId, donnees });

  const handleDownload = async () => {
    if (!badgeRef.current) return;
    try {
      const dataUrl = await toPng(badgeRef.current, { cacheBust: true, pixelRatio: 3 });
      const link = document.createElement('a');
      link.download = `Badge-GEDREPACAM-${donnees.noms.toUpperCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Erreur génération PNG :", err);
      alert(t("Impossible de télécharger l'image. Effectuez une capture d'écran de votre badge.", 'Unable to download the image. Please take a screenshot of your badge.'));
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="flex items-center justify-center gap-2 text-[#00765a] font-bold text-center text-sm">
        <CheckCircle2 size={22} className="shrink-0" />
        <span>{t("Inscription confirmée ! Voici votre badge officiel d'accès.", 'Registration confirmed! Here is your official access badge.')}</span>
      </div>

      <div
        ref={badgeRef}
        className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-xl border-2 border-gray-200 font-sans"
      >
        <div className="bg-[#c11236] text-white p-5 text-center">
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-90">
            {t('5ème Congrès International de la Drépanocytose', '5th International Sickle Cell Disease Congress')}
          </p>
          <h3 className="text-xl font-extrabold tracking-tight mt-1">
            GEDREPACAM
          </h3>
          <div className="flex items-center justify-center gap-1 text-[11px] mt-2 opacity-95">
            <MapPin size={12} />
            <span>{t('Palais des Congrès, Yaoundé', 'Conference Centre, Yaoundé')}</span>
          </div>
        </div>

        <div className="p-6 text-center space-y-3 bg-white">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#00765a]/10 text-[#00765a]">
            {donnees.statut || "Participant"}
          </span>

          <div>
            <p className="text-sm text-gray-500 font-medium">{donnees.titre}</p>
            <h4 className="text-2xl font-extrabold text-gray-900 leading-tight">
              {donnees.prenoms} <span className="uppercase">{donnees.noms}</span>
            </h4>
          </div>

          <div className="text-sm text-gray-600 space-y-0.5">
            <p className="font-semibold text-gray-800">{donnees.profession}</p>
            <p className="text-xs text-gray-500">{donnees.institution}</p>
            <p className="text-xs font-mono text-gray-500 pt-1">{t('Tél :', 'Tel:')} {donnees.telephone}</p>
          </div>

          <div className="pt-3 flex flex-col items-center">
            <div className="p-3 bg-white border-2 border-dashed border-gray-300 rounded-xl">
              <QRCodeCanvas
                value={verificationUrl}
                size={170}
                level="M"
                includeMargin={false}
              />
            </div>
            <span className="text-[11px] font-mono text-gray-400 mt-2">
              {t('RÉF :', 'REF:')} {transId}
            </span>
          </div>
        </div>

        <div className="bg-[#00765a] text-white text-center py-2.5 px-4 text-[11px] font-semibold tracking-wide">
          {t("PRÉSENTEZ CE BADGE À L'ACCUEIL CHAQUE JOUR", 'SHOW THIS BADGE AT THE FRONT DESK EVERY DAY')}
        </div>
      </div>

      <button
        type="button"
        onClick={handleDownload}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#00765a] hover:bg-[#005c46] text-white font-bold shadow-md transition-colors cursor-pointer"
      >
        <Download size={18} />
        <span>{t('Télécharger mon badge (PNG)', 'Download my badge (PNG)')}</span>
      </button>
    </div>
  );
}

export default BadgeConference;