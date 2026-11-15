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
  ArrowRight,
  Anchor,
  Factory,
  Landmark
} from 'lucide-react';

import logoPad from './assets/pad.png';
import logoSabc from './assets/sabc.png';
import logoCnps from './assets/cnps.png';

const SPONSORS_OFFICIELS = [
  {
    id: 'pad',
    sigle: 'PAD',
    nom: 'Port Autonome de Douala',
    statut: 'Sponsor Officiel',
    secteur: 'Infrastructures Portuaires & Logistique Maritime',
    siege: 'Douala · Cameroun',
    logoSrc: logoPad,
    accentBorder: 'hover:border-[#00765a]/50',
    badgeStyle: 'bg-emerald-50 text-[#00765a] border-emerald-200/70',
    glowGradient: 'from-emerald-500/[0.07] via-white to-sky-500/[0.06]',
    sideBar: 'from-[#00765a] to-sky-700',
    icon: Anchor,
    description:
      'Autorité portuaire de référence en Afrique centrale, engagée aux côtés de la communauté médicale et scientifique pour le rayonnement international du congrès à Yaoundé.'
  },
  {
    id: 'sabc',
    sigle: 'SABC',
    nom: 'Boissons du Cameroun',
    statut: 'Sponsor Officiel',
    secteur: 'Industrie Agroalimentaire & Rfsponsabilité Sociétale',
    siege: 'Douala · Yaoundé · Cameroun',
    logoSrc: logoSabc,
    accentBorder: 'hover:border-[#c11236]/50',
    badgeStyle: 'bg-[#c11236]/10 text-[#c11236] border-[#c11236]/20',
    glowGradient: 'from-[#c11236]/[0.07] via-white to-amber-500/[0.06]',
    sideBar: 'from-[#8b0a1d] to-[#c11236]',
    icon: Factory,
    description:
      'Acteur industriel historique au Cameroun, soutenant les initiatives citoyennes de santé publique, de prévention et d’accompagnement des populations.'
  },
  {
    id: 'cnps',
    sigle: 'CNPS',
    nom: 'Caisse Nationale de Prévoyance Sociale',
    statut: 'Sponsor Officiel',
    secteur: 'Protection Sociale & Prévention Santé',
    siege: 'Yaoundé · Cameroun',
    logoSrc: logoCnps,
    accentBorder: 'hover:border-[#8b0a1d]/50',
    badgeStyle: 'bg-[#8b0a1d]/10 text-[#8b0a1d] border-[#8b0a1d]/20',
    glowGradient: 'from-[#8b0a1d]/[0.07] via-white to-emerald-500/[0.06]',
    sideBar: 'from-[#8b0a1d] to-[#00765a]',
    icon: Landmark,
    description:
      'Institution nationale de sécurité et de prévoyance sociale du Cameroun, partenaire des actions dédiées à l’équité d’accès aux soins et à la prise en charge.'
  }
];

function SponsorVisual({ sponsor }) {
  const [imgError, setImgError] = useState(false);
  const IconComponent = sponsor.icon;

  if (!imgError && sponsor.logoSrc) {
    return (
      <img
        src={sponsor.logoSrc}
        alt={`Logo officiel — ${sponsor.nom}`}
        onError={() => setImgError(true)}
        className="max-h-32 sm:max-h-36 w-auto max-w-[82%] object-contain transition-transform duration-500 group-hover:scale-105"
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 transition-transform duration-500 group-hover:scale-105">
      <div className="w-16 h-16 rounded-2xl bg-[#f8f8fa] border border-[#dce0e8] flex items-center justify-center mb-2.5 relative">
        <IconComponent className="w-8 h-8 text-[#8b0a1d]" />
        <span className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-[#1a1a1a] text-white font-mono text-[10px] font-bold tracking-widest">
          {sponsor.sigle}
        </span>
      </div>
      <span className="font-editorial-serif text-base font-bold text-[#1a1a1a] leading-tight">
        {sponsor.nom}
      </span>
    </div>
  );
}

function Informations() {
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
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-white/75 text-xs font-medium mb-6"
          >
            <Link
              to="/"
              className="hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Accueil</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-white font-semibold">
              Sponsors &amp; Partenaires
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-xs font-medium tracking-wide mb-5">
                <Handshake className="w-3.5 h-3.5 text-emerald-300" />
                <span>
                  Mécénat Institutionnel &amp; Soutien Économique · GEDREPACAM
                  2027
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-serif-title font-bold tracking-tight text-white leading-[1.15] mb-4">
                Nos Sponsors &amp; Partenaires
              </h1>

              <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-3xl">
                Le 5<sup>e</sup> Congrès International de la Drépanocytose
                s’appuie sur l’engagement d’institutions nationales et
                d’entreprises citoyennes mobilisées pour l’accès au dépistage
                néonatal et à la prise en charge au Cameroun.
              </p>
            </div>

            {/* Carte repère */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-white/80">
                <span className="flex items-center gap-1.5 font-semibold text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Partenariats Actifs
                </span>
                <span>25 – 27 Mai 2027</span>
              </div>
              <div className="pt-3 border-t border-white/15 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10 text-emerald-300 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/70 block">
                    Engagement Officiel
                  </span>
                  <div className="font-editorial-serif text-lg sm:text-xl font-bold text-white leading-snug mt-0.5">
                    Palais des Congrès de Yaoundé
                  </div>
                  <div className="text-xs text-white/75 mt-0.5">
                    Sous le Haut Parrainage du MINSANTE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. GALERIE D'HONNEUR DES SPONSORS OFFICIELS (LAYOUT ÉDITORIAL SPLIT) */}
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
            {/* Colonne gauche fixe : Introduction & repères */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#c11236] font-bold uppercase tracking-wider mb-2">
                  <Award className="w-4 h-4" />
                  <span>Institutions &amp; Entreprises</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1a1a1a] leading-tight">
                  Sponsors Officiels du Congrès
                </h2>
                <p className="text-sm sm:text-base text-[#555555] mt-3 leading-relaxed">
                  Le comité d’organisation remercie chaleureusement les
                   institutions camerounaises qui accompagnent cette 5
                  <sup>e</sup> édition internationale.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#dce0e8] p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#555555] font-semibold">
                    Partenaires confirmés
                  </span>
                  <span className="font-mono text-lg font-bold text-[#c11236] tabular-nums">
                    0{SPONSORS_OFFICIELS.length}
                  </span>
                </div>
                <div className="pt-3 border-t border-[#dce0e8]/70 flex items-center gap-2 text-xs text-[#00765a] font-medium">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Liste évolutive au fil des conventions signées</span>
                </div>
              </div>
            </aside>

            {/* Colonne droite : Cartes horizontales grand format */}
            <div className="lg:col-span-8 space-y-6">
              {SPONSORS_OFFICIELS.map((sponsor, index) => (
                <article
                  key={sponsor.id}
                  className={`group bg-white rounded-3xl border border-[#dce0e8] ${sponsor.accentBorder} shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden relative`}
                >
                  {/* Liseré latéral gauche sur grand écran, supérieur sur mobile */}
                  <div
                    className={`h-1.5 sm:h-full sm:w-1.5 w-full bg-gradient-to-r sm:bg-gradient-to-b ${sponsor.sideBar} sm:absolute sm:top-0 sm:left-0 z-20`}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-12 items-stretch">
                    {/* Écrin visuel du logo (Colonne gauche de la carte) */}
                    <div
                      className={`sm:col-span-5 relative min-h-[210px] sm:min-h-[240px] bg-gradient-to-br ${sponsor.glowGradient} border-b sm:border-b-0 sm:border-r border-[#dce0e8]/80 flex items-center justify-center p-6 overflow-hidden`}
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

                      {/* Cadre blanc pur mettant le logo en valeur */}
                      <div className="relative z-10 w-full h-40 sm:h-44 rounded-2xl bg-white border border-[#dce0e8]/80 shadow-xs flex items-center justify-center px-5 py-4">
                        <SponsorVisual sponsor={sponsor} />
                      </div>
                    </div>

                    {/* Fiche institutionnelle (Colonne droite de la carte) */}
                    <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-5">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-[#00765a] font-semibold">
                            {sponsor.secteur}
                          </span>
                          <span
                            className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full border ${sponsor.badgeStyle}`}
                          >
                            {sponsor.statut}
                          </span>
                        </div>

                        <h3 className="font-editorial-serif text-2xl font-bold text-[#1a1a1a] leading-snug">
                          {sponsor.nom}
                        </h3>

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
                <span>Rejoindre nos partenaires</span>
              </span>
              <h2 className="font-editorial-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Associez votre institution au 5<sup>e</sup> Congrès GEDREPACAM
              </h2>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                Laboratoires pharmaceutiques, établissements de santé,
                organisations internationales et entreprises : bénéficiez d’une
                visibilité privilégiée auprès des décideurs et praticiens à
                Yaoundé.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#8b0a1d] hover:bg-[#f8f8fa] text-sm font-bold transition-colors shadow-xs"
              >
                <span>S'inscrire comme partenaire</span>
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