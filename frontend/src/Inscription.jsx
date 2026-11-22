import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Microscope,
  Banknote,
  Stethoscope,
  Wrench,
  School,
  HeartHandshake,
  UserCheck,
  ArrowRight,
  Lock,
  MapPin,
  Check,
  Upload,
  FileText,
  X,
  AlertTriangle
} from 'lucide-react';

// Grille tarifaire officielle finale en FCFA
const CATEGORIES_TARIFS = [
  {
    id: 'academics',
    code: 'Catégorie 01',
    badgeStyle: 'bg-[#8b0a1d]/10 text-[#8b0a1d]',
    icon: GraduationCap,
    iconColor: 'text-[#8b0a1d]',
    titre: 'Universitaires (Enseignants / Chercheurs)',
    description:
      'Enseignants-chercheurs, professeurs d’université, maîtres de conférences et chercheurs en sciences biomédicales.',
    justificatifAttendu:
      'Attestation de fonction universitaire, arrêté de nomination ou carte professionnelle d’enseignant-chercheur.',
    montant: 35000,
    prixAffiche: '35 000',
    devise: 'FCFA',
    condition: null
  },
  {
    id: 'specialists',
    code: 'Catégorie 02',
    badgeStyle: 'bg-[#c11236]/10 text-[#c11236]',
    icon: Microscope,
    iconColor: 'text-[#c11236]',
    titre: 'Médecins spécialistes / Biologistes',
    description:
      'Praticiens hospitaliers spécialistes, hématologues, pédiatres, pharmaciens biologistes et biologistes médicaux.',
    justificatifAttendu:
      'Carte de l’Ordre national, diplôme de spécialisation ou attestation d’exercice hospitalier.',
    montant: 30000,
    prixAffiche: '30 000',
    devise: 'FCFA',
    condition: null
  },
  {
    id: 'general-practitioners',
    code: 'Catégorie 03',
    badgeStyle: 'bg-emerald-50 text-[#00765a]',
    icon: Stethoscope,
    iconColor: 'text-[#00765a]',
    titre: 'Médecins généralistes / Résidents / Ingénieurs médico-sanitaires',
    description:
      'Médecins généralistes, médecins en cours de spécialisation (résidents) et ingénieurs médico-sanitaires.',
    justificatifAttendu:
      'Carte de l’Ordre, attestation de résidanat ou carte professionnelle médico-sanitaire.',
    montant: 25000,
    prixAffiche: '25 000',
    devise: 'FCFA',
    condition: null
  },
  {
    id: 'technical-nurses',
    code: 'Catégorie 04',
    badgeStyle: 'bg-sky-50 text-sky-800',
    icon: Wrench,
    iconColor: 'text-sky-700',
    titre: 'Ingénieurs techniques, Infirmiers, Techniciens médico-sanitaires',
    description:
      'Ingénieurs techniques, personnel infirmier, sages-femmes et techniciens médico-sanitaires de laboratoire ou de soins.',
    justificatifAttendu:
      'Carte professionnelle, badge d’établissement hospitalier ou attestation de service.',
    montant: 20000,
    prixAffiche: '20 000',
    devise: 'FCFA',
    condition: null
  },
  {
    id: 'students',
    code: 'Catégorie 05',
    badgeStyle: 'bg-emerald-50 text-[#00765a]',
    icon: School,
    iconColor: 'text-[#00765a]',
    titre: 'Étudiants',
    description:
      'Étudiants inscrits en facultés de médecine, pharmacie, sciences biomédicales et écoles de formation sanitaire.',
    justificatifAttendu:
      'Carte d’étudiant en cours de validité ou certificat de scolarité 2026-2027.',
    montant: 10000,
    prixAffiche: '10 000',
    devise: 'FCFA',
    condition: 'Carte d’étudiant ou certificat de scolarité requis'
  },
  {
    id: 'patients-association',
    code: 'Catégorie 06',
    badgeStyle: 'bg-amber-50 text-amber-900',
    icon: HeartHandshake,
    iconColor: 'text-amber-700',
    titre: 'Associations de patients',
    description:
      'Membres et représentants d’associations de lutte contre la drépanocytose et d’accompagnement des familles.',
    justificatifAttendu:
      'Carte de membre ou attestation signée par le président d’une association reconnue.',
    montant: 5000,
    prixAffiche: '5 000',
    devise: 'FCFA',
    condition: 'Justificatif d’appartenance associative'
  }
];

const TARIFS = Object.fromEntries(
  CATEGORIES_TARIFS.map((cat) => [cat.titre, cat.montant])
);

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 Mo
const ALLOWED_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

function Inscription() {
  const navigate = useNavigate();
  const [selectedProfession, setSelectedProfession] = useState('');
  const [justificatif, setJustificatif] = useState(null);
  const [fileError, setFileError] = useState('');

  const categorieActive = CATEGORIES_TARIFS.find(
    (c) => c.titre === selectedProfession
  );
  const montantActuel = categorieActive ? categorieActive.montant : null;

  const handleSelectTarif = (professionValue) => {
    if (!professionValue) return;
    setSelectedProfession(professionValue);
    const formSection = document.getElementById('formulaire-inscription');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFileChange = (e) => {
    setFileError('');
    const file = e.target.files?.[0];
    if (!file) {
      setJustificatif(null);
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError(
        'Format non autorisé. Veuillez joindre un fichier PDF, JPG ou PNG.'
      );
      e.target.value = '';
      setJustificatif(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError(
        'Fichier trop volumineux (maximum 4 Mo). Compressez votre image ou PDF.'
      );
      e.target.value = '';
      setJustificatif(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = String(reader.result || '').split(',')[1] || '';
      setJustificatif({
        fileName: file.name,
        mimeType: file.type,
        fileSize: file.size,
        fileBase64: base64Data
      });
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setJustificatif(null);
    setFileError('');
    const input = document.getElementById('reg-proof');
    if (input) input.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!justificatif) {
      setFileError(
        'Veuillez obligatoirement joindre votre justificatif professionnel (PDF ou image).'
      );
      return;
    }

    const form = e.currentTarget;
    const profession = form.elements['reg-profession'].value;
    const prixAPayer = TARIFS[profession] ?? 0;

    const formData = {
      noms: form.elements['reg-lastname'].value.trim(),
      prenoms: form.elements['reg-firstname'].value.trim(),
      email: form.elements['reg-email'].value.trim(),
      telephone: form.elements['reg-phone'].value.trim(),
      titre: form.elements['reg-title'].value,
      profession,
      statut: form.elements['reg-quality'].value,
      institution: form.elements['reg-institution'].value.trim()
    };

    navigate('/paiement', {
      state: {
        donneesInscription: formData,
        montant: prixAPayer,
        justificatif
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

      {/* 2. BARÈME TARIFAIRE OFFICIEL */}
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
                pré-remplir automatiquement le formulaire d'accréditation.
              </p>
            </div>

            <div className="text-xs font-mono uppercase tracking-wider text-[#555555] bg-white border border-[#dce0e8] px-4 py-2 rounded-full self-start md:self-auto">
              Montants exprimés en Francs CFA (XAF)
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#dce0e8] shadow-xs overflow-hidden">
            <div className="hidden md:grid md:grid-cols-12 gap-6 px-8 py-4 bg-[#f8f8fa] border-b border-[#dce0e8] text-[11px] font-mono uppercase tracking-wider text-[#555555] font-semibold">
              <div className="col-span-7">Catégorie &amp; Profil concerné</div>
              <div className="col-span-3 text-right">Droits d'inscription</div>
              <div className="col-span-2 text-right">Sélection</div>
            </div>

            <div className="divide-y divide-[#dce0e8]/80">
              {CATEGORIES_TARIFS.map((cat) => {
                const IconComponent = cat.icon;
                const isSelected = selectedProfession === cat.titre;

                return (
                  <div
                    key={cat.id}
                    onClick={() => handleSelectTarif(cat.titre)}
                    className={`px-6 sm:px-8 py-6 transition-colors relative cursor-pointer ${
                      isSelected ? 'bg-red-50/40' : 'hover:bg-[#f8f8fa]/80'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#c11236]" />
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center">
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

                      <div className="md:col-span-5 flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-[#dce0e8]/60">
                        <div className="md:text-right">
                          <div className="flex items-baseline md:justify-end gap-1.5">
                            <span className="font-mono text-2xl sm:text-[1.65rem] font-bold tabular-nums text-[#1a1a1a]">
                              {cat.prixAffiche}
                            </span>
                            <span className="text-xs font-mono font-bold text-[#c11236]">
                              {cat.devise}
                            </span>
                          </div>
                        </div>

                        <div className="w-32 flex justify-end shrink-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectTarif(cat.titre);
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
                Renseignez vos coordonnées et joignez votre justificatif
                professionnel pour enregistrer votre badge officiel.
              </p>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {/* 1. Noms */}
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

                {/* 2. Prénoms */}
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

                {/* 3. Adresse e-mail */}
                <div className="space-y-1.5">
                  <label
                    className="block text-sm text-[#1a1a1a] font-semibold"
                    htmlFor="reg-email"
                  >
                    Adresse e-mail <span className="text-[#c11236]">*</span>
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    required
                    placeholder="dr.nom@hopital.cm"
                    className="w-full px-4 py-3 rounded-xl bg-[#f8f8fa] border border-[#dce0e8] text-[#1a1a1a] placeholder:text-[#555555]/50 text-sm focus:bg-white focus:outline-none focus:border-[#c11236] focus:ring-1 focus:ring-[#c11236] transition-colors"
                  />
                </div>

                {/* 4. Numéro de téléphone */}
                <div className="space-y-1.5">
                  <label
                    className="block text-sm text-[#1a1a1a] font-semibold"
                    htmlFor="reg-phone"
                  >
                    Numéro de téléphone <span className="text-[#c11236]">*</span>
                  </label>
                  <input
                    id="reg-phone"
                    type="tel"
                    required
                    placeholder="ex. 694 12 64 61"
                    className="w-full px-4 py-3 rounded-xl bg-[#f8f8fa] border border-[#dce0e8] text-[#1a1a1a] placeholder:text-[#555555]/50 text-sm focus:bg-white focus:outline-none focus:border-[#c11236] focus:ring-1 focus:ring-[#c11236] transition-colors"
                  />
                </div>

                {/* 5. Titre honorifique */}
                <div className="space-y-1.5">
                  <label
                    className="block text-sm text-[#1a1a1a] font-semibold"
                    htmlFor="reg-title"
                  >
                    Titre honorifique <span className="text-[#c11236]">*</span>
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

                {/* 6. Catégorie professionnelle */}
                <div className="space-y-1.5">
                  <label
                    className="block text-sm text-[#1a1a1a] font-semibold"
                    htmlFor="reg-profession"
                  >
                    Catégorie professionnelle{' '}
                    <span className="text-[#c11236]">*</span>
                  </label>
                  <select
                    id="reg-profession"
                    required
                    value={selectedProfession}
                    onChange={(e) => setSelectedProfession(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#f8f8fa] border border-[#dce0e8] text-[#1a1a1a] text-sm focus:bg-white focus:outline-none focus:border-[#c11236] focus:ring-1 focus:ring-[#c11236] transition-colors"
                  >
                    <option disabled value="">
                      Sélectionnez votre catégorie
                    </option>
                    {CATEGORIES_TARIFS.map((cat) => (
                      <option key={cat.id} value={cat.titre}>
                        {cat.titre} — {cat.prixAffiche} {cat.devise}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 7. Qualité de participation */}
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

                {/* 8. Organisation / Institution */}
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
              </div>

              {/* 9. Justificatif professionnel obligatoire (Image ou PDF) */}
              <div className="space-y-2.5 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <label
                    className="block text-sm text-[#1a1a1a] font-semibold"
                    htmlFor="reg-proof"
                  >
                    Justificatif de statut / profession (PDF ou Image){' '}
                    <span className="text-[#c11236]">*</span>
                  </label>
                  <span className="text-[11px] font-mono text-[#555555]">
                    PDF, JPG, PNG · Max 4 Mo
                  </span>
                </div>

                {categorieActive && (
                  <p className="text-xs text-[#00765a] bg-emerald-50/70 border border-emerald-200/80 rounded-xl px-3.5 py-2">
                    <strong>Document attendu :</strong>{' '}
                    {categorieActive.justificatifAttendu}
                  </p>
                )}

                {!justificatif ? (
                  <label
                    htmlFor="reg-proof"
                    className="flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border-2 border-dashed border-[#dce0e8] hover:border-[#c11236] bg-[#f8f8fa] hover:bg-red-50/20 cursor-pointer transition-colors text-center"
                  >
                    <div className="w-10 h-10 rounded-full bg-white border border-[#dce0e8] flex items-center justify-center text-[#8b0a1d]">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-semibold text-[#1a1a1a]">
                      Cliquez pour téléverser votre pièce justificative
                    </div>
                    <p className="text-xs text-[#555555] max-w-md">
                      Carte professionnelle, carte d’étudiant, attestation de
                      service ou d’association de patients (format PDF ou photo
                      lisible).
                    </p>
                    <input
                      id="reg-proof"
                      type="file"
                      accept=".pdf,image/jpeg,image/png,image/webp"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                ) : (
                  <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-[#00765a] shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[#1a1a1a] truncate">
                          {justificatif.fileName}
                        </p>
                        <p className="text-xs text-[#00765a]">
                          {(justificatif.fileSize / 1024).toFixed(0)} Ko · Prêt
                          pour archivage
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-2 rounded-lg text-[#555555] hover:text-[#c11236] hover:bg-white transition-colors cursor-pointer"
                      title="Retirer le fichier"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {fileError && (
                  <p className="text-xs font-semibold text-[#c11236]">
                    {fileError}
                  </p>
                )}
              </div>

              {/* Avertissement dissuasif officiel & déclaration sur l'honneur */}
              <div className="rounded-2xl bg-[#8b0a1d]/[0.04] border border-[#8b0a1d]/25 p-4 sm:p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#c11236] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-[#1a1a1a] leading-relaxed">
                    <strong className="text-[#8b0a1d] block mb-1">
                      Clause de contrôle des justificatifs et de
                      non-remboursement :
                    </strong>
                    Le tarif appliqué dépend strictement de votre catégorie
                    professionnelle réelle. Tout dossier comportant une{' '}
                    <strong>fausse déclaration de statut</strong> ou un{' '}
                    <strong>justificatif non conforme</strong> entraînera{' '}
                    <strong>
                      l’annulation immédiate de votre accréditation
                    </strong>{' '}
                    lors du contrôle à l’entrée du Palais des Congrès.{' '}
                    <strong>
                      Aucun remboursement des sommes déjà versées ne sera
                      effectué
                    </strong>
                    , et l’accès aux salles sera subordonné au paiement intégral
                    de la différence au tarif plein.
                  </div>
                </div>

                <label className="flex items-start gap-3 pt-2 border-t border-[#8b0a1d]/15 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 h-4 w-4 rounded border-[#dce0e8] accent-[#8b0a1d] cursor-pointer"
                  />
                  <span className="text-xs font-medium text-[#1a1a1a] leading-relaxed">
                    Je certifie sur l’honneur l’exactitude de ma catégorie
                    professionnelle ainsi que l’authenticité du justificatif
                    joint, et j’accepte la clause de non-remboursement en cas de
                    fausse déclaration. <span className="text-[#c11236]">*</span>
                  </span>
                </label>
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