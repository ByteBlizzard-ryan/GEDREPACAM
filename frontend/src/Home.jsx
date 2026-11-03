import React, { useState, useEffect } from 'react';
import { 
  Calendar, MapPin, Globe, UserCheck, ArrowRight, 
  CalendarCheck, Users, CheckCircle, Microscope, 
  Syringe, BadgeCheck, Droplet, Shield, Handshake, 
  Hospital, GraduationCap, HeartPulse, FlaskConical, 
  Phone, Mail 
} from 'lucide-react';

function Home() {
  // Logique du compte à rebours isolée dans un état React
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const targetDate = new Date('2027-05-25T08:30:00+01:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) return;

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000)
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="w-full pt-10 bg-background flex flex-col">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-on-surface">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD8hfOvEytl1JbI6q0ZQq_5QJh-Uz2QUdqNW_36va2tQYd-IaZp8WTU1kxWBvpXuOWh-mWvrXAz7tfQ2_A2ZxKG6O_wwtRPMcGG6VYoKEOAa6bCdgcwiv4rs48OunrZYjDq30v8MkGCQYYObxR6-19fwlxWaqFdAvf0y2o9Ha_IqDpUXVSSvhVPBgTAMbwt_iXm3lcqW0ZM9R52D2B7QPrKXEDlrzseGOVqT1RqW6Y')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B132B]/95 via-[#0B132B]/85 to-[#0B132B]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(200,16,46,0.22),rgba(255,255,255,0))]"></div>
        
        <div className="relative w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin pt-20 pb-20 md:pb-28 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-space-sm bg-surface-container-lowest/10 backdrop-blur-md px-space-md py-space-xs rounded-full shadow-sm mb-space-lg">
            <img 
              alt="DREPACAM Logo" 
              className="w-7 h-7 object-contain bg-surface-container-lowest rounded-full p-0.5" 
              src="https://lh3.googleusercontent.com/aida/AEtjO1Uk3lGin7mEZc5_PYE9LEx723Y69K3qV86tyGGG7ZifwljgrJDnQ0h5cCrP2nqhnolT9JZdy_pjMOsq-9xEO37fq52Oyrkti4-go4vGxNSJHnNXqCTYamNPAjJR_cP9OA-AebAZKeElT2BIjcXsNUNspifeZRMBPF33a1c8IPx5r-q3N_GpZlM8qljvijOzmHou33DjBU6MPC3l6HTcwd5FfjeRoMWMboP8hnHZ836zzk5uTS2Z0GhhTw" 
            />
            <span className="text-[14px] text-on-primary font-semibold tracking-wide uppercase">
              5ème Congrès International de la Drépanocytose
            </span>
          </div>
          
          <h1 className="text-[36px] md:text-[56px] font-extrabold text-surface-container-lowest max-w-5xl tracking-tight leading-[1.12] mb-space-lg">
            « Accès au dépistage néonatal et à la prise en charge de la drépanocytose : 
            <span className="text-tertiary-fixed-dim block sm:inline"> Équité, défis, innovations et perspectives »</span>
          </h1>
          
          <p className="text-[18px] text-surface-container-highest max-w-3xl mb-space-xl opacity-90">
            Le rendez-vous scientifique majeur d'Afrique centrale dédié à l'accélération de la recherche translationnelle, des politiques d'équité et de la prise en charge précoce des hémoglobinopathies.
          </p>

          <div className="w-full max-w-2xl mb-space-xl flex flex-col items-center gap-space-sm">
            <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-secondary-container/20 border border-secondary-container/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
              <span className="text-[11px] tracking-wider uppercase font-bold text-secondary-container">Ouverture Officielle des Travaux Scientifiques</span>
            </div>
            
            <div className="w-full grid grid-cols-4 gap-space-sm sm:gap-space-md bg-surface-container-lowest/10 backdrop-blur-xl border border-surface-container-lowest/15 p-space-md rounded-2xl shadow-xl">
              <div className="flex flex-col items-center justify-center p-space-xs sm:p-space-sm rounded-xl bg-surface-container-lowest/10 border border-surface-container-lowest/10">
                <span className="text-[28px] sm:text-[36px] font-extrabold text-surface-container-lowest leading-none">{timeLeft.days}</span>
                <span className="text-[11px] uppercase tracking-wider text-surface-variant font-semibold mt-1">Jours</span>
              </div>
              <div className="flex flex-col items-center justify-center p-space-xs sm:p-space-sm rounded-xl bg-surface-container-lowest/10 border border-surface-container-lowest/10">
                <span className="text-[28px] sm:text-[36px] font-extrabold text-surface-container-lowest leading-none">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[11px] uppercase tracking-wider text-surface-variant font-semibold mt-1">Heures</span>
              </div>
              <div className="flex flex-col items-center justify-center p-space-xs sm:p-space-sm rounded-xl bg-surface-container-lowest/10 border border-surface-container-lowest/10">
                <span className="text-[28px] sm:text-[36px] font-extrabold text-surface-container-lowest leading-none">{String(timeLeft.mins).padStart(2, '0')}</span>
                <span className="text-[11px] uppercase tracking-wider text-surface-variant font-semibold mt-1">Minutes</span>
              </div>
              <div className="flex flex-col items-center justify-center p-space-xs sm:p-space-sm rounded-xl bg-surface-container-lowest/10 border border-surface-container-lowest/10">
                <span className="text-[28px] sm:text-[36px] font-extrabold text-tertiary-fixed-dim leading-none">{String(timeLeft.secs).padStart(2, '0')}</span>
                <span className="text-[11px] uppercase tracking-wider text-tertiary-fixed font-semibold mt-1">Secondes</span>
              </div>
            </div>
          </div>

          <div className="w-full max-w-5xl bg-surface-container-lowest/90 backdrop-blur-xl rounded-3xl shadow-xl p-space-md md:p-space-lg mb-space-xl border border-surface-container-lowest/40 grid grid-cols-1 md:grid-cols-4 items-center gap-space-md md:gap-0 md:divide-x md:divide-surface-variant/40">
            <div className="flex items-center gap-space-md text-left px-0 md:px-space-md">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 shadow-xs">
                <Calendar size={24} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">Dates du congrès</span>
                <span className="text-[16px] text-on-surface font-bold leading-tight">25 – 27 Mai 2027</span>
                <span className="text-[12px] text-on-surface-variant opacity-80 mt-0.5">Plénières & Ateliers</span>
              </div>
            </div>
            
            <div className="flex items-center gap-space-md text-left px-0 md:px-space-md">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0 shadow-xs">
                <MapPin size={24} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">Lieu d'accueil</span>
                <span className="text-[16px] text-on-surface font-bold leading-tight">Palais des Congrès</span>
                <span className="text-[12px] text-on-surface-variant opacity-80 mt-0.5">Yaoundé, Cameroun</span>
              </div>
            </div>
            
            <div className="flex items-center gap-space-md text-left px-0 md:px-space-md">
              <div className="w-12 h-12 rounded-2xl bg-tertiary-container/20 text-tertiary flex items-center justify-center flex-shrink-0 shadow-xs">
                <Globe size={24} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">Modalité</span>
                <span className="text-[16px] text-on-surface font-bold leading-tight">Format Hybride</span>
                <span className="text-[12px] text-on-surface-variant opacity-80 mt-0.5">Présentiel & En direct</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center md:justify-end px-0 md:pl-space-md">
              <a href="/inscription" className="w-full inline-flex items-center justify-center gap-space-xs px-space-lg py-3.5 bg-primary-container text-on-primary text-[14px] rounded-2xl shadow-lg hover:bg-primary transition-all duration-300 font-bold group tracking-wide">
                <UserCheck size={20} />
                <span>S'inscrire au congrès</span>
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KEY METRICS BAND */}
      <section className="w-full bg-secondary text-on-secondary shadow-md py-space-xl">
        <div className="w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-xl items-center">
            
            <div className="flex items-center gap-space-lg bg-on-secondary-fixed/20 p-space-lg rounded-2xl backdrop-blur-sm">
              <div className="w-16 h-16 rounded-xl bg-surface-container-lowest/15 flex items-center justify-center flex-shrink-0 text-surface-container-lowest">
                <CalendarCheck size={36} />
              </div>
              <div className="flex flex-col">
                <div className="text-[38px] md:text-[56px] font-extrabold text-surface-container-lowest leading-none">3</div>
                <div className="text-[20px] font-semibold text-secondary-container mt-space-xs">Jours d'échanges intensifs</div>
                <div className="text-[13px] text-on-secondary/80">Plénières, symposia & débats translationnels</div>
              </div>
            </div>
            
            <div className="flex items-center gap-space-lg bg-on-secondary-fixed/20 p-space-lg rounded-2xl backdrop-blur-sm">
              <div className="w-16 h-16 rounded-xl bg-surface-container-lowest/15 flex items-center justify-center flex-shrink-0 text-surface-container-lowest">
                <Users size={36} />
              </div>
              <div className="flex flex-col">
                <div className="text-[38px] md:text-[56px] font-extrabold text-surface-container-lowest leading-none">400+</div>
                <div className="text-[20px] font-semibold text-secondary-container mt-space-xs">Délégués & Cliniciens</div>
                <div className="text-[13px] text-on-secondary/80">Chercheurs, pédiatres & associations</div>
              </div>
            </div>
            
            <div className="flex items-center gap-space-lg bg-on-secondary-fixed/20 p-space-lg rounded-2xl backdrop-blur-sm">
              <div className="w-16 h-16 rounded-xl bg-surface-container-lowest/15 flex items-center justify-center flex-shrink-0 text-tertiary-fixed">
                <Globe size={36} />
              </div>
              <div className="flex flex-col">
                <div className="text-[38px] md:text-[56px] font-extrabold text-surface-container-lowest leading-none">25+</div>
                <div className="text-[20px] font-semibold text-tertiary-fixed mt-space-xs">Pays & Sommités Mondiales</div>
                <div className="text-[13px] text-on-secondary/80">Réseau Afrique, Europe, Amériques</div>
              </div>
            </div>

          </div>
          
          <div className="mt-space-lg pt-space-md flex flex-wrap items-center justify-center gap-space-sm">
            <span className="px-space-md py-space-xs rounded-full bg-surface-container-lowest/10 text-on-secondary text-[14px] flex items-center gap-space-xs font-semibold">
              <CheckCircle size={16} className="text-tertiary-fixed" /> 18 Sessions Plénières
            </span>
            <span className="px-space-md py-space-xs rounded-full bg-surface-container-lowest/10 text-on-secondary text-[14px] flex items-center gap-space-xs font-semibold">
              <CheckCircle size={16} className="text-tertiary-fixed" /> 6 Ateliers Techniques de Dépistage
            </span>
            <span className="px-space-md py-space-xs rounded-full bg-surface-container-lowest/10 text-on-secondary text-[14px] flex items-center gap-space-xs font-semibold">
              <CheckCircle size={16} className="text-tertiary-fixed" /> 80+ Communications Affichées (Posters)
            </span>
            <span className="px-space-md py-space-xs rounded-full bg-surface-container-lowest/10 text-on-secondary text-[14px] flex items-center gap-space-xs font-semibold">
              <CheckCircle size={16} className="text-tertiary-fixed" /> Table Ronde Ministérielle OMS
            </span>
          </div>
        </div>
      </section>

      {/* 3. WELCOME & ABOUT SECTION */}
      <section className="w-full bg-surface-container-lowest py-space-2xl">
        <div className="w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            
            <div className="lg:col-span-7 flex flex-col gap-space-md">
              <div className="inline-flex items-center gap-space-xs text-primary text-[14px] uppercase tracking-wider font-bold">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Mot de Bienvenue & Présentation
              </div>
              <h2 className="text-[28px] md:text-[38px] text-on-surface font-bold leading-tight">
                Faire du dépistage néonatal universel une réalité clinique concrète en Afrique
              </h2>
              <div className="flex flex-col gap-space-md text-[15px] text-on-surface-variant leading-relaxed">
                <p>
                  Chères consœurs, chers confrères, partenaires de santé publique et membres de la communauté scientifique internationale, c'est avec un profond honneur que le <strong>GEDREPACAM</strong> vous accueille à Yaoundé pour la 5ème édition de notre congrès biennal.
                </p>
                <p>
                  En Afrique subsaharienne, la drépanocytose demeure la première maladie génétique létale de l'enfant : plus de 50 à 80% des enfants nés avec une forme majeure meurent encore avant leur cinquième anniversaire sans diagnostic précoce. Ce 5ème congrès international pose un acte d'urgence et d'ambition scientifique : <strong>briser la barrière de l'inégalité diagnostique</strong>.
                </p>
                <p>
                  Durant trois jours de travaux, nous aborderons de front la démocratisation des tests rapides de diagnostic (isoelectric focusing, POCT), la généralisation de l'accès à l'hydroxyurée pédiatrique, les protocoles de prise en charge des crises vaso-occlusives aiguës, ainsi que les avancées porteuses d'espoir issues de la thérapie génique et des allogreffes de cellules souches hématopoïétiques.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md mt-space-sm">
                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
                  <Microscope size={28} className="text-primary" />
                  <span className="text-[20px] font-semibold text-on-surface">Innovations Diagnostiques</span>
                  <p className="text-[13px] text-on-surface-variant">Validation de tests au point de service (POC) adaptés aux maternités rurales et décentralisées.</p>
                </div>
                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
                  <Syringe size={28} className="text-secondary" />
                  <span className="text-[20px] font-semibold text-on-surface">Thérapies de Précision</span>
                  <p className="text-[13px] text-on-surface-variant">Évaluation des inducteurs d'HbF, des modulateurs rhéologiques et protocoles d'accès équitable.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-space-lg">
              <div className="p-space-xl bg-surface-container-low rounded-2xl shadow-sm flex flex-col gap-space-md">
                <div className="flex items-center gap-space-md">
                  <img 
                    className="w-20 h-20 rounded-full object-cover shadow-md flex-shrink-0" 
                    alt="President" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1mkZNN5GNGywb23o5PMbHzgNfnPq-boSXO5YkrV54vvIJNRKa-y6Yb0PzNQrTU262kMBRkEWG-nXaJcKDzVfLdc6UCWK8XVOh4E9WYtr-GUALxGJp77F-tys_Pp_nJZuWkAOv61SxONfPCH0_ZWB1YPrZVDCLazFjZrUGhtL2JcXkl5uib_h6aGEox_IMhNKOPasbBNKlP3Oxoru3K8T073FC8hywulXPAyO1PyQ" 
                  />
                  <div className="flex flex-col">
                    <span className="text-[20px] font-bold text-on-surface">Pr. NOM Prénom (À définir)</span>
                    <span className="text-[13px] text-primary font-semibold">Président(e) du Comité Scientifique</span>
                    <span className="text-[11px] text-on-surface-variant">Hématologie Clinique • CHU / Institution Universitaire (XXX)</span>
                  </div>
                </div>
                <blockquote className="italic text-[15px] text-on-surface-variant bg-surface-container-lowest p-space-md rounded-xl">
                  « Le congrès international constitue une plateforme collégiale d'excellence visant l'amélioration continue des soins, du dépistage et de l'équité thérapeutique à l'échelle régionale et internationale. »
                </blockquote>
                <div className="flex items-center justify-between pt-space-xs text-on-surface-variant text-[11px]">
                  <div className="flex items-center gap-space-xs">
                    <BadgeCheck size={18} className="text-secondary" />
                    <span>Comité d'Organisation DREPACAM</span>
                  </div>
                  <div className="font-bold tracking-wider text-on-surface">Yaoundé, Cameroun</div>
                </div>
              </div>

              <div className="p-space-lg bg-surface-container rounded-2xl flex flex-col gap-space-sm">
                <span className="text-[14px] font-bold uppercase tracking-wider text-on-surface">Piliers Stratégiques 2027</span>
                <div className="flex flex-col gap-space-xs text-[13px] text-on-surface-variant">
                  <div className="flex items-start gap-space-sm">
                    <Droplet size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Établissement du Registre National Camerounais de la Drépanocytose</span>
                  </div>
                  <div className="flex items-start gap-space-sm">
                    <Shield size={18} className="text-secondary mt-0.5 flex-shrink-0" />
                    <span>Prophylaxie systématique : Pénicilline V, vaccins conjugués et acide folique</span>
                  </div>
                  <div className="flex items-start gap-space-sm">
                    <Handshake size={18} className="text-tertiary mt-0.5 flex-shrink-0" />
                    <span>Coopération Sud-Sud et partenariats Nord-Sud en recherche génétique</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. KEYNOTE SPEAKERS & EXPERTS SECTION */}
      <section className="w-full bg-surface-container-low py-space-2xl">
        <div className="w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
            <div className="flex flex-col gap-space-xs">
              <span className="text-[14px] text-primary font-bold uppercase tracking-wider">Programme d'Excellence</span>
              <h2 className="text-[28px] md:text-[38px] font-bold text-on-surface">Nos Orateurs & Experts de Renom</h2>
              <p className="text-[15px] text-on-surface-variant max-w-2xl">
                Des sommités mondiales de l'hématologie, de la biologie moléculaire et de la santé publique réunies pour partager leurs dernières cohortes cliniques.
              </p>
            </div>
            <a href="/intervenants" className="inline-flex items-center gap-space-xs text-[14px] text-primary hover:text-on-primary-fixed transition-colors font-semibold">
              <span>Consulter tous les intervenants</span>
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
            {/* Speakers array mapping logic can be applied here. For fidelity, static HTML blocks are translated directly */}
            {[
              { 
                tag: "Hématologie Clinique", flag: "🇨🇲 Cameroun", name: "Pr. NOM Exemple 1 (XXX)", role: "Professeur / Spécialité Médicale", loc: "Faculté de Médecine • Institution", img: "AB6AXuDipSP124ZTFZHB3w3fgOdEj4x64OoXLFFuGRMmjyL9ihj64bZhfzuSXJS5tKEiWShDBaQ9uE7aV6N7TC8-CYTRiiLg6XTiDEk_ZAnZJ6urX-qXMVV4jyCiWg6WqCbBeci630j1x1P5zsQ7mXmtGFmBPe9xosHaVV64bFxGdY0Bs1Fx6WleuOwrZCA8bDHIhlO9Kzzg_khZl5Q5P83vUKdymSiM2a4KBfZKncRWn_k", color: "bg-primary/90 text-on-primary", highlight: "Plénière Inaugurale : Dépistage Précoce", highlightColor: "bg-surface-container text-on-surface" 
              },
              { 
                tag: "Pédiatrie & Néonatalogie", flag: "🇬🇭 Ghana / USA", name: "Pr. NOM Exemple 2 (XXX)", role: "Pédiatrie & Santé Publique", loc: "Centre Médical International", img: "AB6AXuBUoU_wifxyP-jKu0jxagXRSd5N5_dOvufV40J1kUIjG9a8YB62myODfPsyrIBtTSzGPJR2E1SEq8eFTDFZjA2-HCNOKafzxIUFqIHdYl3k0Khy4AzwyJd9xsSYaGsq4_YkB3TP8UWOHLokJUIf4-85FYzL3mRQ96scVuKhv58GrVPYgQVL51xKvwmhgSf0qg4SQmdXXbE93V9rCSHOuCON1jyue7KYPL41uVG0ayo", color: "bg-secondary/90 text-on-secondary", highlight: "Stratégies Panafricaines de Dépistage", highlightColor: "bg-secondary-container/40 text-on-secondary-container" 
              },
              { 
                tag: "Thérapie Génique", flag: "🇫🇷 France", name: "Pr. NOM Exemple 3 (XXX)", role: "Thérapie Génique & Hématologie", loc: "Centre Hospitalier Universitaire", img: "AB6AXuCv7BWMJIjzMLzcDCBIXd9Fbm37JIrBZ0nDg_pjgDOQLosCrFe3K84pJf7By0NolkqvpHpnJ0iuB5PiYdDhfHWR2_s4aL3ncs04x-oVw_SWPzals5GdTR6Aq_lF_3m9wvywcXdRQ5MIP24Lp-M9J0RaMSY04YYomtqxHe0jJvpTDGD9JlCSeUEcusXENG3g6Bo_-KRKL605rkVbXHNzHKuvlvvECEnf9d-pI9mGvwg", color: "bg-tertiary-container text-on-tertiary-container", highlight: "Innovation : Hydroxyurée & Vectorisation", highlightColor: "bg-surface-container text-on-surface" 
              },
              { 
                tag: "Santé Publique", flag: "🇨🇲 Cameroun", name: "Dr. NOM Exemple 4 (XXX)", role: "Épidémiologie & Santé Communautaire", loc: "Institution de Recherche Médicale", img: "AB6AXuATIXmIfo0vyeAxZEUoncxKdvInoLcsjx30IFrnfILIqhHhsXohvkw8VP1TQLjqAG895v88Ol--68f4MvqBByrjjciqU8Jlg_H_m713AB-fif3oylJTI0gYQ9sdmKS-4CVSxY_YIVP7YN4GANVrLqxjTp-2-k76fpei9akpjfqX5P1GChDX_oOQnNG4gzodx6Yxa0_dbR03sv0mqFYd__Wp0blAwaxax0DsHUlx9rY", color: "bg-secondary text-on-secondary", highlight: "Atelier POCT en Maternité Décentralisée", highlightColor: "bg-secondary-container/40 text-on-secondary-container" 
              }
            ].map((speaker, idx) => (
              <div key={idx} className="flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                <div className="relative h-64 w-full overflow-hidden bg-surface-dim">
                  <img className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" alt={speaker.name} src={`https://lh3.googleusercontent.com/aida-public/${speaker.img}`} />
                  <div className="absolute top-3 left-3">
                    <span className={`px-space-sm py-1 ${speaker.color} text-[11px] font-bold rounded-full backdrop-blur-md`}>{speaker.tag}</span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-space-sm py-0.5 bg-surface-container-lowest/90 text-on-surface text-[11px] font-bold rounded-md shadow-xs">{speaker.flag}</span>
                  </div>
                </div>
                <div className="p-space-lg flex flex-col flex-1 justify-between gap-space-md">
                  <div>
                    <h3 className="text-[20px] font-bold text-on-surface group-hover:text-primary transition-colors">{speaker.name}</h3>
                    <p className="text-[13px] text-primary font-medium mt-space-xs">{speaker.role}</p>
                    <p className="text-[13px] text-on-surface-variant mt-space-xs">{speaker.loc}</p>
                  </div>
                  <div className="pt-space-sm">
                    <span className={`inline-block px-space-sm py-1 rounded ${speaker.highlightColor} text-[11px] font-bold`}>{speaker.highlight}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THEMATIC TRACKS BANNER */}
      <section className="w-full bg-surface-container-lowest py-space-xl">
        <div className="w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
          <div className="bg-surface-container p-space-xl rounded-3xl flex flex-col md:flex-row items-center justify-between gap-space-xl">
            <div className="flex flex-col gap-space-xs max-w-2xl">
              <span className="text-[14px] text-primary font-bold uppercase tracking-wider">Soumission Ouverte</span>
              <h3 className="text-[26px] font-bold text-on-surface">Partagez vos travaux de recherche au 5ème Congrès</h3>
              <p className="text-[15px] text-on-surface-variant">
                Date limite de dépôt des résumés (Abstracts) : <strong>15 Janvier 2027</strong>. Les résumés sélectionnés seront publiés dans l'édition spéciale de la Revue Médicale Camerounaise.
              </p>
            </div>
            <div className="flex items-center gap-space-md flex-shrink-0">
              <a href="/appel-a-communications" className="px-space-xl py-space-md bg-primary-container text-on-primary text-[14px] font-bold rounded-xl shadow-md hover:bg-primary transition-all text-center">
                Déposer une communication
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PARTNERS & SPONSORS SECTION */}
      <section className="w-full bg-surface py-space-2xl">
        <div className="w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin flex flex-col items-center">
          <div className="text-center max-w-3xl mb-space-xl">
            <span className="text-[14px] text-secondary font-bold uppercase tracking-wider">Hauts Soutiens & Alliances</span>
            <h2 className="text-[28px] md:text-[38px] font-bold text-on-surface mt-space-xs">Ils nous font confiance</h2>
            <p className="text-[15px] text-on-surface-variant mt-space-xs">
              Partenaires institutionnels, académiques et pharmaceutiques engagés pour l'éradication du fardeau drépanocytaire en Afrique.
            </p>
          </div>
          
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-space-md mb-space-xl">
            {[
              { icon: Hospital, color: "text-primary bg-primary/10", title: "MINSANTE", sub: "Ministère Santé Publique Cameroun" },
              { icon: Globe, color: "text-secondary bg-secondary/10", title: "OMS / WHO AFRO", sub: "Bureau Régional Afrique" },
              { icon: GraduationCap, color: "text-tertiary bg-tertiary-container/20", title: "Univ. Yaoundé I", sub: "FMSB - CHU Yaoundé" },
              { icon: HeartPulse, color: "text-primary bg-primary/10", title: "Soc. Camerounaise", sub: "d'Hématologie & Transfusion" },
              { icon: FlaskConical, color: "text-secondary bg-secondary/10", title: "GEDREPACAM", sub: "Groupe d'Étude National", extraClass: "col-span-2 md:col-span-1" }
            ].map((Partner, idx) => (
              <div key={idx} className={`p-space-lg bg-surface-container-lowest rounded-2xl shadow-xs flex flex-col items-center justify-center text-center gap-space-sm h-36 hover:shadow-md transition-shadow ${Partner.extraClass || ""}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${Partner.color}`}>
                  <Partner.icon size={28} />
                </div>
                <div>
                  <div className="text-[16px] font-bold text-on-surface leading-tight">{Partner.title}</div>
                  <div className="text-[11px] font-bold tracking-wider text-on-surface-variant">{Partner.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full max-w-4xl p-space-lg bg-surface-container-lowest rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center flex-shrink-0">
                <Handshake size={26} />
              </div>
              <div>
                <h4 className="text-[20px] font-bold text-on-surface">Vous souhaitez exposer ou soutenir les bourses de jeunes chercheurs ?</h4>
                <div className="flex flex-col gap-space-xs mt-1">
                  <p className="text-[13px] text-on-surface-variant">Packs Platine, Or et Argent disponibles pour le village d'exposition.</p>
                  <div className="flex flex-wrap items-center gap-space-sm pt-0.5 text-[13px] font-medium">
                    <span className="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">Contact partenariats :</span>
                    <a href="tel:+237699002525" className="inline-flex items-center gap-1 text-primary hover:underline font-semibold">
                      <Phone size={16} />+237 699 00 25 25
                    </a>
                    <span className="text-on-surface-variant opacity-40">|</span>
                    <a href="mailto:partenariats@drepacam2027.cm" className="inline-flex items-center gap-1 text-secondary hover:underline font-semibold">
                      <Mail size={16} />partenariats@drepacam2027.cm
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <a href="mailto:partenariats@drepacam2027.cm" className="flex-shrink-0 px-space-lg py-space-sm bg-secondary text-on-secondary hover:bg-on-secondary-container text-[14px] font-bold rounded-xl transition-colors whitespace-nowrap">
              Devenir Partenaire / Exposer
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}

export default Home;