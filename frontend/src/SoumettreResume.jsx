import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import {
  FileText,
  BookOpen,
  Award,
  MapPin,
  Users,
  Plus,
  Trash2,
  Tag,
  X,
  Upload,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useLang } from './context/LanguageContext';

const MAX_ABSTRACT_SIZE = 300 * 1024 * 1024; // 300 Mo

function SoumettreResume() {
  const navigate = useNavigate();
  const { t, lang } = useLang();

  // Informations de l'auteur correspondant (principal)
  const [auteurPrincipal, setAuteurPrincipal] = useState({
    nomComplet: '',
    institution: '',
    email: '',
    telephone: ''
  });

  // Liste dynamique des co-auteurs
  const [coAuteurs, setCoAuteurs] = useState([]);

  // Titre de l'abstract
  const [titreAbstract, setTitreAbstract] = useState('');

  // Gestion dynamique des mots-clés (Tags)
  const [motsCles, setMotsCles] = useState([]);
  const [motCleSaisi, setMotCleSaisi] = useState('');

  // Fichier abstract (tout format, jusqu'à 300 Mo)
  const [fichier, setFichier] = useState(null);
  const [fileError, setFileError] = useState('');

  // États de soumission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [soumissionConfirmee, setSoumissionConfirmee] = useState(null);

  // --- GESTION DES CO-AUTEURS ---
  const ajouterCoAuteur = () => {
    setCoAuteurs((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), nomComplet: '', institution: '' }
    ]);
  };

  const modifierCoAuteur = (id, champ, valeur) => {
    setCoAuteurs((prev) =>
      prev.map((auteur) =>
        auteur.id === id ? { ...auteur, [champ]: valeur } : auteur
      )
    );
  };

  const supprimerCoAuteur = (id) => {
    setCoAuteurs((prev) => prev.filter((auteur) => auteur.id !== id));
  };

  // --- GESTION DES MOTS-CLÉS ---
  const ajouterMotsClesDepuisTexte = (texteBrut) => {
    const candidats = texteBrut
      .split(',')
      .map((m) => m.trim())
      .filter((m) => m.length > 0);

    if (candidats.length === 0) return;

    setMotsCles((prev) => {
      const existantsLower = new Set(prev.map((k) => k.toLowerCase()));
      const nouveaux = [];
      for (const mot of candidats) {
        if (!existantsLower.has(mot.toLowerCase())) {
          existantsLower.add(mot.toLowerCase());
          nouveaux.push(mot);
        }
      }
      return [...prev, ...nouveaux];
    });
    setMotCleSaisi('');
  };

  const handleMotCleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      ajouterMotsClesDepuisTexte(motCleSaisi);
    }
  };

  const supprimerMotCle = (indexASupprimer) => {
    setMotsCles((prev) => prev.filter((_, idx) => idx !== indexASupprimer));
  };

  // --- GESTION DU FICHIER (TOUT FORMAT, MAX 300 MO) ---
  const handleFileChange = (e) => {
    setFileError('');
    const selected = e.target.files?.[0];
    if (!selected) {
      setFichier(null);
      return;
    }

    if (selected.size > MAX_ABSTRACT_SIZE) {
      setFileError(
        t('Le fichier dépasse la taille maximale autorisée de 300 Mo.', 'The file exceeds the maximum allowed size of 300 MB.')
      );
      e.target.value = '';
      setFichier(null);
      return;
    }

    setFichier(selected);
  };

  const retirerFichier = () => {
    setFichier(null);
    setFileError('');
    const input = document.getElementById('abstract-file');
    if (input) input.value = '';
  };

  const formaterTaille = (octets) => {
    if (octets >= 1024 * 1024) {
      return `${(octets / (1024 * 1024)).toFixed(2)} Mo`;
    }
    return `${Math.max(1, Math.round(octets / 1024))} Ko`;
  };

  // Taille affichée à l'écran (Mo/Ko en français, MB/KB en anglais).
  // formaterTaille reste en français pour le registre du comité.
  const afficherTaille = (octets) =>
    lang === 'en'
      ? formaterTaille(octets).replace(' Mo', ' MB').replace(' Ko', ' KB')
      : formaterTaille(octets);

  // --- ENVOI DIRECT VERS GOOGLE DRIVE (JUSQU'À 300 MO) ---
  const uploadDirectVersDrive = (uploadUrl, file) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', uploadUrl, true);
      xhr.setRequestHeader(
        'Content-Type',
        file.type || 'application/octet-stream'
      );

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const pct = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(pct);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const responseJson = JSON.parse(xhr.responseText);
            resolve(responseJson);
          } catch {
            reject(new Error(t('Réponse invalide de Google Drive après envoi.', 'Invalid response from Google Drive after upload.')));
          }
        } else {
          reject(
            new Error(
              t(
                `Échec du téléversement vers Google Drive (code ${xhr.status}).`,
                `Upload to Google Drive failed (code ${xhr.status}).`
              )
            )
          );
        }
      };

      xhr.onerror = () => {
        reject(
          new Error(
            t('Erreur réseau pendant le téléversement du fichier vers Drive.', 'Network error while uploading the file to Drive.')
          )
        );
      };

      xhr.send(file);
    });
  };

  // --- SOUMISSION DU FORMULAIRE ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    let listeMotsClesFinale = [...motsCles];
    if (motCleSaisi.trim()) {
      const candidats = motCleSaisi
        .split(',')
        .map((m) => m.trim())
        .filter(Boolean);
      for (const c of candidats) {
        if (
          !listeMotsClesFinale.some((k) => k.toLowerCase() === c.toLowerCase())
        ) {
          listeMotsClesFinale.push(c);
        }
      }
      setMotsCles(listeMotsClesFinale);
      setMotCleSaisi('');
    }

    if (listeMotsClesFinale.length === 0) {
      alert(t('Veuillez ajouter au moins un mot-clé pour votre résumé.', 'Please add at least one keyword for your abstract.'));
      return;
    }

    if (!fichier) {
      setFileError(t('Veuillez joindre le fichier de votre résumé (max 300 Mo).', 'Please attach your abstract file (max 300 MB).'));
      return;
    }

    const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;
    if (!APPS_SCRIPT_URL) {
      alert(
        t("Configuration manquante : l'URL Google Apps Script n'est pas définie.", 'Missing configuration: the Google Apps Script URL is not set.')
      );
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);
    setStatusMessage(t('Initialisation du dépôt sur Google Drive...', 'Preparing upload to Google Drive...'));

    try {
      const refAbstract = `ABS-GED27-${Date.now().toString().slice(-6)}`;

      const tousLesAuteurs = [
        `${auteurPrincipal.nomComplet.trim()} (${auteurPrincipal.institution.trim()}) [Correspondant]`,
        ...coAuteurs
          .filter((a) => a.nomComplet.trim())
          .map((a) =>
            a.institution.trim()
              ? `${a.nomComplet.trim()} (${a.institution.trim()})`
              : a.nomComplet.trim()
          )
      ];

      // 1. Demander une session Resumable Upload à Apps Script
      const initRes = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          action: 'initAbstractUpload',
          refAbstract,
          auteurPrincipal: auteurPrincipal.nomComplet.trim(),
          fileName: fichier.name,
          mimeType: fichier.type || 'application/octet-stream',
          origin: window.location.origin
        })
      });

      const initData = await initRes.json();
      if (initData.status !== 'ok' || !initData.uploadUrl) {
        throw new Error(
          initData.message ||
            t("Impossible d'initialiser l'espace de dépôt sur Google Drive.", 'Unable to initialise the upload space on Google Drive.')
        );
      }

      // 2. Téléverser le fichier (jusqu'à 300 Mo) directement sur Google Drive
      setStatusMessage(t('Téléversement du résumé en cours...', 'Uploading your abstract...'));
      const driveFile = await uploadDirectVersDrive(initData.uploadUrl, fichier);

      // 3. Enregistrer les métadonnées dans l'onglet "Soumissions_Abstracts" du Google Sheet
      setStatusMessage(t('Enregistrement du dossier auprès du comité scientifique...', 'Registering your submission with the scientific committee...'));
      const saveRes = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          action: 'saveAbstractRecord',
          refAbstract,
          fileId: driveFile.id,
          titreAbstract: titreAbstract.trim(),
          auteurPrincipal: auteurPrincipal.nomComplet.trim(),
          institutionPrincipale: auteurPrincipal.institution.trim(),
          email: auteurPrincipal.email.trim(),
          telephone: auteurPrincipal.telephone.trim(),
          listeAuteurs: tousLesAuteurs.join(' ; '),
          motsCles: listeMotsClesFinale.join(', '),
          nomFichier: fichier.name,
          tailleFichier: formaterTaille(fichier.size)
        })
      });

      const saveData = await saveRes.json();
      if (saveData.status !== 'ok') {
        throw new Error(
          saveData.message ||
            t("Erreur lors de l'enregistrement des données dans le registre.", 'Error while saving the data to the register.')
        );
      }

      // 4. Accusé de réception par e-mail (sans lien Drive)
      const ABSTRACT_TEMPLATE_ID =
        import.meta.env.VITE_EMAILJS_ABSTRACT_TEMPLATE_ID ||
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      if (
        import.meta.env.VITE_EMAILJS_SERVICE_ID &&
        ABSTRACT_TEMPLATE_ID &&
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      ) {
        try {
          await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            ABSTRACT_TEMPLATE_ID,
            {
              to_email: auteurPrincipal.email.trim(),
              to_name: auteurPrincipal.nomComplet.trim(),
              statut: 'Soumission Abstract',
              profession: titreAbstract.trim(),
              institution: auteurPrincipal.institution.trim(),
              montant: 'Soumission scientifique enregistrée',
              trans_id: refAbstract
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
          );
        } catch (mailErr) {
          console.error('Résumé enregistré, erreur accusé e-mail :', mailErr);
        }
      }

      setSoumissionConfirmee({
        refAbstract,
        titreAbstract: titreAbstract.trim(),
        auteurs: tousLesAuteurs,
        motsCles: listeMotsClesFinale,
        nomFichier: fichier.name
      });
    } catch (error) {
      console.error('Erreur soumission abstract :', error);
      alert(
        error.message ||
          t('Une erreur est survenue lors de la soumission du résumé.', 'An error occurred while submitting the abstract.')
      );
    } finally {
      setIsSubmitting(false);
      setStatusMessage('');
    }
  };

  return (
    <main className="relative overflow-x-clip w-full bg-white text-[#1a1a1a] selection:bg-[#c11236] selection:text-white">
      {/* 1. EN-TÊTE ÉDITORIAL BORDEAUX */}
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
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs font-medium text-white/90">
              <BookOpen className="w-3.5 h-3.5 text-white/80" />
              <span>{t('Communications Orales & Posters', 'Oral Presentations & Posters')}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs font-medium text-white/90">
              <Award className="w-3.5 h-3.5 text-white/80" />
              <span>{t('Comité Scientifique International', 'International Scientific Committee')}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-white/75 font-semibold block mb-2">
                {t('GEDREPACAM · Appel à Communications', 'GEDREPACAM · Call for Abstracts')}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-serif-title font-bold tracking-tight text-white leading-[1.15] mb-4">
                {t('Soumettre un Résumé (Abstract)', 'Submit an Abstract')}
              </h1>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-3xl">
                {t(
                  <>
                    Partagez vos travaux de recherche clinique, fondamentale ou en santé publique sur la
                    drépanocytose lors du{' '}
                    <strong className="font-semibold text-white">
                      5<sup>e</sup> Congrès International de Yaoundé
                    </strong>
                    .
                  </>,
                  <>
                    Share your clinical, basic or public health research on sickle cell disease at the{' '}
                    <strong className="font-semibold text-white">
                      5<sup>th</sup> International Congress in Yaoundé
                    </strong>
                    .
                  </>
                )}
              </p>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-white/80">
                <span className="flex items-center gap-1.5 font-semibold text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {t('Soumissions Ouvertes', 'Submissions Open')}
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

      {/* 2. FORMULAIRE DE SOUMISSION D'ABSTRACT */}
      <section className="relative w-full bg-[#f8f8fa] py-16 lg:py-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
          {soumissionConfirmee ? (
            <div className="bg-white rounded-3xl border border-[#dce0e8] shadow-sm p-8 sm:p-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#00765a] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#00765a] font-bold">
                  {t('Référence :', 'Reference:')} {soumissionConfirmee.refAbstract}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#1a1a1a]">
                  {t('Résumé transmis avec succès !', 'Abstract submitted successfully!')}
                </h2>
                <p className="text-sm text-[#555555] max-w-xl mx-auto">
                  {t(
                    'Votre abstract a été enregistré et transmis au comité scientifique du GEDREPACAM 2027 pour évaluation.',
                    'Your abstract has been recorded and sent to the GEDREPACAM 2027 scientific committee for review.'
                  )}
                </p>
              </div>

              <div className="bg-[#f8f8fa] rounded-2xl border border-[#dce0e8] p-5 text-left space-y-3 text-sm">
                <div>
                  <span className="text-xs font-mono uppercase text-[#555555] block">
                    {t('Titre du résumé', 'Abstract title')}
                  </span>
                  <p className="font-bold text-[#1a1a1a]">
                    {soumissionConfirmee.titreAbstract}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-mono uppercase text-[#555555] block">
                    {t('Auteurs', 'Authors')} ({soumissionConfirmee.auteurs.length})
                  </span>
                  <p className="text-[#1a1a1a]">
                    {soumissionConfirmee.auteurs.join(' ; ')}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-mono uppercase text-[#555555] block mb-1">
                    {t('Mots-clés', 'Keywords')}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {soumissionConfirmee.motsCles.map((kw, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full bg-white border border-[#dce0e8] text-xs font-medium text-[#1a1a1a]"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono uppercase text-[#555555] block">
                    {t('Document déposé', 'Uploaded document')}
                  </span>
                  <p className="font-semibold text-[#00765a]">
                    {soumissionConfirmee.nomFichier}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSoumissionConfirmee(null);
                    setTitreAbstract('');
                    setCoAuteurs([]);
                    setMotsCles([]);
                    setFichier(null);
                  }}
                  className="px-6 py-3 rounded-full bg-[#c11236] hover:bg-[#8b0a1d] text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  {t('Soumettre un autre résumé', 'Submit another abstract')}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="px-6 py-3 rounded-full bg-white border border-[#dce0e8] hover:border-[#1a1a1a] text-sm font-semibold text-[#1a1a1a] transition-colors cursor-pointer"
                >
                  {t("Retour à l'accueil", 'Back to home')}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-[#dce0e8] shadow-sm p-6 sm:p-10 lg:p-12">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <div className="w-12 h-12 rounded-full bg-[#c11236]/10 text-[#c11236] flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#c11236] font-semibold">
                  {t('Dépôt Scientifique', 'Scientific Submission')}
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1a1a1a] mt-1">
                  {t("Formulaire de soumission d'abstract", 'Abstract submission form')}
                </h2>
                <p className="text-sm sm:text-base text-[#555555] mt-2">
                  {t(
                    "Renseignez le titre, l'ensemble des auteurs, vos mots-clés et déposez votre fichier (jusqu'à 300 Mo).",
                    'Enter the title, all authors and your keywords, then upload your file (up to 300 MB).'
                  )}
                </p>
              </div>

              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* BLOC 1 : TITRE DE L'ABSTRACT */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="abstract-title"
                    className="block text-sm font-semibold text-[#1a1a1a]"
                  >
                    {t("Titre de l'abstract", 'Abstract title')}{' '}
                    <span className="text-[#c11236]">*</span>
                  </label>
                  <textarea
                    id="abstract-title"
                    rows={2}
                    required
                    value={titreAbstract}
                    onChange={(e) => setTitreAbstract(e.target.value)}
                    placeholder={t(
                      'Ex. Impact du dépistage néonatal systématique sur la survie des enfants drépanocytaires en Afrique centrale...',
                      'e.g. Impact of systematic newborn screening on the survival of children with sickle cell disease in Central Africa...'
                    )}
                    className="w-full px-4 py-3 rounded-xl bg-[#f8f8fa] border border-[#dce0e8] text-[#1a1a1a] placeholder:text-[#555555]/50 text-sm focus:bg-white focus:outline-none focus:border-[#c11236] focus:ring-1 focus:ring-[#c11236] transition-colors"
                  />
                </div>

                {/* BLOC 2 : AUTEURS (1 OU PLUSIEURS DYNAMIQUEMENT) */}
                <div className="space-y-4 pt-4 border-t border-[#dce0e8]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#8b0a1d]" />
                      <h3 className="text-base font-bold text-[#1a1a1a]">
                        {t('Auteurs de la communication', 'Authors')}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={ajouterCoAuteur}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#8b0a1d]/10 hover:bg-[#8b0a1d] text-[#8b0a1d] hover:text-white text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{t('Ajouter un auteur', 'Add an author')}</span>
                    </button>
                  </div>

                  {/* Auteur 1 (Auteur principal / correspondant) */}
                  <div className="p-5 rounded-2xl bg-[#f8f8fa] border border-[#dce0e8] space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#8b0a1d]">
                        {t('Auteur 1 · Auteur principal / correspondant', 'Author 1 · Lead / corresponding author')}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-[#1a1a1a]">
                          {t('Noms et Prénoms', 'Full name')}{' '}
                          <span className="text-[#c11236]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={auteurPrincipal.nomComplet}
                          onChange={(e) =>
                            setAuteurPrincipal({
                              ...auteurPrincipal,
                              nomComplet: e.target.value
                            })
                          }
                          placeholder={t('ex. Dr. Mbarga Jean-Paul', 'e.g. Dr. Mbarga Jean-Paul')}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dce0e8] text-sm focus:outline-none focus:border-[#c11236]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-[#1a1a1a]">
                          {t('Affiliation / Institution', 'Affiliation / Institution')}{' '}
                          <span className="text-[#c11236]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={auteurPrincipal.institution}
                          onChange={(e) =>
                            setAuteurPrincipal({
                              ...auteurPrincipal,
                              institution: e.target.value
                            })
                          }
                          placeholder={t('ex. FMSB Yaoundé / CHUY', 'e.g. FMSB Yaoundé / CHUY')}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dce0e8] text-sm focus:outline-none focus:border-[#c11236]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-[#1a1a1a]">
                          {t('E-mail de correspondance', 'Correspondence email')}{' '}
                          <span className="text-[#c11236]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={auteurPrincipal.email}
                          onChange={(e) =>
                            setAuteurPrincipal({
                              ...auteurPrincipal,
                              email: e.target.value
                            })
                          }
                          placeholder={t('auteur@universite.cm', 'author@university.org')}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dce0e8] text-sm focus:outline-none focus:border-[#c11236]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-[#1a1a1a]">
                          {t('Téléphone (WhatsApp)', 'Phone (WhatsApp)')}{' '}
                          <span className="text-[#c11236]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={auteurPrincipal.telephone}
                          onChange={(e) =>
                            setAuteurPrincipal({
                              ...auteurPrincipal,
                              telephone: e.target.value
                            })
                          }
                          placeholder={t('ex. 694 12 64 61', 'e.g. 694 12 64 61')}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dce0e8] text-sm focus:outline-none focus:border-[#c11236]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Co-auteurs ajoutés dynamiquement */}
                  {coAuteurs.map((coAuteur, index) => (
                    <div
                      key={coAuteur.id}
                      className="p-4 rounded-2xl bg-white border border-[#dce0e8] space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#555555]">
                          {t('Co-auteur', 'Co-author')} #{index + 2}
                        </span>
                        <button
                          type="button"
                          onClick={() => supprimerCoAuteur(coAuteur.id)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#c11236] hover:underline cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{t('Retirer', 'Remove')}</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          required
                          value={coAuteur.nomComplet}
                          onChange={(e) =>
                            modifierCoAuteur(
                              coAuteur.id,
                              'nomComplet',
                              e.target.value
                            )
                          }
                          placeholder={t('Noms et Prénoms du co-auteur *', 'Co-author full name *')}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#f8f8fa] border border-[#dce0e8] text-sm focus:bg-white focus:outline-none focus:border-[#c11236]"
                        />
                        <input
                          type="text"
                          value={coAuteur.institution}
                          onChange={(e) =>
                            modifierCoAuteur(
                              coAuteur.id,
                              'institution',
                              e.target.value
                            )
                          }
                          placeholder={t('Affiliation / Institution (optionnel)', 'Affiliation / Institution (optional)')}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#f8f8fa] border border-[#dce0e8] text-sm focus:bg-white focus:outline-none focus:border-[#c11236]"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* BLOC 3 : MOTS-CLÉS DYNAMIQUES (TAGS) */}
                <div className="space-y-3 pt-4 border-t border-[#dce0e8]">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="keyword-input"
                      className="flex items-center gap-2 text-sm font-bold text-[#1a1a1a]"
                    >
                      <Tag className="w-4 h-4 text-[#00765a]" />
                      <span>
                        {t("Mots-clés de l'abstract", 'Abstract keywords')}{' '}
                        <span className="text-[#c11236]">*</span>
                      </span>
                    </label>
                    <span className="text-xs text-[#555555]">
                      {t(
                        <>
                          Appuyez sur <strong>Entrée</strong> ou cliquez sur <strong>Ajouter</strong>
                        </>,
                        <>
                          Press <strong>Enter</strong> or click <strong>Add</strong>
                        </>
                      )}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <input
                      id="keyword-input"
                      type="text"
                      value={motCleSaisi}
                      onChange={(e) => setMotCleSaisi(e.target.value)}
                      onKeyDown={handleMotCleKeyDown}
                      placeholder={t(
                        'Ex. Drépanocytose, Hydroxyurée, Dépistage néonatal...',
                        'e.g. Sickle cell disease, Hydroxyurea, Newborn screening...'
                      )}
                      className="flex-1 px-4 py-3 rounded-xl bg-[#f8f8fa] border border-[#dce0e8] text-sm focus:bg-white focus:outline-none focus:border-[#00765a] focus:ring-1 focus:ring-[#00765a]"
                    />
                    <button
                      type="button"
                      onClick={() => ajouterMotsClesDepuisTexte(motCleSaisi)}
                      className="px-5 py-3 rounded-xl bg-[#00765a] hover:bg-[#005c46] text-white text-sm font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{t('Ajouter', 'Add')}</span>
                    </button>
                  </div>

                  {motsCles.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {motsCles.map((mot, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#00765a] text-xs font-semibold"
                        >
                          <span>{mot}</span>
                          <button
                            type="button"
                            onClick={() => supprimerMotCle(idx)}
                            className="p-0.5 rounded-full hover:bg-emerald-200/70 text-[#00765a] cursor-pointer"
                            title={t('Supprimer ce mot-clé', 'Remove this keyword')}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* BLOC 4 : ZONE DE TÉLÉVERSEMENT (TOUT FORMAT, MAXI 300 MO) */}
                <div className="space-y-3 pt-4 border-t border-[#dce0e8]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <label
                      htmlFor="abstract-file"
                      className="block text-sm font-bold text-[#1a1a1a]"
                    >
                      {t("Fichier de l'abstract", 'Abstract file')}{' '}
                      <span className="text-[#c11236]">*</span>
                    </label>
                    <span className="text-[11px] font-mono text-[#555555]">
                      {t('Tous formats acceptés (PDF, Word, ZIP...) · Maximum 300 Mo', 'All formats accepted (PDF, Word, ZIP...) · Maximum 300 MB')}
                    </span>
                  </div>

                  {!fichier ? (
                    <label
                      htmlFor="abstract-file"
                      className="flex flex-col items-center justify-center gap-2.5 p-8 rounded-2xl border-2 border-dashed border-[#dce0e8] hover:border-[#c11236] bg-[#f8f8fa] hover:bg-red-50/20 cursor-pointer transition-colors text-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-white border border-[#dce0e8] flex items-center justify-center text-[#8b0a1d]">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-bold text-[#1a1a1a]">
                        {t('Cliquez pour sélectionner votre fichier', 'Click to select your file')}
                      </div>
                      <p className="text-xs text-[#555555] max-w-md">
                        {t(
                          <>
                            Tous formats acceptés (PDF, Word, archive ZIP, etc.) jusqu'à <strong>300 Mo</strong>.
                          </>,
                          <>
                            All formats accepted (PDF, Word, ZIP archive, etc.) up to <strong>300 MB</strong>.
                          </>
                        )}
                      </p>
                      <input
                        id="abstract-file"
                        type="file"
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
                            {fichier.name}
                          </p>
                          <p className="text-xs text-[#00765a]">
                            {afficherTaille(fichier.size)} · {t('Prêt pour dépôt', 'Ready to upload')}
                          </p>
                        </div>
                      </div>

                      {!isSubmitting && (
                        <button
                          type="button"
                          onClick={retirerFichier}
                          className="p-2 rounded-lg text-[#555555] hover:text-[#c11236] hover:bg-white transition-colors cursor-pointer"
                          title={t('Retirer le fichier', 'Remove file')}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}

                  {fileError && (
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#c11236]">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{fileError}</span>
                    </div>
                  )}
                </div>

                {/* BARRE DE PROGRESSION PENDANT L'ENVOI */}
                {isSubmitting && (
                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-[#00765a]">
                      <span>{statusMessage}</span>
                      {uploadProgress > 0 && <span>{uploadProgress}%</span>}
                    </div>
                    <div className="w-full h-2 rounded-full bg-white overflow-hidden">
                      <div
                        className="h-full bg-[#00765a] transition-all duration-300"
                        style={{ width: `${uploadProgress || 15}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* BOUTON DE SOUMISSION */}
                <div className="pt-2 flex flex-col items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full sm:w-auto sm:min-w-[360px] px-8 py-4 rounded-full text-white text-base font-semibold flex items-center justify-center gap-2.5 transition-colors shadow-sm group ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#c11236] hover:bg-[#8b0a1d] cursor-pointer'
                    }`}
                  >
                    <span>
                      {isSubmitting
                        ? t('Envoi en cours...', 'Sending...')
                        : t('Soumettre mon résumé au comité', 'Submit my abstract to the committee')}
                    </span>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default SoumettreResume;