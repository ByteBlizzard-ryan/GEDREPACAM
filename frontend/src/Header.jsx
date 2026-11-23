/**
 * Header GEDREPACAM 2027 — version fond blanc.
 *
 * 1) Ajoutez ces polices dans votre index.html (dans <head>) :
 *    <link rel="preconnect" href="https://fonts.googleapis.com">
 *    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
 *    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Instrument+Sans:wght@500;600;700&display=swap" rel="stylesheet">
 *
 * 2) Le header est fixe : donnez au contenu de vos pages un padding-top d'environ 96px (pt-24).
 */
import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import logo from './assets/logo.png';
import { useLang } from './context/LanguageContext';

const RED = '#c11236';
const GREEN = '#00765a';
const YELLOW = '#f2b705';

const SERIF = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };
const SANS = { fontFamily: "'Instrument Sans', system-ui, -apple-system, 'Segoe UI', sans-serif" };

const LINKS = [
  { to: '/', fr: 'Accueil', en: 'Home' },
  { to: '/programme', fr: 'Programme', en: 'Programme' },
  { to: '/inscription', fr: 'Inscription', en: 'Registration' },
  { to: '/soumettre-resume', fr: 'Soumettre un résumé', en: 'Submit an abstract' },
  { to: '/sponsor', fr: 'Nos Sponsors & Partenaires', en: 'Sponsors & Partners' },
  { to: '/contact', fr: 'Contact', en: 'Contact' },
];

/** Sélecteur « FR | EN » */
function LangSwitch({ lang, setLang, t, focusRing, className = '' }) {
  return (
    <div
      role="group"
      aria-label={t('Choisir la langue', 'Choose language')}
      className={`flex items-center text-[13px] font-bold ${className}`}
    >
      {['fr', 'en'].map((l, i) => (
        <React.Fragment key={l}>
          {i > 0 && (
            <span className="px-1 text-black/25" aria-hidden="true">
              |
            </span>
          )}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            lang={l}
            title={l === 'fr' ? 'Français' : 'English'}
            className={`rounded px-1.5 py-1 tracking-wide transition-colors duration-200 ${focusRing} ${
              lang === l ? 'text-[#c11236] underline decoration-2 underline-offset-4' : 'text-[#6b6b75] hover:text-[#c11236]'
            }`}
          >
            {l.toUpperCase()}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useLang();
  const location = useLocation();

  // Ombre et compacité au scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Ferme le menu à chaque changement de page
  useEffect(() => setOpen(false), [location.pathname]);

  // Bloque le scroll de la page et gère la touche Échap quand le menu est ouvert
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const focusRing =
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c11236]';

  return (
    <header className="fixed inset-x-0 top-0 z-50" style={SANS}>
      {/* Filet tricolore (vert, rouge, jaune) */}
      <div className="relative z-20 flex h-[3px] w-full" aria-hidden="true">
        <span className="flex-1" style={{ background: GREEN }} />
        <span className="flex-1" style={{ background: RED }} />
        <span className="flex-1" style={{ background: YELLOW }} />
      </div>

      <div className="relative z-20 mx-auto max-w-[1440px] px-3 pt-2 lg:px-6 lg:pt-3">
        <div
          className={`flex items-center justify-between gap-4 rounded-2xl border border-black/[0.06] bg-white/90 px-4 backdrop-blur-xl transition-all duration-300 xl:gap-6 lg:px-6 ${
            scrolled
              ? 'py-2 shadow-[0_14px_34px_-14px_rgba(25,20,35,0.28)]'
              : 'py-3 shadow-[0_2px_14px_-8px_rgba(25,20,35,0.14)]'
          }`}
        >
          {/* Marque */}
          <Link
            to="/"
            aria-label={t("GEDREPACAM 2027, retour à l'accueil", 'GEDREPACAM 2027, back to home')}
            className={`flex shrink-0 items-center gap-3 rounded-lg ${focusRing}`}
          >
            <img src={logo} alt="" className="h-9 w-auto object-contain lg:h-10" />
            <span className="h-8 w-px bg-black/10" aria-hidden="true" />
            <span className="flex flex-col">
              <span
                className="text-[19px] font-bold leading-none tracking-[-0.01em] lg:text-[21px] xl:text-[22px]"
                style={{ ...SERIF, color: RED }}
              >
                GEDREPACAM 2027
              </span>
              <span
                className="mt-1 hidden text-[11.5px] font-medium leading-none sm:block"
                style={{ color: GREEN }}
              >
                {t('5ème congrès international, Yaoundé', '5th International Congress, Yaoundé')}
              </span>
            </span>
          </Link>

          {/* Navigation (desktop) */}
          <nav aria-label={t('Navigation principale', 'Main navigation')} className="hidden flex-1 justify-center lg:flex">
            <ul className="m-0 flex list-none items-center gap-0.5 p-0 xl:gap-1">
              {LINKS.map(({ to, fr, en }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `group relative block whitespace-nowrap rounded-md px-2.5 py-2 text-[13.5px] font-semibold transition-colors duration-200 xl:px-3.5 xl:text-[14.5px] ${focusRing} ${
                        isActive ? 'text-[#c11236]' : 'text-[#3b3b44] hover:text-[#c11236]'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {t(fr, en)}
                        <span
                          aria-hidden="true"
                          className={`absolute inset-x-2.5 -bottom-0.5 h-[2px] origin-left rounded-full bg-[#c11236] transition-transform duration-300 ease-out xl:inset-x-3.5 ${
                            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions (desktop) */}
          <div className="hidden shrink-0 items-center gap-3 xl:gap-4 lg:flex">
            <LangSwitch lang={lang} setLang={setLang} t={t} focusRing={focusRing} />
            <Link
              to="/inscription"
              className={`group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#8b0a1d] to-[#c11236] px-4 py-2.5 text-[13px] font-bold text-white shadow-[0_6px_16px_-6px_rgba(139,10,29,0.55)] transition-all duration-200 hover:from-[#7a0818] hover:to-[#a80e2e] hover:shadow-[0_10px_22px_-6px_rgba(139,10,29,0.65)] active:scale-[0.98] xl:px-5 xl:text-[13.5px] ${focusRing}`}
            >
              <span>{t('S’inscrire maintenant', 'Register now')}</span>
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Langue + bouton menu (mobile) */}
          <div className="flex items-center gap-2 lg:hidden">
          <LangSwitch lang={lang} setLang={setLang} t={t} focusRing={focusRing} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t('Fermer le menu', 'Close menu') : t('Ouvrir le menu', 'Open menu')}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={`flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[#c11236] lg:hidden ${focusRing}`}
          >
            {open ? <X size={22} strokeWidth={2.2} /> : <Menu size={22} strokeWidth={2.2} />}
          </button>
          </div>
        </div>
      </div>

      {/* Menu mobile plein écran */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-10 overflow-y-auto bg-white px-6 pb-10 pt-28 transition-all duration-300 lg:hidden ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'
        }`}
      >
        <nav aria-label={t('Navigation mobile', 'Mobile navigation')}>
          <ul className="m-0 list-none p-0">
            {LINKS.map(({ to, fr, en }) => (
              <li key={to} className="border-b border-black/[0.07]">
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-4 text-[26px] font-semibold leading-tight tracking-[-0.01em] sm:text-[28px] ${focusRing} ${
                      isActive ? 'text-[#c11236]' : 'text-[#1f1f26]'
                    }`
                  }
                  style={SERIF}
                >
                  {({ isActive }) => (
                    <>
                      {t(fr, en)}
                      {isActive && (
                        <span className="h-2.5 w-2.5 rounded-full bg-[#c11236]" aria-label={t('Page actuelle', 'Current page')} />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            to="/inscription"
            className={`group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#8b0a1d] to-[#c11236] px-5 py-3 text-[14px] font-bold text-white shadow-[0_6px_16px_-6px_rgba(139,10,29,0.55)] transition-all duration-200 hover:from-[#7a0818] hover:to-[#a80e2e] hover:shadow-[0_10px_22px_-6px_rgba(139,10,29,0.65)] active:scale-[0.98] ${focusRing}`}
          >
            <span>{t('S’inscrire maintenant', 'Register now')}</span>
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-[14px] font-medium text-[#6b6b75]">{t("Langue de l'interface", 'Interface language')}</span>
            <div className="flex items-center gap-3 text-[15px] font-semibold" role="group" aria-label={t('Langue', 'Language')}>
              {['fr', 'en'].map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`rounded-full px-4 py-1.5 ${focusRing} ${
                    lang === l ? 'bg-[#c11236] text-white' : 'border border-black/15 text-[#3b3b44]'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;