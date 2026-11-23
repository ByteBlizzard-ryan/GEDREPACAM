/**
 * Footer GEDREPACAM 2027 — version compacte harmonisée.
 * Disposition 3 colonnes équilibrée (sans newsletter), contacts officiels et patronages actualisés.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Headset, Globe, Clock } from 'lucide-react';
import { useLang } from './context/LanguageContext';

const BORDEAUX = '#8b0a1d';
const RED = '#c11236';
const GREEN = '#00765a';
const YELLOW = '#f2b705';

const SERIF = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };
const SANS = {
  fontFamily: "'Instrument Sans', system-ui, -apple-system, 'Segoe UI', sans-serif"
};

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c11236]';

const PATRONAGES = [
  { fr: 'Ministère de la Santé Publique du Cameroun (MINSANTE)', en: 'Ministry of Public Health of Cameroon (MINSANTE)' },
  { fr: "GEDREPACAM (Groupe d'Étude)", en: 'GEDREPACAM (Study Group)' }
];

function Footer() {
  const { t } = useLang();
  const colTitle = 'mb-3 text-[16px] font-bold text-[#1a1a1a]';

  return (
    <footer
      className="relative w-full border-t border-[#dce0e8] bg-white text-[13.5px] text-[#555555] selection:bg-[#c11236] selection:text-white"
      style={SANS}
    >
      {/* Fin liseré supérieur bordeaux -> carmin -> émeraude */}
      <div
        aria-hidden="true"
        className="h-[2px] w-full bg-gradient-to-r from-[#8b0a1d] via-[#c11236] to-[#00765a] opacity-85"
      />

      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid gap-8 py-9 md:grid-cols-2 lg:grid-cols-[1.3fr_1.1fr_1.2fr] lg:gap-12">
          {/* Lieu */}
          <div>
            <h2
              className="m-0 text-[20px] font-bold leading-tight tracking-[-0.01em]"
              style={{ ...SERIF, color: BORDEAUX }}
            >
              GEDREPACAM 2027
            </h2>
            <p className="mt-1 text-[13px] font-semibold" style={{ color: GREEN }}>
              {t('5ème Congrès International de la Drépanocytose', '5th International Sickle Cell Disease Congress')}
            </p>
            <div className="mt-3 border-l-2 border-[#c11236]/40 pl-3">
              <p className="font-semibold text-[#1a1a1a]">
                {t('Palais des Congrès de Yaoundé', 'Yaoundé Conference Centre')}
              </p>
              <p className="mt-0.5 text-[#555555]">
                {t('République du Cameroun', 'Republic of Cameroon')}
              </p>
            </div>
          </div>

          {/* Patronages */}
          <div>
            <h3 className={colTitle} style={SERIF}>
              {t('Hauts patronages et égides', 'Patronage and auspices')}
            </h3>
            <ul className="m-0 flex list-none flex-col gap-2 p-0 leading-snug">
              {PATRONAGES.map((p) => (
                <li key={p.fr} className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00765a]"
                  />
                  <span>{t(p.fr, p.en)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className={colTitle} style={SERIF}>
              {t('Secrétariat et contacts', 'Secretariat and contacts')}
            </h3>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              <li className="flex items-center gap-2.5">
                <Mail
                  size={16}
                  strokeWidth={2}
                  className="shrink-0"
                  style={{ color: RED }}
                  aria-hidden="true"
                />
                <a
                  href="mailto:gedrepacam237@gmail.com"
                  className={`break-all rounded font-medium text-[#1a1a1a] transition-colors hover:text-[#c11236] ${focusRing}`}
                >
                  gedrepacam237@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone
                  size={16}
                  strokeWidth={2}
                  className="shrink-0"
                  style={{ color: BORDEAUX }}
                  aria-hidden="true"
                />
                <span>
                  {t('Permanence :', 'Hotline:')}{' '}
                  <a
                    href="tel:+237694126461"
                    className={`rounded font-medium text-[#1a1a1a] transition-colors hover:text-[#c11236] ${focusRing}`}
                  >
                    (+237) 694 12 64 61
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Headset
                  size={16}
                  strokeWidth={2}
                  className="shrink-0"
                  style={{ color: GREEN }}
                  aria-hidden="true"
                />
                <span>
                  {t('Support :', 'Support:')}{' '}
                  <a
                    href="tel:+237677489614"
                    className={`rounded font-medium text-[#1a1a1a] transition-colors hover:text-[#c11236] ${focusRing}`}
                  >
                    (+237) 677 48 96 14
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe
                  size={16}
                  strokeWidth={2}
                  className="shrink-0"
                  style={{ color: GREEN }}
                  aria-hidden="true"
                />
                <a
                  href="https://www.gedrepacam.cm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`break-all rounded font-medium text-[#1a1a1a] transition-colors hover:text-[#c11236] ${focusRing}`}
                >
                  www.gedrepacam.cm
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-[#555555]">
                <Clock
                  size={16}
                  strokeWidth={2}
                  className="shrink-0 text-[#8a8a94]"
                  aria-hidden="true"
                />
                <span>{t('Lun - Ven, 08h00 - 18h00 (GMT+1)', 'Mon - Fri, 8:00 am - 6:00 pm (GMT+1)')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Mentions légales */}
        <div className="flex flex-col items-center justify-between gap-2 border-t border-[#dce0e8] py-4 text-[12.5px] text-[#555555] md:flex-row">
          <span className="text-center md:text-left">
            {t('© 2027 5ème Congrès International de la Drépanocytose. Tous droits réservés.', '© 2027 5th International Sickle Cell Disease Congress. All rights reserved.')}
          </span>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 font-semibold text-[#1a1a1a]">
            <Link
              to="/mentions-legales"
              className={`rounded transition-colors hover:text-[#c11236] ${focusRing}`}
            >
              {t('Mentions légales', 'Legal notice')}
            </Link>
            <Link
              to="/ethique-recherche"
              className={`rounded transition-colors hover:text-[#c11236] ${focusRing}`}
            >
              {t('Éthique et recherche', 'Ethics and research')}
            </Link>
            <Link
              to="/contact"
              className={`rounded transition-colors hover:text-[#c11236] ${focusRing}`}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Filet tricolore */}
      <div className="flex h-[3px] w-full" aria-hidden="true">
        <span className="flex-1" style={{ background: GREEN }} />
        <span className="flex-1" style={{ background: RED }} />
        <span className="flex-1" style={{ background: YELLOW }} />
      </div>
    </footer>
  );
}

export default Footer;