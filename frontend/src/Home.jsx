import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  Award,
  Newspaper,
  FileText,
  Users
} from 'lucide-react';

// Import des images locales depuis ./assets/
import heroBg from './assets/ImageFondConférence.jpeg';
import logoEbPartner from './assets/eb-partner.jpeg';
// import logoPad from './assets/pad.png';
// import logoSabc from './assets/sabc.png';
// import logoCnps from './assets/cnps.png';

const PILIERS_STRATEGIQUES = [
  {
    num: '01',
    axe: 'Axe I',
    titre: 'Dépistage néonatal systématique',
    description:
      "Généralisation précoce à l'échelle territoriale pour identifier la drépanocytose dès les premiers jours de vie, amorcer un suivi médical rapproché et prévenir radicalement les complications néonatales critiques."
  },
  {
    num: '02',
    axe: 'Axe II',
    titre: 'Prise en charge & Protocoles équitables',
    description:
      "Standardisation des conduites d'urgence, protocoles intégrés contre les crises vaso-occlusives et accès démocratisé à l'hydroxyurée, aux analgésiques majeurs et aux antibiotiques prophylactiques."
  },
  {
    num: '03',
    axe: 'Axe III',
    titre: 'Formation médicale continue',
    description:
      'Renforcement continu des compétences des pédiatres, médecins généralistes, sages-femmes et soignants communautaires à travers des cursus certifiants et des compagnonnages cliniques.'
  },
  {
    num: '04',
    axe: 'Axe IV',
    titre: 'Sensibilisation & Inclusion communautaire',
    description:
      'Éducation active des familles, déstigmatisation au sein des écoles et des villages, conseil génétique prémarital et accompagnement psychosocial bienveillant face à la douleur chronique.'
  },
  {
    num: '05',
    axe: 'Axe V',
    titre: 'Plaidoyer institutionnel & Pérennité',
    description:
      'Mobilisation des gouvernements, bailleurs internationaux et partenaires techniques pour l’inscription prioritaire de la lutte contre la drépanocytose dans les budgets nationaux de santé.'
  }
];

const THEMES_SCIENTIFIQUES = [
  {
    num: '01',
    axe: 'Axe I',
    titre: 'Politiques de santé, gouvernance et stratégies nationales',
    domaine: 'Santé publique & Régulation',
    description:
      'Intégration pérenne de la drépanocytose dans les plans stratégiques de santé, mutualisation des financements publics et harmonisation des directives ministérielles régionales.'
  },
  {
    num: '02',
    axe: 'Axe II',
    titre: 'Dépistage néonatal, innovations et assurance qualité',
    domaine: 'Biologie & Diagnostic rapide',
    description:
      'Déploiement opérationnel des tests rapides (TDR) en maternité, protocoles de validation rigoureux en laboratoire de référence et structuration du registre de suivi néonatal.'
  },
  {
    num: '03',
    axe: 'Axe III',
    titre: 'Prise en charge intégrée, accès aux soins et équité',
    domaine: 'Clinique & Urgences',
    description:
      "Standardisation des conduites à tenir d'urgence, gestion aiguë des crises vaso-occlusives, prophylaxie infectieuse pédiatrique et réduction active des disparités d'accès territorial."
  },
  {
    num: '04',
    axe: 'Axe IV',
    titre: 'Innovations thérapeutiques et avancées biotechnologiques',
    domaine: 'Thérapies de pointe',
    description:
      "Thérapies géniques, nouveaux modulateurs de l'affinité pour l'oxygène, accessibilité universelle à l'hydroxyurée et développement des filières de greffe allogénique en Afrique."
  },
  {
    num: '05',
    axe: 'Axe V',
    titre: 'Dimensions psychosociales, communauté et prévention',
    domaine: 'Sciences humaines & Familles',
    description:
      'Rôle cardinal des associations de familles, accompagnement psychologique de la douleur chronique, aménagement scolaire, insertion professionnelle et lutte contre l’isolement social.'
  },
  {
    num: '06',
    axe: 'Axe VI',
    titre: 'Recherche clinique, données probantes et innovation',
    domaine: 'Recherche translationnelle',
    description:
      'Cohortes multicentriques africaines, biomarqueurs de vasculopathie, essais cliniques contextualisés et constitution de bases de données génomiques ouvertes et sécurisées.'
  },
  {
    num: '07',
    axe: 'Axe VII',
    titre: 'Coopération internationale, plaidoyer et perspectives',
    domaine: 'Alliances continentales',
    description:
      'Partenariats scientifiques Sud-Sud et Nord-Sud, mutualisation des expertises régionales et mobilisation stratégique des bailleurs pour pérenniser le plan de lutte panafricain.'
  }
];

// Liste des partenaires classés par niveau : 'or' | 'argent' | 'bronze'
const PARTENAIRES = [
  {
    id: 'eb-partner',
    categorie: 'bronze',
    sigle: 'EB-PARTNER',
    nom: 'EB-Partner',
    sousTitre: 'Partenaire Officiel · Congrès 2027',
    logo: logoEbPartner
  }
];

// Configuration visuelle distincte pour Or, Argent et Bronze
const NIVEAUX_PARTENAIRES = [
  {
    key: 'or',
    titre: 'Partenaires Or',
    badgeLabel: 'Catégorie Or',
    headerLine: 'from-amber-400 via-yellow-500 to-amber-600',
    pillStyle:
      'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-xs',
    cardBg:
      'bg-gradient-to-b from-amber-50/70 via-white to-white border-2 border-amber-400/75 shadow-md shadow-amber-900/5',
    logoBox:
      'h-36 sm:h-40 bg-white border border-amber-200/90 rounded-2xl p-5',
    titleColor: 'text-amber-950',
    subColor: 'text-amber-800/80',
    gridCols: 'max-w-3xl mx-auto grid-cols-1 sm:grid-cols-2'
  },
  {
    key: 'argent',
    titre: 'Partenaires Argent',
    badgeLabel: 'Catégorie Argent',
    headerLine: 'from-slate-300 via-slate-400 to-slate-500',
    pillStyle:
      'bg-gradient-to-r from-slate-500 to-slate-600 text-white shadow-xs',
    cardBg:
      'bg-gradient-to-b from-slate-100/80 via-white to-white border-2 border-slate-300/90 shadow-sm',
    logoBox:
      'h-28 sm:h-32 bg-white border border-slate-200 rounded-xl p-4',
    titleColor: 'text-slate-900',
    subColor: 'text-slate-600',
    gridCols: 'max-w-4xl mx-auto grid-cols-1 sm:grid-cols-2'
  },
  {
    key: 'bronze',
    titre: 'Partenaires Bronze',
    badgeLabel: 'Catégorie Bronze',
    headerLine: 'from-amber-700 via-orange-700 to-amber-800',
    pillStyle:
      'bg-gradient-to-r from-amber-700 to-orange-800 text-white shadow-xs',
    cardBg:
      'bg-gradient-to-b from-orange-50/60 via-white to-white border-2 border-orange-300/80 shadow-xs',
    logoBox:
      'h-28 sm:h-32 bg-white border border-orange-200/80 rounded-xl p-4',
    titleColor: 'text-stone-900',
    subColor: 'text-amber-900/75',
    gridCols: 'max-w-5xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  }
];

function PartnerTierCard({ partner, tier }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <article
      className={`rounded-3xl p-6 sm:p-7 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1 ${tier.cardBg}`}
    >
      {/* Badge de distinction Or / Argent / Bronze */}
      <span
        className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4 ${tier.pillStyle}`}
      >
        <Award className="w-3.5 h-3.5" />
        <span>{tier.badgeLabel}</span>
      </span>

      {/* Grand conteneur pour le logo */}
      <div
        className={`w-full flex items-center justify-center overflow-hidden mb-4 ${tier.logoBox}`}
      >
        {partner.logo && !imgFailed ? (
          <img
            src={partner.logo}
            alt={`Logo ${partner.nom}`}
            onError={() => setImgFailed(true)}
            className="max-w-full max-h-full w-auto h-auto object-contain"
          />
        ) : (
          <span className="font-editorial-serif text-2xl sm:text-3xl font-bold tracking-wider text-[#1a1a1a]/70">
            {partner.sigle}
          </span>
        )}
      </div>

      {/* Nom et sous-titre */}
      <h4
        className={`font-editorial-serif text-lg sm:text-xl font-bold tracking-wide ${tier.titleColor}`}
      >
        {partner.nom}
      </h4>
      {partner.sousTitre && (
        <p className={`text-xs font-medium mt-1 ${tier.subColor}`}>
          {partner.sousTitre}
        </p>
      )}
    </article>
  );
}

function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
    isLive: false
  });

  useEffect(() => {
    // 25 mai 2027 à 08:00:00 (UTC+1 Yaoundé)
    const targetDate = new Date('2027-05-25T08:00:00+01:00').getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0, isLive: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000),
        isLive: false
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="w-full bg-[#fcfaf9] text-[#1a1a1a] flex flex-col antialiased selection:bg-[#c11236] selection:text-white">
      {/* 1. HERO SECTION : AFFICHE COMPLÈTE SANS ZOOM + COMPTE À REBOURS EN DESSOUS */}
      <section
        id="hero"
        className="w-full bg-[#fcfaf9] pt-[88px] lg:pt-[96px]"
      >
        {/* Affiche affichée à 100 % de sa largeur sans rognage ni fond rouge */}
        <div className="w-full bg-white">
          <img
            src={heroBg}
            alt="5e Congrès International de la Drépanocytose — 25 au 27 mai 2027, Palais des Congrès de Yaoundé"
            className="w-full h-auto block"
          />
        </div>

        {/* Bandeau inférieur : Compte à rebours + Boutons d'action */}
        <div className="w-full bg-white border-y border-[#eedcdc]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-5 sm:py-6 flex flex-col lg:flex-row items-center justify-between gap-5">
            {/* Compte à rebours */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2.5 text-center sm:text-left">
                <span className="p-2 rounded-full bg-[#00765a]/10 text-[#00765a] hidden sm:inline-flex">
                  <Clock className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#00765a] font-bold">
                    Compte à rebours
                  </p>
                  <p className="text-xs sm:text-sm text-[#555555] font-medium">
                    Ouverture officielle dans
                  </p>
                </div>
              </div>

              {!timeLeft.isLive ? (
                <div className="grid grid-cols-4 gap-2.5 sm:gap-3 text-center tabular-nums w-full sm:w-auto max-w-md">
                  <div className="bg-[#fcfaf9] border border-[#eedcdc] rounded-xl py-2 px-3 sm:px-4 min-w-[68px] sm:min-w-[78px]">
                    <span className="block font-editorial-serif text-xl sm:text-2xl font-bold text-[#8b0a1d] leading-none">
                      {String(timeLeft.days).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#555555] mt-1 block font-medium">
                      Jours
                    </span>
                  </div>

                  <div className="bg-[#fcfaf9] border border-[#eedcdc] rounded-xl py-2 px-3 sm:px-4 min-w-[68px] sm:min-w-[78px]">
                    <span className="block font-editorial-serif text-xl sm:text-2xl font-bold text-[#8b0a1d] leading-none">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#555555] mt-1 block font-medium">
                      Heures
                    </span>
                  </div>

                  <div className="bg-[#fcfaf9] border border-[#eedcdc] rounded-xl py-2 px-3 sm:px-4 min-w-[68px] sm:min-w-[78px]">
                    <span className="block font-editorial-serif text-xl sm:text-2xl font-bold text-[#8b0a1d] leading-none">
                      {String(timeLeft.mins).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#555555] mt-1 block font-medium">
                      Minutes
                    </span>
                  </div>

                  <div className="bg-[#fcfaf9] border border-[#eedcdc] rounded-xl py-2 px-3 sm:px-4 min-w-[68px] sm:min-w-[78px]">
                    <span className="block font-editorial-serif text-xl sm:text-2xl font-bold text-[#c11236] leading-none">
                      {String(timeLeft.secs).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#555555] mt-1 block font-medium">
                      Secondes
                    </span>
                  </div>
                </div>
              ) : (
                <div className="py-2.5 px-5 rounded-xl bg-[#00765a]/10 border border-[#00765a]/25 text-[#00765a] font-editorial-serif font-semibold text-base sm:text-lg">
                  Le 5<sup>e</sup> Congrès International de la Drépanocytose a
                  débuté.
                </div>
              )}
            </div>

            {/* Boutons Call to Action */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Link
                to="/inscription"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#8b0a1d] to-[#c11236] hover:from-[#7a0818] hover:to-[#a80e2e] text-white font-semibold text-sm transition-all duration-200 shadow-xs hover:scale-[1.02]"
              >
                <span>S'inscrire au congrès</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/programme"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#fcfaf9] hover:bg-[#c11236]/[0.05] text-[#1a1a1a] hover:text-[#8b0a1d] font-semibold text-sm border border-[#eedcdc] hover:border-[#c11236]/40 transition-all duration-200"
              >
                Découvrir le programme
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LES 5 AXES FONDAMENTAUX (Bento Éditorial) */}
      <section
        id="piliers"
        className="py-24 lg:py-28 bg-[#fcfaf9] relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
        >
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1440 850"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient cx="35%" cy="35%" id="rbc-light-grad" r="65%">
                <stop offset="0%" stopColor="#c11236" stopOpacity="0.12" />
                <stop offset="45%" stopColor="#8b0a1d" stopOpacity="0.07" />
                <stop offset="80%" stopColor="#8b0a1d" stopOpacity="0.09" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
              <linearGradient
                id="rbc-light-sickle"
                x1="0%"
                x2="100%"
                y1="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#c11236" stopOpacity="0.12" />
                <stop offset="50%" stopColor="#8b0a1d" stopOpacity="0.07" />
                <stop offset="100%" stopColor="#8b0a1d" stopOpacity="0.01" />
              </linearGradient>
              <filter id="blur-halo">
                <feGaussianBlur stdDeviation="25" />
              </filter>
            </defs>
            <circle
              cx="70"
              cy="200"
              fill="#c11236"
              fillOpacity="0.04"
              filter="url(#blur-halo)"
              r="130"
            />
            <circle
              cx="1380"
              cy="650"
              fill="#c11236"
              fillOpacity="0.04"
              filter="url(#blur-halo)"
              r="140"
            />
            <g transform="translate(50, 180) rotate(24)">
              <ellipse
                cx="0"
                cy="0"
                fill="url(#rbc-light-grad)"
                rx="55"
                ry="44"
              />
              <ellipse
                cx="-3"
                cy="-2"
                fill="#8b0a1d"
                fillOpacity="0.06"
                rx="26"
                ry="19"
              />
            </g>
            <g transform="translate(1390, 260) rotate(-35)">
              <path
                d="M -15,-65 C 32,-35 48,25 15,65 C 2,75 -8,72 -5,58 C 12,22 8,-20 -22,-52 C -28,-58 -25,-72 -15,-65 Z"
                fill="url(#rbc-light-sickle)"
              />
            </g>
            <g transform="translate(1360, 680) rotate(40)">
              <ellipse
                cx="0"
                cy="0"
                fill="url(#rbc-light-grad)"
                rx="62"
                ry="48"
              />
              <ellipse
                cx="-4"
                cy="-2"
                fill="#8b0a1d"
                fillOpacity="0.06"
                rx="30"
                ry="22"
              />
            </g>
            <g transform="translate(40, 750) rotate(-18)">
              <path
                d="M -12,-52 C 26,-28 38,20 12,52 C 2,60 -6,57 -4,46 C 10,18 6,-16 -18,-42 C -22,-46 -20,-58 -12,-52 Z"
                fill="url(#rbc-light-sickle)"
              />
            </g>
          </svg>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          {/* En-tête de section */}
          <div className="max-w-3xl mb-16 pb-10 border-b border-[#eedcdc]/80">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-6 bg-[#c11236]" />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c11236]">
                Axes Stratégiques · Horizon 2027–2032
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-[#1a1a1a] tracking-tight leading-[1.15] mb-4">
              Les axes fondamentaux de notre action
            </h2>
            <p className="text-[#555555] text-base sm:text-lg leading-relaxed font-light">
              Un continuum clinique et institutionnel intégré : de
              l'identification néonatale précoce à la pérennité budgétaire
              d'État, articulé autour de 5 domaines d'intervention prioritaires.
            </p>
          </div>

          {/* Matrice 5 Colonnes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch">
            {PILIERS_STRATEGIQUES.map((pilier) => (
              <article
                key={pilier.num}
                className="bg-white rounded-2xl border border-[#eedcdc]/80 p-8 flex flex-col justify-start hover:border-[#c11236]/40 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#eedcdc]/40">
                  <span className="font-editorial-serif text-3xl font-normal text-[#c11236]/80 watermark-num">
                    {pilier.num}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider text-[#555555]/60">
                    {pilier.axe}
                  </span>
                </div>
                <h3 className="font-editorial-serif text-xl font-bold text-[#1a1a1a] leading-snug mb-3">
                  {pilier.titre}
                </h3>
                <p className="text-sm text-[#555555] leading-relaxed font-light">
                  {pilier.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MESSAGE DU PRÉSIDENT */}
      <section
        id="mot-du-president"
        className="py-20 lg:py-28 bg-white overflow-hidden relative"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
        >
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1440 760"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient cx="36%" cy="36%" id="rbc-pres-grad" r="64%">
                <stop offset="0%" stopColor="#c11236" stopOpacity="0.11" />
                <stop offset="45%" stopColor="#8b0a1d" stopOpacity="0.06" />
                <stop offset="78%" stopColor="#8b0a1d" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
              <linearGradient
                id="rbc-pres-sickle"
                x1="0%"
                x2="100%"
                y1="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#c11236" stopOpacity="0.10" />
                <stop offset="50%" stopColor="#8b0a1d" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#8b0a1d" stopOpacity="0.01" />
              </linearGradient>
              <filter id="blur-pres-glow">
                <feGaussianBlur stdDeviation="20" />
              </filter>
            </defs>
            <circle
              cx="1340"
              cy="180"
              fill="#c11236"
              fillOpacity="0.035"
              filter="url(#blur-pres-glow)"
              r="120"
            />
            <circle
              cx="90"
              cy="560"
              fill="#8b0a1d"
              fillOpacity="0.03"
              filter="url(#blur-pres-glow)"
              r="100"
            />
            <g transform="translate(1320, 190) rotate(52)">
              <path
                d="M -18,-75 C 36,-40 54,28 18,75 C 3,86 -8,82 -4,66 C 14,26 10,-22 -24,-60 C -30,-67 -27,-83 -18,-75 Z"
                fill="url(#rbc-pres-sickle)"
              />
            </g>
            <g transform="translate(1380, 480) rotate(-22)">
              <ellipse
                cx="0"
                cy="0"
                fill="url(#rbc-pres-grad)"
                rx="46"
                ry="36"
              />
              <ellipse
                cx="-2"
                cy="-2"
                fill="#8b0a1d"
                fillOpacity="0.05"
                rx="22"
                ry="16"
              />
            </g>
            <g transform="translate(80, 320) rotate(-35)">
              <ellipse
                cx="0"
                cy="0"
                fill="url(#rbc-pres-grad)"
                rx="54"
                ry="42"
              />
              <ellipse
                cx="-3"
                cy="-2"
                fill="#8b0a1d"
                fillOpacity="0.05"
                rx="26"
                ry="18"
              />
            </g>
            <g transform="translate(120, 580) rotate(28)">
              <path
                d="M -14,-58 C 28,-30 42,22 14,58 C 2,66 -7,63 -4,50 C 10,20 7,-18 -20,-46 C -25,-51 -22,-64 -14,-58 Z"
                fill="url(#rbc-pres-sickle)"
              />
            </g>
          </svg>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center gap-2 mb-3">
                <span className="h-px w-8 bg-[#c11236]" />
                <span className="text-xs uppercase tracking-widest text-[#c11236] font-bold">
                  Message du Président
                </span>
                <span className="h-px w-8 bg-[#c11236]" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-[#1a1a1a] leading-snug">
                Construire ensemble des recommandations concrètes et adaptées à
                nos réalités
              </h2>
              <div className="w-16 h-1 bg-[#c11236] mx-auto mt-4 rounded-full" />
            </div>

            <div className="space-y-6 text-[#555555] text-base sm:text-lg leading-relaxed">
              <p className="first-letter-drop font-editorial-serif italic text-[#1a1a1a]">
                Chers collègues, chers partenaires, chers amis de la lutte
                contre la drépanocytose,
              </p>
              <p>
                C'est avec un immense plaisir que le GEDREPACAM vous accueille à
                Yaoundé, du 25 au 27 mai 2027, pour la 5<sup>e</sup> édition du
                Congrès International de la Drépanocytose, placée sous le Haut
                Parrainage du Ministre de la Santé Publique.
              </p>
              <p>
                Cette année, nous placerons au cœur de nos échanges une question
                essentielle : celle de l'accès au dépistage néonatal et à la
                prise en charge de la drépanocytose, dans une exigence
                d'équité. Pendant trois jours, cliniciens, chercheurs,
                décideurs, associations de patients et partenaires
                confronteront leurs expériences, partageront les innovations
                diagnostiques et thérapeutiques, et construiront ensemble des
                recommandations concrètes, adaptées à nos réalités.
              </p>

              <div className="my-8 p-6 sm:p-8 bg-[#fbf9f8] rounded-2xl border-l-4 border-[#8b0a1d] relative">
                <p className="font-editorial-serif italic text-lg sm:text-xl text-[#1a1a1a] leading-relaxed">
                  « Derrière chaque dépistage précoce, chaque protocole
                  amélioré, chaque plaidoyer, il y a un enfant, une famille, un
                  avenir. C'est le sens de notre engagement : un combat pour
                  l'Espoir, une victoire pour nos enfants. »
                </p>
              </div>

              <p className="font-editorial-serif italic text-xl text-[#1a1a1a]">
                Nous vous invitons à vous joindre à nous.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-[#eae4e4] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#fbf9f8] border-2 border-[#c11236]/30 flex items-center justify-center text-[#c11236] font-editorial-serif font-bold text-xl shadow-xs">
                  <span className="tracking-tight">WG</span>
                </div>
                <div>
                  <div className="font-editorial-serif italic text-2xl text-[#8b0a1d] tracking-wider select-none">
                    Dr Wamba Guillaume
                  </div>
                  <div className="font-bold text-[#1a1a1a] text-lg font-editorial-serif">
                    Dr Wamba Guillaume
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[#555555] font-semibold">
                    Président du GEDREPACAM
                  </div>
                </div>
              </div>

              <div className="px-5 py-2.5 rounded-full bg-[#fbf9f8] border border-[#eae4e4] flex items-center gap-2.5 text-xs text-[#555555] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#00765a]" />
                <span>Comité d'Organisation · Congrès 2027</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STRUCTURE ACADÉMIQUE : LE CONGRÈS EN CHIFFRES ET FORMATS */}
      <section
        id="chiffres"
        className="py-16 bg-[#f7f3f2] border-y border-[#eae4e4]"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-widest text-[#00765a] font-bold mb-2">
              Structure Académique
            </p>
            <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#1a1a1a]">
              Le congrès en chiffres et formats
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Métrique 1 */}
            <div className="bg-white p-6 rounded-2xl border border-[#eae4e4] flex flex-col justify-between shadow-xs">
              <div>
                <span className="font-editorial-serif text-5xl font-bold text-[#c11236] leading-none">
                  3
                </span>
                <span className="text-xs font-semibold text-[#8b0a1d] uppercase tracking-wider block mt-2">
                  Jours pleins
                </span>
                <p className="text-sm text-[#1a1a1a] font-medium mt-3">
                  25, 26 et 27 mai 2027
                </p>
              </div>
              <p className="text-xs text-[#555555] mt-4 border-t border-[#eae4e4] pt-3">
                Travaux intensifs en plénière et ateliers
              </p>
            </div>

            {/* Métrique 2 */}
            <div className="bg-white p-6 rounded-2xl border border-[#eae4e4] flex flex-col justify-between shadow-xs">
              <div>
                <span className="font-editorial-serif text-5xl font-bold text-[#00765a] leading-none">
                  7
                </span>
                <span className="text-xs font-semibold text-[#005c46] uppercase tracking-wider block mt-2">
                  Axes majeurs
                </span>
                <p className="text-sm text-[#1a1a1a] font-medium mt-3">
                  Thèmes scientifiques
                </p>
              </div>
              <p className="text-xs text-[#555555] mt-4 border-t border-[#eae4e4] pt-3">
                Du diagnostic aux politiques de santé
              </p>
            </div>

            {/* Format 3 */}
            <div className="bg-white p-6 rounded-2xl border border-[#eae4e4] flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#fbf9f8] flex items-center justify-center text-[#1a1a1a] mb-3">
                  <Newspaper className="w-5 h-5" />
                </div>
                <p className="font-editorial-serif text-base font-bold text-[#1a1a1a] leading-snug">
                  Sessions Plénières
                </p>
                <p className="text-sm text-[#555555] mt-1">
                  Conférences magistrales données par des experts
                  internationaux reconnus.
                </p>
              </div>
              <span className="text-xs text-[#00765a] font-semibold mt-4 border-t border-[#eae4e4] pt-3 block">
                Haut niveau académique
              </span>
            </div>

            {/* Format 4 */}
            <div className="bg-white p-6 rounded-2xl border border-[#eae4e4] flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#fbf9f8] flex items-center justify-center text-[#1a1a1a] mb-3">
                  <FileText className="w-5 h-5" />
                </div>
                <p className="font-editorial-serif text-base font-bold text-[#1a1a1a] leading-snug">
                  Communications Libres
                </p>
                <p className="text-sm text-[#555555] mt-1">
                  Présentations orales et posters scientifiques évalués par les
                  pairs.
                </p>
              </div>
              <span className="text-xs text-[#c11236] font-semibold mt-4 border-t border-[#eae4e4] pt-3 block">
                Recherche clinique
              </span>
            </div>

            {/* Format 5 */}
            <div className="bg-white p-6 rounded-2xl border border-[#eae4e4] flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#fbf9f8] flex items-center justify-center text-[#1a1a1a] mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <p className="font-editorial-serif text-base font-bold text-[#1a1a1a] leading-snug">
                  Symposiums Partenaires
                </p>
                <p className="text-sm text-[#555555] mt-1">
                  Ateliers de formation aux protocoles cliniques pratiques.
                </p>
              </div>
              <span className="text-xs text-[#00765a] font-semibold mt-4 border-t border-[#eae4e4] pt-3 block">
                Pratiques de terrain
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LES SEPT AXES SCIENTIFIQUES AU CŒUR DU CONGRÈS */}
      <section
        id="themes"
        className="py-24 lg:py-28 bg-white relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
        >
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1440 1100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient cx="35%" cy="35%" id="rbc-theme-grad" r="65%">
                <stop offset="0%" stopColor="#c11236" stopOpacity="0.10" />
                <stop offset="50%" stopColor="#8b0a1d" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
              <linearGradient
                id="rbc-theme-sickle"
                x1="0%"
                x2="100%"
                y1="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#c11236" stopOpacity="0.09" />
                <stop offset="60%" stopColor="#8b0a1d" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g transform="translate(1380, 220) rotate(-40)">
              <ellipse
                cx="0"
                cy="0"
                fill="url(#rbc-theme-grad)"
                rx="58"
                ry="46"
              />
              <ellipse
                cx="-3"
                cy="-2"
                fill="#8b0a1d"
                fillOpacity="0.05"
                rx="28"
                ry="20"
              />
            </g>
            <g transform="translate(50, 480) rotate(35)">
              <path
                d="M -15,-65 C 32,-35 48,25 15,65 C 2,75 -8,72 -5,58 C 12,22 8,-20 -22,-52 C -28,-58 -25,-72 -15,-65 Z"
                fill="url(#rbc-theme-sickle)"
              />
            </g>
            <g transform="translate(1390, 800) rotate(18)">
              <path
                d="M -12,-52 C 26,-28 38,20 12,52 C 2,60 -6,57 -4,46 C 10,18 6,-16 -18,-42 C -22,-46 -20,-58 -12,-52 Z"
                fill="url(#rbc-theme-sickle)"
              />
            </g>
            <g transform="translate(40, 950) rotate(-22)">
              <ellipse
                cx="0"
                cy="0"
                fill="url(#rbc-theme-grad)"
                rx="48"
                ry="38"
              />
              <ellipse
                cx="-2"
                cy="-1"
                fill="#8b0a1d"
                fillOpacity="0.04"
                rx="24"
                ry="16"
              />
            </g>
          </svg>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl mb-20">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-xs uppercase tracking-[0.2em] text-[#c11236] font-bold">
                Programme Scientifique
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif-title font-bold text-[#1a1a1a] leading-tight">
              Les sept axes scientifiques au cœur du congrès
            </h2>
            <p className="text-[#555555] text-base sm:text-lg mt-4 leading-relaxed font-light">
              Une approche transversale et concertée articulant politiques de
              santé publique, avancées biotechnologiques et réalité quotidienne
              des familles touchées.
            </p>
          </div>

          <div className="divide-y divide-[#eedcdc]/80 border-t border-b border-[#eedcdc]/80">
            {THEMES_SCIENTIFIQUES.map((theme) => (
              <article
                key={theme.num}
                className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-baseline transition-colors duration-200 hover:bg-[#fcfaf9]/60 px-4 sm:px-6 rounded-xl"
              >
                <div className="md:col-span-2 flex items-baseline gap-3">
                  <span className="font-editorial-serif text-4xl sm:text-5xl font-normal text-[#c11236]/80 watermark-num">
                    {theme.num}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[#555555]/60 font-medium">
                    {theme.axe}
                  </span>
                </div>

                <div className="md:col-span-5">
                  <h3 className="font-editorial-serif text-2xl sm:text-[26px] font-semibold text-[#1a1a1a] leading-snug">
                    {theme.titre}
                  </h3>
                  <span className="inline-block mt-2 text-xs font-semibold text-[#00765a] tracking-wide">
                    {theme.domaine}
                  </span>
                </div>

                <div className="md:col-span-5">
                  <p className="text-sm sm:text-base text-[#555555] font-normal leading-relaxed">
                    {theme.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/programme"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#1a1a1a]/20 text-[#1a1a1a] hover:border-[#c11236] hover:text-[#c11236] hover:bg-[#c11236]/[0.02] font-semibold text-sm transition-all"
            >
              <span>Consulter l'agenda détaillé des sessions</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. PARTENARIATS OR, ARGENT & BRONZE */}
      <section
        id="partenaires"
        className="py-24 bg-[#f8f5f4] border-t border-[#eedcdc] relative overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#555555]/70 font-semibold mb-3 block">
              Partenariats Officiels · Or, Argent &amp; Bronze
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-title font-bold text-[#1a1a1a]">
              Sous le Haut Parrainage du Ministre de la Santé Publique et
              l'appui de nos partenaires
            </h2>
            <div className="w-12 h-0.5 bg-[#c11236] mx-auto mt-4" />
          </div>

          {/* Trois niveaux bien distincts : Or, Argent, Bronze */}
          <div className="space-y-16">
            {NIVEAUX_PARTENAIRES.map((tier) => {
              const items = PARTENAIRES.filter((p) => p.categorie === tier.key);
              const activeGridClass =
                items.length === 1
                  ? 'max-w-md mx-auto grid-cols-1'
                  : tier.gridCols;

              return (
                <div key={tier.key} className="space-y-8">
                  {/* En-tête métallique de la catégorie */}
                  <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
                    <span
                      className={`h-0.5 flex-1 bg-gradient-to-r opacity-40 ${tier.headerLine}`}
                    />
                    <h3
                      className={`text-sm sm:text-base font-editorial-serif font-bold uppercase tracking-[0.22em] ${tier.titleColor}`}
                    >
                      {tier.titre}
                    </h3>
                    <span
                      className={`h-0.5 flex-1 bg-gradient-to-l opacity-40 ${tier.headerLine}`}
                    />
                  </div>

                  {items.length > 0 ? (
                    <div className={`grid gap-8 ${activeGridClass}`}>
                      {items.map((partner) => (
                        <PartnerTierCard
                          key={partner.id}
                          partner={partner}
                          tier={tier}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="max-w-lg mx-auto">
                      <div
                        className={`rounded-2xl border-dashed px-6 py-7 text-center opacity-85 ${tier.cardBg}`}
                      >
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2.5 ${tier.pillStyle}`}
                        >
                          <Award className="w-3 h-3" />
                          <span>{tier.badgeLabel}</span>
                        </span>
                        <p className={`text-sm font-medium ${tier.subColor}`}>
                          Liste des {tier.titre.toLowerCase()} en cours
                          d'officialisation.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;