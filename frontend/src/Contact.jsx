import React, { useState } from 'react';
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
  CheckCircle2,
  Award,
  FileText,
  Globe
} from 'lucide-react';

function Contact() {
  const [successBanner, setSuccessBanner] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessBanner(true);
    e.target.reset();
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
            <span className="text-white font-semibold">Contact</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-xs font-medium tracking-wide mb-5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>
                  Secrétariat &amp; Permanence · Délégués, Orateurs &amp;
                  Partenaires
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-serif-title font-bold tracking-tight text-white leading-[1.15] mb-4">
                Contactez-nous
              </h1>

              <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-3xl">
                Le secrétariat d’organisation du 5<sup>e</sup> Congrès
                International de la Drépanocytose est à votre disposition pour
                toute question relative aux inscriptions, aux soumissions
                scientifiques ou aux conventions de partenariat.
              </p>
            </div>

            {/* Carte repère */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-white/80">
                <span className="flex items-center gap-1.5 font-semibold text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Permanence Active
                </span>
                <span>GMT+1 · Yaoundé</span>
              </div>
              <div className="pt-3 border-t border-white/15 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10 text-emerald-300 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/70 block">
                    Engagement de réponse
                  </span>
                  <div className="font-editorial-serif text-lg sm:text-xl font-bold text-white leading-snug mt-0.5">
                    Délai moyen &lt; 48h ouvrées
                  </div>
                  <div className="text-xs text-white/75 mt-0.5">
                    Lundi au Vendredi · 08h00 – 18h00
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
                      Courrier électronique
                    </span>
                    <h2 className="font-editorial-serif text-xl font-bold text-[#1a1a1a]">
                      Secrétariat d’organisation
                    </h2>
                    <p className="text-sm text-[#555555] leading-relaxed">
                      Pour toute demande liée aux inscriptions, à la logistique
                      d’accueil et aux sessions scientifiques.
                    </p>
                    <div className="pt-2 flex flex-col gap-1.5">
                      <a
                        className="text-sm font-bold text-[#8b0a1d] hover:text-[#c11236] transition-colors inline-flex items-center gap-2"
                        href="mailto:example@gmail.com"
                      >
                        <AtSign className="w-4 h-4 shrink-0" />
                        <span>example@gmail.com</span>
                      </a>
                      <a
                        className="text-sm font-medium text-[#555555] hover:text-[#1a1a1a] transition-colors inline-flex items-center gap-2"
                        href="mailto:example@gmail.com"
                      >
                        <Inbox className="w-4 h-4 shrink-0 text-[#00765a]" />
                        <span>example@gmail.com</span>
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
                      Standard &amp; Délégations
                    </span>
                    <h2 className="font-editorial-serif text-xl font-bold text-[#1a1a1a]">
                      Assistance téléphonique
                    </h2>
                    <p className="text-sm text-[#555555] leading-relaxed">
                      Ligne dédiée aux congressistes, intervenants et
                      délégations internationales.
                    </p>
                    <div className="pt-2 flex flex-col gap-1.5">
                      <a
                        className="text-sm font-bold text-[#1a1a1a] hover:text-[#c11236] transition-colors inline-flex items-center gap-2 font-mono"
                        href="tel:+237690000000"
                      >
                        <Phone className="w-4 h-4 text-[#8b0a1d] shrink-0" />
                        <span>+237 690 00 00 00</span>
                      </a>
                      <a
                        className="text-sm font-bold text-[#1a1a1a] hover:text-[#c11236] transition-colors inline-flex items-center gap-2 font-mono"
                        href="tel:+237699002525"
                      >
                        <Smartphone className="w-4 h-4 text-[#00765a] shrink-0" />
                        <span>+237 690 00 00 00</span>
                      </a>
                      <div className="flex items-center gap-2 text-[#555555] text-xs pt-1.5 border-t border-[#dce0e8]/70 mt-1">
                        <Calendar className="w-3.5 h-3.5 text-[#00765a] shrink-0" />
                        <span>Lundi au Vendredi, 08h00 – 18h00 (GMT+1)</span>
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
                    <span>Délégations &amp; Protocoles Officiels</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                    Pour les courriers ministériels, ordres professionnels et
                    délégations diplomatiques, les correspondances officielles
                    sont traitées conjointement avec le haut patronage du{' '}
                    <strong className="text-[#1a1a1a]">
                      MINSANTE Cameroun
                    </strong>{' '}
                    et la coordination scientifique du{' '}
                    <strong className="text-[#1a1a1a]">GEDREPACAM</strong>.
                  </p>
                  <div className="pt-1 flex items-center gap-1.5 text-[#00765a] text-xs font-semibold">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>Protocole certifié DREPACAM Yaoundé</span>
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
                      Formulaire direct
                    </span>
                    <h2 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#1a1a1a] tracking-tight">
                      Envoyer une demande en ligne
                    </h2>
                    <p className="text-sm text-[#555555] mt-1.5">
                      Renseignez les informations ci-dessous ; notre cellule de
                      permanence orientera votre message vers le pôle concerné.
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
                          <span>Nom complet</span>
                          <span className="text-[#c11236]">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <User className="w-4 h-4 absolute left-3.5 text-[#555555] pointer-events-none" />
                          <input
                            className="w-full pl-10 pr-4 py-3 bg-[#f8f8fa] border border-[#dce0e8] rounded-xl text-sm text-[#1a1a1a] placeholder:text-[#555555]/60 focus:bg-white focus:outline-none focus:border-[#8b0a1d] focus:ring-2 focus:ring-[#8b0a1d]/15 transition-all"
                            id="fullname"
                            placeholder="Ex: Dr. Martin Eboa"
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
                          <span>Adresse e-mail</span>
                          <span className="text-[#c11236]">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <AtSign className="w-4 h-4 absolute left-3.5 text-[#555555] pointer-events-none" />
                          <input
                            className="w-full pl-10 pr-4 py-3 bg-[#f8f8fa] border border-[#dce0e8] rounded-xl text-sm text-[#1a1a1a] placeholder:text-[#555555]/60 focus:bg-white focus:outline-none focus:border-[#8b0a1d] focus:ring-2 focus:ring-[#8b0a1d]/15 transition-all"
                            id="email"
                            placeholder="votre.email@institut.cm"
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
                        <span>Sujet de votre demande</span>
                        <span className="text-[#c11236]">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <Inbox className="w-4 h-4 absolute left-3.5 text-[#555555] pointer-events-none" />
                        <select
                          className="w-full pl-10 pr-10 py-3 bg-[#f8f8fa] border border-[#dce0e8] rounded-xl text-sm text-[#1a1a1a] focus:bg-white focus:outline-none focus:border-[#8b0a1d] focus:ring-2 focus:ring-[#8b0a1d]/15 appearance-none cursor-pointer transition-all"
                          defaultValue=""
                          id="subject"
                          required
                        >
                          <option disabled value="">
                            Sélectionnez un sujet
                          </option>
                          <option value="inscription">
                            Inscription &amp; Accréditation
                          </option>
                          <option value="soumission">
                            Soumission de résumé scientifique
                          </option>
                          <option value="sponsoring">
                            Sponsoring &amp; Partenariat institutionnel
                          </option>
                          <option value="autre">Autre demande</option>
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
                        <span>Votre message</span>
                        <span className="text-[#c11236]">*</span>
                      </label>
                      <textarea
                        className="w-full p-4 bg-[#f8f8fa] border border-[#dce0e8] rounded-xl text-sm text-[#1a1a1a] placeholder:text-[#555555]/60 focus:bg-white focus:outline-none focus:border-[#8b0a1d] focus:ring-2 focus:ring-[#8b0a1d]/15 transition-all min-h-[150px] resize-y"
                        id="message"
                        placeholder="Précisez votre demande, votre institution ou vos références de dossier..."
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
                          J’accepte que mes coordonnées soient traitées par le
                          secrétariat GEDREPACAM pour le suivi de ma demande,
                          conformément à la politique d’éthique et de
                          confidentialité biomédicale.
                        </span>
                      </label>
                    </div>

                    {/* Bouton d'envoi */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <button
                        className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#8b0a1d] hover:bg-[#c11236] text-white text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2 group cursor-pointer"
                        type="submit"
                      >
                        <span>Envoyer le message</span>
                        <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </button>

                      <div className="flex items-center gap-1.5 text-[#555555] text-xs font-medium">
                        <Lock className="w-3.5 h-3.5 text-[#00765a] shrink-0" />
                        <span>Transmission chiffrée TLS</span>
                      </div>
                    </div>

                    {successBanner && (
                      <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#00765a] flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-bold">
                            Demande transmise avec succès
                          </span>
                          <span className="text-xs text-[#00765a]/90 leading-relaxed">
                            Votre message a bien été enregistré par le
                            secrétariat GEDREPACAM. Une réponse vous sera
                            adressée sous 48h ouvrées.
                          </span>
                        </div>
                      </div>
                    )}
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
                Badges &amp; Accréditations
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] mt-1 leading-relaxed">
                Retrait direct au guichet d’accueil du Palais des Congrès dès le
                25 mai 2027 à 07h30.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-[#dce0e8] shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-[#c11236]/10 border border-[#c11236]/20 flex items-center justify-center shrink-0 text-[#c11236]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial-serif text-lg font-bold text-[#1a1a1a]">
                Comité Scientifique
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] mt-1 leading-relaxed">
                Évaluation continue des résumés, posters et communications
                orales par les rapporteurs.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-[#dce0e8] shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-[#8b0a1d]/10 border border-[#8b0a1d]/20 flex items-center justify-center shrink-0 text-[#8b0a1d]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial-serif text-lg font-bold text-[#1a1a1a]">
                Visas &amp; Accueil Délégués
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] mt-1 leading-relaxed">
                Lettres d’invitation officielles délivrées sous 72h pour les
                participants internationaux.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;