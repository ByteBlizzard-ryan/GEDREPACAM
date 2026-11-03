import React from 'react';
import { 
  Home, ChevronRight, MapPin, Calendar, ShieldCheck, 
  PlaneTakeoff, Car, ParkingSquare, Pencil,
  Compass, Building2, Plus, Minus, Navigation, 
  ExternalLink, Star, MapPinHouse, Snowflake, Wifi, Utensils, 
  Briefcase, Bus, BellRing, Trees, 
  BookOpen, Headphones, Lightbulb 
} from 'lucide-react';
import { Link } from 'react-router-dom';

function Informations() {
  return (
    <main className="w-full pt-20 bg-background flex flex-col">
      <div className="flex flex-col w-full">
        
        {/* Cercles décoratifs d'arrière-plan */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute -top-40 right-10 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-96 -left-32 w-80 h-80 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-[1440px] mx-auto px-margin py-space-xl flex flex-col gap-space-2xl relative z-10">
            
            {/* 1. En-tête & Fil d'Ariane */}
            <section className="flex flex-col gap-space-md">
              <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs text-on-surface-variant text-[14px] font-semibold">
                <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
                  <Home size={18} />
                  <span>Accueil</span>
                </Link>
                <ChevronRight size={16} className="text-outline" />
                <span className="text-primary font-bold">Informations pratiques</span>
              </nav>

              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
                <div className="max-w-3xl flex flex-col gap-space-sm">
                  <span className="inline-flex items-center gap-space-xs px-space-sm py-space-xs bg-surface-container rounded-full text-secondary text-[11px] font-bold w-fit uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                    Logistique & Accueil des Congressistes
                  </span>
                  <h1 className="text-[38px] font-bold text-on-surface tracking-tight">Informations Pratiques</h1>
                  <p className="text-[18px] text-on-surface-variant leading-relaxed">Préparez votre venue au congrès, découvrez les accès au site officiel et consultez les recommandations d'hébergement.</p>
                </div>

                {/* Résumé des repères */}
                <div className="flex flex-wrap items-center gap-space-sm">
                  <div className="flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-lowest shadow-sm rounded-xl">
                    <MapPin className="text-primary" size={20} />
                    <div className="flex flex-col">
                      <span className="text-[11px] text-on-surface-variant leading-none font-semibold">Site officiel</span>
                      <span className="text-[14px] text-on-surface font-bold">Palais des Congrès de Yaoundé</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-lowest shadow-sm rounded-xl">
                    <Calendar className="text-secondary" size={20} />
                    <div className="flex flex-col">
                      <span className="text-[11px] text-on-surface-variant leading-none font-semibold">Dates de session</span>
                      <span className="text-[14px] text-on-surface font-bold">25 — 27 Mai 2027</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-lowest shadow-sm rounded-xl">
                    <ShieldCheck className="text-tertiary-container" size={20} />
                    <div className="flex flex-col">
                      <span className="text-[11px] text-on-surface-variant leading-none font-semibold">Protocole</span>
                      <span className="text-[14px] text-on-surface font-bold">Accès & Logistique</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Section "Lieu du Congrès & Accès" */}
            <section className="flex flex-col gap-space-lg">
              <div className="flex items-center gap-space-sm">
                <div className="w-1.5 h-6 bg-primary-container rounded-full"></div>
                <h2 className="text-[26px] font-bold text-on-surface">Lieu du Congrès & Accès</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-stretch">
                
                {/* Colonne Gauche : Détails du site */}
                <div className="lg:col-span-6 flex flex-col justify-between bg-surface-container-lowest rounded-xl p-space-xl shadow-sm">
                  <div className="flex flex-col gap-space-md">
                    <div className="flex items-start justify-between gap-space-sm">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-secondary font-bold">Lieu d'accueil principal</span>
                        <h3 className="text-[20px] font-bold text-on-surface mt-space-xs">
                          Palais des Congrès de Yaoundé, Cameroun
                        </h3>
                        <p className="text-[15px] text-on-surface-variant mt-1 flex items-center gap-1 font-medium">
                          <MapPin size={18} className="text-outline" />
                          Colline du Mont Fébé, Yaoundé, République du Cameroun
                        </p>
                      </div>
                      <span className="px-space-sm py-space-xs bg-secondary-container/40 text-on-secondary-container text-[11px] font-bold rounded-full flex items-center gap-1">
                        <ShieldCheck size={14} /> Sécurisé
                      </span>
                    </div>

                    <p className="text-[15px] text-on-surface-variant leading-relaxed">
                      Érigé sur le promontoire végétalisé du Mont Fébé, le Palais des Congrès offre un cadre monumental et aéré dédié aux grands rassemblements scientifiques internationaux. Le site dispose de contrôles de sûreté aux accès périmétriques, d’espaces d’accueil pour personnes à mobilité réduite (PMR) et d'un parking surveillé continu.
                    </p>

                    {/* Cartes d'accès rapides */}
                    <div className="flex flex-col gap-space-sm mt-space-xs">
                      <div className="flex items-start gap-space-md p-space-md bg-surface-container-low rounded-xl">
                        <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
                          <PlaneTakeoff size={24} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[14px] font-bold text-on-surface">Aéroport International de Yaoundé-Nsimalen (NSI)</span>
                          <span className="text-[13px] text-on-surface-variant mt-0.5">
                            Situé à ~28 km (45 à 60 minutes selon le trafic). Navettes officielles de liaison pour les congressistes accrédités et taxis jaunes conventionnés disponibles en zone d’arrivée.
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-space-md p-space-md bg-surface-container-low rounded-xl">
                        <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary flex-shrink-0">
                          <Car size={24} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[14px] font-bold text-on-surface">Transports urbains & Taxis de ville</span>
                          <span className="text-[13px] text-on-surface-variant mt-0.5">
                            Dépose-minute aménagée à l'entrée protocolaire. Les taxis urbains et véhicules VTC disposent d'un couloir de circulation fluide jusqu'à l'esplanade du Mont Fébé.
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-space-md p-space-md bg-surface-container-low rounded-xl">
                        <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-tertiary-container flex-shrink-0">
                          <ParkingSquare size={24} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[14px] font-bold text-on-surface">Stationnement surveillé & Accessibilité PMR</span>
                          <span className="text-[13px] text-on-surface-variant mt-0.5">
                            Plus de 800 places gardées avec présence d’agents de sécurité. Rampes d’accès directes, ascenseurs adaptés et accompagnement logistique dédié aux congressistes à mobilité réduite.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-space-md mt-space-md flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-low/70 rounded-lg p-space-sm">
                    <span className="text-[11px] font-bold text-on-surface-variant flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                      Point d’information & émargement ouvert dès 07h30 le 25 Mai 2027
                    </span>
                    <span className="text-[11px] text-primary font-bold">Hall Principal • Niveau 0</span>
                  </div>
                </div>

                {/* Colonne Droite : Carte Interactive Simulée */}
                <div className="lg:col-span-6 flex flex-col bg-surface-container-lowest rounded-xl p-space-md shadow-sm overflow-hidden min-h-[460px]">
                  <div className="flex items-center justify-between pb-space-sm px-space-xs">
                    <div className="flex items-center gap-space-xs font-bold text-on-surface text-[14px]">
                      <Compass size={20} className="text-primary" />
                      <span>Repère Cartographique</span>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <span className="px-space-xs py-0.5 bg-surface-container text-on-surface-variant text-[11px] font-bold rounded">3°52'08" N • 11°30'34" E</span>
                    </div>
                  </div>

                  <div 
                    className="relative flex-1 w-full rounded-lg overflow-hidden bg-surface-container flex flex-col justify-between p-space-md bg-cover bg-center"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDsakk01PSy4acJzi0Di5UPXK9Ry-d2dSEauNvPWzAlcoT4iUJLH0ocCq9mR-mZgvPnOhS1czJiEooM9NmV8a-ARNL2OfGyBdfJVgg7yNlbyCVNcvfKkElt1CUC2ae5xViPrElVaR_b8DJSSjDv0GSQUQFRD4q9Kqb9MbV3zYjW2dcKTkfyoi3DvhudU9eUJ7YFvIFKnoajqBiY8E1Vrhg3xXph6RG9N4jL1pb5SHM')" }}
                  >
                    <div className="flex items-center justify-between w-full relative z-10">
                      <div className="bg-surface/90 backdrop-blur-md px-space-md py-space-xs rounded-xl shadow-sm flex items-center gap-space-xs">
                        <Building2 size={20} className="text-primary" />
                        <div className="flex flex-col">
                          <span className="text-[14px] font-bold text-on-surface">Palais des Congrès</span>
                          <span className="text-[11px] text-on-surface-variant font-semibold">Mont Fébé, Yaoundé</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1 bg-surface/90 backdrop-blur-md p-1 rounded-lg shadow-sm">
                        <button aria-label="Zoomer" className="w-8 h-8 rounded flex items-center justify-center hover:bg-surface-container text-on-surface transition-colors" type="button">
                          <Plus size={18} />
                        </button>
                        <button aria-label="Dézoomer" className="w-8 h-8 rounded flex items-center justify-center hover:bg-surface-container text-on-surface transition-colors" type="button">
                          <Minus size={18} />
                        </button>
                        <button aria-label="Recentrer" className="w-8 h-8 rounded flex items-center justify-center hover:bg-surface-container text-on-surface transition-colors" type="button">
                          <Navigation size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="relative flex flex-col items-center">
                        <span className="px-space-sm py-1 bg-primary text-on-primary text-[11px] font-bold rounded-full shadow-md flex items-center gap-1 animate-bounce">
                          <MapPin size={14} /> Congrès DREPACAM 2027
                        </span>
                        <div className="w-4 h-4 bg-primary rotate-45 -mt-2 shadow-sm"></div>
                        <div className="w-8 h-2 bg-inverse-surface/20 rounded-full blur-[2px] mt-1"></div>
                      </div>
                    </div>

                    <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-sm bg-surface/90 backdrop-blur-md p-space-sm rounded-xl shadow-sm">
                      <div className="flex items-center gap-space-xs text-on-surface-variant text-[11px] font-bold">
                        <Pencil size={18} className="text-secondary" />
                        <span>Yaoundé Centre-Ville : ~15 min</span>
                      </div>
                      <a className="inline-flex items-center justify-center gap-space-xs px-space-md py-space-xs bg-primary-container text-on-primary text-[14px] font-bold rounded-lg hover:bg-primary shadow-sm transition-all" href="https://maps.google.com/?q=Palais+des+Congres+Yaounde+Cameroon" rel="noopener noreferrer" target="_blank">
                        <span>Ouvrir dans Google Maps</span>
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-space-xs pt-space-sm text-center">
                    <div className="p-space-xs rounded bg-surface-container-low">
                      <span className="text-[11px] text-on-surface-variant block font-semibold">Depuis Bastos</span>
                      <span className="text-[14px] text-on-surface font-bold">~7 min (3,2 km)</span>
                    </div>
                    <div className="p-space-xs rounded bg-surface-container-low">
                      <span className="text-[11px] text-on-surface-variant block font-semibold">Depuis Poste Centrale</span>
                      <span className="text-[14px] text-on-surface font-bold">~15 min (6,5 km)</span>
                    </div>
                    <div className="p-space-xs rounded bg-surface-container-low">
                      <span className="text-[11px] text-on-surface-variant block font-semibold">Depuis Nsimalen</span>
                      <span className="text-[14px] text-on-surface font-bold">~50 min (28 km)</span>
                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* 3. Section "Recommandations d'Hébergement" */}
            <section className="flex flex-col gap-space-lg">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center gap-space-sm">
                  <div className="w-1.5 h-6 bg-secondary rounded-full"></div>
                  <h2 className="text-[26px] font-bold text-on-surface">Recommandations d'Hébergement</h2>
                </div>
                <p className="text-[15px] text-on-surface-variant max-w-4xl">
                  Pour faciliter votre séjour, voici quelques recommandations d'hôtels situés à proximité du Palais des Congrès ou facilement accessibles :
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
                
                {/* Hôtel 1 */}
                <div className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                  <div className="relative h-48 w-full bg-surface-container overflow-hidden">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      alt="Mont Febe Hotel" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIerH1dwZVRfv8XtXQuxnr5gvARnAfIp5Usr4VrWNI6KpF-02NvPn6sSL7qSmcA7cu3AjgSXuN3LbzDbqoab3EiUS8TKiDCoR9784KAdZMQodT1OvTkTbv6Ly8XNoPoVtwhXnCeXgOFV0tJGvgj_pjZUZUKyauU1BG3XFHGuwgDeFVDoAG8XTDINvHcle3DKWqO6CvkIkvjrC9xpv2YJOLFqIV0Bw7yvALsKK107k" 
                    />
                    <div className="absolute top-space-sm left-space-sm bg-surface/90 backdrop-blur-md px-space-sm py-0.5 rounded-full flex items-center gap-1">
                      <Star size={14} className="text-tertiary-fixed-dim fill-current" />
                      <Star size={14} className="text-tertiary-fixed-dim fill-current" />
                      <Star size={14} className="text-tertiary-fixed-dim fill-current" />
                      <Star size={14} className="text-tertiary-fixed-dim fill-current" />
                      <Star size={14} className="text-tertiary-fixed-dim fill-current" />
                      <span className="text-[11px] text-on-surface ml-1 font-bold">5 étoiles</span>
                    </div>
                    <div className="absolute bottom-space-sm right-space-sm bg-surface/90 backdrop-blur-md px-space-sm py-0.5 rounded-full text-[11px] text-primary font-bold">
                      Zone Mont Fébé
                    </div>
                  </div>
                  <div className="p-space-lg flex-1 flex flex-col justify-between gap-space-md">
                    <div className="flex flex-col gap-space-xs">
                      <h3 className="text-[20px] font-bold text-on-surface">Hôtel Mont Fébé Panorama</h3>
                      <div className="flex items-center gap-1 text-secondary text-[14px] font-bold">
                        <MapPinHouse size={18} />
                        <span>À ~5 min du Palais des Congrès (2,5 km)</span>
                      </div>
                      <p className="text-[13px] text-on-surface-variant mt-space-xs">
                        Situation panoramique d'exception au calme, idéale pour les délégations internationales recherchant la proximité immédiate de l'amphithéâtre.
                      </p>
                      <div className="flex flex-wrap gap-space-xs mt-space-sm">
                        <span className="px-space-xs py-0.5 bg-surface-container text-on-surface text-[11px] font-semibold rounded flex items-center gap-1"><Snowflake size={14} className="text-secondary" /> Climatisation</span>
                        <span className="px-space-xs py-0.5 bg-surface-container text-on-surface text-[11px] font-semibold rounded flex items-center gap-1"><Wifi size={14} className="text-secondary" /> Wifi haut débit</span>
                        <span className="px-space-xs py-0.5 bg-surface-container text-on-surface text-[11px] font-semibold rounded flex items-center gap-1"><Utensils size={14} className="text-secondary" /> Petit-déjeuner</span>
                        <span className="px-space-xs py-0.5 bg-surface-container text-on-surface text-[11px] font-semibold rounded flex items-center gap-1"><Car size={14} className="text-secondary" /> Service taxi</span>
                      </div>
                    </div>
                    <div className="pt-space-md">
                      <a className="w-full inline-flex items-center justify-center gap-space-xs px-space-md py-space-sm bg-surface-container-low hover:bg-surface-container text-on-surface text-[14px] font-bold rounded-lg transition-colors" href="#">
                        <span>Voir le site de l'hôtel</span>
                        <ExternalLink size={16} className="text-on-surface-variant" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hôtel 2 */}
                <div className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                  <div className="relative h-48 w-full bg-surface-container overflow-hidden">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      alt="Bastos Hotel" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbGkh3kowG33Fm5XTY8HCBpY6aqT4tgdxqT10dorI5_YkSu-GntGvejC0BKaV_uPHQp2giOZ4c_VNhFPC5q4x3gFpJhH9-JQQB4TW8x6ONvI_eLr9qkxjD0EF_rYiIZDIiZ9Wat3J3ncR3mOu7R8CYhQkfCwQGasF87zKBvlDHa3BsjZ4mt2I55EKyxL6QQGk5KlxkNGPTvVeidpT3Jy14lHtMyV1hYL1IjAaM6iY" 
                    />
                    <div className="absolute top-space-sm left-space-sm bg-surface/90 backdrop-blur-md px-space-sm py-0.5 rounded-full flex items-center gap-1">
                      <Star size={14} className="text-tertiary-fixed-dim fill-current" />
                      <Star size={14} className="text-tertiary-fixed-dim fill-current" />
                      <Star size={14} className="text-tertiary-fixed-dim fill-current" />
                      <Star size={14} className="text-tertiary-fixed-dim fill-current" />
                      <span className="text-[11px] text-on-surface ml-1 font-bold">4 étoiles</span>
                    </div>
                    <div className="absolute bottom-space-sm right-space-sm bg-surface/90 backdrop-blur-md px-space-sm py-0.5 rounded-full text-[11px] text-secondary font-bold">
                      Quartier Bastos
                    </div>
                  </div>
                  <div className="p-space-lg flex-1 flex flex-col justify-between gap-space-md">
                    <div className="flex flex-col gap-space-xs">
                      <h3 className="text-[20px] font-bold text-on-surface">Hôtel Bastos Prestige & Suites</h3>
                      <div className="flex items-center gap-1 text-secondary text-[14px] font-bold">
                        <MapPinHouse size={18} />
                        <span>À ~10 min du Palais des Congrès (4 km)</span>
                      </div>
                      <p className="text-[13px] text-on-surface-variant mt-space-xs">
                        Implanté au cœur du quartier diplomatique et résidentiel, disposant d'installations adaptées aux groupes d'experts et aux réunions bilatérales.
                      </p>
                      <div className="flex flex-wrap gap-space-xs mt-space-sm">
                        <span className="px-space-xs py-0.5 bg-surface-container text-on-surface text-[11px] font-semibold rounded flex items-center gap-1"><Briefcase size={14} className="text-secondary" /> Centre d'affaires</span>
                        <span className="px-space-xs py-0.5 bg-surface-container text-on-surface text-[11px] font-semibold rounded flex items-center gap-1"><Bus size={14} className="text-secondary" /> Navette</span>
                        <span className="px-space-xs py-0.5 bg-surface-container text-on-surface text-[11px] font-semibold rounded flex items-center gap-1"><Utensils size={14} className="text-secondary" /> Restauration</span>
                        <span className="px-space-xs py-0.5 bg-surface-container text-on-surface text-[11px] font-semibold rounded flex items-center gap-1"><Wifi size={14} className="text-secondary" /> Wifi</span>
                      </div>
                    </div>
                    <div className="pt-space-md">
                      <a className="w-full inline-flex items-center justify-center gap-space-xs px-space-md py-space-sm bg-surface-container-low hover:bg-surface-container text-on-surface text-[14px] font-bold rounded-lg transition-colors" href="#">
                        <span>Voir le site de l'hôtel</span>
                        <ExternalLink size={16} className="text-on-surface-variant" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hôtel 3 */}
                <div className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                  <div className="relative h-48 w-full bg-surface-container overflow-hidden">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      alt="Confort Hotel" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFLg14UmdUtDO6jdYATyziOFr_S0CYXL9McXp6QN1jaC2GYuPW9UJqF6z2TTQjhA9-t4OCHb-A6Gn3kygJ2QE3XLNGql3SX4V5hUWrHEqT5kzu-ivuv2B2L8ClE2IKsPFoQWgOTi41jMlCevKrQzTGIDqf75vmWpPWdV2Jlz_Ldf4iVuEcPYlPZ3Mn0oTHMH56BbwX7EYyASYZtYCQlq0FIqT4jrj7PJBdcMMClzQ" 
                    />
                    <div className="absolute top-space-sm left-space-sm bg-surface/90 backdrop-blur-md px-space-sm py-0.5 rounded-full flex items-center gap-1">
                      <Star size={14} className="text-tertiary-fixed-dim fill-current" />
                      <Star size={14} className="text-tertiary-fixed-dim fill-current" />
                      <Star size={14} className="text-tertiary-fixed-dim fill-current" />
                      <span className="text-[11px] text-on-surface ml-1 font-bold">3 étoiles</span>
                    </div>
                    <div className="absolute bottom-space-sm right-space-sm bg-surface/90 backdrop-blur-md px-space-sm py-0.5 rounded-full text-[11px] text-outline font-bold">
                      Centre Urbain Ouest
                    </div>
                  </div>
                  <div className="p-space-lg flex-1 flex flex-col justify-between gap-space-md">
                    <div className="flex flex-col gap-space-xs">
                      <h3 className="text-[20px] font-bold text-on-surface">Hôtel Yaoundé Confort Grand Cercle</h3>
                      <div className="flex items-center gap-1 text-secondary text-[14px] font-bold">
                        <MapPinHouse size={18} />
                        <span>À ~12 min du Palais des Congrès (5 km)</span>
                      </div>
                      <p className="text-[13px] text-on-surface-variant mt-space-xs">
                        Environnement feutré et sobre proposant des chambres ergonomiques pour le travail individuel ainsi qu'un accès aisé aux axes rapides de la capitale.
                      </p>
                      <div className="flex flex-wrap gap-space-xs mt-space-sm">
                        <span className="px-space-xs py-0.5 bg-surface-container text-on-surface text-[11px] font-semibold rounded flex items-center gap-1"><Trees size={14} className="text-secondary" /> Cadre calme</span>
                        <span className="px-space-xs py-0.5 bg-surface-container text-on-surface text-[11px] font-semibold rounded flex items-center gap-1"><BookOpen size={14} className="text-secondary" /> Travail</span>
                        <span className="px-space-xs py-0.5 bg-surface-container text-on-surface text-[11px] font-semibold rounded flex items-center gap-1"><Headphones size={14} className="text-secondary" /> 24h/24</span>
                        <span className="px-space-xs py-0.5 bg-surface-container text-on-surface text-[11px] font-semibold rounded flex items-center gap-1"><Wifi size={14} className="text-secondary" /> Wifi</span>
                      </div>
                    </div>
                    <div className="pt-space-md">
                      <a className="w-full inline-flex items-center justify-center gap-space-xs px-space-md py-space-sm bg-surface-container-low hover:bg-surface-container text-on-surface text-[14px] font-bold rounded-lg transition-colors" href="#">
                        <span>Voir le site de l'hôtel</span>
                        <ExternalLink size={16} className="text-on-surface-variant" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>

              <div className="p-space-md bg-surface-container-low rounded-xl flex items-center gap-space-sm text-on-surface-variant">
                <Lightbulb className="text-secondary flex-shrink-0" size={22} />
                <p className="text-[13px]">
                  Conseil pratique : En raison de l'affluence attendue pour le congrès international, il est recommandé de réserver votre chambre avec anticipation. Les établissements disposent de politiques de réservation directes et autonomes.
                </p>
              </div>
            </section>

          </div>
        </div>

      </div>
    </main>
  );
}

export default Informations;