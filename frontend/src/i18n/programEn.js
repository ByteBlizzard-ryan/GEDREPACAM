/**
 * Traduction anglaise des textes du programme (Program.jsx).
 * Clé = texte français exact tel qu'il apparaît dans PROGRAM_DAYS,
 * valeur = texte anglais. Un texte absent de ce dictionnaire reste en français.
 *
 * Si vous modifiez un texte du programme en français, pensez à mettre à jour
 * sa clé ici (sinon il s'affichera en français sur la version anglaise).
 */
const PROGRAM_EN = {
  // Jours
  'Jour 1': 'Day 1',
  'Jour 2': 'Day 2',
  'Jour 3': 'Day 3',
  'Mardi 25 mai 2027': 'Tuesday 25 May 2027',
  'Mercredi 26 mai 2027': 'Wednesday 26 May 2027',
  'Jeudi 27 mai 2027': 'Thursday 27 May 2027',
  'Cérémonie d’ouverture · Thèmes 1 & 2': 'Opening ceremony · Themes 1 & 2',
  'Politiques de santé, gouvernance, dépistage néonatal et innovations diagnostiques':
    'Health policy, governance, newborn screening and diagnostic innovation',
  'Thèmes 3 & 4 · Protocoles cliniques': 'Themes 3 & 4 · Clinical protocols',
  'Prise en charge intégrée, accès aux soins, équité en santé et innovations thérapeutiques':
    'Integrated care, access to care, health equity and therapeutic innovation',
  'Thèmes 4 (suite), 5, 6 & 7 · Clôture': 'Themes 4 (cont.), 5, 6 & 7 · Closing',
  'Thérapies innovantes, dimensions psychosociales, recherche génomique et coopération internationale':
    'Innovative therapies, psychosocial dimensions, genomic research and international cooperation',

  // Lieux, participants
  'Auditorium Principal · Palais des Congrès de Yaoundé': 'Main Auditorium · Yaoundé Conference Centre',
  Tous: 'All',
  Cameroun: 'Cameroon',
  RDC: 'DRC',
  Sénégal: 'Senegal',
  Bénin: 'Benin',
  Partenaires: 'Partners',

  // Badges
  'Accueil & Protocole': 'Welcome & Protocol',
  Cérémonial: 'Ceremonial',
  Allocution: 'Address',
  'Leçon Inaugurale': 'Inaugural Lecture',
  'Haut Parrainage': 'High Patronage',
  Protocole: 'Protocol',
  'Intermède & Posters': 'Break & Posters',
  Présentation: 'Presentation',
  Épidémiologie: 'Epidemiology',
  'Session Interministérielle': 'Inter-ministerial Session',
  Discussion: 'Discussion',
  'Déjeuner & Symposium': 'Lunch & Symposium',
  'Communication libre': 'Free communication',
  'Clôture J1': 'End of Day 1',
  Accueil: 'Welcome',
  'Discussion & Livrable Protocole': 'Discussion & Protocol Deliverable',
  'Discussion & Clôture J2': 'Discussion & End of Day 2',
  'Cérémonie officielle': 'Official ceremony',
  Distinctions: 'Awards',
  'Clôture du Congrès': 'Congress Closing',

  // Thèmes
  'Thème 1': 'Theme 1',
  'Thème 2': 'Theme 2',
  'Thème 3': 'Theme 3',
  'Thème 4': 'Theme 4',
  'Thème 4 (suite)': 'Theme 4 (cont.)',
  'Thème 5': 'Theme 5',
  'Thème 6': 'Theme 6',
  'Thème 7': 'Theme 7',
  'Politiques de santé, gouvernance et stratégies nationales de lutte contre la drépanocytose':
    'Health policy, governance and national strategies to fight sickle cell disease',
  'Dépistage néonatal, innovations diagnostiques et assurance qualité':
    'Newborn screening, diagnostic innovation and quality assurance',
  'Prise en charge intégrée, accès aux soins et équité en santé':
    'Integrated care, access to care and health equity',
  'Innovations thérapeutiques': 'Therapeutic innovation',
  'Innovations thérapeutiques, recherche et coopération scientifique':
    'Therapeutic innovation, research and scientific cooperation',
  'Dimensions psychosociales, communautaires et prévention de la drépanocytose':
    'Psychosocial and community dimensions and prevention of sickle cell disease',
  'Recherche et innovation en drépanocytose': 'Research and innovation in sickle cell disease',
  'Coopération internationale, plaidoyer et perspectives': 'International cooperation, advocacy and outlook',

  // Blocs et interventions
  "Cérémonie d'ouverture": 'Opening ceremony',
  'Accueil et enregistrement des participants': 'Welcome and participant registration',
  "Mot de bienvenue du comité d'organisation / Hymne national":
    'Welcome address from the organising committee / National anthem',
  'Mot du Président du GEDREPACAM': 'Address by the President of GEDREPACAM',
  'Leçon Inaugurale : Actualités scientifiques internationales et recommandations récentes en matière de prévention, diagnostic et traitement':
    'Inaugural Lecture: International scientific updates and recent recommendations on prevention, diagnosis and treatment',
  'Mot du MINSANTE': 'Address by MINSANTE',
  'Visite des Stands et Photo de famille': 'Exhibition tour and group photo',
  'Pause-café / Session des posters': 'Coffee break / Poster session',
  "Données hospitalières nationales et systèmes de collecte, d'analyse et de surveillance des données sur la drépanocytose":
    'National hospital data and systems for collecting, analysing and monitoring sickle cell disease data',
  'Épidémiologie de la drépanocytose au Cameroun': 'Epidemiology of sickle cell disease in Cameroon',
  'Plan stratégique national de lutte contre la drépanocytose : rôles et contributions des différents secteurs ministériels':
    'National strategic plan to fight sickle cell disease: roles and contributions of the various ministries',
  'Pause déjeuner / Symposium (partenaires)': 'Lunch break / Symposium (partners)',
  'Pause déjeuner / Symposium (partenaires bronze)': 'Lunch break / Symposium (bronze partners)',
  'Diagnostics de la drépanocytose : quelles innovations et assurance qualité':
    'Sickle cell disease diagnostics: innovation and quality assurance',
  'Dépistage néonatal de la drépanocytose : stratégies, mise en œuvre, couverture et pérennisation des programmes, standardisation':
    'Newborn screening for sickle cell disease: strategies, implementation, coverage, programme sustainability and standardisation',
  'Consortium SickleInAfrica': 'SickleInAfrica Consortium',
  'Programmes de dépistage néonatal en Afrique : expériences et enseignements des pays du consortium SickleInAfrica, RDC, Sénégal, Bénin, Cameroun (importance du conseil génétique)':
    'Newborn screening programmes in Africa: experience and lessons from SickleInAfrica consortium countries, DRC, Senegal, Benin, Cameroon (importance of genetic counselling)',
  'Fin de J1': 'End of Day 1',
  'Suivi médical et prévention des complications au quotidien':
    'Medical follow-up and day-to-day prevention of complications',
  'Communication libre sur les expériences de suivi des patients':
    'Free communication on patient follow-up experiences',
  'Prise en charge de la douleur': 'Pain management',
  'Communication libre sur la PEC de la douleur': 'Free communication on pain management',
  "Discussion à l'issue de laquelle un protocole pratique de la prise en charge de la douleur adapté au contexte africain et aux médicaments disponibles sera drafté":
    'Discussion leading to a draft practical pain-management protocol adapted to the African context and to available medicines',
  'Transition des soins pédiatriques vers les soins pour adultes':
    'Transition from paediatric to adult care',
  'Prise en charge des complications aiguës': 'Management of acute complications',
  'Prise en charge des complications chroniques': 'Management of chronic complications',
  'Grossesse et drépanocytose': 'Pregnancy and sickle cell disease',
  'Prévention et prise en charge des complications maternelles et fœtales':
    'Prevention and management of maternal and foetal complications',
  'Accouchement, post-partum et suivi maternel et néonatal':
    'Delivery, postpartum and maternal and newborn follow-up',
  "Hydroxyurée : optimiser l'accès et l'utilisation": 'Hydroxyurea: optimising access and use',
  'Communication libre (hydroxyurée)': 'Free communication (hydroxyurea)',
  "Discussion qui doit aboutir à un draft de protocole pratique d'utilisation et de surveillance de l'hydroxyurée":
    'Discussion leading to a draft practical protocol for the use and monitoring of hydroxyurea',
  'Médecines traditionnelles et drépanocytose': 'Traditional medicine and sickle cell disease',
  'Communication libre — Médecines traditionnelles': 'Free communication — Traditional medicine',
  'Discussion / Fin de J2': 'Discussion / End of Day 2',
  'Transfusion sanguine chez le patient drépanocytaire : indications, stratégies transfusionnelles et seuils décisionnels':
    'Blood transfusion in sickle cell patients: indications, transfusion strategies and decision thresholds',
  'Échanges transfusionnels : indications et faisabilité au Cameroun — indications, efficacité clinique':
    'Exchange transfusion: indications and feasibility in Cameroon — indications, clinical effectiveness',
  'Thérapies curatives et traitements innovants': 'Curative therapies and innovative treatments',
  'Santé mentale et accompagnement psychologique des personnes vivant avec la drépanocytose et de leurs familles':
    'Mental health and psychological support for people living with sickle cell disease and their families',
  'Drépanocytose en milieu scolaire, universitaire et professionnel : sensibilisation, adaptation et accompagnement':
    'Sickle cell disease at school, university and work: awareness, accommodation and support',
  "Rôle des associations de patients et des organisations communautaires dans la prévention, l'éducation et l'accompagnement":
    'Role of patient associations and community organisations in prevention, education and support',
  'Conseil génétique, santé sexuelle et reproductive : planification familiale, conseil préconceptionnel et accompagnement des couples':
    'Genetic counselling, sexual and reproductive health: family planning, preconception counselling and support for couples',
  'Recherche clinique et éthique': 'Clinical research and ethics',
  'Intérêt de la génétique et génomique appliquée à la drépanocytose':
    'The value of genetics and genomics applied to sickle cell disease',
  'Biomarqueurs, médecine de précision et stratification du risque':
    'Biomarkers, precision medicine and risk stratification',
  'Réseaux nationaux, régionaux et internationaux de lutte contre la drépanocytose':
    'National, regional and international networks fighting sickle cell disease',
  'Perspectives pour un accès équitable aux innovations diagnostiques et thérapeutiques en Afrique':
    'Outlook for equitable access to diagnostic and therapeutic innovation in Africa',
  'Communication des partenaires': 'Partner presentations',
  'Cérémonie de clôture': 'Closing ceremony',
  'Remise des prix aux meilleurs abstracts et posters': 'Awards for the best abstracts and posters',
  'Synthèse des travaux / Recommandations finales / Mot de clôture':
    'Summary of proceedings / Final recommendations / Closing address',
  CO: 'OC'
};

/** Renvoie une copie des données avec tous les textes connus traduits en anglais. */
export function translateProgram(value) {
  if (typeof value === 'string') return PROGRAM_EN[value] ?? value;
  if (Array.isArray(value)) return value.map(translateProgram);
  if (value && typeof value === 'object') {
    const out = {};
    for (const [key, v] of Object.entries(value)) {
      // Les identifiants, horaires, catégories et classes CSS ne se traduisent pas
      out[key] = ['id', 'type', 'category', 'style', 'time', 'timeRange', 'hours', 'number', 'dot'].includes(key)
        ? v
        : translateProgram(v);
    }
    return out;
  }
  return value;
}

export default PROGRAM_EN;
