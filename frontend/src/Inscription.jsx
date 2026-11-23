import React, { useEffect, useState } from 'react';
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
import { useLang } from './context/LanguageContext';
import { compresserImage } from './utils/compressImage';
import { reveillerServeur } from './lib/api';

// Grille tarifaire officielle finale en FCFA
const CATEGORIES_TARIFS = [
  {
    id: 'academics',
    code: 'Catégorie 01',
    en: { code: 'Category 01', titre: 'Academics (Lecturers / Researchers)', description: 'Teacher-researchers, university professors, senior lecturers and biomedical researchers.', justificatifAttendu: 'Proof of university position, appointment order or teacher-researcher professional card.' },
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
    en: { code: 'Category 02', titre: 'Medical specialists / Biologists', description: 'Hospital specialists, haematologists, paediatricians, clinical pharmacists and medical biologists.', justificatifAttendu: 'National Medical Council card, specialist diploma or proof of hospital practice.' },
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
    en: { code: 'Category 03', titre: 'General practitioners / Residents / Health engineers', description: 'General practitioners, doctors in specialist training (residents) and health engineers.', justificatifAttendu: 'Medical Council card, residency certificate or health professional card.' },
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
    en: { code: 'Category 04', titre: 'Technical engineers, Nurses, Health technicians', description: 'Technical engineers, nursing staff, midwives and laboratory or care health technicians.', justificatifAttendu: 'Professional card, hospital staff badge or proof of employment.' },
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
    en: { code: 'Category 05', titre: 'Students', description: 'Students enrolled in medicine, pharmacy, biomedical science faculties and health training schools.', justificatifAttendu: 'Valid student card or 2026-2027 enrolment certificate.', condition: 'Student card or enrolment certificate required' },
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
    en: { code: 'Category 06', titre: 'Patient associations', description: 'Members and representatives of associations fighting sickle cell disease and supporting families.', justificatifAttendu: 'Membership card or certificate signed by the president of a recognised association.', condition: 'Proof of association membership' },
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

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 Mo (taille finale envoyée)
// Une photo plus lourde est acceptée au départ, car elle est compressée avant l'envoi
const MAX_PHOTO_AVANT_COMPRESSION = 50 * 1024 * 1024; // 50 Mo
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
  const [compressionEnCours, setCompressionEnCours] = useState(false);
  const { t, pick, lang } = useLang();

  // Réveille le serveur de paiement pendant que le visiteur remplit le formulaire
  useEffect(() => {
    reveillerServeur();
  }, []);

  const formaterTaille = (octets) =>
    octets >= 1024 * 1024
      ? `${(octets / (1024 * 1024)).toFixed(1)} ${t('Mo', 'MB')}`
      : `${Math.max(1, Math.round(octets / 1024))} ${t('Ko', 'KB')}`;

  // Les valeurs envoyées (catégorie, titre, statut) restent en français ;
  // seul l'affichage est traduit.
  const categorieActive = CATEGORIES_TARIFS.find(
    (c) => c.titre === selectedProfession
  );
  const categorieActiveAffichee = categorieActive ? pick(categorieActive) : null;
  const montantActuel = categorieActive ? categorieActive.montant : null;

  const handleSelectTarif = (professionValue) => {
    if (!professionValue) return;
    setSelectedProfession(professionValue);
    const formSection = document.getElementById('formulaire-inscription');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFileChange = async (e) => {
    setFileError('');
    const input = e.target;
    const fichierChoisi = input.files?.[0];
    if (!fichierChoisi) {
      setJustificatif(null);
      return;
    }

    const refuser = (message) => {
      setFileError(message);
      input.value = '';
      setJustificatif(null);
    };

    if (!ALLOWED_TYPES.includes(fichierChoisi.type)) {
      refuser(
        t('Format non autorisé. Veuillez joindre un fichier PDF, JPG ou PNG.', 'File type not allowed. Please attach a PDF, JPG or PNG file.')
      );
      return;
    }

    const estPhoto = fichierChoisi.type.startsWith('image/');
    if (estPhoto && fichierChoisi.size > MAX_PHOTO_AVANT_COMPRESSION) {
      refuser(t('Photo trop volumineuse (maximum 50 Mo).', 'Photo too large (maximum 50 MB).'));
      return;
    }

    // Les photos sont allégées automatiquement ; les PDF sont envoyés tels quels
    let file = fichierChoisi;
    let compressed = false;
    if (estPhoto) {
      setCompressionEnCours(true);
      const resultat = await compresserImage(fichierChoisi);
      setCompressionEnCours(false);
      file = resultat.file;
      compressed = resultat.compressed;
    }

    if (file.size > MAX_FILE_SIZE) {
      refuser(
        t('Fichier trop volumineux (maximum 15 Mo). Compressez votre image ou PDF.', 'File too large (maximum 15 MB). Please compress your image or PDF.')
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = String(reader.result || '').split(',')[1] || '';
      setJustificatif({
        fileName: file.name,
        mimeType: file.type,
        fileSize: file.size,
        originalSize: compressed ? fichierChoisi.size : null,
        fileBase64: base64Data
      });
    };
    reader.onerror = () =>
      refuser(t('Impossible de lire ce fichier. Essayez-en un autre.', 'Unable to read this file. Please try another one.'));
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
        t('Veuillez obligatoirement joindre votre justificatif professionnel (PDF ou image).', 'You must attach your professional supporting document (PDF or image).')
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
              <span>{t('Attestation CME', 'CME Certificate')}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs font-medium text-white/90">
              <Microscope className="w-3.5 h-3.5 text-white/80" />
              <span>{t('Sessions Plénières & Ateliers', 'Plenary Sessions & Workshops')}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-white/75 font-semibold block mb-2">
                {t(
                  <>GEDREPACAM · 5<sup>e</sup> Édition Internationale</>,
                  <>GEDREPACAM · 5<sup>th</sup> International Edition</>
                )}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-serif-title font-bold tracking-tight text-white leading-[1.15] mb-4">
                {t('Inscription au Congrès', 'Congress Registration')}
              </h1>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-3xl">
                {t(
                  <>
                    Ouverture des inscriptions : <strong className="font-semibold text-white">20 octobre 2026</strong>{' '}
                    — Clôture : <strong className="font-semibold text-white">Avril 2027</strong>. Rejoignez les
                    experts internationaux, praticiens et chercheurs au Palais des Congrès de Yaoundé.
                  </>,
                  <>
                    Registration opens: <strong className="font-semibold text-white">20 October 2026</strong>{' '}
                    — Closes: <strong className="font-semibold text-white">April 2027</strong>. Join international
                    experts, practitioners and researchers at the Yaoundé Conference Centre.
                  </>
                )}
              </p>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-white/80">
                <span className="flex items-center gap-1.5 font-semibold text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {t('Portail Actif', 'Portal Open')}
                </span>
                <span>{t('25 – 27 Mai 2027', '25 – 27 May 2027')}</span>
              </div>
              <div className="pt-3 border-t border-white/15 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10 text-emerald-300 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/70 block">
                    {t('Lieu du congrès', 'Congress venue')}
                  </span>
                  <div className="font-editorial-serif text-lg sm:text-xl font-bold text-white leading-snug mt-0.5">
                    {t('Palais des Congrès de Yaoundé', 'Yaoundé Conference Centre')}
                  </div>
                  <div className="text-xs text-white/75 mt-0.5">
                    {t('Yaoundé · Cameroun', 'Yaoundé · Cameroon')}
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
                <span>{t('Barème Officiel', 'Official Fees')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1a1a1a]">
                {t("Grille Tarifaire d'Inscription", 'Registration Fees')}
              </h2>
              <p className="text-sm sm:text-base text-[#555555] mt-2 max-w-2xl">
                {t(
                  "Sélectionnez votre catégorie professionnelle ci-dessous pour pré-remplir automatiquement le formulaire d'accréditation.",
                  'Select your professional category below to pre-fill the accreditation form automatically.'
                )}
              </p>
            </div>

            <div className="text-xs font-mono uppercase tracking-wider text-[#555555] bg-white border border-[#dce0e8] px-4 py-2 rounded-full self-start md:self-auto">
              {t('Montants exprimés en Francs CFA (XAF)', 'Amounts in CFA Francs (XAF)')}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#dce0e8] shadow-xs overflow-hidden">
            <div className="hidden md:grid md:grid-cols-12 gap-6 px-8 py-4 bg-[#f8f8fa] border-b border-[#dce0e8] text-[11px] font-mono uppercase tracking-wider text-[#555555] font-semibold">
              <div className="col-span-7">{t('Catégorie & Profil concerné', 'Category & Profile')}</div>
              <div className="col-span-3 text-right">{t("Droits d'inscription", 'Registration fee')}</div>
              <div className="col-span-2 text-right">{t('Sélection', 'Select')}</div>
            </div>

            <div className="divide-y divide-[#dce0e8]/80">
              {CATEGORIES_TARIFS.map((rawCat) => {
                const cat = pick(rawCat);
                const IconComponent = cat.icon;
                const isSelected = selectedProfession === rawCat.titre;

                return (
                  <div
                    key={cat.id}
                    onClick={() => handleSelectTarif(rawCat.titre)}
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
                              handleSelectTarif(rawCat.titre);
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
                                <span>{t('Sélectionné', 'Selected')}</span>
                              </>
                            ) : (
                              <>
                                <span>{t('Choisir', 'Choose')}</span>
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
                {t('Accréditation Nominative', 'Personal Accreditation')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1a1a1a] mt-1">
                {t("Formulaire d'inscription individuelle", 'Individual registration form')}
              </h2>
              <p className="text-sm sm:text-base text-[#555555] mt-2">
                {t(
                  'Renseignez vos coordonnées et joignez votre justificatif professionnel pour enregistrer votre badge officiel.',
                  'Enter your details and attach your professional supporting document to register your official badge.'
                )}
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
                    {t('Noms', 'Last name(s)')} <span className="text-[#c11236]">*</span>
                  </label>
                  <input
                    id="reg-lastname"
                    type="text"
                    required
                    placeholder={t('ex. Tchamba', 'e.g. Tchamba')}
                    className="w-full px-4 py-3 rounded-xl bg-[#f8f8fa] border border-[#dce0e8] text-[#1a1a1a] placeholder:text-[#555555]/50 text-sm focus:bg-white focus:outline-none focus:border-[#c11236] focus:ring-1 focus:ring-[#c11236] transition-colors"
                  />
                </div>

                {/* 2. Prénoms */}
                <div className="space-y-1.5">
                  <label
                    className="block text-sm text-[#1a1a1a] font-semibold"
                    htmlFor="reg-firstname"
                  >
                    {t('Prénoms', 'First name(s)')} <span className="text-[#c11236]">*</span>
                  </label>
                  <input
                    id="reg-firstname"
                    type="text"
                    required
                    placeholder={t('ex. Emilienne', 'e.g. Emilienne')}
                    className="w-full px-4 py-3 rounded-xl bg-[#f8f8fa] border border-[#dce0e8] text-[#1a1a1a] placeholder:text-[#555555]/50 text-sm focus:bg-white focus:outline-none focus:border-[#c11236] focus:ring-1 focus:ring-[#c11236] transition-colors"
                  />
                </div>

                {/* 3. Adresse e-mail */}
                <div className="space-y-1.5">
                  <label
                    className="block text-sm text-[#1a1a1a] font-semibold"
                    htmlFor="reg-email"
                  >
                    {t('Adresse e-mail', 'Email address')} <span className="text-[#c11236]">*</span>
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    required
                    placeholder={t('dr.nom@hopital.cm', 'dr.name@hospital.org')}
                    className="w-full px-4 py-3 rounded-xl bg-[#f8f8fa] border border-[#dce0e8] text-[#1a1a1a] placeholder:text-[#555555]/50 text-sm focus:bg-white focus:outline-none focus:border-[#c11236] focus:ring-1 focus:ring-[#c11236] transition-colors"
                  />
                </div>

                {/* 4. Numéro de téléphone */}
                <div className="space-y-1.5">
                  <label
                    className="block text-sm text-[#1a1a1a] font-semibold"
                    htmlFor="reg-phone"
                  >
                    {t('Numéro de téléphone', 'Phone number')} <span className="text-[#c11236]">*</span>
                  </label>
                  <input
                    id="reg-phone"
                    type="tel"
                    required
                    placeholder={t('ex. 694 12 64 61', 'e.g. 694 12 64 61')}
                    className="w-full px-4 py-3 rounded-xl bg-[#f8f8fa] border border-[#dce0e8] text-[#1a1a1a] placeholder:text-[#555555]/50 text-sm focus:bg-white focus:outline-none focus:border-[#c11236] focus:ring-1 focus:ring-[#c11236] transition-colors"
                  />
                </div>

                {/* 5. Titre honorifique */}
                <div className="space-y-1.5">
                  <label
                    className="block text-sm text-[#1a1a1a] font-semibold"
                    htmlFor="reg-title"
                  >
                    {t('Titre honorifique', 'Title')} <span className="text-[#c11236]">*</span>
                  </label>
                  <select
                    id="reg-title"
                    required
                    defaultValue=""
                    className="w-full px-4 py-3 rounded-xl bg-[#f8f8fa] border border-[#dce0e8] text-[#1a1a1a] text-sm focus:bg-white focus:outline-none focus:border-[#c11236] focus:ring-1 focus:ring-[#c11236] transition-colors"
                  >
                    <option disabled value="">
                      {t('Sélectionnez un titre', 'Select a title')}
                    </option>
                    <option value="Pr. (Professeur)">{t('Pr. (Professeur)', 'Prof. (Professor)')}</option>
                    <option value="Dr. (Docteur)">{t('Dr. (Docteur)', 'Dr. (Doctor)')}</option>
                    <option value="M. (Monsieur)">{t('M. (Monsieur)', 'Mr')}</option>
                    <option value="Mme (Madame)">{t('Mme (Madame)', 'Mrs / Ms')}</option>
                  </select>
                </div>

                {/* 6. Catégorie professionnelle */}
                <div className="space-y-1.5">
                  <label
                    className="block text-sm text-[#1a1a1a] font-semibold"
                    htmlFor="reg-profession"
                  >
                    {t('Catégorie professionnelle', 'Professional category')}{' '}
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
                      {t('Sélectionnez votre catégorie', 'Select your category')}
                    </option>
                    {CATEGORIES_TARIFS.map((cat) => (
                      <option key={cat.id} value={cat.titre}>
                        {pick(cat).titre} — {cat.prixAffiche} {cat.devise}
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
                    {t('Vous participez en qualité de', 'You are attending as')}{' '}
                    <span className="text-[#c11236]">*</span>
                  </label>
                  <select
                    id="reg-quality"
                    required
                    defaultValue=""
                    className="w-full px-4 py-3 rounded-xl bg-[#f8f8fa] border border-[#dce0e8] text-[#1a1a1a] text-sm focus:bg-white focus:outline-none focus:border-[#c11236] focus:ring-1 focus:ring-[#c11236] transition-colors"
                  >
                    <option disabled value="">
                      {t('Choisir un statut', 'Choose a status')}
                    </option>
                    <option value="Participant">{t('Participant', 'Participant')}</option>
                    <option value="Exposant médical">{t('Exposant médical', 'Medical exhibitor')}</option>
                    <option value="Sponsor & Partenaire">
                      {t('Sponsor & Partenaire', 'Sponsor & Partner')}
                    </option>
                    <option value="Intervenant">{t('Intervenant', 'Speaker')}</option>
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
                    placeholder={t('ex. CHUY, FMSB Yaoundé, Hôpital Laquintinie...', 'e.g. CHUY, FMSB Yaoundé, Laquintinie Hospital...')}
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
                    {t('Justificatif de statut / profession (PDF ou Image)', 'Proof of status / profession (PDF or image)')}{' '}
                    <span className="text-[#c11236]">*</span>
                  </label>
                  <span className="text-[11px] font-mono text-[#555555]">
                    {t('PDF, JPG, PNG · Max 15 Mo', 'PDF, JPG, PNG · Max 15 MB')}
                  </span>
                </div>

                {categorieActiveAffichee && (
                  <p className="text-xs text-[#00765a] bg-emerald-50/70 border border-emerald-200/80 rounded-xl px-3.5 py-2">
                    <strong>{t('Document attendu :', 'Expected document:')}</strong>{' '}
                    {categorieActiveAffichee.justificatifAttendu}
                  </p>
                )}

                {compressionEnCours ? (
                  <div className="flex items-center justify-center gap-2 p-6 rounded-2xl border-2 border-dashed border-[#00765a]/40 bg-emerald-50/40 text-sm font-semibold text-[#00765a]">
                    <span className="w-4 h-4 rounded-full border-2 border-[#00765a] border-t-transparent animate-spin" />
                    <span>{t('Optimisation de la photo en cours...', 'Optimising your photo...')}</span>
                  </div>
                ) : !justificatif ? (
                  <label
                    htmlFor="reg-proof"
                    className="flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border-2 border-dashed border-[#dce0e8] hover:border-[#c11236] bg-[#f8f8fa] hover:bg-red-50/20 cursor-pointer transition-colors text-center"
                  >
                    <div className="w-10 h-10 rounded-full bg-white border border-[#dce0e8] flex items-center justify-center text-[#8b0a1d]">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-semibold text-[#1a1a1a]">
                      {t('Cliquez pour téléverser votre pièce justificative', 'Click to upload your supporting document')}
                    </div>
                    <p className="text-xs text-[#555555] max-w-md">
                      {t(
                        'Carte professionnelle, carte d’étudiant, attestation de service ou d’association de patients (format PDF ou photo lisible).',
                        'Professional card, student card, proof of employment or patient association certificate (PDF or legible photo).'
                      )}
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
                          {justificatif.originalSize
                            ? `${formaterTaille(justificatif.originalSize)} → ${formaterTaille(justificatif.fileSize)} · ${t('Photo optimisée', 'Photo optimised')}`
                            : `${formaterTaille(justificatif.fileSize)} · ${t('Prêt pour archivage', 'Ready to upload')}`}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-2 rounded-lg text-[#555555] hover:text-[#c11236] hover:bg-white transition-colors cursor-pointer"
                      title={t('Retirer le fichier', 'Remove file')}
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
                    {t(
                      <>
                        <strong className="text-[#8b0a1d] block mb-1">
                          Clause de contrôle des justificatifs et de non-remboursement :
                        </strong>
                        Le tarif appliqué dépend strictement de votre catégorie professionnelle réelle. Tout
                        dossier comportant une <strong>fausse déclaration de statut</strong> ou un{' '}
                        <strong>justificatif non conforme</strong> entraînera{' '}
                        <strong>l’annulation immédiate de votre accréditation</strong> lors du contrôle à
                        l’entrée du Palais des Congrès.{' '}
                        <strong>Aucun remboursement des sommes déjà versées ne sera effectué</strong>, et
                        l’accès aux salles sera subordonné au paiement intégral de la différence au tarif plein.
                      </>,
                      <>
                        <strong className="text-[#8b0a1d] block mb-1">
                          Document verification and no-refund clause:
                        </strong>
                        The fee charged depends strictly on your actual professional category. Any application
                        containing a <strong>false declaration of status</strong> or a{' '}
                        <strong>non-compliant supporting document</strong> will result in the{' '}
                        <strong>immediate cancellation of your accreditation</strong> at the Conference Centre
                        entrance check.{' '}
                        <strong>No refund will be made of any amounts already paid</strong>, and access to the
                        session rooms will be subject to payment in full of the difference at the full rate.
                      </>
                    )}
                  </div>
                </div>

                <label className="flex items-start gap-3 pt-2 border-t border-[#8b0a1d]/15 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 h-4 w-4 rounded border-[#dce0e8] accent-[#8b0a1d] cursor-pointer"
                  />
                  <span className="text-xs font-medium text-[#1a1a1a] leading-relaxed">
                    {t(
                      'Je certifie sur l’honneur l’exactitude de ma catégorie professionnelle ainsi que l’authenticité du justificatif joint, et j’accepte la clause de non-remboursement en cas de fausse déclaration.',
                      'I solemnly certify that my professional category is accurate and that the attached document is authentic, and I accept the no-refund clause in the event of a false declaration.'
                    )}{' '}
                    <span className="text-[#c11236]">*</span>
                  </span>
                </label>
              </div>

              {/* Récapitulatif dynamique du tarif sélectionné */}
              {montantActuel !== null && (
                <div className="rounded-2xl bg-[#f8f8fa] border border-[#dce0e8] px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#555555] font-semibold block">
                      {t('Tarif applicable à votre catégorie', 'Fee for your category')}
                    </span>
                    <span className="text-sm font-semibold text-[#1a1a1a]">
                      {categorieActiveAffichee?.titre}
                    </span>
                  </div>
                  <div className="font-mono text-2xl font-bold text-[#c11236] tabular-nums">
                    {montantActuel.toLocaleString(lang === 'en' ? 'en-GB' : 'fr-FR')} FCFA
                  </div>
                </div>
              )}

              {/* Bouton de validation */}
              <div className="pt-2 flex flex-col items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto sm:min-w-[360px] px-8 py-4 rounded-full bg-[#c11236] hover:bg-[#8b0a1d] text-white text-base font-semibold flex items-center justify-center gap-2.5 transition-colors shadow-sm group cursor-pointer"
                >
                  <span>{t("S'inscrire et procéder au paiement", 'Register and proceed to payment')}</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="flex items-center gap-1.5 text-[#00765a] text-xs font-medium">
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {t(
                      "Paiement 100 % sécurisé. Aucune donnée bancaire n'est stockée sur ce site.",
                      '100% secure payment. No banking data is stored on this site.'
                    )}
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