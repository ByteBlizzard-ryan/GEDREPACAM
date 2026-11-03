import React, { useState } from 'react';
import { 
  Home, Calendar, CalendarDays, FileText, Download, 
  Bell, CheckCircle2, ChevronDown, Clock, MapPin, 
  Building2, Stethoscope, Users2, Landmark, Hourglass, Info 
} from 'lucide-react';
import { Link } from 'react-router-dom';

function Program() {
  // État pour gérer les accordéons des jours (Jour 1 ouvert par défaut)
  const [activeDay, setActiveDay] = useState('day-1');
  const [notifSubmitted, setNotifSubmitted] = useState(false);

  const toggleDay = (dayId) => {
    setActiveDay(activeDay === dayId ? null : dayId);
  };

  const handleNotifSubmit = (e) => {
    e.preventDefault();
    setNotifSubmitted(true);
  };

  return (
    <main className="w-full pt-20 bg-background flex flex-col">
      <div className="flex flex-col w-full">
        
        {/* En-tête de la page Programme */}
        <div className="relative w-full bg-gradient-to-b from-surface-container to-background py-space-xl">
          <div className="w-full max-w-[1280px] mx-auto px-margin">
            
            {/* Fil d'Ariane */}
            <nav aria-label="Fil d'Ariane" className="flex items-center gap-space-xs text-[11px] text-on-surface-variant uppercase tracking-wider mb-space-md font-semibold">
              <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
                <Home size={16} />
                Accueil
              </Link>
              <span className="text-outline-variant">/</span>
              <span className="text-primary font-bold">Programme</span>
            </nav>

            {/* Titre et Résumé */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg pb-space-lg">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold mb-space-sm">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  GEDREPACAM • Yaoundé 2027
                </div>
                <h1 className="text-[38px] font-bold text-on-surface tracking-tight">
                  Programme du Congrès
                </h1>
                <p className="text-[18px] text-on-surface-variant mt-space-xs leading-relaxed">
                  Découvrez les thématiques et le déroulement des 3 journées d'échanges scientifiques du 25 au 27 Mai 2027.
                </p>
              </div>

              {/* Encadré dates officielles */}
              <div className="flex items-center gap-space-sm bg-surface-container-lowest p-space-sm rounded-xl shadow-sm self-start md:self-auto">
                <div className="p-2 rounded-lg bg-secondary-fixed text-on-secondary-fixed">
                  <CalendarDays size={24} />
                </div>
                <div className="flex flex-col pr-space-sm">
                  <span className="text-[11px] text-on-surface-variant uppercase font-semibold">Dates Officielles</span>
                  <span className="text-[20px] text-on-surface font-bold leading-tight">25 — 27 Mai 2027</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Zone de téléchargement & Alerte email */}
        <section className="w-full max-w-[1280px] mx-auto px-margin -mt-6 z-10">
          <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-lg md:p-space-xl flex flex-col lg:flex-row gap-space-xl items-center justify-between">
            
            <div className="flex-1 flex flex-col gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-bold">
                  <Hourglass size={16} className="text-tertiary" />
                  Version finale en cours de validation
                </span>
                <span className="text-[11px] text-on-surface-variant hidden sm:inline font-semibold">• Relecture éthique & orateurs</span>
              </div>
              
              <h2 className="text-[26px] font-bold text-on-surface">
                Publication progressive du calendrier scientifique
              </h2>
              
              <p className="text-[15px] text-on-surface-variant max-w-2xl leading-relaxed">
                Le Comité Scientifique International affine l’ordonnancement des sessions orales, des symposiums satellites et des retours d'expériences cliniques. La version PDF téléchargeable sera mise en ligne dès la validation définitive par le Comité Scientifique.
              </p>

              <div className="pt-space-xs flex flex-wrap items-center gap-space-md">
                <button 
                  aria-disabled="true" 
                  className="inline-flex items-center gap-space-sm px-space-md py-space-sm rounded-lg bg-surface-container-high text-on-surface-variant opacity-60 cursor-not-allowed text-[14px] font-bold select-none" 
                  disabled 
                  type="button"
                >
                  <Download size={20} />
                  Télécharger le programme (PDF)
                </button>
                <span className="text-[13px] text-on-surface-variant italic flex items-center gap-1">
                  <Info size={18} className="text-tertiary" />
                  Livret complet disponible sous 30 jours
                </span>
              </div>
            </div>

            {/* Boîte d'alerte notification */}
            <div className="w-full lg:w-96 bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-sm">
              <div className="flex items-center gap-2 text-primary text-[20px] font-bold">
                <Bell size={22} />
                <span>Alerte Parution</span>
              </div>
              <p className="text-[13px] text-on-surface-variant">
                Soyez notifié(e) par email dès que le document officiel imprimable et le guide de poche sont disponibles.
              </p>
              
              <form className="flex flex-col gap-space-xs mt-1" onSubmit={handleNotifSubmit}>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input 
                    className="w-full px-space-sm py-space-xs bg-surface-container-lowest text-on-surface rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" 
                    placeholder="votre.email@institut.org" 
                    required 
                    type="email"
                  />
                  <button 
                    disabled={notifSubmitted}
                    className="px-space-md py-space-xs bg-secondary text-on-secondary rounded-lg text-[14px] font-bold hover:bg-on-secondary-container transition-all flex items-center justify-center gap-1 whitespace-nowrap shadow-sm disabled:opacity-50" 
                    type="submit"
                  >
                    <span>Me notifier</span>
                  </button>
                </div>
                
                {notifSubmitted && (
                  <div className="mt-2 p-2 bg-secondary-container text-on-secondary-fixed rounded-lg text-[13px] flex items-center gap-2 font-medium">
                    <CheckCircle2 size={18} />
                    <span>Parfait ! Votre alerte a été enregistrée avec succès.</span>
                  </div>
                )}
              </form>
            </div>

          </div>
        </section>

        {/* Section Accordéon : Aperçu des 3 Journées */}
        <section className="w-full max-w-[1280px] mx-auto px-margin py-space-2xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-space-lg gap-space-sm">
            <div>
              <div className="flex items-center gap-2 text-secondary text-[11px] uppercase tracking-wider mb-1 font-bold">
                <Calendar size={16} />
                Structure Chronologique
              </div>
              <h2 className="text-[38px] font-bold text-on-surface">Aperçu des Journées</h2>
              <p className="text-[15px] text-on-surface-variant max-w-xl">
                Sélectionnez une journée pour explorer les orientations prioritaires, les formats d’ateliers et la ventilation prévisionnelle.
              </p>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant text-[11px] font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-primary"></span> Plénières
              <span className="w-2.5 h-2.5 rounded-full bg-secondary ml-2"></span> Ateliers
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary ml-2"></span> Symposia
            </div>
          </div>

          <div className="flex flex-col gap-space-md">
            
            {/* JOUR 1 */}
            <article className="bg-surface-container-lowest rounded-xl shadow-sm transition-all overflow-hidden">
              <button 
                onClick={() => toggleDay('day-1')}
                className="w-full p-space-md md:p-space-lg flex flex-col md:flex-row md:items-center justify-between text-left gap-space-sm hover:bg-surface-container-low transition-colors" 
                type="button"
              >
                <div className="flex items-start md:items-center gap-space-md">
                  <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg shadow-sm flex-shrink-0 ${activeDay === 'day-1' ? 'bg-primary-container text-on-primary' : 'bg-surface-container text-on-surface'}`}>
                    <span className="text-[11px] uppercase font-bold">J-1</span>
                    <span className="text-[20px] font-bold">25</span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded bg-surface-container-high text-[11px] font-semibold text-on-surface">Mardi 25 Mai 2027</span>
                      <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold flex items-center gap-1">
                        <Clock size={14} /> 08h30 — 18h00
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-container text-[11px] font-semibold text-on-surface-variant flex items-center gap-1">
                        <MapPin size={14} /> Palais des Congrès
                      </span>
                    </div>
                    <h3 className="text-[26px] font-bold text-on-surface">
                      Jour 1 : Accès au dépistage néonatal & Diagnostic précoce
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-3 self-end md:self-auto">
                  <span className="text-[11px] text-on-surface-variant hidden md:inline font-semibold">Voir la structure</span>
                  <div className={`w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface transition-transform duration-300 ${activeDay === 'day-1' ? 'rotate-180' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </div>
              </button>

              {activeDay === 'day-1' && (
                <div className="px-space-md md:px-space-lg pb-space-lg pt-space-xs flex flex-col gap-space-md animate-fadeIn">
                  <div className="p-space-md bg-surface-container-low rounded-xl flex items-center gap-space-sm text-on-surface-variant">
                    <Building2 className="text-primary flex-shrink-0" size={22} />
                    <p className="text-[15px]">
                      <strong className="text-on-surface font-semibold">Note institutionnelle :</strong> Le détail des sessions, plénières et ateliers de cette journée sera communiqué prochainement. Les créneaux ci-dessous représentent la maquette indicative retenue.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                    <div className="p-space-md rounded-xl bg-surface-container flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold text-primary">08h30 — 09h30</span>
                          <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest text-[11px] font-bold text-on-surface-variant">Hall Central</span>
                        </div>
                        <h4 className="text-[20px] font-bold text-on-surface mb-1">Accueil, Enregistrement & Badges</h4>
                        <p className="text-[13px] text-on-surface-variant">Remise des mallettes congressistes, installation des délégations panafricaines et formalités scientifiques.</p>
                      </div>
                      <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant text-[11px] font-semibold">
                        <span>Comité d’Organisation</span>
                        <span className="text-secondary font-bold">Présentiel</span>
                      </div>
                    </div>

                    <div className="p-space-md rounded-xl bg-surface-container flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold text-primary">09h30 — 12h30</span>
                          <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary text-[11px] font-bold">Auditorium Principal</span>
                        </div>
                        <h4 className="text-[20px] font-bold text-on-surface mb-1">Cérémonie d'ouverture & Plénière Inaugurale</h4>
                        <p className="text-[13px] text-on-surface-variant">Allocutions ministérielles, état des lieux épidémiologique et déploiement du dépistage néonatal systématique en Afrique Centrale.</p>
                      </div>
                      <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant text-[11px] font-semibold">
                        <span>Sous l'égide MINSANTE / OMS</span>
                        <span className="text-primary font-bold">Plénière 1</span>
                      </div>
                    </div>

                    <div className="p-space-md rounded-xl bg-surface-container flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold text-primary">14h00 — 18h00</span>
                          <span className="px-2 py-0.5 rounded-full bg-secondary text-on-secondary text-[11px] font-bold">Salles Parallèles A & B</span>
                        </div>
                        <h4 className="text-[20px] font-bold text-on-surface mb-1">Tables Rondes Thématiques & Retours de Terrain</h4>
                        <p className="text-[13px] text-on-surface-variant">Techniques point-of-care (POC), génomique appliquée et intégration du dépistage au paquet de soins de santé primaires.</p>
                      </div>
                      <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant text-[11px] font-semibold">
                        <span>GEDREPACAM Sessions</span>
                        <span className="text-tertiary-container font-bold">Symposiums</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* JOUR 2 */}
            <article className="bg-surface-container-lowest rounded-xl shadow-sm transition-all overflow-hidden">
              <button 
                onClick={() => toggleDay('day-2')}
                className="w-full p-space-md md:p-space-lg flex flex-col md:flex-row md:items-center justify-between text-left gap-space-sm hover:bg-surface-container-low transition-colors" 
                type="button"
              >
                <div className="flex items-start md:items-center gap-space-md">
                  <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg shadow-sm flex-shrink-0 ${activeDay === 'day-2' ? 'bg-primary-container text-on-primary' : 'bg-surface-container text-on-surface'}`}>
                    <span className="text-[11px] uppercase font-bold">J-2</span>
                    <span className="text-[20px] font-bold">26</span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded bg-surface-container-high text-[11px] font-semibold text-on-surface">Mercredi 26 Mai 2027</span>
                      <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold flex items-center gap-1">
                        <Clock size={14} /> 09h00 — 18h30
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-container text-[11px] font-semibold text-on-surface-variant flex items-center gap-1">
                        <MapPin size={14} /> Palais des Congrès
                      </span>
                    </div>
                    <h3 className="text-[26px] font-bold text-on-surface">
                      Jour 2 : Prise en charge globale, Traitements & Équité des Soins
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-3 self-end md:self-auto">
                  <span className="text-[11px] text-on-surface-variant hidden md:inline font-semibold">Voir la structure</span>
                  <div className={`w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface transition-transform duration-300 ${activeDay === 'day-2' ? 'rotate-180' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </div>
              </button>

              {activeDay === 'day-2' && (
                <div className="px-space-md md:px-space-lg pb-space-lg pt-space-xs flex flex-col gap-space-md animate-fadeIn">
                  <div className="p-space-md bg-surface-container-low rounded-xl flex items-center gap-space-sm text-on-surface-variant">
                    <Stethoscope className="text-secondary flex-shrink-0" size={22} />
                    <p className="text-[15px]">
                      <strong className="text-on-surface font-semibold">Note institutionnelle :</strong> Le détail des sessions, plénières et ateliers de cette journée sera communiqué prochainement.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                    <div className="p-space-md rounded-xl bg-surface-container flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold text-secondary">09h00 — 11h30</span>
                          <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary text-[11px] font-bold">Auditorium</span>
                        </div>
                        <h4 className="text-[20px] font-bold text-on-surface mb-1">Plénières Thérapeutiques & Hydroxyurée</h4>
                        <p className="text-[13px] text-on-surface-variant">Standardisation des posologies pédiatriques, tolérance, accessibilité économique des traitements modificateurs de la maladie.</p>
                      </div>
                      <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant text-[11px] font-semibold">
                        <span>Hématologie Clinique</span>
                        <span className="text-primary font-bold">Plénière 2</span>
                      </div>
                    </div>

                    <div className="p-space-md rounded-xl bg-surface-container flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold text-secondary">11h45 — 13h00</span>
                          <span className="px-2 py-0.5 rounded-full bg-secondary text-on-secondary text-[11px] font-bold">Atelier 1</span>
                        </div>
                        <h4 className="text-[20px] font-bold text-on-surface mb-1">Prise en charge infirmière des crises vaso-occlusives</h4>
                        <p className="text-[13px] text-on-surface-variant">Protocoles antalgiques d'urgence, gestion de l'hydratation et surveillance hémodynamique en milieu hospitalier.</p>
                      </div>
                      <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant text-[11px] font-semibold">
                        <span>Pratiques de soins</span>
                        <span className="text-secondary font-bold">Atelier Pratique</span>
                      </div>
                    </div>

                    <div className="p-space-md rounded-xl bg-surface-container flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold text-secondary">14h30 — 18h30</span>
                          <span className="px-2 py-0.5 rounded-full bg-tertiary-container text-on-tertiary text-[11px] font-bold">Forum Débats</span>
                        </div>
                        <h4 className="text-[20px] font-bold text-on-surface mb-1">Associations de Patients & Démocratie Sanitaire</h4>
                        <p className="text-[13px] text-on-surface-variant">Éducation thérapeutique, plaidoyer pour la couverture universelle et transition de l'adolescence à l'âge adulte.</p>
                      </div>
                      <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant text-[11px] font-semibold">
                        <span>Coalition Panafricaine</span>
                        <span className="text-tertiary font-bold">Table Ronde</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* JOUR 3 */}
            <article className="bg-surface-container-lowest rounded-xl shadow-sm transition-all overflow-hidden">
              <button 
                onClick={() => toggleDay('day-3')}
                className="w-full p-space-md md:p-space-lg flex flex-col md:flex-row md:items-center justify-between text-left gap-space-sm hover:bg-surface-container-low transition-colors" 
                type="button"
              >
                <div className="flex items-start md:items-center gap-space-md">
                  <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg shadow-sm flex-shrink-0 ${activeDay === 'day-3' ? 'bg-primary-container text-on-primary' : 'bg-surface-container text-on-surface'}`}>
                    <span className="text-[11px] uppercase font-bold">J-3</span>
                    <span className="text-[20px] font-bold">27</span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded bg-surface-container-high text-[11px] font-semibold text-on-surface">Jeudi 27 Mai 2027</span>
                      <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold flex items-center gap-1">
                        <Clock size={14} /> 09h00 — 17h00
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-container text-[11px] font-semibold text-on-surface-variant flex items-center gap-1">
                        <MapPin size={14} /> Palais des Congrès
                      </span>
                    </div>
                    <h3 className="text-[26px] font-bold text-on-surface">
                      Jour 3 : Défis, Thérapies Innovantes & Perspectives
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-3 self-end md:self-auto">
                  <span className="text-[11px] text-on-surface-variant hidden md:inline font-semibold">Voir la structure</span>
                  <div className={`w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface transition-transform duration-300 ${activeDay === 'day-3' ? 'rotate-180' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </div>
              </button>

              {activeDay === 'day-3' && (
                <div className="px-space-md md:px-space-lg pb-space-lg pt-space-xs flex flex-col gap-space-md animate-fadeIn">
                  <div className="p-space-md bg-surface-container-low rounded-xl flex items-center gap-space-sm text-on-surface-variant">
                    <Users2 className="text-tertiary flex-shrink-0" size={22} />
                    <p className="text-[15px]">
                      <strong className="text-on-surface font-semibold">Note institutionnelle :</strong> Le détail des sessions, plénières et ateliers de cette journée sera communiqué prochainement.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                    <div className="p-space-md rounded-xl bg-surface-container flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold text-primary">09h00 — 12h00</span>
                          <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-[11px] font-bold text-on-surface">Grand Amphithéâtre</span>
                        </div>
                        <h4 className="text-[20px] font-bold text-on-surface mb-1">Innovations Génétiques & Édition du Génome</h4>
                        <p className="text-[13px] text-on-surface-variant">Perspectives des thérapies géniques curatives en contextes à ressources limitées : défis de transfert technologique et bioéthique.</p>
                      </div>
                      <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant text-[11px] font-semibold">
                        <span>Panel International</span>
                        <span className="text-primary font-bold">Session Spéciale</span>
                      </div>
                    </div>

                    <div className="p-space-md rounded-xl bg-surface-container flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold text-secondary">13h30 — 15h30</span>
                          <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold">Salle des Actes</span>
                        </div>
                        <h4 className="text-[20px] font-bold text-on-surface mb-1">Consensus de Yaoundé 2027 & Recommandations</h4>
                        <p className="text-[13px] text-on-surface-variant">Présentation des protocoles consensuels sous-régionaux et vote de la feuille de route GEDREPACAM.</p>
                      </div>
                      <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant text-[11px] font-semibold">
                        <span>Comité Scientifique</span>
                        <span className="text-secondary font-bold">Restitution</span>
                      </div>
                    </div>

                    <div className="p-space-md rounded-xl bg-surface-container flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold text-tertiary">15h45 — 17h00</span>
                          <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary text-[11px] font-bold">Auditorium</span>
                        </div>
                        <h4 className="text-[20px] font-bold text-on-surface mb-1">Clôture Officielle & Prix des Jeunes Chercheurs</h4>
                        <p className="text-[13px] text-on-surface-variant">Remise des distinctions scientifiques pour les meilleurs abstracts oraux et posters affichés, suivie de la clôture officielle.</p>
                      </div>
                      <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant text-[11px] font-semibold">
                        <span>Cérémonie Solennelle</span>
                        <span className="text-tertiary-container font-bold">Palmarès</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>

          </div>
        </section>

      </div>
    </main>
  );
}

export default Program;