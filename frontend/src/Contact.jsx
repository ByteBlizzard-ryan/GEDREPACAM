import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Clock,
  Mail,
  AtSign,
  Inbox,
  Phone,
  Smartphone,
  Calendar,
  Landmark,
  User,
  Send,
  Lock,
  Award,
  FileText,
  Globe
} from 'lucide-react';
import { useLang } from './context/LanguageContext';

const OFFICIAL_EMAIL = 'gedrepacam237@gmail.com';

const SUBJECT_LABELS = {
  inscription: { fr: 'Inscription & Accréditation', en: 'Registration & Accreditation' },
  soumission: { fr: 'Soumission de résumé scientifique', en: 'Scientific abstract submission' },
  sponsoring: { fr: 'Sponsoring & Partenariat institutionnel', en: 'Sponsorship & Institutional partnership' },
  autre: { fr: 'Autre demande', en: 'Other request' }
};

function Contact() {
  const { t, lang } = useLang();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const fullname = String(formData.get('fullname') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const subjectKey = String(formData.get('subject') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const subjectLabel = SUBJECT_LABELS[subjectKey]?.[lang] || t('Demande en ligne', 'Online request');

    const emailSubject = `[GEDREPACAM 2027] ${subjectLabel} — ${fullname}`;
    const emailBody = [
      t('Bonjour le secrétariat GEDREPACAM,', 'Dear GEDREPACAM Secretariat,'),
      '',
      `${t('Nom complet :', 'Full name:')} ${fullname}`,
      `${t('Email de contact :', 'Contact email:')} ${email}`,
      `${t('Objet :', 'Subject:')} ${subjectLabel}`,
      '',
      t('Message :', 'Message:'),
      message
    ].join('\n');

    const mailtoUrl = `mailto:${OFFICIAL_EMAIL}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoUrl;
  };

  return (
    <main className="relative overflow-x-clip w-full bg-white text-[#1a1a1a] selection:bg-[#c11236] selection:text-white">
      {/* 1. EN-TÊTE ÉDITORIAL BORDEAUX AVEC HÉMATIES EN FILIGRANE */}
      <header className="relative bg-gradient-to-br from-[#8b0a1d] via-[#7e0819] to-[#690715] text-white overflow-hidden pt-28 sm:pt-32 pb-14 lg:pb-16 border-b border-[#c11236]/20">
        {/* Filigranes SVG d'hématies */}
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
          {/* Fil d'Ariane */}
          <nav
            aria-label={t("Fil d'Ariane", 'Breadcrumb')}
            className="flex items-center gap-1.5 text-white/75 text-xs font-medium mb-6"
          >
            <Link
              to="/"
              className="hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{t('Accueil', 'Home')}</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-white font-semibold">Contact</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-xs font-medium tracking-wide mb-5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>
                  {t(
                    'Secrétariat & Permanence · Délégués, Orateurs & Partenaires',
                    'Secretariat & Helpdesk · Delegates, Speakers & Partners'
                  )}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-serif-title font-bold tracking-tight text-white leading-[1.15] mb-4">
                {t('Contactez-nous', 'Contact us')}
              </h1>

              <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-3xl">
                {t(
                  <>
                    Le secrétariat d’organisation du 5<sup>e</sup> Congrès International de la Drépanocytose
                    est à votre disposition pour toute question relative aux inscriptions, aux soumissions
                    scientifiques ou aux conventions de partenariat.
                  </>,
                  <>
                    The organising secretariat of the 5<sup>th</sup> International Sickle Cell Disease
                    Congress is available to answer any questions about registration, scientific submissions
                    or partnership agreements.
                  </>
                )}
              </p>
            </div>

            {/* Carte repère */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-white/80">
                <span className="flex items-center gap-1.5 font-semibold text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {t('Permanence Active', 'Helpdesk Open')}
                </span>
                <span>GMT+1 · Yaoundé</span>
              </div>
              <div className="pt-3 border-t border-white/15 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10 text-emerald-300 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/70 block">
                    {t('Engagement de réponse', 'Response commitment')}
                  </span>
                  <div className="font-editorial-serif text-lg sm:text-xl font-bold text-white leading-snug mt-0.5">
                    {t('Délai moyen < 48h ouvrées', 'Average reply < 48 working hours')}
                  </div>
                  <div className="text-xs text-white/75 mt-0.5">
                    {t('Lundi au Vendredi · 08h00 – 18h00', 'Monday to Friday · 8:00 am – 6:00 pm')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. SECTION PRINCIPALE : COORDONNÉES & FORMULAIRE EN LIGNE */}
      <section className="relative w-full bg-[#f8f8fa] border-b border-[#dce0e8] py-16 lg:py-24 overflow-hidden">
        {/* Filigranes discrets en arrière-plan */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <svg
            className="absolute -right-24 top-10 w-[440px] h-[440px] text-[#8b0a1d]/[0.03]"
            fill="currentColor"
            viewBox="0 0 100 100"
          >
            <path d="M50 10 C27.9 10 10 27.9 10 50 C10 72.1 27.9 90 50 90 C62.5 90 73.6 84.3 80.8 75.3 C65.6 77.1 51.5 68.2 46.1 53.6 C40.8 39.2 46.5 23.3 59.8 15.2 C56.7 11.9 53.4 10 50 10 Z" />
          </svg>
          <svg
            className="absolute -left-20 bottom-12 w-80 h-80 text-[#00765a]/[0.03]"
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Colonne de gauche : Canaux directs & Protocoles */}
            <div className="lg:col-span-5 space-y-5">
              {/* Carte 1 : Secrétariat d'organisation */}
              <div className="bg-white p-6 rounded-2xl border border-[#dce0e8] shadow-xs hover:border-[#00765a]/40 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-center shrink-0 text-[#00765a]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#00765a] font-bold">
                      {t('Courrier électronique & Portail', 'Email & Website')}
                    </span>
                    <h2 className="font-editorial-serif text-xl font-bold text-[#1a1a1a]">
                      {t('Secrétariat d’organisation', 'Organising secretariat')}
                    </h2>
                    <p className="text-sm text-[#555555] leading-relaxed">
                      {t(
                        'Pour toute demande liée aux inscriptions, à la logistique d’accueil et aux sessions scientifiques.',
                        'For any request about registration, on-site logistics and scientific sessions.'
                      )}
                    </p>
                    <div className="pt-2 flex flex-col gap-1.5">
                      <a
                        className="text-sm font-bold text-[#8b0a1d] hover:text-[#c11236] transition-colors inline-flex items-center gap-2 break-all"
                        href="mailto:gedrepacam237@gmail.com"
                      >
                        <AtSign className="w-4 h-4 shrink-0" />
                        <span>gedrepacam237@gmail.com</span>
                      </a>
                      <a
                        className="text-sm font-medium text-[#555555] hover:text-[#1a1a1a] transition-colors inline-flex items-center gap-2"
                        href="https://www.gedrepacam.cm"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Globe className="w-4 h-4 shrink-0 text-[#00765a]" />
                        <span>www.gedrepacam.cm</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte 2 : Assistance téléphonique */}
              <div className="bg-white p-6 rounded-2xl border border-[#dce0e8] shadow-xs hover:border-[#c11236]/40 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#c11236]/10 border border-[#c11236]/20 flex items-center justify-center shrink-0 text-[#c11236]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#c11236] font-bold">
                      {t('Standard & Délégations', 'Switchboard & Delegations')}
                    </span>
                    <h2 className="font-editorial-serif text-xl font-bold text-[#1a1a1a]">
                      {t('Assistance téléphonique', 'Phone support')}
                    </h2>
                    <p className="text-sm text-[#555555] leading-relaxed">
                      {t(
                        'Ligne dédiée aux congressistes, intervenants et délégations internationales.',
                        'Dedicated line for attendees, speakers and international delegations.'
                      )}
                    </p>
                    <div className="pt-2 flex flex-col gap-1.5">
                      <a
                        className="text-sm font-bold text-[#1a1a1a] hover:text-[#c11236] transition-colors inline-flex items-center gap-2 font-mono"
                        href="tel:+237694126461"
                      >
                        <Phone className="w-4 h-4 text-[#8b0a1d] shrink-0" />
                        <span>+237 694 12 64 61</span>
                      </a>
                      <a
                        className="text-sm font-bold text-[#1a1a1a] hover:text-[#c11236] transition-colors inline-flex items-center gap-2 font-mono"
                        href="tel:+237677489614"
                      >
                        <Smartphone className="w-4 h-4 text-[#00765a] shrink-0" />
                        <span>+237 677 48 96 14</span>
                      </a>
                      <div className="flex items-center gap-2 text-[#555555] text-xs pt-1.5 border-t border-[#dce0e8]/70 mt-1">
                        <Calendar className="w-3.5 h-3.5 text-[#00765a] shrink-0" />
                        <span>{t('Lundi au Vendredi, 08h00 – 18h00 (GMT+1)', 'Monday to Friday, 8:00 am – 6:00 pm (GMT+1)')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte 3 : Délégations & Protocoles Officiels */}
              <div className="bg-white p-6 rounded-2xl border border-[#dce0e8] shadow-xs relative overflow-hidden">
                <div className="h-full w-1 bg-gradient-to-b from-[#8b0a1d] to-[#00765a] absolute top-0 left-0" />
                <div className="space-y-2.5 pl-2">
                  <div className="inline-flex items-center gap-2 text-[#8b0a1d] text-xs font-mono font-bold uppercase tracking-wider">
                    <Landmark className="w-4 h-4" />
                    <span>{t('Délégations & Protocoles Officiels', 'Delegations & Official Protocol')}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                    {t(
                      <>
                        Pour les courriers ministériels, ordres professionnels et délégations diplomatiques, les
                        correspondances officielles sont traitées conjointement avec le haut patronage du{' '}
                        <strong className="text-[#1a1a1a]">MINSANTE Cameroun</strong> et la coordination
                        scientifique du <strong className="text-[#1a1a1a]">GEDREPACAM</strong>.
                      </>,
                      <>
                        Letters from ministries, professional bodies and diplomatic delegations are handled
                        jointly by the high patronage of{' '}
                        <strong className="text-[#1a1a1a]">MINSANTE Cameroon</strong> and the scientific
                        coordination of <strong className="text-[#1a1a1a]">GEDREPACAM</strong>.
                      </>
                    )}
                  </p>
                  <div className="pt-1 flex items-center gap-1.5 text-[#00765a] text-xs font-semibold">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>{t('Protocole certifié GEDREPACAM Yaoundé', 'Certified GEDREPACAM Yaoundé protocol')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne de droite : Formulaire de contact */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-[#dce0e8] shadow-xs overflow-hidden relative">
                {/* Liseré supérieur bordeaux-carmin */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#8b0a1d] via-[#c11236] to-[#00765a]" />

                <div className="p-7 sm:p-10">
                  <div className="mb-8">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#c11236] font-bold block mb-1.5">
                      {t('Messagerie directe', 'Direct message')}
                    </span>
                    <h2 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#1a1a1a] tracking-tight">
                      {t('Préparer votre e-mail au secrétariat', 'Prepare your email to the secretariat')}
                    </h2>
                    <p className="text-sm text-[#555555] mt-1.5">
                      {t(
                        'Renseignez les champs ci-dessous : votre application de messagerie ou votre webmail s’ouvrira automatiquement avec le message prêt à être envoyé à',
                        'Fill in the fields below: your email app or webmail will open automatically with the message ready to send to'
                      )}{' '}
                      <span className="font-medium text-[#1a1a1a]">
                        gedrepacam237@gmail.com
                      </span>
                      .
                    </p>
                  </div>

                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Nom complet */}
                      <div className="space-y-1.5">
                        <label
                          className="text-xs font-mono uppercase tracking-wider text-[#1a1a1a] font-bold flex items-center gap-1"
                          htmlFor="fullname"
                        >
                          <span>{t('Nom complet', 'Full name')}</span>
                          <span className="text-[#c11236]">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <User className="w-4 h-4 absolute left-3.5 text-[#555555] pointer-events-none" />
                          <input
                            className="w-full pl-10 pr-4 py-3 bg-[#f8f8fa] border border-[#dce0e8] rounded-xl text-sm text-[#1a1a1a] placeholder:text-[#555555]/60 focus:bg-white focus:outline-none focus:border-[#8b0a1d] focus:ring-2 focus:ring-[#8b0a1d]/15 transition-all"
                            id="fullname"
                            name="fullname"
                            placeholder={t('Ex : Dr. Martin Eboa', 'e.g. Dr. Martin Eboa')}
                            required
                            type="text"
                          />
                        </div>
                      </div>

                      {/* Adresse e-mail */}
                      <div className="space-y-1.5">
                        <label
                          className="text-xs font-mono uppercase tracking-wider text-[#1a1a1a] font-bold flex items-center gap-1"
                          htmlFor="email"
                        >
                          <span>{t('Adresse e-mail', 'Email address')}</span>
                          <span className="text-[#c11236]">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <AtSign className="w-4 h-4 absolute left-3.5 text-[#555555] pointer-events-none" />
                          <input
                            className="w-full pl-10 pr-4 py-3 bg-[#f8f8fa] border border-[#dce0e8] rounded-xl text-sm text-[#1a1a1a] placeholder:text-[#555555]/60 focus:bg-white focus:outline-none focus:border-[#8b0a1d] focus:ring-2 focus:ring-[#8b0a1d]/15 transition-all"
                            id="email"
                            name="email"
                            placeholder={t('votre.email@institut.cm', 'your.email@institute.org')}
                            required
                            type="email"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Sujet */}
                    <div className="space-y-1.5">
                      <label
                        className="text-xs font-mono uppercase tracking-wider text-[#1a1a1a] font-bold flex items-center gap-1"
                        htmlFor="subject"
                      >
                        <span>{t('Sujet de votre demande', 'Subject of your request')}</span>
                        <span className="text-[#c11236]">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <Inbox className="w-4 h-4 absolute left-3.5 text-[#555555] pointer-events-none" />
                        <select
                          className="w-full pl-10 pr-10 py-3 bg-[#f8f8fa] border border-[#dce0e8] rounded-xl text-sm text-[#1a1a1a] focus:bg-white focus:outline-none focus:border-[#8b0a1d] focus:ring-2 focus:ring-[#8b0a1d]/15 appearance-none cursor-pointer transition-all"
                          defaultValue=""
                          id="subject"
                          name="subject"
                          required
                        >
                          <option disabled value="">
                            {t('Sélectionnez un sujet', 'Select a subject')}
                          </option>
                          {Object.entries(SUBJECT_LABELS).map(([key, label]) => (
                            <option key={key} value={key}>
                              {label[lang]}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 absolute right-3.5 text-[#555555] pointer-events-none" />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label
                        className="text-xs font-mono uppercase tracking-wider text-[#1a1a1a] font-bold flex items-center gap-1"
                        htmlFor="message"
                      >
                        <span>{t('Votre message', 'Your message')}</span>
                        <span className="text-[#c11236]">*</span>
                      </label>
                      <textarea
                        className="w-full p-4 bg-[#f8f8fa] border border-[#dce0e8] rounded-xl text-sm text-[#1a1a1a] placeholder:text-[#555555]/60 focus:bg-white focus:outline-none focus:border-[#8b0a1d] focus:ring-2 focus:ring-[#8b0a1d]/15 transition-all min-h-[150px] resize-y"
                        id="message"
                        name="message"
                        placeholder={t(
                          'Précisez votre demande, votre institution ou vos références de dossier...',
                          'Describe your request, your institution or your file references...'
                        )}
                        required
                        rows="5"
                      />
                    </div>

                    {/* Consentement */}
                    <div className="pt-1">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          className="mt-0.5 h-4 w-4 rounded border-[#dce0e8] accent-[#8b0a1d] cursor-pointer"
                          required
                          type="checkbox"
                        />
                        <span className="text-xs text-[#555555] group-hover:text-[#1a1a1a] transition-colors leading-relaxed">
                          {t(
                            'J’accepte que mes coordonnées soient traitées par le secrétariat GEDREPACAM pour le suivi de ma demande, conformément à la politique d’éthique et de confidentialité biomédicale.',
                            'I agree that my contact details may be processed by the GEDREPACAM secretariat to follow up on my request, in accordance with the biomedical ethics and privacy policy.'
                          )}
                        </span>
                      </label>
                    </div>

                    {/* Bouton d'ouverture de messagerie */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <button
                        className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#8b0a1d] hover:bg-[#c11236] text-white text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2 group cursor-pointer"
                        type="submit"
                      >
                        <span>{t('Ouvrir ma messagerie', 'Open my email app')}</span>
                        <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </button>

                      <div className="flex items-center gap-1.5 text-[#555555] text-xs font-medium">
                        <Lock className="w-3.5 h-3.5 text-[#00765a] shrink-0" />
                        <span>{t('Envoi direct depuis votre boîte mail', 'Sent directly from your mailbox')}</span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INFORMATIONS COMPLÉMENTAIRES BAS DE PAGE */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-[#dce0e8] shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-center shrink-0 text-[#00765a]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial-serif text-lg font-bold text-[#1a1a1a]">
                {t('Badges & Accréditations', 'Badges & Accreditation')}
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] mt-1 leading-relaxed">
                {t(
                  'Retrait direct au guichet d’accueil du Palais des Congrès dès le 25 mai 2027 à 07h30.',
                  'Collect at the Conference Centre reception desk from 25 May 2027 at 7:30 am.'
                )}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-[#dce0e8] shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-[#c11236]/10 border border-[#c11236]/20 flex items-center justify-center shrink-0 text-[#c11236]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial-serif text-lg font-bold text-[#1a1a1a]">
                {t('Comité Scientifique', 'Scientific Committee')}
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] mt-1 leading-relaxed">
                {t(
                  'Évaluation continue des résumés, posters et communications orales par les rapporteurs.',
                  'Ongoing review of abstracts, posters and oral presentations by the reviewers.'
                )}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-[#dce0e8] shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-[#8b0a1d]/10 border border-[#8b0a1d]/20 flex items-center justify-center shrink-0 text-[#8b0a1d]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial-serif text-lg font-bold text-[#1a1a1a]">
                {t('Visas & Accueil Délégués', 'Visas & Delegate Welcome')}
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] mt-1 leading-relaxed">
                {t(
                  'Lettres d’invitation officielles délivrées sous 72h pour les participants internationaux.',
                  'Official invitation letters issued within 72 hours for international participants.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
