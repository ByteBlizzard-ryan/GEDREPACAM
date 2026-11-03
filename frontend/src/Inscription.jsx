import React, { useState } from 'react';
import { 
  Home, ShieldCheck, GraduationCap, Microscope, Banknote, 
  Stethoscope, Users, School, Award, CheckCircle2, 
  UserCheck, ArrowRight, Lock, LifeBuoy, Mail, Phone, 
  FileText, Building2, HelpCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';

function Inscription() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData();
    
    // 1. Association de vos champs de formulaire avec les NOUVEAUX ID entry de Google Forms
    formData.append('entry.45420605', form.elements['reg-lastname'].value); // Noms
    formData.append('entry.627195857', form.elements['reg-title'].value); // Titre honorifique
    formData.append('entry.911358404', form.elements['reg-quality'].value); // Statut
    formData.append('entry.2129644551', form.elements['reg-email'].value); // E-mail
    formData.append('entry.600935535', form.elements['reg-firstname'].value); // Prénoms
    formData.append('entry.1249499698', form.elements['reg-profession'].value); // Profession
    formData.append('entry.1525826361', form.elements['reg-institution'].value); // Organisation
    formData.append('entry.203174067', form.elements['reg-phone'].value); // Téléphone

    // L'URL DOIT se terminer par /formResponse (et non /edit)
    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe162SiUM-eBUW62iGd-psJTnxyxX_eXN5w0yJpGvmihHdG_A/formResponse";
    try {
      // 2. Envoi silencieux vers Google Forms avec le mode no-cors
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });
      
      // 3. Affichage du succès et nettoyage du formulaire
      setModalOpen(true);
      form.reset();
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      alert("Une erreur de réseau est survenue lors de l'inscription.");
    }
  };

  return (
    <main className="w-full pt-20 bg-surface min-h-[calc(100vh-20rem)] flex flex-col">
      <div className="flex flex-col w-full">
        
        {/* Section En-tête & Contexte Médical */}
        <section className="relative w-full overflow-hidden bg-surface py-space-xl lg:py-space-2xl">
          <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
            
            {/* Fil d'Ariane & Badges institutionnels */}
            <div className="flex flex-wrap items-center gap-space-sm mb-space-md">
              <div className="inline-flex items-center gap-1.5 px-space-md py-1 rounded-full bg-secondary-container text-on-secondary-container">
                <ShieldCheck size={16} />
                <span className="text-[11px] uppercase tracking-wider font-bold">Accréditation Officielle</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-space-md py-1 rounded-full bg-surface-container-high text-on-surface-variant font-semibold">
                <GraduationCap size={16} />
                <span className="text-[11px]">Attestation CME / DPC délivrée</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-space-md py-1 rounded-full bg-surface-container text-primary font-semibold">
                <Microscope size={16} />
                <span className="text-[11px]">Sessions Plénières & Ateliers Pratiques</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-end">
              <div className="lg:col-span-8 space-y-space-sm">
                <span className="text-[14px] uppercase tracking-widest text-primary font-bold block">
                  GEDREPACAM • 5È ÉDITION INTERNATIONALE
                </span>
                <h1 className="text-[38px] font-extrabold text-on-surface tracking-tight">
                  Inscription au Congrès
                </h1>
                <p className="text-[18px] text-on-surface-variant max-w-3xl">
                  Ouverture des inscriptions : <strong className="text-on-surface font-semibold">20 octobre 2026</strong> – Clôture : <strong className="text-on-surface font-semibold">Avril 2027</strong>. Rejoignez les experts internationaux, praticiens et chercheurs pour le grand rassemblement biomédical à Yaoundé.
                </p>
              </div>

              {/* Stat Card & Dates */}
              <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-xs">
                <div className="flex items-center justify-between text-on-surface-variant text-[11px] font-bold">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-secondary inline-block animate-pulse"></span>
                    PORTAIL OFFICIEL ACTIF
                  </span>
                  <span className="text-primary">PALAIS DES CONGRÈS</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <div className="text-[20px] font-bold text-on-surface">Yaoundé</div>
                    <div className="text-[13px] text-on-surface-variant">Cameroun • Format Hybride</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[20px] font-bold text-secondary">CME-24</div>
                    <div className="text-[13px] text-on-surface-variant">Crédits formation</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Section Grille Tarifaire */}
        <section className="w-full bg-surface-container-low py-space-xl lg:py-space-2xl">
          <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin space-y-space-xl">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
              <div>
                <div className="inline-flex items-center gap-1 text-[11px] text-secondary font-bold uppercase tracking-wider mb-1">
                  <Banknote size={15} />
                  Transparence & Accessibilité
                </div>
                <h2 className="text-[38px] font-bold text-on-surface">
                  Grille Tarifaire Officielle
                </h2>
                <p className="text-[15px] text-on-surface-variant mt-1">
                  Tarifs préférentiels fixés par le comité de pilotage pour favoriser la participation panafricaine.
                </p>
              </div>

              <div className="bg-surface-container-lowest px-space-md py-space-sm rounded-lg shadow-sm">
                <span className="text-[11px] text-secondary font-bold block uppercase tracking-wide">Toutes les inscriptions incluent :</span>
                <span className="text-[13px] text-on-surface-variant">Conférences, sacoche congrès, pauses déjeuners et attestation CME.</span>
              </div>
            </div>

            {/* Tarifs Grid (6 Catégories) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
              
              {/* 1. Médecin et Pharmacien spécialiste */}
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary-container"></div>
                <div>
                  <div className="flex items-start justify-between gap-space-sm mb-space-sm">
                    <span className="text-[11px] uppercase tracking-wider text-primary font-bold px-2 py-0.5 rounded bg-surface-container">Catégorie A</span>
                    <Stethoscope className="text-primary" size={22} />
                  </div>
                  <h3 className="text-[20px] font-bold text-on-surface mb-space-xs">
                    Médecin & Pharmacien spécialiste, Enseignant d'université
                  </h3>
                  <p className="text-[13px] text-on-surface-variant mb-space-md">
                    Praticiens hospitaliers, hospitalo-universitaires, professeurs et directeurs de recherche.
                  </p>
                </div>
                <div className="pt-space-md bg-surface-container-low/50 -mx-space-lg -mb-space-lg p-space-lg">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[38px] font-extrabold text-on-surface">25 000</span>
                    <span className="text-[14px] font-bold text-primary">FCFA</span>
                  </div>
                  <span className="text-[13px] text-on-surface-variant block mt-0.5">Accès intégral présentiel & virtuel</span>
                </div>
              </div>

              {/* 2. Médecin Généraliste, Pharmacien, Ingénieur */}
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary"></div>
                <div>
                  <div className="flex items-start justify-between gap-space-sm mb-space-sm">
                    <span className="text-[11px] uppercase tracking-wider text-secondary font-bold px-2 py-0.5 rounded bg-secondary-container/40">Catégorie B</span>
                    <Microscope className="text-secondary" size={22} />
                  </div>
                  <h3 className="text-[20px] font-bold text-on-surface mb-space-xs">
                    Médecin Généraliste, Pharmacien, Ingénieur biologie
                  </h3>
                  <p className="text-[13px] text-on-surface-variant mb-space-md">
                    Corps médical général, biologistes médicaux et cadres techniques de laboratoires.
                  </p>
                </div>
                <div className="pt-space-md bg-surface-container-low/50 -mx-space-lg -mb-space-lg p-space-lg">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[38px] font-extrabold text-on-surface">15 000</span>
                    <span className="text-[14px] font-bold text-secondary">FCFA</span>
                  </div>
                  <span className="text-[13px] text-on-surface-variant block mt-0.5">Accès plénières, ateliers et symposiums</span>
                </div>
              </div>

              {/* 3. Infirmier et Technicien de laboratoire */}
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-tertiary-container"></div>
                <div>
                  <div className="flex items-start justify-between gap-space-sm mb-space-sm">
                    <span className="text-[11px] uppercase tracking-wider text-tertiary font-bold px-2 py-0.5 rounded bg-tertiary-fixed">Catégorie C</span>
                    <Users className="text-tertiary" size={22} />
                  </div>
                  <h3 className="text-[20px] font-bold text-on-surface mb-space-xs">
                    Infirmier & Technicien de laboratoire
                  </h3>
                  <p className="text-[13px] text-on-surface-variant mb-space-md">
                    Personnel paramédical de terrain, soignants de centres de référence drépanocytose.
                  </p>
                </div>
                <div className="pt-space-md bg-surface-container-low/50 -mx-space-lg -mb-space-lg p-space-lg">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[38px] font-extrabold text-on-surface">10 000</span>
                    <span className="text-[14px] font-bold text-tertiary">FCFA</span>
                  </div>
                  <span className="text-[13px] text-on-surface-variant block mt-0.5">Documentation complète et accréditation</span>
                </div>
              </div>

              {/* 4. Visiteur */}
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-outline"></div>
                <div>
                  <div className="flex items-start justify-between gap-space-sm mb-space-sm">
                    <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-bold px-2 py-0.5 rounded bg-surface-container">Catégorie D</span>
                    <Users className="text-on-surface-variant" size={22} />
                  </div>
                  <h3 className="text-[20px] font-bold text-on-surface mb-space-xs">
                    Visiteur & Délégué Institutionnel
                  </h3>
                  <p className="text-[13px] text-on-surface-variant mb-space-md">
                    Membres d'associations de patients, observateurs, ONG et représentants de la société civile.
                  </p>
                </div>
                <div className="pt-space-md bg-surface-container-low/50 -mx-space-lg -mb-space-lg p-space-lg">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[38px] font-extrabold text-on-surface">10 000</span>
                    <span className="text-[14px] font-bold text-on-surface-variant">FCFA</span>
                  </div>
                  <span className="text-[13px] text-on-surface-variant block mt-0.5">Accès espaces expositions & débats publics</span>
                </div>
              </div>

              {/* 5. Étudiant */}
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary-fixed-dim"></div>
                <div>
                  <div className="flex items-start justify-between gap-space-sm mb-space-sm">
                    <span className="text-[11px] uppercase tracking-wider text-secondary font-bold px-2 py-0.5 rounded bg-secondary-container/40">Tarif Jeunes Chercheurs</span>
                    <School className="text-secondary" size={22} />
                  </div>
                  <h3 className="text-[20px] font-bold text-on-surface mb-space-xs">
                    Étudiant & Interne en Médecine
                  </h3>
                  <p className="text-[13px] text-on-surface-variant mb-space-md">
                    Étudiants en facultés de médecine, pharmacie, sciences biomédicales et écoles de soins.
                  </p>
                </div>
                <div className="pt-space-md bg-surface-container-low/50 -mx-space-lg -mb-space-lg p-space-lg">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[38px] font-extrabold text-on-surface">5 000</span>
                    <span className="text-[14px] font-bold text-secondary">FCFA</span>
                  </div>
                  <span className="text-[12px] text-primary font-medium block mt-0.5">
                    * Sur présentation obligatoire d'un justificatif ou carte d'étudiant
                  </span>
                </div>
              </div>

              {/* 6. Invité */}
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
                <div>
                  <div className="flex items-start justify-between gap-space-sm mb-space-sm">
                    <span className="text-[11px] uppercase tracking-wider text-primary font-bold px-2 py-0.5 rounded bg-primary-fixed">Protocolaire</span>
                    <Award className="text-primary" size={22} />
                  </div>
                  <h3 className="text-[20px] font-bold text-on-surface mb-space-xs">
                    Invité d'Honneur & Conférencier Clé
                  </h3>
                  <p className="text-[13px] text-on-surface-variant mb-space-md">
                    Personnalités ministérielles, experts désignés de l'OMS et présidents de sociétés savantes.
                  </p>
                </div>
                <div className="pt-space-md bg-surface-container-low/50 -mx-space-lg -mb-space-lg p-space-lg">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[38px] font-extrabold text-secondary">Gratuit</span>
                  </div>
                  <span className="text-[12px] text-on-surface-variant block mt-0.5">
                    * Sur invitation officielle émise par le comité d'organisation
                  </span>
                </div>
              </div>

            </div>

            {/* Récapitulatif Package Inclus */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md lg:p-space-lg shadow-sm">
              <h4 className="text-[14px] uppercase tracking-wider text-on-surface font-bold mb-space-sm flex items-center gap-2">
                <CheckCircle2 className="text-secondary" size={20} />
                Ce que comprend chaque inscription validée
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
                <div className="flex items-start gap-space-xs">
                  <CheckCircle2 className="text-secondary shrink-0 mt-0.5" size={16} />
                  <span className="text-[13px] text-on-surface-variant">Accès libre aux 3 jours de conférences & tables rondes</span>
                </div>
                <div className="flex items-start gap-space-xs">
                  <CheckCircle2 className="text-secondary shrink-0 mt-0.5" size={16} />
                  <span className="text-[13px] text-on-surface-variant">Sacoche officielle, livre des résumés & carnet de bord</span>
                </div>
                <div className="flex items-start gap-space-xs">
                  <CheckCircle2 className="text-secondary shrink-0 mt-0.5" size={16} />
                  <span className="text-[13px] text-on-surface-variant">Pauses-café de réseautage et déjeuners officiels inclus</span>
                </div>
                <div className="flex items-start gap-space-xs">
                  <CheckCircle2 className="text-secondary shrink-0 mt-0.5" size={16} />
                  <span className="text-[13px] text-on-surface-variant">Attestation officielle de participation CME / CPD nominative</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Section Formulaire d'Inscription */}
        <section className="w-full bg-surface py-space-xl lg:py-space-2xl">
          <div className="max-w-4xl mx-auto px-margin-mobile lg:px-margin">
            
            <div className="bg-surface-container-lowest rounded-2xl shadow-xl p-space-lg lg:p-space-2xl">
              <div className="text-center max-w-2xl mx-auto mb-space-xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-space-sm">
                  <UserCheck size={28} />
                </div>
                <h2 className="text-[38px] font-bold text-on-surface">
                  Formulaire d'inscription individuelle
                </h2>
                <p className="text-[15px] text-on-surface-variant mt-1">
                  Veuillez renseigner vos coordonnées pour enregistrer votre badge officiel et réserver vos sessions.
                </p>
              </div>

              <form className="space-y-space-lg" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md lg:gap-space-lg">
                  
                  {/* Colonne 1 */}
                  <div className="space-y-space-md">
                    <div className="space-y-1">
                      <label className="block text-[14px] text-on-surface font-semibold" htmlFor="reg-lastname">
                        Noms <span className="text-primary">*</span>
                      </label>
                      <input 
                        className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline text-[15px] shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container" 
                        id="reg-lastname" 
                        placeholder="ex. Tchamba" 
                        required 
                        type="text" 
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[14px] text-on-surface font-semibold" htmlFor="reg-title">
                        Titre honorifique <span className="text-primary">*</span>
                      </label>
                      <select 
                        className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-on-surface text-[15px] shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container" 
                        id="reg-title" 
                        required 
                        defaultValue=""
                      >
                        <option disabled value="">Sélectionnez un titre</option>
                        <option value="Pr. (Professeur)">Pr. (Professeur)</option>
                        <option value="Dr. (Docteur)">Dr. (Docteur)</option>
                        <option value="M. (Monsieur)">M. (Monsieur)</option>
                        <option value="Mme (Madame)">Mme (Madame)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[14px] text-on-surface font-semibold" htmlFor="reg-quality">
                        Vous participez en Qualité de <span className="text-primary">*</span>
                      </label>
                      <select 
                        className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-on-surface text-[15px] shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container" 
                        id="reg-quality" 
                        required 
                        defaultValue=""
                      >
                        <option disabled value="">Choisir un statut</option>
                        <option value="Participant">Participant</option>
                        <option value="Exposant médical">Exposant médical</option>
                        <option value="Sponsor & Partenaire">Sponsor & Partenaire</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[14px] text-on-surface font-semibold" htmlFor="reg-email">
                        Adresse e-mail institutionnelle <span className="text-primary">*</span>
                      </label>
                      <input 
                        className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline text-[15px] shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container" 
                        id="reg-email" 
                        placeholder="dr.nom@hopital.cm" 
                        required 
                        type="email" 
                      />
                    </div>
                  </div>

                  {/* Colonne 2 */}
                  <div className="space-y-space-md">
                    <div className="space-y-1">
                      <label className="block text-[14px] text-on-surface font-semibold" htmlFor="reg-firstname">
                        Prénoms <span className="text-primary">*</span>
                      </label>
                      <input 
                        className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline text-[15px] shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container" 
                        id="reg-firstname" 
                        placeholder="ex. Emilienne" 
                        required 
                        type="text" 
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[14px] text-on-surface font-semibold" htmlFor="reg-profession">
                        Profession <span className="text-primary">*</span>
                      </label>
                      <select 
                        className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-on-surface text-[15px] shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container" 
                        id="reg-profession" 
                        required 
                        defaultValue=""
                      >
                        <option disabled value="">Sélectionnez votre profession</option>
                        <option value="Médecin (Spécialiste ou Généraliste)">Médecin (Spécialiste ou Généraliste)</option>
                        <option value="Infirmier /Soignant">Infirmier /Soignant</option>
                        <option value="Pharmacien hospitalier /officine">Pharmacien hospitalier /officine</option>
                        <option value="Techinicien de laboratoire">Techinicien de laboratoire</option>
                        <option value="Chercheur / Généticien">Chercheur / Généticien</option>
                        <option value="Enseignant Universitaire">Enseignant Universitaire</option>
                        <option value="Autre profession de santé">Autre profession de santé</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[14px] text-on-surface font-semibold" htmlFor="reg-institution">
                        Organisation / Institution <span className="text-primary">*</span>
                      </label>
                      <input 
                        className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline text-[15px] shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container" 
                        id="reg-institution" 
                        placeholder="ex: CHUY, FMSB Yaoundé, Hôpital Laquintinie..." 
                        required 
                        type="text" 
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[14px] text-on-surface font-semibold" htmlFor="reg-phone">
                        Numéro de téléphone <span className="text-primary">*</span>
                      </label>
                      <input 
                        className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline text-[15px] shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container" 
                        id="reg-phone" 
                        placeholder="Précisez l'indicatif du pays si hors Cameroun (ex: +237...)" 
                        required 
                        type="tel" 
                      />
                    </div>
                  </div>

                </div>

                <div className="pt-space-md flex flex-col items-center gap-space-sm">
                  <button 
                    className="w-full md:w-auto md:min-w-[340px] px-space-xl py-3.5 rounded-lg bg-primary-container text-on-primary text-[20px] font-bold flex items-center justify-center gap-space-sm hover:bg-primary transition-colors shadow-lg shadow-primary-container/20 group cursor-pointer" 
                    type="submit"
                  >
                    <span>Valider mon inscription</span>
                    <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                  </button>
                  
                  <div className="flex items-center gap-1.5 text-secondary text-[13px] pt-1 font-medium">
                    <Lock size={16} />
                    <span>Paiement 100% sécurisé. Aucune donnée bancaire n'est stockée sur ce site.</span>
                  </div>
                </div>

              </form>
            </div>

          </div>
        </section>

        {/* Section FAQ / Assistance Téléphonique */}
        <section className="w-full bg-surface-container-low py-space-xl">
          <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg lg:p-space-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-lg">
              <div className="space-y-space-xs text-center md:text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">Assistance Personnalisée</span>
                <h3 className="text-[20px] font-bold text-on-surface">Besoin d'un bon de commande institutionnel ou d'un devis groupe ?</h3>
                <p className="text-[15px] text-on-surface-variant">Notre secrétariat traite les prises en charge des hôpitaux, ministères et centres hospitaliers.</p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-space-sm shrink-0">
                <a className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-[14px] font-semibold transition-colors" href="tel:+237222200000">
                <LifeBuoy className="text-secondary" size={18} />
                <span>+237 222 20 00 00</span>
                </a>
                <a className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-secondary text-on-secondary hover:bg-opacity-95 text-[14px] font-semibold transition-colors" href="mailto:secretariat@drepacam2025.cm">
                  <Mail size={18} />
                  <span>Demander une convention</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Modal de confirmation de soumission réussie */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-margin-mobile">
            <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-space-xl shadow-2xl text-center space-y-space-md">
              <div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <div className="space-y-space-xs">
                <h3 className="text-[26px] font-bold text-on-surface">Pré-inscription enregistrée !</h3>
                <p className="text-[15px] text-on-surface-variant">
                  Votre dossier pour le 5ème Congrès International a bien été transmis. Un e-mail de confirmation accompagné de votre numéro de référence temporaire vous a été envoyé.
                </p>
              </div>
              <div className="p-space-md rounded-xl bg-surface-container-low text-left space-y-1 text-[13px] text-on-surface font-medium">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Lieu :</span>
                  <span className="font-semibold">Palais des Congrès de Yaoundé</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Statut :</span>
                  <span className="font-semibold text-secondary">En attente de règlement final</span>
                </div>
              </div>
              <button 
                className="w-full py-3 rounded-lg bg-primary-container text-on-primary text-[14px] hover:bg-primary transition-colors font-bold cursor-pointer" 
                onClick={() => setModalOpen(false)} 
                type="button"
              >
                Fermer cette fenêtre
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

export default Inscription;