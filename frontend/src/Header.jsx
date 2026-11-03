import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { User, Menu, X } from 'lucide-react';
import logo from './assets/logo.png'; // Assurez-vous que le chemin est correct

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fonction pour fermer le menu mobile lors d'un clic sur un lien
  const closeMenu = () => setIsMobileMenuOpen(false);

  // Ajout de 'block lg:inline-block' et ajustement des paddings pour le tactile sur mobile
  const getNavLinkClass = ({ isActive }) => 
    isActive 
      ? "block lg:inline-block w-full lg:w-auto bg-[#c11236] text-white font-bold text-[14px] px-4 lg:px-3 py-2.5 lg:py-1.5 rounded-md transition-colors duration-200"
      : "block lg:inline-block w-full lg:w-auto text-[#555] hover:bg-gray-100 lg:hover:bg-transparent hover:text-[#c11236] font-bold text-[14px] px-4 lg:px-3 py-2.5 lg:py-1.5 rounded-md transition-colors duration-200";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#ebebed]/90 backdrop-blur-md font-sans shadow-sm">
      
      {/* Conteneur principal */}
      <div className="flex items-center justify-between px-4 lg:px-8 py-3 lg:py-4">
        
        {/* 1. Section Gauche (Logo & Titre) */}
        <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
          <Link to="/" aria-label="Retour à l'accueil" onClick={closeMenu}>
            <img src={logo} alt="Logo GEDREPACAM" className="h-8 lg:h-9 object-contain" />
          </Link>
          
          <div className="flex flex-col justify-center">
            <h1 className="text-[16px] lg:text-[18px] text-[#c11236] font-extrabold tracking-wide m-0 leading-none">
              GEDREPACAM <span className="font-bold">2025</span>
            </h1>
            <p className="text-[8px] lg:text-[9px] text-[#00765a] font-bold uppercase tracking-wider mt-0.5 m-0">
              5ème congrès international • Yaoundé
            </p>
          </div>
        </div>

        {/* 2. Section Centrale (Masquée sur mobile) */}
        <nav aria-label="Navigation principale" className="hidden lg:flex flex-grow justify-center">
          <ul className="flex items-center gap-1 m-0 p-0 list-none">
            <li><NavLink to="/" className={getNavLinkClass}>Accueil</NavLink></li>
            <li><NavLink to="/programme" className={getNavLinkClass}>Programme</NavLink></li>
            <li><NavLink to="/inscription" className={getNavLinkClass}>Inscription</NavLink></li>
            <li><NavLink to="/informations" className={getNavLinkClass}>Informations pratiques</NavLink></li>
            <li><NavLink to="/contact" className={getNavLinkClass}>Contact</NavLink></li>
          </ul>
        </nav>

        {/* 3. Section Droite (Masquée sur mobile) */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <div className="flex bg-[#e2e6fa] rounded-full p-0.5" role="group" aria-label="Sélecteur de langue">
            <button type="button" className="bg-white text-[#c11236] shadow-sm px-2.5 py-1 rounded-full font-bold text-[11px] transition-all">FR</button>
            <button type="button" className="text-[#555] px-2.5 py-1 rounded-full font-bold text-[11px] transition-all hover:text-[#c11236]">EN</button>
          </div>
          
          <button type="button" className="bg-[#c11236] hover:bg-[#9c0e2a] text-white px-4 py-1.5 rounded-md font-bold text-[13px] transition-colors">
            S'inscrire maintenant
          </button>

          <button 
            type="button" 
            className="bg-[#8b0a1d] hover:bg-[#6a0715] transition-colors text-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm" 
            aria-label="Profil utilisateur"
          >
            <User size={16} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>

        {/* 4. Bouton bascule Menu Mobile (Visible uniquement sur mobile) */}
        <button 
          className="lg:hidden p-1.5 text-[#c11236] hover:bg-gray-200 rounded-md transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMobileMenuOpen ? <X size={26} strokeWidth={2.5} /> : <Menu size={26} strokeWidth={2.5} />}
        </button>

      </div>

      {/* 5. Panneau Menu Mobile (Déroulant) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-200 py-4 px-4 flex flex-col gap-4 max-h-[calc(100vh-60px)] overflow-y-auto">
          
          <nav aria-label="Navigation mobile">
            <ul className="flex flex-col gap-1 m-0 p-0 list-none">
              <li><NavLink to="/" className={getNavLinkClass} onClick={closeMenu}>Accueil</NavLink></li>
              <li><NavLink to="/programme" className={getNavLinkClass} onClick={closeMenu}>Programme</NavLink></li>
              <li><NavLink to="/inscription" className={getNavLinkClass} onClick={closeMenu}>Inscription</NavLink></li>
              <li><NavLink to="/informations" className={getNavLinkClass} onClick={closeMenu}>Informations pratiques</NavLink></li>
              <li><NavLink to="/contact" className={getNavLinkClass} onClick={closeMenu}>Contact</NavLink></li>
            </ul>
          </nav>

          <div className="h-px bg-gray-200 w-full my-1"></div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-bold text-[#555]">Langue de l'interface</span>
              <div className="flex bg-[#e2e6fa] rounded-full p-0.5" role="group" aria-label="Sélecteur de langue mobile">
                <button type="button" className="bg-white text-[#c11236] shadow-sm px-4 py-1.5 rounded-full font-bold text-[12px] transition-all">FR</button>
                <button type="button" className="text-[#555] px-4 py-1.5 rounded-full font-bold text-[12px] transition-all hover:text-[#c11236]">EN</button>
              </div>
            </div>

            <button type="button" className="w-full bg-[#c11236] hover:bg-[#9c0e2a] text-white px-4 py-3 rounded-md font-bold text-[15px] transition-colors text-center" onClick={closeMenu}>
              S'inscrire maintenant
            </button>

            <button 
              type="button" 
              className="w-full bg-[#8b0a1d] hover:bg-[#6a0715] transition-colors text-white px-4 py-3 rounded-md font-bold text-[15px] flex items-center justify-center gap-2 shadow-sm" 
              aria-label="Profil utilisateur"
              onClick={closeMenu}
            >
              <User size={18} strokeWidth={2.5} />
              <span>Accéder à mon Profil</span>
            </button>
          </div>

        </div>
      )}

    </header>
  );
}

export default Header;