import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  Award,
  Handshake,
  Building2,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';

import logoEbPartner from './assets/eb-partner.jpeg';
import { useLang } from './context/LanguageContext';
// import logoPad from './assets/pad.png';
// import logoSabc from './assets/sabc.png';
// import logoCnps from './assets/cnps.png';

// Liste des partenaires classés par niveau : 'or' | 'argent' | 'bronze'
const PARTENAIRES_OFFICIELS = [
  {
    id: 'eb-partner',
    categorie: 'bronze',
    sigle: 'EB-PARTNER',
    nom: 'EB-Partner',
    secteur: 'Partenaire Officiel · Congrès 2027',
    siege: 'Cameroun',
    logoSrc: logoEbPartner,
    description:
      'Entreprise partenaire engagée aux côtés du GEDREPACAM pour la réussite organisationnelle et le rayonnement de cette 5e édition internationale à Yaoundé.',
    en: {
      secteur: 'Official Partner · Congress 2027',
      siege: 'Cameroon',
      description:
        'A partner company working alongside GEDREPACAM to ensure the organisational success and visibility of this 5th international edition in Yaoundé.'
    }
  }
];

// Configuration visuelle distincte pour Or, Argent et Bronze
const NIVEAUX_SPONSORS = [
  {
    key: 'or',
    anchor: 'tier-or',
    titre: 'Partenaires Or',
    badgeLabel: 'Catégorie Or',
    sousTitre: 'Partenariat Majeur · Visibilité de Premier Plan',
    en: { titre: 'Gold Partners', badgeLabel: 'Gold Tier', sousTitre: 'Major Partnership · Top-tier Visibility' },
    headerLine: 'from-amber-400 via-yellow-500 to-amber-600',
    pillStyle:
      'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-xs',
    dotColor: 'bg-amber-500',
    cardBorder: 'border-amber-400/75 hover:border-amber-500',
    glowGradient: 'from-amber-500/[0.10] via-amber-50/40 to-yellow-500/[0.08]',
    sideBar: 'from-amber-400 via-yellow-500 to-amber-600',
    logoFrameBorder: 'border-amber-300/90',
    titleColor: 'text-amber-950',
    accentText: 'text-amber-800',
    emptyBg: 'bg-gradient-to-b from-amber-50/60 via-white to-white border-amber-300/80'
  },
  {
    key: 'argent',
    anchor: 'tier-argent',
    titre: 'Partenaires Argent',
    badgeLabel: 'Catégorie Argent',
    sousTitre: 'Partenariat Institutionnel & Technique',
    en: { titre: 'Silver Partners', badgeLabel: 'Silver Tier', sousTitre: 'Institutional & Technical Partnership' },
    headerLine: 'from-slate-300 via-slate-400 to-slate-500',
    pillStyle:
      'bg-gradient-to-r from-slate-500 to-slate-600 text-white shadow-xs',
    dotColor: 'bg-slate-400',
    cardBorder: 'border-slate-300/90 hover:border-slate-400',
    glowGradient: 'from-slate-400/[0.10] via-slate-50/60 to-slate-300/[0.08]',
    sideBar: 'from-slate-400 via-slate-500 to-slate-600',
    logoFrameBorder: 'border-slate-300',
    titleColor: 'text-slate-900',
    accentText: 'text-slate-700',
    emptyBg: 'bg-gradient-to-b from-slate-100/70 via-white to-white border-slate-300/80'
  },
  {
    key: 'bronze',
    anchor: 'tier-bronze',
    titre: 'Partenaires Bronze',
    badgeLabel: 'Catégorie Bronze',
    sousTitre: 'Soutien Officiel du Congrès',
    en: { titre: 'Bronze Partners', badgeLabel: 'Bronze Tier', sousTitre: 'Official Congress Support' },
    headerLine: 'from-amber-700 via-orange-700 to-amber-800',
    pillStyle:
      'bg-gradient-to-r from-amber-700 to-orange-800 text-white shadow-xs',
    dotColor: 'bg-amber-700',
    cardBorder: 'border-orange-300/85 hover:border-amber-700/60',
    glowGradient: 'from-orange-500/[0.09] via-orange-50/40 to-amber-700/[0.07]',
    sideBar: 'from-amber-700 via-orange-700 to-amber-800',
    logoFrameBorder: 'border-orange-200/90',
    titleColor: 'text-stone-900',
    accentText: 'text-amber-900',
    emptyBg: 'bg-gradient-to-b from-orange-50/60 via-white to-white border-orange-300/80'
  }
];

function SponsorVisual({ sponsor }) {
  const [imgError, setImgError] = useState(false);
  const { t } = useLang();

  if (!imgError && sponsor.logoSrc) {
    return (
      <img
        src={sponsor.logoSrc}
        alt={`${t('Logo officiel', 'Official logo')} — ${sponsor.nom}`}
        onError={() => setImgError(true)}
        className="max-h-36 sm:max-h-40 w-auto max-w-[88%] object-contain transition-transform duration-500 group-hover:scale-105"
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 transition-transform duration-500 group-hover:scale-105">
      <div className="w-16 h-16 rounded-2xl bg-[#f8f8fa] border border-[#dce0e8] flex items-center justify-center mb-2.5">
        <Award className="w-8 h-8 text-amber-800" />
      </div>
      <span className="font-editorial-serif text-xl font-bold text-[#1a1a1a] tracking-wide leading-tight">
        {sponsor.nom}
      </span>
    </div>
  );
}

function Informations() {
  const { t, pick } = useLang();
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
            <span className="text-white font-semibold">
              {t('Sponsors & Partenaires', 'Sponsors & Partners')}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-xs font-medium tracking-wide mb-5">
                <Handshake className="w-3.5 h-3.5 text-emerald-300" />
                <span>
                  {t('Partenariats Or, Argent & Bronze · GEDREPACAM 2027', 'Gold, Silver & Bronze Partnerships · GEDREPACAM 2027')}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-serif-title font-bold tracking-tight text-white leading-[1.15] mb-4">
                {t('Nos Sponsors & Partenaires', 'Our Sponsors & Partners')}
              </h1>

              <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-3xl">
                {t(
                  <>
                    Le 5<sup>e</sup> Congrès International de la Drépanocytose s’appuie sur l’engagement
                    d’institutions et d’entreprises citoyennes mobilisées à travers trois niveaux de partenariat
                    officiel : <strong>Or</strong>, <strong>Argent</strong> et <strong>Bronze</strong>.
                  </>,
                  <>
                    The 5<sup>th</sup> International Sickle Cell Disease Congress relies on the commitment of
                    socially responsible institutions and companies through three levels of official
                    partnership: <strong>Gold</strong>, <strong>Silver</strong> and <strong>Bronze</strong>.
                  </>
                )}
              </p>
            </div>

            {/* Carte repère */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-white/80">
                <span className="flex items-center gap-1.5 font-semibold text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {t('Partenariats Actifs', 'Active Partnerships')}
                </span>
                <span>{t('25 – 27 Mai 2027', '25 – 27 May 2027')}</span>
              </div>
              <div className="pt-3 border-t border-white/15 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10 text-emerald-300 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/70 block">
                    {t('Engagement Officiel', 'Official Commitment')}
                  </span>
                  <div className="font-editorial-serif text-lg sm:text-xl font-bold text-white leading-snug mt-0.5">
                    {t('Palais des Congrès de Yaoundé', 'Yaoundé Conference Centre')}
                  </div>
                  <div className="text-xs text-white/75 mt-0.5">
                    {t('Sous le Haut Parrainage du MINSANTE', 'Under the High Patronage of MINSANTE')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. GALERIE D'HONNEUR DES PARTENAIRES OR, ARGENT & BRONZE */}
      <section className="relative w-full bg-[#f8f8fa] border-b border-[#dce0e8] py-16 lg:py-24 overflow-hidden">
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
            {/* Colonne gauche fixe : Introduction & repères des 3 niveaux */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#c11236] font-bold uppercase tracking-wider mb-2">
                  <Award className="w-4 h-4" />
                  <span>{t('Institutions & Entreprises', 'Institutions & Companies')}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1a1a1a] leading-tight">
                  {t('Partenaires Officiels du Congrès', 'Official Congress Partners')}
                </h2>
                <p className="text-sm sm:text-base text-[#555555] mt-3 leading-relaxed">
                  {t(
                    <>
                      Le comité d’organisation remercie chaleureusement les entreprises et institutions qui
                      accompagnent cette 5<sup>e</sup> édition internationale.
                    </>,
                    <>
                      The organising committee warmly thanks the companies and institutions supporting this
                      5<sup>th</sup> international edition.
                    </>
                  )}
                </p>
              </div>

              {/* Récapitulatif des niveaux Or, Argent, Bronze */}
              <div className="bg-white rounded-2xl border border-[#dce0e8] p-5 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#555555] font-semibold">
                    {t('Partenaires confirmés', 'Confirmed partners')}
                  </span>
                  <span className="font-mono text-lg font-bold text-[#c11236] tabular-nums">
                    {String(PARTENAIRES_OFFICIELS.length).padStart(2, '0')}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#dce0e8]/70 space-y-2.5">
                  {NIVEAUX_SPONSORS.map(pick).map((tier) => {
                    const count = PARTENAIRES_OFFICIELS.filter(
                      (p) => p.categorie === tier.key
                    ).length;

                    return (
                      <a
                        key={tier.key}
                        href={`#${tier.anchor}`}
                        className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg hover:bg-[#f8f8fa] transition-colors"
                      >
                        <span className="inline-flex items-center gap-2 font-semibold text-[#1a1a1a]">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${tier.dotColor}`}
                          />
                          <span>{tier.titre}</span>
                        </span>
                        <span className="font-mono font-bold text-[#555555]">
                          {count > 0
                            ? String(count).padStart(2, '0')
                            : t('À venir', 'Coming soon')}
                        </span>
                      </a>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-[#dce0e8]/70 flex items-center gap-2 text-xs text-[#00765a] font-medium">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>{t('Liste évolutive au fil des conventions signées', 'List updated as agreements are signed')}</span>
                </div>
              </div>
            </aside>

            {/* Colonne droite : Niveaux Or, Argent & Bronze */}
            <div className="lg:col-span-8 space-y-14">
              {NIVEAUX_SPONSORS.map(pick).map((tier) => {
                const items = PARTENAIRES_OFFICIELS.filter(
                  (p) => p.categorie === tier.key
                );

                return (
                  <div
                    key={tier.key}
                    id={tier.anchor}
                    className="scroll-mt-28 space-y-6"
                  >
                    {/* En-tête distinctif Or / Argent / Bronze */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#dce0e8]">
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest ${tier.pillStyle}`}
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>{tier.badgeLabel}</span>
                        </span>
                        <h3
                          className={`font-editorial-serif text-2xl font-bold ${tier.titleColor}`}
                        >
                          {tier.titre}
                        </h3>
                      </div>
                      <span
                        className={`text-xs font-medium ${tier.accentText}`}
                      >
                        {tier.sousTitre}
                      </span>
                    </div>

                    {items.length > 0 ? (
                      <div className="space-y-6">
                        {items.map(pick).map((sponsor, index) => (
                          <article
                            key={sponsor.id}
                            className={`group bg-white rounded-3xl border-2 ${tier.cardBorder} shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden relative`}
                          >
                            {/* Liseré métallique latéral */}
                            <div
                              className={`h-2 sm:h-full sm:w-2 w-full bg-gradient-to-r sm:bg-gradient-to-b ${tier.sideBar} sm:absolute sm:top-0 sm:left-0 z-20`}
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-12 items-stretch">
                              {/* Grand écrin visuel du logo */}
                              <div
                                className={`sm:col-span-5 relative min-h-[230px] sm:min-h-[260px] bg-gradient-to-br ${tier.glowGradient} border-b sm:border-b-0 sm:border-r border-[#dce0e8]/80 flex items-center justify-center p-6 overflow-hidden`}
                              >
                                {/* Grille studio discrète */}
                                <div
                                  aria-hidden="true"
                                  className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"
                                />

                                {/* Numéro éditorial en filigrane */}
                                <span
                                  aria-hidden="true"
                                  className="absolute top-3 left-5 font-editorial-serif text-3xl font-bold text-[#1a1a1a]/[0.07] select-none"
                                >
                                  0{index + 1}
                                </span>

                                {/* Cadre blanc pur mettant le logo en grand format */}
                                <div
                                  className={`relative z-10 w-full h-44 sm:h-48 rounded-2xl bg-white border-2 ${tier.logoFrameBorder} shadow-xs flex items-center justify-center px-5 py-4`}
                                >
                                  <SponsorVisual sponsor={sponsor} />
                                </div>
                              </div>

                              {/* Fiche partenaire */}
                              <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-5">
                                <div className="space-y-3">
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#00765a] font-semibold">
                                      {sponsor.secteur}
                                    </span>
                                    <span
                                      className={`inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider font-bold px-3 py-1 rounded-full ${tier.pillStyle}`}
                                    >
                                      <Award className="w-3 h-3" />
                                      <span>{tier.badgeLabel}</span>
                                    </span>
                                  </div>

                                  <h4 className="font-editorial-serif text-2xl sm:text-[26px] font-bold text-[#1a1a1a] leading-snug">
                                    {sponsor.nom}
                                  </h4>

                                  <p className="text-sm text-[#555555] leading-relaxed">
                                    {sponsor.description}
                                  </p>
                                </div>

                                <div className="pt-4 border-t border-[#dce0e8]/70 flex items-center justify-between gap-3 text-xs text-[#555555]">
                                  <span className="inline-flex items-center gap-1.5 font-medium">
                                    <Building2 className="w-3.5 h-3.5 text-[#8b0a1d] shrink-0" />
                                    <span>{sponsor.siege}</span>
                                  </span>
                                  <span className="font-mono font-bold text-[#1a1a1a] bg-[#f8f8fa] px-2.5 py-1 rounded-md border border-[#dce0e8]">
                                    {sponsor.sigle}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    ) : (
                      <div
                        className={`rounded-3xl border-2 border-dashed p-8 text-center ${tier.emptyBg}`}
                      >
                        <span
                          className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 ${tier.pillStyle}`}
                        >
                          <Award className="w-3 h-3" />
                          <span>{tier.badgeLabel}</span>
                        </span>
                        <p className={`text-sm font-medium ${tier.accentText}`}>
                          {t(
                            `Les partenaires de la ${tier.badgeLabel.toLowerCase()} seront annoncés prochainement au fil de la signature des conventions.`,
                            `${tier.badgeLabel} partners will be announced soon as agreements are signed.`
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. APPEL À PARTENARIAT & EXPOSITION */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="rounded-3xl bg-gradient-to-br from-[#8b0a1d] via-[#7e0819] to-[#690715] text-white p-8 sm:p-12 relative overflow-hidden shadow-sm">
          {/* Hématie décorative */}
          <div
            aria-hidden="true"
            className="absolute -right-12 -bottom-16 w-72 h-72 text-white/10 pointer-events-none"
          >
            <svg fill="currentColor" viewBox="0 0 100 100">
              <path d="M50 10 C27.9 10 10 27.9 10 50 C10 72.1 27.9 90 50 90 C62.5 90 73.6 84.3 80.8 75.3 C65.6 77.1 51.5 68.2 46.1 53.6 C40.8 39.2 46.5 23.3 59.8 15.2 C56.7 11.9 53.4 10 50 10 Z" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-emerald-300 font-bold">
                <Handshake className="w-4 h-4" />
                <span>{t('Rejoindre nos partenaires', 'Join our partners')}</span>
              </span>
              <h2 className="font-editorial-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                {t(
                  <>Associez votre institution au 5<sup>e</sup> Congrès GEDREPACAM</>,
                  <>Partner your institution with the 5<sup>th</sup> GEDREPACAM Congress</>
                )}
              </h2>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                {t(
                  'Laboratoires pharmaceutiques, établissements de santé, organisations internationales et entreprises : bénéficiez d’une visibilité privilégiée auprès des décideurs et praticiens à Yaoundé.',
                  'Pharmaceutical companies, healthcare facilities, international organisations and businesses: gain prime visibility with decision-makers and practitioners in Yaoundé.'
                )}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#8b0a1d] hover:bg-[#f8f8fa] text-sm font-bold transition-colors shadow-xs"
              >
                <span>{t("S'inscrire comme partenaire", 'Become a partner')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Informations;