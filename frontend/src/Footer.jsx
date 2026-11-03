import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, Mail, Phone, Headset, Clock } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-[#f4f5f8] pt-12 pb-6 px-8 w-full font-sans text-[#555] text-[13px]">
      
      {/* Grille principale : 4 colonnes. Ajout de text-center pour mobile et md:text-left pour desktop */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 max-w-7xl mx-auto text-center md:text-left">
        
        {/* Colonne 1 : À propos et Lieu */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h2 className="text-[20px] text-[#c11236] font-extrabold tracking-wide m-0 leading-none">
            DREPACAM <span className="font-bold">2025</span>
          </h2>
          <p className="leading-relaxed">
            5ème Congrès International de la Drépanocytose sous l'égide du GEDREPACAM. Un carrefour scientifique mondial pour l'accélération de la recherche biomédicale et des soins en Afrique subsaharienne.
          </p>
          <div className="mt-2">
            <h3 className="text-[11px] text-[#00765a] font-bold uppercase tracking-wider mb-1">
              Lieu du congrès
            </h3>
            <p className="font-bold text-[#333]">Palais des Congrès de Yaoundé</p>
            <p>Mont Fébé, Yaoundé, République du Cameroun</p>
          </div>
        </div>

        {/* Colonne 2 : Patronages */}
        <div>
          <h3 className="text-[18px] font-bold text-[#222] mb-5">
            Hauts Patronages & Égides
          </h3>
          <ul className="flex flex-col gap-3 m-0 p-0 list-none">
            <li className="flex items-start justify-center md:justify-start gap-2">
              <BadgeCheck className="text-[#00765a] mt-0.5 flex-shrink-0" size={18} strokeWidth={2.5} />
              <span>Ministère de la Santé Publique du Cameroun (MINSANTE)</span>
            </li>
            <li className="flex items-start justify-center md:justify-start gap-2">
              <BadgeCheck className="text-[#00765a] mt-0.5 flex-shrink-0" size={18} strokeWidth={2.5} />
              <span>Organisation Mondiale de la Santé (OMS / WHO AFRO)</span>
            </li>
            <li className="flex items-start justify-center md:justify-start gap-2">
              <BadgeCheck className="text-[#00765a] mt-0.5 flex-shrink-0" size={18} strokeWidth={2.5} />
              <span>GEDREPACAM (Groupe d'Étude)</span>
            </li>
            <li className="flex items-start justify-center md:justify-start gap-2">
              <BadgeCheck className="text-[#00765a] mt-0.5 flex-shrink-0" size={18} strokeWidth={2.5} />
              <span>Société Camerounaise d'Hématologie</span>
            </li>
          </ul>
        </div>

        {/* Colonne 3 : Contacts et Urgences */}
        <div>
          <h3 className="text-[18px] font-bold text-[#222] mb-5">
            Secrétariat & Urgences
          </h3>
          <ul className="flex flex-col gap-4 m-0 p-0 list-none">
            <li className="flex items-center justify-center md:justify-start gap-2">
              <Mail className="text-[#c11236] flex-shrink-0" size={18} strokeWidth={2} />
              <a href="mailto:secretariat@drepacam2025.cm" className="hover:text-[#c11236] transition-colors">
                secretariat@drepacam2025.cm
              </a>
            </li>
            <li className="flex items-start justify-center md:justify-start gap-2">
              <Phone className="text-[#c11236] mt-0.5 flex-shrink-0" size={18} strokeWidth={2} />
              <span>Permanence : (+237) 222 21 00 00</span>
            </li>
            <li className="flex items-start justify-center md:justify-start gap-2">
              <Headset className="text-[#00765a] mt-0.5 flex-shrink-0" size={18} strokeWidth={2} />
              <span>Support : (+237) 699 00 25 25</span>
            </li>
            <li className="flex items-start justify-center md:justify-start gap-2">
              <Clock className="text-[#555] mt-0.5 flex-shrink-0" size={18} strokeWidth={2} />
              <span>Lun - Ven: 08h00 - 18h00 (GMT+1)</span>
            </li>
          </ul>
        </div>

        {/* Colonne 4 : Newsletter et Formulaire */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-[18px] font-bold text-[#222] mb-5">
            Bulletin Scientifique
          </h3>
          <p className="mb-4">
            Recevez en avant-première les résumés acceptés, le programme final et les communications orales.
          </p>
          
          <form className="flex w-full max-w-sm justify-center md:justify-start gap-2 mb-3" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Votre adresse email médicale" 
              required
              className="flex-grow px-3 py-2 rounded-md border border-gray-200 text-[13px] outline-none focus:border-[#00765a] transition-colors text-center md:text-left"
              aria-label="Adresse email pour la newsletter"
            />
            <button 
              type="submit" 
              className="bg-[#00765a] hover:bg-[#005c46] text-white px-4 py-2 rounded-md font-bold transition-colors shadow-sm"
            >
              OK
            </button>
          </form>
          <p className="font-bold text-[#333] text-[11px]">
            Respect strict du RGPD et déontologie.
          </p>
        </div>
      </div>

      {/* Barre inférieure : Mentions légales (centrée et empilée sur mobile avec flex-wrap pour les petits écrans) */}
      <div className="max-w-7xl mx-auto bg-[#eef1fc] rounded-xl flex flex-col md:flex-row items-center justify-between px-6 py-4 text-[12px] text-center md:text-left gap-4 md:gap-0">
        <span className="text-[#555]">
          © 2025 5ème Congrès International de la Drépanocytose (DREPACAM). Tous droits réservés.
        </span>
        <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 font-bold text-[#555]">
          <Link to="/mentions-legales" className="hover:text-[#c11236] transition-colors">Mentions Légales</Link>
          <Link to="/ethique-recherche" className="hover:text-[#c11236] transition-colors">Politique d'Éthique & Recherche</Link>
          <Link to="/contact" className="hover:text-[#c11236] transition-colors">Contact GEDREPACAM</Link>
        </div>
      </div>

    </footer>
  );
}

export default Footer;