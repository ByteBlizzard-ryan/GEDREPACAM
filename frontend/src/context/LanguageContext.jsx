/**
 * Gestion de la langue du site (FR / EN).
 *
 * Utilisation dans un composant :
 *   const { lang, setLang, t } = useLang();
 *   <h1>{t('Bienvenue', 'Welcome')}</h1>
 *
 * - lang vaut 'fr' ou 'en'
 * - t(fr, en) renvoie le texte dans la langue active
 * - pick(objet) : pour les listes de données, renvoie l'objet avec ses champs
 *   anglais (objet.en) appliqués quand la langue est 'en'
 * - le choix est mémorisé dans le navigateur (localStorage)
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'gedrepacam-lang';
const LanguageContext = createContext(null);

function getInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'fr' || saved === 'en') return saved;
  } catch {
    /* localStorage indisponible : on garde le français */
  }
  return 'fr';
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  const setLang = useCallback((value) => {
    const next = String(value).toLowerCase() === 'en' ? 'en' : 'fr';
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback((fr, en) => (lang === 'en' ? en : fr), [lang]);

  const pick = useCallback(
    (obj) => (lang === 'en' && obj && obj.en ? { ...obj, ...obj.en } : obj),
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t, pick }), [lang, setLang, t, pick]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang doit être utilisé dans <LanguageProvider>');
  return ctx;
}
