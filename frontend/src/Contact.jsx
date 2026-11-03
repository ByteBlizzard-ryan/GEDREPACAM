import React, { useState } from 'react';
import { 
  Home, ChevronRight, ShieldCheck, Clock, Mail, 
  AtSign, Inbox, Phone, Smartphone, Calendar, Landmark, 
  User, Send, Lock, CheckCircle2, Award, FileText, Globe 
} from 'lucide-react';
import { Link } from 'react-router-dom';

function Contact() {
  const [successBanner, setSuccessBanner] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessBanner(true);
    e.target.reset();
  };

  return (
    <main className="w-full pt-20 bg-surface min-h-[calc(100vh-20rem)] flex flex-col">
      <div className="flex flex-col w-full">
        
        {/* En-tête de la page Contact */}
        <div className="relative w-full overflow-hidden bg-surface-container-low py-space-xl lg:py-space-2xl">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-gutter lg:px-margin relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-space-sm">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                Secrétariat & Permanence
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest text-on-surface text-[11px] font-bold">
                <ShieldCheck size={14} className="text-secondary" />
                Accompagnement délégués & orateurs
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest text-on-surface text-[11px] font-bold">
                <Clock size={14} className="text-secondary" />
                Délai moyen de réponse : &lt; 48h
              </span>
            </div>

            <div className="max-w-3xl">
              <h1 className="text-[38px] lg:text-[56px] font-extrabold text-on-surface tracking-tight mb-space-sm">
                Contactez-nous
              </h1>
              <p className="text-[18px] text-on-surface-variant leading-relaxed">
                Le secrétariat d'organisation du congrès est à votre disposition pour toute question concernant votre inscription ou les soumissions.
              </p>
            </div>
          </div>
        </div>

        {/* Section principale : Coordonnées et Formulaire */}
        <div className="w-full max-w-7xl mx-auto px-gutter lg:px-margin py-space-xl lg:py-space-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-space-2xl items-start">
            
            {/* Colonne de gauche : Informations de contact */}
            <div className="lg:col-span-5 flex flex-col gap-space-lg">
              
              {/* Carte Secrétariat d'organisation */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="flex items-start gap-space-md">
                  <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center shrink-0 text-secondary">
                    <Mail size={24} />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <h3 className="text-[20px] font-bold text-on-surface">Secrétariat d'organisation</h3>
                    <p className="text-[15px] text-on-surface-variant">
                      Pour toute question relative aux inscriptions, logistique d'accueil et sessions scientifiques.
                    </p>
                    <div className="pt-2 flex flex-col gap-1">
                      <a className="text-[14px] font-bold text-secondary hover:text-primary transition-colors flex items-center gap-1.5" href="mailto:contact@drepa-congres.cm">
                        <AtSign size={16} />
                        contact@drepa-congres.cm
                      </a>
                      <a className="text-[14px] text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5 font-medium" href="mailto:secretariat@drepacam2025.cm">
                        <Inbox size={16} />
                        secretariat@drepacam2025.cm
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte Assistance téléphonique */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="flex items-start gap-space-md">
                  <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center shrink-0 text-secondary">
                    <Phone size={24} />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <h3 className="text-[20px] font-bold text-on-surface">Assistance téléphonique</h3>
                    <p className="text-[15px] text-on-surface-variant">
                      Ligne dédiée aux congressistes et délégations internationales.
                    </p>
                    <div className="pt-2 flex flex-col gap-1.5">
                      <a className="text-[14px] font-bold text-secondary hover:text-primary transition-colors flex items-center gap-1.5" href="tel:+237222210000">
                        <Phone size={16} />
                        +237 222 21 00 00
                      </a>
                      <a className="text-[14px] font-bold text-secondary hover:text-primary transition-colors flex items-center gap-1.5" href="tel:+237699002525">
                        <Smartphone size={16} />
                        +237 699 00 25 25
                      </a>
                      <div className="flex items-center gap-1.5 text-on-surface-variant text-[13px] pt-1 font-medium">
                        <Calendar size={14} className="text-secondary" />
                        <span>Lundi au Vendredi, 08h00 - 18h00 GMT+1</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte Délai de traitement */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="flex items-start gap-space-md">
                  <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center shrink-0 text-secondary">
                    <Clock size={24} />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <h3 className="text-[20px] font-bold text-on-surface">Délai de traitement</h3>
                    <p className="text-[15px] text-on-surface-variant">
                      Réponse sous 48h ouvrées par notre équipe dédiée aux inscriptions médicales et académiques.
                    </p>
                    <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface text-[13px] font-medium w-fit">
                      <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                      <span>Cellule de permanence active en temps réel</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Note sur les Protocoles Officiels */}
              <div className="bg-surface-container-low p-space-lg rounded-xl space-y-space-sm relative overflow-hidden">
                <div className="flex items-center gap-2 text-secondary text-[14px] font-bold uppercase tracking-wider">
                  <Landmark size={18} />
                  Délégations & Protocoles Officiels
                </div>
                <p className="text-[13px] text-on-surface-variant leading-relaxed">
                  Pour les courriers ministériels, ordres professionnels et délégations diplomatiques, les correspondances officielles sont traitées conjointement avec le haut patronage du <strong>MINSANTE Cameroun</strong> et la coordination scientifique du <strong>GEDREPACAM</strong>.
                </p>
                <div className="pt-1 flex items-center gap-2 text-on-surface-variant text-[11px] font-bold">
                  <ShieldCheck size={14} className="text-secondary" />
                  Protocole certifié DREPACAM Yaoundé
                </div>
              </div>

            </div>

            {/* Colonne de droite : Formulaire de contact */}
            <div className="lg:col-span-7">
              <div className="bg-surface-container-lowest p-space-lg lg:p-space-xl rounded-xl shadow-md relative">
                <div className="mb-space-lg">
                  <h2 className="text-[26px] font-bold text-on-surface tracking-tight">
                    Envoyer une demande en ligne
                  </h2>
                  <p className="text-[15px] text-on-surface-variant mt-1">
                    Remplissez le formulaire ci-dessous, notre équipe vous répondra rapidement.
                  </p>
                </div>

                <form className="space-y-space-md" onSubmit={handleSubmit}>
                  <div className="space-y-1.5">
                    <label className="text-[14px] text-on-surface font-semibold flex items-center gap-1.5" htmlFor="fullname">
                      <span>Nom complet</span>
                      <span className="text-primary">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <User className="absolute left-3.5 text-on-surface-variant/70 pointer-events-none" size={20} />
                      <input 
                        className="w-full pl-11 pr-4 py-3 bg-surface-container-low rounded-lg text-[15px] text-on-surface placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container shadow-inner transition-all" 
                        id="fullname" 
                        placeholder="Ex: Dr. Martin Eboa" 
                        required 
                        type="text" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[14px] text-on-surface font-semibold flex items-center gap-1.5" htmlFor="email">
                      <span>Adresse e-mail</span>
                      <span className="text-primary">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <AtSign className="absolute left-3.5 text-on-surface-variant/70 pointer-events-none" size={20} />
                      <input 
                        className="w-full pl-11 pr-4 py-3 bg-surface-container-low rounded-lg text-[15px] text-on-surface placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container shadow-inner transition-all" 
                        id="email" 
                        placeholder="votre.email@institut.cm" 
                        required 
                        type="email" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[14px] text-on-surface font-semibold flex items-center gap-1.5" htmlFor="subject">
                      <span>Sujet de votre demande</span>
                      <span className="text-primary">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <Inbox className="absolute left-3.5 text-on-surface-variant/70 pointer-events-none" size={20} />
                      <select 
                        className="w-full pl-11 pr-10 py-3 bg-surface-container-low rounded-lg text-[15px] text-on-surface focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container shadow-inner appearance-none cursor-pointer transition-all" 
                        id="subject" 
                        required 
                        defaultValue=""
                      >
                        <option disabled value="">Sélectionnez un sujet</option>
                        <option value="inscription">Inscription</option>
                        <option value="soumission">Soumission de résumé</option>
                        <option value="sponsoring">Sponsoring</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[14px] text-on-surface font-semibold flex items-center gap-1.5" htmlFor="message">
                      <span>Votre message</span>
                      <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <textarea 
                        className="w-full p-4 bg-surface-container-low rounded-lg text-[15px] text-on-surface placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container shadow-inner transition-all min-h-[150px] resize-y" 
                        id="message" 
                        placeholder="Précisez votre demande ou vos références de dossier..." 
                        required 
                        rows="5"
                      ></textarea>
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input className="mt-1 h-4 w-4 rounded accent-primary text-primary focus:ring-primary-container cursor-pointer" required type="checkbox" />
                      <span className="text-[13px] text-on-surface-variant group-hover:text-on-surface transition-colors leading-relaxed">
                        J'accepte que mes coordonnées soient traitées pour le traitement de ma demande par le secrétariat DREPACAM conformément à la politique d'éthique et de confidentialité biomédicale.
                      </span>
                    </label>
                  </div>

                  <div className="pt-2">
                    <button 
                      className="w-full sm:w-auto px-space-xl py-3.5 rounded-lg bg-primary-container text-on-primary text-[14px] font-bold hover:bg-primary transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer" 
                      type="submit"
                    >
                      <span>Envoyer le message</span>
                      <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 pt-2 text-on-surface-variant text-[13px] opacity-80 font-medium">
                    <Lock size={16} className="text-secondary" />
                    <span>Transmission sécurisée des données • Chiffrement TLS conforme aux standards hospitaliers</span>
                  </div>

                  {successBanner && (
                    <div className="mt-space-md p-space-md rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center gap-3 animate-in fade-in duration-200">
                      <CheckCircle2 size={24} className="text-secondary shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold">Demande transmise avec succès</span>
                        <span className="text-[13px]">Un accusé de réception a été envoyé à votre adresse. Notre secrétariat vous répondra sous 48h.</span>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>

          </div>
        </div>

        {/* Section Infos complémentaires bas de page */}
        <div className="w-full bg-surface-container-low py-space-xl">
          <div className="max-w-7xl mx-auto px-gutter lg:px-margin">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg text-center md:text-left">
              <div className="flex items-center gap-space-md p-space-md bg-surface-container-lowest rounded-xl shadow-sm">
                <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center shrink-0 text-secondary">
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="text-[20px] font-bold text-on-surface">Badges & Accréditations</h4>
                  <p className="text-[13px] text-on-surface-variant">Retrait direct sur place dès le jour d'ouverture du congrès.</p>
                </div>
              </div>
              <div className="flex items-center gap-space-md p-space-md bg-surface-container-lowest rounded-xl shadow-sm">
                <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center shrink-0 text-secondary">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="text-[20px] font-bold text-on-surface">Comité Scientifique</h4>
                  <p className="text-[13px] text-on-surface-variant">Validation continue des résumés et communications orales.</p>
                </div>
              </div>
              <div className="flex items-center gap-space-md p-space-md bg-surface-container-lowest rounded-xl shadow-sm">
                <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center shrink-0 text-secondary">
                  <Globe size={24} />
                </div>
                <div>
                  <h4 className="text-[20px] font-bold text-on-surface">Visas & Accueil Délégués</h4>
                  <p className="text-[13px] text-on-surface-variant">Lettres officielles délivrées sous 72h pour les participants étrangers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

export default Contact;