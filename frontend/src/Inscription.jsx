import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Microscope,
  Banknote,
  Stethoscope,
  Users,
  School,
  Award,
  UserCheck,
  ArrowRight,
  Lock,
  MapPin,
  Check
} from 'lucide-react';

// Grille tarifaire officielle en FCFA
const TARIFS = {
  'Médecin (Spécialiste ou Généraliste)': 25000,
  'Enseignant Universitaire': 25000,
  'Pharmacien hospitalier /officine': 25000,
  'Infirmier /Soignant': 10000,
  'Techinicien de laboratoire': 10000,
  'Chercheur / Généticien': 15000,
  'Autre profession de santé': 15000,
  'Visiteur / Délégué Institutionnel': 10000,
  'Étudiant / Interne en Médecine': 5000
};

const CATEGORIES_TARIFS = [
  {
    id: 'cat-a',
    code: 'Catégorie A',
    badgeStyle: 'bg-[#c11236]/10 text-[#c11236]',
    icon: Stethoscope,
    iconColor: 'text-[#c11236]',
    titre: "Médecin & Pharmacien spécialiste, Enseignant d'université",
    description:
      'Praticiens hospitaliers, hospitalo-universitaires, professeurs et directeurs de recherche.',
    prix: '25 000',
    devise: 'FCFA',
    condition: null,
    defaultProfession: 'Médecin (Spécialiste ou Généraliste)',
    matchedProfessions: [
      'Médecin (Spécialiste ou Généraliste)',
      'Enseignant Universitaire',
      'Pharmacien hospitalier /officine'
    ]
  },
  {
    id: 'cat-b',
    code: 'Catégorie B',
    badgeStyle: 'bg-emerald-50 text-[#00765a]',
    icon: Microscope,
    iconColor: 'text-[#00765a]',
    titre: 'Médecin Généraliste, Pharmacien, Ingénieur biologie',
    description:
      'Corps médical général, biologistes médicaux et cadres techniques de laboratoires.',
    prix: '15 000',
    devise: 'FCFA',
    condition: null,
    defaultProfession: 'Chercheur / Généticien',
    matchedProfessions: [
      'Chercheur / Généticien',
      'Autre profession de santé'
    ]
  },
  {
    id: 'cat-c',
    code: 'Catégorie C',
    badgeStyle: 'bg-[#8b0a1d]/10 text-[#8b0a1d]',
    icon: Users,
    iconColor: 'text-[#8b0a1d]',
    titre: 'Infirmier & Technicien de laboratoire',
    description:
      'Personnel paramédical de terrain et soignants des centres de référence drépanocytose.',
    prix: '10 000',
    devise: 'FCFA',
    condition: null,
    defaultProfession: 'Infirmier /Soignant',
    matchedProfessions: ['Infirmier /Soignant', 'Techinicien de laboratoire']
  },
  {
    id: 'cat-d',
    code: 'Catégorie D',
    badgeStyle: 'bg-[#f1f1f5] text-[#555555]',
    icon: Users,
    iconColor: 'text-[#555555]',
    titre: 'Visiteur & Délégué Institutionnel',
    description:
      "Membres d'associations de patients, observateurs, ONG et représentants de la société civile.",
    prix: '10 000',
    devise: 'FCFA',
    condition: null,
    defaultProfession: 'Visiteur / Délégué Institutionnel',
    matchedProfessions: ['Visiteur / Délégué Institutionnel']
  },
  {
    id: 'cat-e',
    code: 'Jeunes Chercheurs',
    badgeStyle: 'bg-emerald-50 text-[#00765a]',
    icon: School,
    iconColor: 'text-[#00765a]',
    titre: 'Étudiant & Interne en Médecine',
    description:
      'Étudiants en facultés de médecine, pharmacie, sciences biomédicales et écoles de soins.',
    prix: '5 000',
    devise: 'FCFA',
    condition: "Présentation obligatoire d'un justificatif ou carte d'étudiant",
    defaultProfession: 'Étudiant / Interne en Médecine',
    matchedProfessions: ['Étudiant / Interne en Médecine']
  },
  {
    id: 'cat-f',
    code: 'Protocolaire',
    badgeStyle: 'bg-[#1a1a1a]/10 text-[#1a1a1a]',
    icon: Award,
    iconColor: 'text-[#c11236]',
    titre: "Invité d'Honneur & Conférencier Clé",
    description:
      "Personnalités ministérielles, experts désignés de l'OMS et présidents de sociétés savantes.",
    prix: 'Gratuit',
    devise: null,
    condition: "Sur invitation officielle émise par le comité d'organisation",
    defaultProfession: null,
    matchedProfessions: []
  }
];

function Inscription() {
  const navigate = useNavigate();
  const [selectedProfession, setSelectedProfession] = useState('');

  const montantActuel = selectedProfession ? TARIFS[selectedProfession] || 0 : null;

  const handleSelectTarif = (professionValue) => {
    if (!professionValue) return;
    setSelectedProfession(professionValue);
    const formSection = document.getElementById('formulaire-inscription');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const profession = form.elements['reg-profession'].value;
    const prixAPayer = TARIFS[profession] || 0;

    const formData = {
      noms: form.elements['reg-lastname'].value,
      titre: form.elements['reg-title'].value,
      statut: form.elements['reg-quality'].value,
      email: form.elements['reg-email'].value,
      prenoms: form.elements['reg-firstname'].value,
      profession: profession,
      institution: form.elements['reg-institution'].value,
      telephone: form.elements['reg-phone'].value
    };

    navigate('/paiement', {
      state: {
        donneesInscription: formData,
        montant: prixAPayer
      }
    });
  };

  return (
    <main className="relative overflow-x-clip w-full bg-white text-[#1a1a1a] selection:bg-[#c11236] selection:text-white">
      {/* 1. EN-TÊTE ÉDITORIAL BORDEAUX AVEC HÉMATIES EN FILIGRANE */}
      <header className="relative bg-gradient-to-br from-[#8b0a1d] via-[#7e0819] to-[#690715] text-white overflow-hidden pt-28 sm:pt-32 pb-14 lg:pb-16 border-b border-[#c11236]/20">
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden pointer-events-none opacity-10"
        >
          <svg
            className="absolute -right-14 -top-16 w-96 h-96 text-white"
            fill="currentColor"
            viewBox="0 0 100 100"
          >
            <path d="M50 10 C27.9 10 10 27.9 10 50 C10 72.1 27.9 90 50 90 C62.5 90 73.6 84.3 80.8 75.3 C65.6 77.1 51.5 68.2 46.1 53.6 C40.8 39.2 46.5 23.3 59.8 15.2 C56.7 11.9 53.4 10 50 10 Z" />
          </svg>
          <svg
            className="absolute -left-12 -bottom-10 w-80 h-80 text-white"
            fill="currentColor"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              fill="none"
              r="42"
              stroke="currentColor"
              strokeWidth="14"
            />
            <circle cx="50" cy="50" fill="currentColor" opacity="0.4" r="20" />
          </svg>
          <svg
            className="hidden lg:block absolute right-1/3 bottom-4 w-40 h-40 text-white opacity-60 rotate-45"
            fill="currentColor"
            viewBox="0 0 100 100"
          >
            <path d="M50 10 C27.9 10 10 27.9 10 50 C10 72.1 27.9 90 50 90 C62.5 90 73.6 84.3 80.8 75.3 C65.6 77.1 51.5 68.2 46.1 53.6 C40.8 39.2 46.5 23.3 59.8 15.2 C56.7 11.9 53.4 10 50 10 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs font-medium text-white/90">
              <GraduationCap className="w-3.5 h-3.5 text-white/80" />
              <span>Attestation CME</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs font-medium text-white/90">
              <Microscope className="w-3.5 h-3.5 text-white/80" />
              <span>Sessions Plénières &amp; Ateliers</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-white/75 font-semibold block mb-2">
                GEDREPACAM · 5<sup>e</sup> Édition Internationale
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-serif-title font-bold tracking-tight text-white leading-[1.15] mb-4">
                Inscription au Congrès
              </h1>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-3xl">
                Ouverture des inscriptions :{' '}
                <strong className="font-semibold text-white">
                  20 octobre 2026
                </strong>{' '}
                — Clôture :{' '}
                <strong className="font-semibold text-white">Avril 2027</strong>
                . Rejoignez les experts internationaux, praticiens et chercheurs
                au Palais des Congrès de Yaoundé.
              </p>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-white/80">
                <span className="flex items-center gap-1.5 font-semibold text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Portail Actif
                </span>
                <span>25 – 27 Mai 2027</span>
              </div>
              <div className="pt-3 border-t border-white/15 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10 text-emerald-300 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/70 block">
                    Lieu du congrès
                  </span>
                  <div className="font-editorial-serif text-lg sm:text-xl font-bold text-white leading-snug mt-0.5">
                    Palais des Congrès de Yaoundé
                  </div>
                  <div className="text-xs text-white/75 mt-0.5">
                    Yaoundé · Cameroun
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. BARÈME TARIFAIRE OFFICIEL (DISPOSITION INSTITUTIONNELLE STRUCTURÉE) */}
      <section className="relative w-full bg-[#f8f8fa] border-b border-[#dce0e8] py-16 lg:py-20 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <svg
            className="absolute -right-24 top-12 w-[420px] h-[420px] text-[#8b0a1d]/[0.035]"
            fill="currentColor"
            viewBox="0 0 100 100"
          >
            <path d="M50 10 C27.9 10 10 27.9 10 50 C10 72.1 27.9 90 50 90 C62.5 90 73.6 84.3 80.8 75.3 C65.6 77.1 51.5 68.2 46.1 53.6 C40.8 39.2 46.5 23.3 59.8 15.2 C56.7 11.9 53.4 10 50 10 Z" />
          </svg>
          <svg
            className="absolute -left-20 bottom-10 w-80 h-80 text-[#c11236]/[0.03]"
            fill="currentColor"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              fill="none"
              r="42"
              stroke="currentColor"
              strokeWidth="14"
            />
            <circle cx="50" cy="50" fill="currentColor" opacity="0.4" r="20" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10 space-y-10">
          {/* En-tête de section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00765a] font-bold uppercase tracking-wider mb-1.5">
                <Banknote className="w-4 h-4" />
                <span>Barème Officiel</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1a1a1a]">
                Grille Tarifaire d'Inscription
              </h2>
              <p className="text-sm sm:text-base text-[#555555] mt-2 max-w-2xl">
                Sélectionnez votre catégorie professionnelle ci-dessous pour
                pré-remplir le formulaire d'accréditation.
              </p>
            </div>

            <div className="text-xs font-mono uppercase tracking-wider text-[#555555] bg-white border border-[#dce0e8] px-4 py-2 rounded-full self-start md:self-auto">
              Montants exprimés en Francs CFA (XAF)
            </div>
          </div>

          {/* Tableau éditorial des tarifs */}
          <div className="bg-white rounded-3xl border border-[#dce0e8] shadow-xs overflow-hidden">
            {/* En-tête des colonnes sur écran moyen et grand */}
            <div className="hidden md:grid md:grid-cols-12 gap-6 px-8 py-4 bg-[#f8f8fa] border-b border-[#dce0e8] text-[11px] font-mono uppercase tracking-wider text-[#555555] font-semibold">
              <div className="col-span-7">Catégorie &amp; Profil concerné</div>
              <div className="col-span-3 text-right">Droits d'inscription</div>
              <div className="col-span-2 text-right">Sélection</div>
            </div>

            <div className="divide-y divide-[#dce0e8]/80">
              {CATEGORIES_TARIFS.map((cat) => {
                const IconComponent = cat.icon;
                const isSelected =
                  selectedProfession !== '' &&
                  cat.matchedProfessions.includes(selectedProfession);

                return (
                  <div
                    key={cat.id}
                    onClick={() =>
                      cat.defaultProfession &&
                      handleSelectTarif(cat.defaultProfession)
                    }
                    className={`px-6 sm:px-8 py-6 transition-colors relative ${
                      cat.defaultProfession ? 'cursor-pointer' : ''
                    } ${
                      isSelected
                        ? 'bg-red-50/40'
                        : 'hover:bg-[#f8f8fa]/80'
                    }`}
                  >
                    {/* Liseré carmin actif à gauche */}
                    {isSelected && (
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#c11236]" />
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center">
                      {/* Colonne 1 : Identification & Profil */}
                      <div className="md:col-span-7 flex items-start gap-4">
                        <div
                          className={`w-10 h-10 rounded-xl border border-[#dce0e8] bg-[#f8f8fa] flex items-center justify-center shrink-0 mt-0.5 ${cat.iconColor}`}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full ${cat.badgeStyle}`}
                            >
                              {cat.code}
                            </span>
                            {cat.condition && (
                              <span className="text-[11px] font-medium text-[#8b0a1d] bg-[#8b0a1d]/5 border border-[#8b0a1d]/15 px-2.5 py-0.5 rounded-full">
                                {cat.condition}
                              </span>
                            )}
                          </div>

                          <h3 className="font-editorial-serif text-lg sm:text-xl font-bold text-[#1a1a1a] leading-snug">
                            {cat.titre}
                          </h3>

                          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                            {cat.description}
                          </p>
                        </div>
                      </div>

                      {/* Colonne 2 & 3 : Tarif + Bouton d'action */}
                      <div className="md:col-span-5 flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-[#dce0e8]/60">
                        <div className="md:text-right">
                          <div className="flex items-baseline md:justify-end gap-1.5">
                            <span
                              className={`font-mono text-2xl sm:text-[1.65rem] font-bold tabular-nums ${
                                cat.devise ? 'text-[#1a1a1a]' : 'text-[#00765a]'
                              }`}
                            >
                              {cat.prix}
                            </span>
                            {cat.devise && (
                              <span className="text-xs font-mono font-bold text-[#c11236]">
                                {cat.devise}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="w-32 flex justify-end shrink-0">
                          {cat.defaultProfession ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectTarif(cat.defaultProfession);
                              }}
                              className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#c11236] text-white shadow-xs'
                                  : 'bg-white border border-[#dce0e8] hover:border-[#c11236] hover:bg-[#c11236] text-[#1a1a1a] hover:text-white'
                              }`}
                            >
                              {isSelected ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Sélectionné</span>
                                </>
                              ) : (
                                <>
                                  <span>Choisir</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </>
                              )}
                            </button>
                          ) : (
                            <span className="text-xs font-mono text-[#555555]/70">
                              Sur invitation
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. FORMULAIRE D'INSCRIPTION INDIVIDUELLE */}
      <section
        id="formulaire-inscription"
        className="relative w-full bg-white py-16 lg:py-24 overflow-hidden scroll-mt-16"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <svg
            className="hidden lg:block absolute -left-24 top-24 w-96 h-96 text-[#8b0a1d]/[0.03] -rotate-12"
            fill="currentColor"
            viewBox="0 0 100 100"
          >
            <path d="M50 10 C27.9 10 10 27.9 10 50 C10 72.1 27.9 90 50 90 C62.5 90 73.6 84.3 80.8 75.3 C65.6 77.1 51.5 68.2 46.1 53.6 C40.8 39.2 46.5 23.3 59.8 15.2 C56.7 11.9 53.4 10 50 10 Z" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="bg-white rounded-3xl border border-[#dce0e8] shadow-sm p-6 sm:p-10 lg:p-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="w-12 h-12 rounded-full bg-[#c11236]/10 text-[#c11236] flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#c11236] font-semibold">
                Accréditation Nominative
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1a1a1a] mt-1">
                Formulaire d'inscription individuelle
              </h2>
              <p className="text-sm sm:text-base text-[#555555] mt-2">
                Renseignez vos coordonnées pour enregistrer votre badge officiel
                et procéder au règlement sécurisé.
              </p>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Colonne 1 */}
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label
                      className="block text-sm text-[#1a1a1a] font-semibold"
                      htmlFor="reg-lastname"
                    >
                      Noms <span className="text-[#c11236]">*</span>
                    </label>
                    <input
                      id="reg-lastname"
                      type="text"
                      required
                      placeholder="ex. Tchamba"
                      className="w-full px-4 py-3 rounded-xl bg-[#f8f8fa] border border-[#dce0e8] text-[#1a1a1a] placeholder:text-[#555555]/50 text-sm focus:bg-white focus:outline-none focus:border-[#c11236] focus:ring-1 focus:ring-[#c11236] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      className="block text-sm text-[#1a1a1a] font-semibold"
                      htmlFor="reg-title"
                    >
                      Titre honorifique{' '}
                      <span className="text-[#c11236]">*</span>
                    </label>
                    <select
                      id="reg-title"
                      required
                      defaultValue=""
                      className="w-full px-4 py-3 rounded-xl bg-[#f8f8fa] border border-[#dce0e8] text-[#1a1a1a] text-sm focus:bg-white focus:outline-none focus:border-[#c11236] focus:ring-1 focus:ring-[#c11236] transition-colors"
                    >
                      <option disabled value="">
                        Sélectionnez un titre
                      </option>
                      <option value="Pr. (Professeur)">Pr. (Professeur)</option>
                      <option value="Dr. (Docteur)">Dr. (Docteur)</option>
                      <option value="M. (Monsieur)">M. (Monsieur)</option>
                      <option value="Mme (Madame)">Mme (Madame)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      className="block text-sm text-[#1a1a1a] font-semibold"
                      htmlFor="reg-quality"
                    >
                      Vous participez en qualité de{' '}
                      <span className="text-[#c11236]">*</span>
                    </label>
                    <select
                      id="reg-quality"
                      required
                      defaultValue=""
                      className="w-full px-4 py-3 rounded-xl bg-[#f8f8fa] border border-[#dce0e8] text-[#1a1a1a] text-sm focus:bg-white focus:outline-none focus:border-[#c11236] focus:ring-1 focus:ring-[#c11236] transition-colors"
                    >
                      <option disabled value="">
                        Choisir un statut
                      </option>
                      <option value="Participant">Participant</option>
                      <option value="Exposant médical">Exposant médical</option>
                      <option value="Sponsor & Partenaire">
                        Sponsor &amp; Partenaire
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      className="block text-sm text-[#1a1a1a] font-semibold"
                      htmlFor="reg-email"
                    >
                      Adresse e-mail institutionnelle{' '}
                      <span className="text-[#c11236]">*</span>
                    </label>
                    <input
                      id="reg-email"
                      type="email"
                      required
                      placeholder="dr.nom@hopital.cm"
                      className="w-full px-4 py-3 rounded-xl bg-[#f8f8fa] border border-[#dce0e8] text-[#1a1a1a] placeholder:text-[#555555]/50 text-sm focus:bg-white focus:outline-none focus:border-[#c11236] focus:ring-1 focus:ring-[#c11236] transition-colors"
                    />
                  </div>
                </div>

                {/* Colonne 2 */}
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label
                      className="block text-sm text-[#1a1a1a] font-semibold"
                      htmlFor="reg-firstname"
                    >
                      Prénoms <span className="text-[#c11236]">*</span>
                    </label>
                    <input
                      id="reg-firstname"
                      type="text"
                      required
                      placeholder="ex. Emilienne"
                      className="w-full px-4 py-3 rounded-xl bg-[#f8f8fa] border border-[#dce0e8] text-[#1a1a1a] placeholder:text-[#555555]/50 text-sm focus:bg-white focus:outline-none focus:border-[#c11236] focus:ring-1 focus:ring-[#c11236] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      className="block text-sm text-[#1a1a1a] font-semibold"
                      htmlFor="reg-profession"
                    >
                      Profession <span className="text-[#c11236]">*</span>
                    </label>
                    <select
                      id="reg-profession"
                      required
                      value={selectedProfession}
                      onChange={(e) => setSelectedProfession(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#f8f8fa] border border-[#dce0e8] text-[#1a1a1a] text-sm focus:bg-white focus:outline-none focus:border-[#c11236] focus:ring-1 focus:ring-[#c11236] transition-colors"
                    >
                      <option disabled value="">
                        Sélectionnez votre profession
                      </option>
                      <option value="Médecin (Spécialiste ou Généraliste)">
                        Médecin (Spécialiste ou Généraliste)
                      </option>
                      <option value="Infirmier /Soignant">
                        Infirmier / Soignant
                      </option>
                      <option value="Pharmacien hospitalier /officine">
                        Pharmacien hospitalier / officine
                      </option>
                      <option value="Techinicien de laboratoire">
                        Technicien de laboratoire
                      </option>
                      <option value="Chercheur / Généticien">
                        Chercheur / Généticien
                      </option>
                      <option value="Enseignant Universitaire">
                        Enseignant Universitaire
                      </option>
                      <option value="Visiteur / Délégué Institutionnel">
                        Visiteur / Délégué Institutionnel
                      </option>
                      <option value="Étudiant / Interne en Médecine">
                        Étudiant / Interne en Médecine
                      </option>
                      <option value="Autre profession de santé">
                        Autre profession de santé
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      className="block text-sm text-[#1a1a1a] font-semibold"
                      htmlFor="reg-institution"
                    >
                      Organisation / Institution{' '}
                      <span className="text-[#c11236]">*</span>
                    </label>
                    <input
                      id="reg-institution"
                      type="text"
                      required
                      placeholder="ex. CHUY, FMSB Yaoundé, Hôpital Laquintinie..."
                      className="w-full px-4 py-3 rounded-xl bg-[#f8f8fa] border border-[#dce0e8] text-[#1a1a1a] placeholder:text-[#555555]/50 text-sm focus:bg-white focus:outline-none focus:border-[#c11236] focus:ring-1 focus:ring-[#c11236] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      className="block text-sm text-[#1a1a1a] font-semibold"
                      htmlFor="reg-phone"
                    >
                      Numéro de téléphone{' '}
                      <span className="text-[#c11236]">*</span>
                    </label>
                    <input
                      id="reg-phone"
                      type="tel"
                      required
                      placeholder="ex. 690000000"
                      className="w-full px-4 py-3 rounded-xl bg-[#f8f8fa] border border-[#dce0e8] text-[#1a1a1a] placeholder:text-[#555555]/50 text-sm focus:bg-white focus:outline-none focus:border-[#c11236] focus:ring-1 focus:ring-[#c11236] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Récapitulatif dynamique du tarif sélectionné */}
              {montantActuel !== null && (
                <div className="rounded-2xl bg-[#f8f8fa] border border-[#dce0e8] px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#555555] font-semibold block">
                      Tarif applicable à votre catégorie
                    </span>
                    <span className="text-sm font-semibold text-[#1a1a1a]">
                      {selectedProfession}
                    </span>
                  </div>
                  <div className="font-mono text-2xl font-bold text-[#c11236] tabular-nums">
                    {montantActuel.toLocaleString('fr-FR')} FCFA
                  </div>
                </div>
              )}

              {/* Bouton de validation */}
              <div className="pt-2 flex flex-col items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto sm:min-w-[360px] px-8 py-4 rounded-full bg-[#c11236] hover:bg-[#8b0a1d] text-white text-base font-semibold flex items-center justify-center gap-2.5 transition-colors shadow-sm group cursor-pointer"
                >
                  <span>S'inscrire et procéder au paiement</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="flex items-center gap-1.5 text-[#00765a] text-xs font-medium">
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    Paiement 100 % sécurisé. Aucune donnée bancaire n'est
                    stockée sur ce site.
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Inscription;