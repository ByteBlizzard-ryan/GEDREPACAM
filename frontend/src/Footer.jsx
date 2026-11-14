/**
 * Footer GEDREPACAM 2027 — version compacte.
 * Même identité que le header (fond blanc, Fraunces + Instrument Sans, filet tricolore).
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Headset, Clock } from 'lucide-react';

const RED = '#c11236';
const GREEN = '#00765a';
const YELLOW = '#f2b705';

const SERIF = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };
const SANS = { fontFamily: "'Instrument Sans', system-ui, -apple-system, 'Segoe UI', sans-serif" };

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c11236]';

const PATRONAGES = [
  'Ministère de la Santé Publique du Cameroun (MINSANTE)',
  'Organisation Mondiale de la Santé (OMS / WHO AFRO)',
  "GEDREPACAM (Groupe d'Étude)",
  "Société Camerounaise d'Hématologie",
];



function Footer() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO : brancher ici votre appel API d'inscription à la newsletter
    setSent(true);
  };

  const colTitle = 'mb-3 text-[16px] font-semibold text-[#1f1f26]';

  return (
    <footer className="w-full border-t border-black/[0.07] bg-white text-[13.5px] text-[#55555f]" style={SANS}>
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid gap-8 py-9 sm:grid-cols-2 lg:grid-cols-[1.25fr_1.1fr_1.1fr_1.2fr] lg:gap-10">
          {/* Lieu */}
          <div>
            <h2 className="m-0 text-[20px] font-bold leading-tight tracking-[-0.01em]" style={{ ...SERIF, color: RED }}>
              GEDREPACAM 2027
            </h2>
            <p className="mt-1 text-[13px] font-medium" style={{ color: GREEN }}>
              5ème Congrès International de la Drépanocytose
            </p>
            <p className="mt-3 font-semibold text-[#1f1f26]">Palais des Congrès de Yaoundé</p>
            <p className="mt-0.5">Mont Fébé, Yaoundé, République du Cameroun</p>
          </div>

          {/* Patronages */}
          <div>
            <h3 className={colTitle} style={SERIF}>
              Hauts patronages et égides
            </h3>
            <ul className="m-0 flex list-none flex-col gap-1.5 p-0 leading-snug">
              {PATRONAGES.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className={colTitle} style={SERIF}>
              Secrétariat et urgences
            </h3>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              <li className="flex items-center gap-2.5">
                <Mail size={16} strokeWidth={2} className="shrink-0" style={{ color: RED }} aria-hidden="true" />
                <a
                  href="mailto:secretariat@drepacam2025.cm"
                  className={`break-all rounded transition-colors hover:text-[#c11236] ${focusRing}`}
                >
                  secretariat@drepacam2025.cm
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} strokeWidth={2} className="shrink-0" style={{ color: RED }} aria-hidden="true" />
                <span>
                  Permanence :{' '}
                  <a href="tel:+237222210000" className={`rounded hover:text-[#c11236] ${focusRing}`}>
                    (+237) 222 21 00 00
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Headset size={16} strokeWidth={2} className="shrink-0" style={{ color: GREEN }} aria-hidden="true" />
                <span>
                  Support :{' '}
                  <a href="tel:+237699002525" className={`rounded hover:text-[#c11236] ${focusRing}`}>
                    (+237) 699 00 25 25
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={16} strokeWidth={2} className="shrink-0 text-[#8a8a94]" aria-hidden="true" />
                <span>Lun - Ven, 08h00 - 18h00 (GMT+1)</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className={colTitle} style={SERIF}>
              Bulletin scientifique
            </h3>
            <p className="mb-3 leading-snug">Résumés acceptés, programme final et communications orales en avant-première.</p>

            {sent ? (
              <p role="status" className="font-semibold" style={{ color: GREEN }}>
                Merci, votre inscription est enregistrée.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="flex gap-2">
                <label htmlFor="newsletter-email" className="sr-only">
                  Adresse email pour le bulletin scientifique
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="Votre email médical"
                  className="min-w-0 flex-1 rounded-full border border-black/15 bg-white px-4 py-2 text-[13px] text-[#1f1f26] outline-none transition-colors placeholder:text-[#8a8a94] focus:border-[#00765a] focus:ring-2 focus:ring-[#00765a]/20"
                />
                <button
                  type="submit"
                  className={`rounded-full px-4 py-2 text-[13px] font-bold text-white transition-colors hover:brightness-90 active:scale-[0.98] ${focusRing}`}
                  style={{ background: GREEN }}
                >
                  S'abonner
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Mentions légales */}
        <div className="flex flex-col items-center justify-between gap-2 border-t border-black/[0.07] py-4 text-[12.5px] text-[#6b6b75] md:flex-row">
          <span className="text-center md:text-left">
            © 2027 5ème Congrès International de la Drépanocytose. Tous droits réservés. Respect du RGPD et de la déontologie.
          </span>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 font-semibold text-[#3b3b44]">
            <Link to="/mentions-legales" className={`rounded hover:text-[#c11236] ${focusRing}`}>
              Mentions légales
            </Link>
            <Link to="/ethique-recherche" className={`rounded hover:text-[#c11236] ${focusRing}`}>
              Éthique et recherche
            </Link>
            <Link to="/contact" className={`rounded hover:text-[#c11236] ${focusRing}`}>
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