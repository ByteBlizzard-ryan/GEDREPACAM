import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Info,
  Search,
  Building2,
  Coffee,
  BookOpen,
  Award,
  ArrowRight,
  RotateCcw,
  Calendar,
  Layers
} from 'lucide-react';
import { useLang } from './context/LanguageContext';
import { translateProgram } from './i18n/programEn';

const FILTER_CATEGORIES = [
  { id: 'all', label: 'Tout afficher', dot: null },
  { id: 'ceremonie', label: 'Cérémonies', dot: 'bg-[#8b0a1d]' },
  { id: 'pleniere', label: 'Sessions & Présentations', dot: 'bg-[#c11236]' },
  { id: 'communication', label: 'Communications libres', dot: 'bg-slate-500' },
  { id: 'discussion', label: 'Discussions & Protocoles', dot: 'bg-[#00765a]' },
  { id: 'pause', label: 'Pauses & Posters', dot: 'bg-gray-400' },
  { id: 'symposium', label: 'Symposiums & Partenaires', dot: 'bg-blue-600' }
];

const PROGRAM_DAYS = [
  {
    id: 'jour-1',
    shortLabel: 'Jour 1',
    dateLabel: 'Mardi 25 mai 2027',
    hours: '08:00 – 17:15',
    summary: 'Cérémonie d’ouverture · Thèmes 1 & 2',
    subtitle:
      'Politiques de santé, gouvernance, dépistage néonatal et innovations diagnostiques',
    blocks: [
      {
        type: 'ceremony',
        id: 'j1-ouverture',
        title: "Cérémonie d'ouverture",
        location: 'Auditorium Principal · Palais des Congrès de Yaoundé',
        timeRange: '08:00 – 10:30',
        items: [
          {
            id: 'j1-1',
            time: '08:00 – 08:30',
            category: 'ceremonie',
            badge: {
              text: 'Accueil & Protocole',
              style: 'bg-[#8b0a1d]/10 text-[#8b0a1d]'
            },
            title: 'Accueil et enregistrement des participants',
            speaker: 'GEDREPACAM',
            moderators: 'Dr Wamba, Pr Ngo Sack'
          },
          {
            id: 'j1-2',
            time: '08:30 – 08:40',
            category: 'ceremonie',
            badge: {
              text: 'Cérémonial',
              style: 'bg-[#8b0a1d]/10 text-[#8b0a1d]'
            },
            title:
              "Mot de bienvenue du comité d'organisation / Hymne national",
            speaker: 'GEDREPACAM'
          },
          {
            id: 'j1-3',
            time: '08:40 – 09:00',
            category: 'ceremonie',
            badge: {
              text: 'Allocution',
              style: 'bg-[#8b0a1d]/10 text-[#8b0a1d]'
            },
            title: 'Mot du Président du GEDREPACAM',
            speaker: 'Dr Wamba Guillaume'
          },
          {
            id: 'j1-4',
            time: '09:00 – 09:50',
            category: 'pleniere',
            featured: true,
            badge: {
              text: 'Leçon Inaugurale',
              style: 'bg-[#c11236] text-white font-semibold'
            },
            title:
              'Leçon Inaugurale : Actualités scientifiques internationales et recommandations récentes en matière de prévention, diagnostic et traitement'
          },
          {
            id: 'j1-5',
            time: '09:50 – 10:00',
            category: 'ceremonie',
            badge: {
              text: 'Haut Parrainage',
              style: 'bg-[#8b0a1d] text-white'
            },
            title: 'Mot du MINSANTE',
            speaker: 'MINSANTE'
          },
          {
            id: 'j1-6',
            time: '10:00 – 10:30',
            category: 'ceremonie',
            badge: {
              text: 'Protocole',
              style: 'bg-[#f1f1f5] text-[#1a1a1a]'
            },
            title: 'Visite des Stands et Photo de famille',
            speaker: 'Tous'
          }
        ]
      },
      {
        type: 'break',
        id: 'j1-pause-1',
        time: '10:30 – 11:00',
        category: 'pause',
        badge: 'Intermède & Posters',
        title: 'Pause-café / Session des posters',
        participants: 'Tous'
      },
      {
        type: 'theme',
        id: 'j1-theme-1',
        number: '01',
        label: 'Thème 1',
        title:
          'Politiques de santé, gouvernance et stratégies nationales de lutte contre la drépanocytose',
        items: [
          {
            id: 'j1-t1-1',
            time: '11:00 – 11:15',
            category: 'pleniere',
            badge: {
              text: 'Présentation',
              style: 'bg-red-100 text-[#c11236]'
            },
            title:
              "Données hospitalières nationales et systèmes de collecte, d'analyse et de surveillance des données sur la drépanocytose",
            speaker: 'MINSANTE'
          },
          {
            id: 'j1-t1-2',
            time: '11:15 – 11:30',
            category: 'pleniere',
            badge: {
              text: 'Épidémiologie',
              style: 'bg-red-100 text-[#c11236]'
            },
            title: 'Épidémiologie de la drépanocytose au Cameroun'
          },
          {
            id: 'j1-t1-3',
            time: '11:30 – 12:30',
            category: 'pleniere',
            featured: true,
            badge: {
              text: 'Session Interministérielle',
              style: 'bg-[#8b0a1d] text-white font-semibold'
            },
            title:
              'Plan stratégique national de lutte contre la drépanocytose : rôles et contributions des différents secteurs ministériels',
            tags: ['MINAS', 'MINPROFF', 'MINEDUB', 'MINESEC', 'MINESUP']
          },
          {
            id: 'j1-t1-4',
            time: '12:30 – 13:00',
            category: 'discussion',
            badge: {
              text: 'Discussion',
              style: 'bg-emerald-100 text-[#00765a]'
            },
            title: 'Discussion'
          }
        ]
      },
      {
        type: 'symposium',
        id: 'j1-pause-2',
        time: '13:00 – 14:00',
        category: 'symposium',
        badge: 'Déjeuner & Symposium',
        title: 'Pause déjeuner / Symposium (partenaires)',
        participants: 'Tous'
      },
      {
        type: 'theme',
        id: 'j1-theme-2',
        number: '02',
        label: 'Thème 2',
        title:
          'Dépistage néonatal, innovations diagnostiques et assurance qualité',
        items: [
          {
            id: 'j1-t2-1',
            time: '14:00 – 14:15',
            category: 'pleniere',
            badge: {
              text: 'Présentation',
              style: 'bg-red-100 text-[#c11236]'
            },
            title:
              'Diagnostics de la drépanocytose : quelles innovations et assurance qualité',
            speaker: 'Endeme Rosine'
          },
          {
            id: 'j1-t2-2',
            time: '14:15 – 14:30',
            category: 'pleniere',
            badge: {
              text: 'Présentation',
              style: 'bg-red-100 text-[#c11236]'
            },
            title:
              'Dépistage néonatal de la drépanocytose : stratégies, mise en œuvre, couverture et pérennisation des programmes, standardisation'
          },
          {
            id: 'j1-t2-3',
            time: '14:30 – 14:45',
            category: 'communication',
            compact: true,
            badge: {
              text: 'Communication libre',
              style: 'bg-slate-200 text-slate-700'
            },
            title: 'Communication libre'
          },
          {
            id: 'j1-t2-4',
            time: '14:45 – 15:00',
            category: 'communication',
            compact: true,
            badge: {
              text: 'Communication libre',
              style: 'bg-slate-200 text-slate-700'
            },
            title: 'Communication libre'
          },
          {
            id: 'j1-t2-5',
            time: '15:00 – 15:30',
            category: 'discussion',
            badge: {
              text: 'Discussion',
              style: 'bg-emerald-100 text-[#00765a]'
            },
            title: 'Discussion'
          },
          {
            id: 'j1-t2-6',
            time: '15:30 – 16:30',
            category: 'pleniere',
            featured: true,
            badge: {
              text: 'Consortium SickleInAfrica',
              style: 'bg-[#c11236] text-white font-semibold'
            },
            title:
              'Programmes de dépistage néonatal en Afrique : expériences et enseignements des pays du consortium SickleInAfrica, RDC, Sénégal, Bénin, Cameroun (importance du conseil génétique)',
            tags: ['SickleInAfrica', 'RDC', 'Sénégal', 'Bénin', 'Cameroun']
          },
          {
            id: 'j1-t2-7',
            time: '16:30 – 17:00',
            category: 'discussion',
            badge: {
              text: 'Discussion',
              style: 'bg-emerald-100 text-[#00765a]'
            },
            title: 'Discussion'
          },
          {
            id: 'j1-t2-8',
            time: '17:00 – 17:15',
            category: 'ceremonie',
            closing: true,
            badge: {
              text: 'Clôture J1',
              style: 'bg-white/20 text-white'
            },
            title: 'Fin de J1'
          }
        ]
      }
    ]
  },
  {
    id: 'jour-2',
    shortLabel: 'Jour 2',
    dateLabel: 'Mercredi 26 mai 2027',
    hours: '08:00 – 17:30',
    summary: 'Thèmes 3 & 4 · Protocoles cliniques',
    subtitle:
      'Prise en charge intégrée, accès aux soins, équité en santé et innovations thérapeutiques',
    blocks: [
      {
        type: 'reception',
        id: 'j2-accueil',
        time: '08:00 – 08:30',
        category: 'ceremonie',
        badge: 'Accueil',
        title: 'Accueil et enregistrement des participants'
      },
      {
        type: 'theme',
        id: 'j2-theme-3',
        number: '03',
        label: 'Thème 3',
        title:
          'Prise en charge intégrée, accès aux soins et équité en santé',
        items: [
          {
            id: 'j2-t3-1',
            time: '08:30 – 08:50',
            category: 'pleniere',
            badge: {
              text: 'Présentation',
              style: 'bg-red-100 text-[#c11236]'
            },
            title:
              'Suivi médical et prévention des complications au quotidien'
          },
          {
            id: 'j2-t3-2',
            time: '08:50 – 09:05',
            category: 'communication',
            compact: true,
            badge: {
              text: 'Communication libre',
              style: 'bg-slate-200 text-slate-700'
            },
            title:
              'Communication libre sur les expériences de suivi des patients'
          },
          {
            id: 'j2-t3-3',
            time: '09:05 – 09:20',
            category: 'communication',
            compact: true,
            badge: {
              text: 'Communication libre',
              style: 'bg-slate-200 text-slate-700'
            },
            title:
              'Communication libre sur les expériences de suivi des patients'
          },
          {
            id: 'j2-t3-4',
            time: '09:20 – 09:30',
            category: 'discussion',
            badge: {
              text: 'Discussion',
              style: 'bg-emerald-100 text-[#00765a]'
            },
            title: 'Discussion'
          },
          {
            id: 'j2-t3-5',
            time: '09:30 – 09:50',
            category: 'pleniere',
            badge: {
              text: 'Présentation',
              style: 'bg-red-100 text-[#c11236]'
            },
            title: 'Prise en charge de la douleur'
          },
          {
            id: 'j2-t3-6',
            time: '09:50 – 10:05',
            category: 'communication',
            compact: true,
            badge: {
              text: 'Communication libre',
              style: 'bg-slate-200 text-slate-700'
            },
            title: 'Communication libre sur la PEC de la douleur'
          },
          {
            id: 'j2-t3-7',
            time: '10:05 – 10:20',
            category: 'communication',
            compact: true,
            badge: {
              text: 'Communication libre',
              style: 'bg-slate-200 text-slate-700'
            },
            title: 'Communication libre sur la PEC de la douleur'
          },
          {
            id: 'j2-t3-8',
            time: '10:20 – 10:50',
            category: 'discussion',
            featured: true,
            badge: {
              text: 'Discussion & Livrable Protocole',
              style: 'bg-[#00765a] text-white font-semibold'
            },
            title:
              "Discussion à l'issue de laquelle un protocole pratique de la prise en charge de la douleur adapté au contexte africain et aux médicaments disponibles sera drafté"
          },
          {
            id: 'j2-t3-pause',
            time: '10:50 – 11:20',
            category: 'pause',
            isInlineBreak: true,
            badge: {
              text: 'Intermède & Posters',
              style: 'bg-gray-200 text-[#1a1a1a]'
            },
            title: 'Pause-café / Session des posters'
          },
          {
            id: 'j2-t3-9',
            time: '11:20 – 11:35',
            category: 'pleniere',
            badge: {
              text: 'Présentation',
              style: 'bg-red-100 text-[#c11236]'
            },
            title:
              'Transition des soins pédiatriques vers les soins pour adultes'
          },
          {
            id: 'j2-t3-10',
            time: '11:35 – 11:50',
            category: 'pleniere',
            badge: {
              text: 'Présentation',
              style: 'bg-red-100 text-[#c11236]'
            },
            title: 'Prise en charge des complications aiguës'
          },
          {
            id: 'j2-t3-11',
            time: '11:50 – 12:05',
            category: 'pleniere',
            badge: {
              text: 'Présentation',
              style: 'bg-red-100 text-[#c11236]'
            },
            title: 'Prise en charge des complications chroniques'
          },
          {
            id: 'j2-t3-12',
            time: '12:05 – 12:20',
            category: 'communication',
            compact: true,
            badge: {
              text: 'Communication libre',
              style: 'bg-slate-200 text-slate-700'
            },
            title: 'Communication libre'
          },
          {
            id: 'j2-t3-13',
            time: '12:20 – 12:40',
            category: 'discussion',
            badge: {
              text: 'Discussion',
              style: 'bg-emerald-100 text-[#00765a]'
            },
            title: 'Discussion'
          },
          {
            id: 'j2-t3-14',
            time: '12:40 – 12:55',
            category: 'pleniere',
            badge: {
              text: 'Présentation',
              style: 'bg-red-100 text-[#c11236]'
            },
            title: 'Grossesse et drépanocytose'
          },
          {
            id: 'j2-t3-15',
            time: '12:55 – 13:10',
            category: 'pleniere',
            badge: {
              text: 'Présentation',
              style: 'bg-red-100 text-[#c11236]'
            },
            title:
              'Prévention et prise en charge des complications maternelles et fœtales'
          },
          {
            id: 'j2-t3-16',
            time: '13:10 – 13:25',
            category: 'pleniere',
            badge: {
              text: 'Présentation',
              style: 'bg-red-100 text-[#c11236]'
            },
            title:
              'Accouchement, post-partum et suivi maternel et néonatal'
          },
          {
            id: 'j2-t3-17',
            time: '13:25 – 13:40',
            category: 'communication',
            compact: true,
            badge: {
              text: 'Communication libre',
              style: 'bg-slate-200 text-slate-700'
            },
            title: 'Communication libre'
          },
          {
            id: 'j2-t3-18',
            time: '13:40 – 14:00',
            category: 'discussion',
            badge: {
              text: 'Discussion',
              style: 'bg-emerald-100 text-[#00765a]'
            },
            title: 'Discussion'
          }
        ]
      },
      {
        type: 'symposium',
        id: 'j2-pause-2',
        time: '14:00 – 15:00',
        category: 'symposium',
        badge: 'Déjeuner & Symposium',
        title: 'Pause déjeuner / Symposium (partenaires bronze)'
      },
      {
        type: 'theme',
        id: 'j2-theme-4',
        number: '04',
        label: 'Thème 4',
        title: 'Innovations thérapeutiques',
        items: [
          {
            id: 'j2-t4-1',
            time: '15:00 – 15:20',
            category: 'pleniere',
            badge: {
              text: 'Présentation',
              style: 'bg-red-100 text-[#c11236]'
            },
            title: "Hydroxyurée : optimiser l'accès et l'utilisation"
          },
          {
            id: 'j2-t4-2',
            time: '15:15 – 15:30',
            category: 'communication',
            compact: true,
            badge: {
              text: 'Communication libre',
              style: 'bg-slate-200 text-slate-700'
            },
            title: 'Communication libre (hydroxyurée)'
          },
          {
            id: 'j2-t4-3',
            time: '15:30 – 15:45',
            category: 'communication',
            compact: true,
            badge: {
              text: 'Communication libre',
              style: 'bg-slate-200 text-slate-700'
            },
            title: 'Communication libre (hydroxyurée)'
          },
          {
            id: 'j2-t4-4',
            time: '15:45 – 16:15',
            category: 'discussion',
            featured: true,
            badge: {
              text: 'Discussion & Livrable Protocole',
              style: 'bg-[#00765a] text-white font-semibold'
            },
            title:
              "Discussion qui doit aboutir à un draft de protocole pratique d'utilisation et de surveillance de l'hydroxyurée"
          },
          {
            id: 'j2-t4-5',
            time: '16:15 – 16:30',
            category: 'pleniere',
            badge: {
              text: 'Présentation',
              style: 'bg-red-100 text-[#c11236]'
            },
            title: 'Médecines traditionnelles et drépanocytose'
          },
          {
            id: 'j2-t4-6',
            time: '16:30 – 16:45',
            category: 'communication',
            compact: true,
            badge: {
              text: 'Communication libre',
              style: 'bg-slate-200 text-slate-700'
            },
            title: 'Communication libre — Médecines traditionnelles'
          },
          {
            id: 'j2-t4-7',
            time: '16:45 – 17:00',
            category: 'communication',
            compact: true,
            badge: {
              text: 'Communication libre',
              style: 'bg-slate-200 text-slate-700'
            },
            title: 'Communication libre — Médecines traditionnelles'
          },
          {
            id: 'j2-t4-8',
            time: '17:00 – 17:30',
            category: 'ceremonie',
            closing: true,
            badge: {
              text: 'Discussion & Clôture J2',
              style: 'bg-white/20 text-white'
            },
            title: 'Discussion / Fin de J2'
          }
        ]
      }
    ]
  },
  {
    id: 'jour-3',
    shortLabel: 'Jour 3',
    dateLabel: 'Jeudi 27 mai 2027',
    hours: '08:00 – 16:30',
    summary: 'Thèmes 4 (suite), 5, 6 & 7 · Clôture',
    subtitle:
      'Thérapies innovantes, dimensions psychosociales, recherche génomique et coopération internationale',
    blocks: [
      {
        type: 'reception',
        id: 'j3-accueil',
        time: '08:00 – 08:30',
        category: 'ceremonie',
        badge: 'Accueil',
        title: 'Accueil et enregistrement des participants'
      },
      {
        type: 'theme',
        id: 'j3-theme-4-suite',
        number: '04',
        label: 'Thème 4 (suite)',
        title:
          'Innovations thérapeutiques, recherche et coopération scientifique',
        items: [
          {
            id: 'j3-t4-1',
            time: '08:30 – 08:45',
            category: 'pleniere',
            badge: {
              text: 'Présentation',
              style: 'bg-red-100 text-[#c11236]'
            },
            title:
              'Transfusion sanguine chez le patient drépanocytaire : indications, stratégies transfusionnelles et seuils décisionnels'
          },
          {
            id: 'j3-t4-2',
            time: '08:45 – 09:00',
            category: 'communication',
            compact: true,
            badge: {
              text: 'Communication libre',
              style: 'bg-slate-200 text-slate-700'
            },
            title: 'Communication libre'
          },
          {
            id: 'j3-t4-3',
            time: '09:00 – 09:20',
            category: 'pleniere',
            badge: {
              text: 'Présentation',
              style: 'bg-red-100 text-[#c11236]'
            },
            title:
              'Échanges transfusionnels : indications et faisabilité au Cameroun — indications, efficacité clinique'
          },
          {
            id: 'j3-t4-4',
            time: '09:20 – 09:35',
            category: 'communication',
            compact: true,
            badge: {
              text: 'Communication libre',
              style: 'bg-slate-200 text-slate-700'
            },
            title: 'Communication libre'
          },
          {
            id: 'j3-t4-5',
            time: '09:35 – 09:55',
            category: 'pleniere',
            badge: {
              text: 'Présentation',
              style: 'bg-red-100 text-[#c11236]'
            },
            title: 'Thérapies curatives et traitements innovants'
          },
          {
            id: 'j3-t4-6',
            time: '09:45 – 10:05',
            category: 'discussion',
            badge: {
              text: 'Discussion',
              style: 'bg-emerald-100 text-[#00765a]'
            },
            title: 'Discussion'
          }
        ]
      },
      {
        type: 'break',
        id: 'j3-pause-1',
        time: '10:05 – 10:35',
        category: 'pause',
        badge: 'Intermède & Posters',
        title: 'Pause-café / Session des posters'
      },
      {
        type: 'theme',
        id: 'j3-theme-5',
        number: '05',
        label: 'Thème 5',
        title:
          'Dimensions psychosociales, communautaires et prévention de la drépanocytose',
        items: [
          {
            id: 'j3-t5-1',
            time: '10:35 – 10:55',
            category: 'pleniere',
            badge: {
              text: 'Présentation',
              style: 'bg-red-100 text-[#c11236]'
            },
            title:
              'Santé mentale et accompagnement psychologique des personnes vivant avec la drépanocytose et de leurs familles'
          },
          {
            id: 'j3-t5-2',
            time: '10:50 – 11:05',
            category: 'pleniere',
            badge: {
              text: 'Présentation',
              style: 'bg-red-100 text-[#c11236]'
            },
            title:
              'Drépanocytose en milieu scolaire, universitaire et professionnel : sensibilisation, adaptation et accompagnement'
          },
          {
            id: 'j3-t5-3',
            time: '11:05 – 11:20',
            category: 'pleniere',
            badge: {
              text: 'Présentation',
              style: 'bg-red-100 text-[#c11236]'
            },
            title:
              "Rôle des associations de patients et des organisations communautaires dans la prévention, l'éducation et l'accompagnement"
          },
          {
            id: 'j3-t5-4',
            time: '11:20 – 11:35',
            category: 'pleniere',
            badge: {
              text: 'Présentation',
              style: 'bg-red-100 text-[#c11236]'
            },
            title:
              'Conseil génétique, santé sexuelle et reproductive : planification familiale, conseil préconceptionnel et accompagnement des couples'
          },
          {
            id: 'j3-t5-5',
            time: '11:35 – 12:00',
            category: 'discussion',
            badge: {
              text: 'Discussion',
              style: 'bg-emerald-100 text-[#00765a]'
            },
            title: 'Discussion'
          }
        ]
      },
      {
        type: 'theme',
        id: 'j3-theme-6',
        number: '06',
        label: 'Thème 6',
        title: 'Recherche et innovation en drépanocytose',
        items: [
          {
            id: 'j3-t6-1',
            time: '12:00 – 12:20',
            category: 'pleniere',
            badge: {
              text: 'Présentation',
              style: 'bg-red-100 text-[#c11236]'
            },
            title: 'Recherche clinique et éthique'
          },
          {
            id: 'j3-t6-2',
            time: '12:20 – 12:35',
            category: 'pleniere',
            badge: {
              text: 'Présentation',
              style: 'bg-red-100 text-[#c11236]'
            },
            title:
              'Intérêt de la génétique et génomique appliquée à la drépanocytose'
          },
          {
            id: 'j3-t6-3',
            time: '12:35 – 12:50',
            category: 'pleniere',
            badge: {
              text: 'Présentation',
              style: 'bg-red-100 text-[#c11236]'
            },
            title:
              'Biomarqueurs, médecine de précision et stratification du risque'
          },
          {
            id: 'j3-t6-4',
            time: '12:50 – 13:10',
            category: 'discussion',
            badge: {
              text: 'Discussion',
              style: 'bg-emerald-100 text-[#00765a]'
            },
            title: 'Discussion'
          }
        ]
      },
      {
        type: 'symposium',
        id: 'j3-pause-2',
        time: '13:10 – 14:10',
        category: 'symposium',
        badge: 'Déjeuner & Symposium',
        title: 'Pause déjeuner / Symposium (partenaires)'
      },
      {
        type: 'theme',
        id: 'j3-theme-7',
        number: '07',
        label: 'Thème 7',
        title: 'Coopération internationale, plaidoyer et perspectives',
        items: [
          {
            id: 'j3-t7-1',
            time: '14:10 – 14:15',
            category: 'pleniere',
            badge: {
              text: 'Présentation',
              style: 'bg-red-100 text-[#c11236]'
            },
            title:
              'Réseaux nationaux, régionaux et internationaux de lutte contre la drépanocytose'
          },
          {
            id: 'j3-t7-2',
            time: '14:15 – 14:30',
            category: 'pleniere',
            badge: {
              text: 'Présentation',
              style: 'bg-red-100 text-[#c11236]'
            },
            title:
              'Perspectives pour un accès équitable aux innovations diagnostiques et thérapeutiques en Afrique'
          },
          {
            id: 'j3-t7-3',
            time: '14:30 – 15:30',
            category: 'symposium',
            badge: {
              text: 'Partenaires',
              style: 'bg-blue-100 text-blue-800'
            },
            title: 'Communication des partenaires'
          },
          {
            id: 'j3-t7-4',
            time: '15:30 – 16:00',
            category: 'discussion',
            badge: {
              text: 'Discussion',
              style: 'bg-emerald-100 text-[#00765a]'
            },
            title: 'Discussion'
          }
        ]
      },
      {
        type: 'ceremony',
        id: 'j3-cloture',
        title: 'Cérémonie de clôture',
        location: 'Auditorium Principal · Palais des Congrès de Yaoundé',
        timeRange: '16:00 – 16:30',
        isClosingCeremony: true,
        items: [
          {
            id: 'j3-c-1',
            time: '16:00 – 16:30',
            category: 'ceremonie',
            badge: {
              text: 'Cérémonie officielle',
              style: 'bg-[#8b0a1d] text-white'
            },
            title: 'Cérémonie de clôture'
          },
          {
            id: 'j3-c-2',
            time: '16:00 – 16:30',
            category: 'ceremonie',
            badge: {
              text: 'Distinctions',
              style: 'bg-emerald-100 text-[#00765a]'
            },
            title: 'Remise des prix aux meilleurs abstracts et posters'
          },
          {
            id: 'j3-c-3',
            time: '16:00 – 16:30',
            category: 'ceremonie',
            featured: true,
            badge: {
              text: 'Clôture du Congrès',
              style: 'bg-[#c11236] text-white font-semibold'
            },
            title:
              'Synthèse des travaux / Recommandations finales / Mot de clôture',
            speaker: 'CO',
            moderators: 'GEDREPACAM'
          }
        ]
      }
    ]
  }
];

function Program() {
  const { t, lang } = useLang();
  // Données du programme dans la langue active (dictionnaire : src/i18n/programEn.js)
  const programDays = useMemo(
    () => (lang === 'en' ? translateProgram(PROGRAM_DAYS) : PROGRAM_DAYS),
    [lang]
  );
  // 'all' affiche les 3 journées à égalité ; 'jour-1' | 'jour-2' | 'jour-3' filtre sur une journée
  const [selectedDay, setSelectedDay] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const normalizedQuery = searchQuery.toLowerCase().trim();

  const matchesItem = (item) => {
    const categoryOk =
      activeFilter === 'all' || item.category === activeFilter;

    if (!categoryOk) return false;
    if (!normalizedQuery) return true;

    const haystack = [
      item.time,
      item.title,
      item.speaker,
      item.moderators,
      item.participants,
      item.badge?.text || item.badge,
      ...(item.tags || [])
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  };

  const filteredDays = useMemo(() => {
    return programDays.filter(
      (day) => selectedDay === 'all' || day.id === selectedDay
    )
      .map((day) => {
        const filteredBlocks = day.blocks
          .map((block) => {
            if (
              block.type === 'break' ||
              block.type === 'symposium' ||
              block.type === 'reception'
            ) {
              return matchesItem(block) ? block : null;
            }
            const visibleItems = block.items.filter(matchesItem);
            if (visibleItems.length === 0) return null;
            return { ...block, items: visibleItems };
          })
          .filter(Boolean);

        return { ...day, blocks: filteredBlocks };
      })
      .filter((day) => day.blocks.length > 0);
  }, [programDays, selectedDay, activeFilter, normalizedQuery]);

  const handleToggleDay = (dayId) => {
    setSelectedDay((prev) => (prev === dayId ? 'all' : dayId));
  };

  return (
    <main className="relative overflow-x-clip w-full bg-white text-[#1a1a1a] selection:bg-[#c11236] selection:text-white">
      {/* 1. EN-TÊTE ÉDITORIAL BORDEAUX */}
      <header className="relative bg-gradient-to-br from-[#8b0a1d] via-[#7e0819] to-[#690715] text-white overflow-hidden pt-28 sm:pt-32 pb-14 lg:pb-16 border-b border-[#c11236]/20">
        {/* Filigranes SVG */}
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden pointer-events-none opacity-10"
        >
          <svg
            className="absolute -right-16 -top-20 w-96 h-96 text-white"
            fill="currentColor"
            viewBox="0 0 100 100"
          >
            <path d="M50 10 C27.9 10 10 27.9 10 50 C10 72.1 27.9 90 50 90 C62.5 90 73.6 84.3 80.8 75.3 C65.6 77.1 51.5 68.2 46.1 53.6 C40.8 39.2 46.5 23.3 59.8 15.2 C56.7 11.9 53.4 10 50 10 Z" />
          </svg>
          <svg
            className="absolute -left-12 bottom-0 w-80 h-80 text-white"
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-xs font-medium tracking-wide mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c11236]" />
            <span>
              {t('Sous le Haut Parrainage du Ministre de la Santé Publique', 'Under the High Patronage of the Minister of Public Health')}
            </span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-serif-title font-bold tracking-tight text-white leading-[1.15] mb-4">
              {t('Programme scientifique', 'Scientific programme')}
            </h1>

            <p className="text-white/90 text-base sm:text-lg font-medium mb-4 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>
                {t(
                  <>5<sup>e</sup> Congrès International de la Drépanocytose</>,
                  <>5<sup>th</sup> International Sickle Cell Disease Congress</>
                )}
              </span>
              <span className="text-white/40">·</span>
              <span>{t('25 – 27 mai 2027', '25 – 27 May 2027')}</span>
              <span className="text-white/40">·</span>
              <span className="font-normal text-white/80">
                {t('Palais des Congrès de Yaoundé', 'Yaoundé Conference Centre')}
              </span>
            </p>

            <blockquote className="text-white/85 text-sm sm:text-base font-editorial-serif italic max-w-3xl leading-relaxed border-l-2 border-[#c11236] pl-4 py-0.5">
              {t(
                '« Accès au dépistage néonatal et à la prise en charge de la drépanocytose : équité, défis, innovations et perspectives »',
                '“Access to newborn screening and care for sickle cell disease: equity, challenges, innovation and outlook”'
              )}
            </blockquote>

            <p className="mt-4 text-xs text-white/65 tracking-wide uppercase flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 opacity-80 flex-shrink-0" />
              <span>
                {t('Programme scientifique prévisionnel des 3 journées', 'Provisional scientific programme for the 3 days')}
              </span>
            </p>
          </div>
        </div>
      </header>

      {/* 2. SÉLECTEUR DES 3 JOURNÉES (GRILLE ÉDITORIALE SANS BARRE HORIZONTALE) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-10 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#555555] font-semibold">
            <Calendar className="w-3.5 h-3.5 text-[#c11236]" />
            <span>{t('Choisir une journée de conférence', 'Choose a conference day')}</span>
          </div>

          <button
            type="button"
            onClick={() => setSelectedDay('all')}
            className={`self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedDay === 'all'
                ? 'bg-[#1a1a1a] text-white shadow-xs'
                : 'bg-[#f8f8fa] text-[#1a1a1a] border border-[#dce0e8] hover:border-[#1a1a1a]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t('Afficher les 3 journées', 'Show all 3 days')}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {programDays.map((day) => {
            const isSelected = selectedDay === day.id;
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => handleToggleDay(day.id)}
                className={`text-left p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#8b0a1d] border-[#8b0a1d] text-white shadow-md'
                    : 'bg-white border-[#dce0e8] hover:border-[#c11236]/60 text-[#1a1a1a] shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-[#c11236]/10 text-[#c11236]'
                    }`}
                  >
                    {day.shortLabel}
                  </span>
                  <span
                    className={`font-mono text-xs tabular-nums ${
                      isSelected ? 'text-white/80' : 'text-[#555555]'
                    }`}
                  >
                    {day.hours}
                  </span>
                </div>

                <div>
                  <h2 className="font-editorial-serif text-xl font-bold leading-snug">
                    {day.dateLabel}
                  </h2>
                  <p
                    className={`text-xs mt-1 font-medium ${
                      isSelected ? 'text-white/85' : 'text-[#555555]'
                    }`}
                  >
                    {day.summary}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. TIMELINE DÉTAILLÉE DES 3 JOURNÉES (MISE EN AVANT ÉGALE) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 space-y-20">
        {filteredDays.length === 0 && (
          <div className="my-6 p-10 rounded-2xl bg-[#f8f8fa] border border-[#dce0e8] text-center space-y-3">
            <p className="font-editorial-serif text-xl font-bold text-[#1a1a1a]">
              {t('Aucune session ne correspond à votre recherche', 'No session matches your search')}
            </p>
            <p className="text-sm text-[#555555]">
              {t('Essayez un autre mot-clé ou réinitialisez les filtres affichés.', 'Try another keyword or reset the filters.')}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedDay('all');
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c11236] text-white text-xs font-semibold hover:bg-[#8b0a1d] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('Réinitialiser les filtres', 'Reset filters')}</span>
            </button>
          </div>
        )}

        {filteredDays.map((day) => (
          <section key={day.id} id={day.id} className="relative">
            {/* En-tête de journée uniforme pour Jour 1, Jour 2 et Jour 3 */}
            <div className="mb-8 pb-4 border-b-2 border-[#dce0e8] flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#c11236]/10 text-[#c11236] font-mono text-xs font-bold uppercase tracking-wider">
                    {day.shortLabel}
                  </span>
                  <span className="text-xs font-mono text-[#555555]">
                    {day.hours}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#1a1a1a]">
                  {day.shortLabel} — {day.dateLabel}
                </h2>
              </div>
              <p className="text-sm text-[#555555] max-w-xl md:text-right">
                {day.subtitle}
              </p>
            </div>

            {/* En-tête des colonnes sur ordinateur */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-6 pb-3 text-xs font-mono tracking-wider uppercase text-[#555555]/80 border-b border-[#dce0e8]/60 px-4">
              <div className="col-span-2">{t('Horaire', 'Time')}</div>
              <div className="col-span-7">{t('Présentation & Thématique', 'Presentation & Topic')}</div>
              <div className="col-span-3">{t('Intervenant / Modération', 'Speaker / Chair')}</div>
            </div>

            <div className="space-y-8 mt-6">
              {day.blocks.map((block) => {
                /* BLOC CÉRÉMONIE (Ouverture J1 / Clôture J3) */
                if (block.type === 'ceremony') {
                  return (
                    <div
                      key={block.id}
                      className="rounded-2xl border-2 border-[#c11236]/20 bg-gradient-to-br from-white via-white to-red-50/30 overflow-hidden shadow-xs relative"
                    >
                      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#8b0a1d] to-[#c11236]" />

                      <div className="bg-gradient-to-r from-[#8b0a1d] to-[#c11236] px-6 py-3.5 text-white flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="p-1.5 rounded-lg bg-white/15 backdrop-blur-sm">
                            {block.isClosingCeremony ? (
                              <Award className="w-4 h-4 text-white" />
                            ) : (
                              <Building2 className="w-4 h-4 text-white" />
                            )}
                          </span>
                          <div>
                            <h3 className="font-editorial-serif text-lg font-bold tracking-wide">
                              {block.title}
                            </h3>
                            <p className="text-xs text-white/80">
                              {block.location}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-medium px-3 py-1 bg-white/20 rounded-full text-white tabular-nums">
                          {block.timeRange}
                        </span>
                      </div>

                      <div className="divide-y divide-[#dce0e8]/60">
                        {block.items.map((item) => (
                          <article
                            key={item.id}
                            className={
                              item.featured
                                ? 'p-4 lg:px-6 lg:py-5 bg-gradient-to-r from-red-50/50 to-white border-l-4 border-[#c11236]'
                                : 'p-4 lg:px-6 lg:py-4 hover:bg-red-50/20 transition-colors'
                            }
                          >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6 items-start">
                              <div className="lg:col-span-2 font-mono font-semibold text-sm text-[#c11236] tabular-nums">
                                {item.time}
                              </div>

                              <div className="lg:col-span-7 space-y-1.5">
                                {item.badge && (
                                  <span
                                    className={`inline-block px-2 py-0.5 text-[11px] font-medium rounded ${item.badge.style}`}
                                  >
                                    {item.badge.text}
                                  </span>
                                )}
                                <h4
                                  className={
                                    item.featured
                                      ? 'font-editorial-serif font-bold text-lg text-[#1a1a1a] leading-snug'
                                      : 'font-semibold text-[#1a1a1a] text-base'
                                  }
                                >
                                  {item.title}
                                </h4>
                              </div>

                              <div className="lg:col-span-3 text-xs text-[#555555] space-y-1">
                                {item.speaker && (
                                  <p>
                                    <span className="font-semibold text-[#1a1a1a]">
                                      {t('Intervenant :', 'Speaker:')}
                                    </span>{' '}
                                    {item.speaker}
                                  </p>
                                )}
                                {item.moderators && (
                                  <p>
                                    <span className="font-semibold text-[#1a1a1a]">
                                      {t('Modération :', 'Chair:')}
                                    </span>{' '}
                                    {item.moderators}
                                  </p>
                                )}
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  );
                }

                /* BLOC ACCUEIL SIMPLE (J2 & J3) */
                if (block.type === 'reception') {
                  return (
                    <div
                      key={block.id}
                      className="rounded-xl bg-[#f8f8fa] border border-[#dce0e8] p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-sm font-bold text-[#8b0a1d] tabular-nums">
                          {block.time}
                        </span>
                        <span className="px-2.5 py-0.5 rounded bg-[#8b0a1d]/10 text-[#8b0a1d] text-xs font-semibold">
                          {block.badge}
                        </span>
                        <h3 className="text-sm sm:text-base font-semibold text-[#1a1a1a]">
                          {block.title}
                        </h3>
                      </div>
                    </div>
                  );
                }

                /* BLOC PAUSE-CAFÉ / POSTERS */
                if (block.type === 'break') {
                  return (
                    <div
                      key={block.id}
                      className="rounded-xl bg-[#f8f8fa] border border-[#dce0e8] p-4 sm:px-6 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white border border-[#dce0e8] flex items-center justify-center text-[#555555] flex-shrink-0">
                          <Coffee className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-sm font-bold text-[#1a1a1a] tabular-nums">
                              {block.time}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded bg-gray-200 text-[#1a1a1a] font-medium">
                              {block.badge}
                            </span>
                          </div>
                          <h4 className="text-sm sm:text-base font-semibold text-[#1a1a1a] mt-0.5">
                            {block.title}
                          </h4>
                        </div>
                      </div>
                      {block.participants && (
                        <span className="hidden sm:inline-block text-xs font-medium text-[#555555] bg-white px-3 py-1 rounded-full border border-[#dce0e8]">
                          {t('Participants :', 'Participants:')} {block.participants}
                        </span>
                      )}
                    </div>
                  );
                }

                /* BLOC PAUSE DÉJEUNER / SYMPOSIUM */
                if (block.type === 'symposium') {
                  return (
                    <div
                      key={block.id}
                      className="rounded-xl bg-[#f8f8fa] border-2 border-dashed border-[#dce0e8] p-4 sm:px-6 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 flex-shrink-0">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-sm font-bold text-[#1a1a1a] tabular-nums">
                              {block.time}
                            </span>
                            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
                              {block.badge}
                            </span>
                          </div>
                          <h4 className="text-sm sm:text-base font-semibold text-[#1a1a1a] mt-0.5">
                            {block.title}
                          </h4>
                        </div>
                      </div>
                      {block.participants && (
                        <span className="hidden sm:inline-block text-xs font-medium text-[#555555] bg-white px-3 py-1 rounded-full border border-[#dce0e8]">
                          {t('Participants :', 'Participants:')} {block.participants}
                        </span>
                      )}
                    </div>
                  );
                }

                /* BLOC THÈME SCIENTIFIQUE (Thèmes 1 à 7) */
                return (
                  <div key={block.id} className="pt-2">
                    <div className="flex items-start gap-4 mb-5">
                      <div className="font-editorial-serif text-4xl sm:text-5xl font-bold text-[#c11236] leading-none select-none tracking-tighter">
                        {block.number}
                      </div>
                      <div className="border-l-2 border-[#c11236]/30 pl-4 py-0.5">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#c11236] font-semibold">
                          {block.label}
                        </span>
                        <h3 className="font-editorial-serif text-xl sm:text-2xl font-bold text-[#1a1a1a] leading-snug">
                          {block.title}
                        </h3>
                      </div>
                    </div>

                    <div className="relative pl-5 sm:pl-8 border-l-2 border-[#c11236]/25 space-y-3">
                      {block.items.map((item) => {
                        if (item.isInlineBreak) {
                          return (
                            <div
                              key={item.id}
                              className="rounded-xl bg-[#f8f8fa] border border-[#dce0e8] px-4 py-3 flex flex-wrap items-center gap-3"
                            >
                              <span className="font-mono text-xs font-bold text-[#1a1a1a] tabular-nums">
                                {item.time}
                              </span>
                              <span
                                className={`px-2 py-0.5 text-[11px] font-medium rounded ${item.badge.style}`}
                              >
                                {item.badge.text}
                              </span>
                              <span className="text-sm font-semibold text-[#1a1a1a]">
                                {item.title}
                              </span>
                            </div>
                          );
                        }

                        if (item.closing) {
                          return (
                            <article
                              key={item.id}
                              className="bg-gradient-to-r from-[#8b0a1d] to-[#640715] text-white rounded-xl px-5 py-4 shadow-xs"
                            >
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-6 items-center">
                                <div className="lg:col-span-2 font-mono font-bold text-sm text-white/90 tabular-nums">
                                  {item.time}
                                </div>
                                <div className="lg:col-span-10 flex flex-wrap items-center gap-3">
                                  {item.badge && (
                                    <span
                                      className={`px-2.5 py-0.5 text-[11px] font-bold rounded ${item.badge.style}`}
                                    >
                                      {item.badge.text}
                                    </span>
                                  )}
                                  <h4 className="font-editorial-serif font-bold text-white text-base">
                                    {item.title}
                                  </h4>
                                </div>
                              </div>
                            </article>
                          );
                        }

                        if (item.compact) {
                          return (
                            <article
                              key={item.id}
                              className="bg-[#f8f8fa]/70 rounded-xl border border-[#dce0e8]/80 px-4 py-3 transition-colors"
                            >
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-6 items-center">
                                <div className="lg:col-span-2 font-mono text-xs font-medium text-[#555555] tabular-nums">
                                  {item.time}
                                </div>
                                <div className="lg:col-span-7 flex flex-wrap items-center gap-2.5">
                                  {item.badge && (
                                    <span
                                      className={`px-2 py-0.5 text-[10px] uppercase font-semibold rounded ${item.badge.style}`}
                                    >
                                      {item.badge.text}
                                    </span>
                                  )}
                                  <h4 className="text-sm font-medium text-[#1a1a1a]">
                                    {item.title}
                                  </h4>
                                </div>
                                <div className="lg:col-span-3 text-xs text-[#555555]">
                                  {item.speaker && (
                                    <span className="font-medium text-[#1a1a1a]">
                                      {item.speaker}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </article>
                          );
                        }

                        return (
                          <article
                            key={item.id}
                            className={
                              item.featured
                                ? 'bg-gradient-to-br from-white to-red-50/25 rounded-xl border-2 border-[#c11236]/30 p-4 lg:p-5 shadow-xs'
                                : 'bg-white rounded-xl border border-[#dce0e8] hover:border-[#c11236]/45 transition-all p-4 lg:p-5 shadow-xs'
                            }
                          >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6 items-start">
                              <div className="lg:col-span-2 font-mono font-semibold text-sm text-[#c11236] tabular-nums">
                                {item.time}
                              </div>

                              <div className="lg:col-span-7 space-y-1.5">
                                {item.badge && (
                                  <span
                                    className={`inline-block px-2 py-0.5 text-[11px] font-medium rounded ${item.badge.style}`}
                                  >
                                    {item.badge.text}
                                  </span>
                                )}
                                <h4
                                  className={
                                    item.featured
                                      ? 'font-editorial-serif font-bold text-base sm:text-lg text-[#1a1a1a] leading-snug'
                                      : 'font-semibold text-[#1a1a1a] text-base leading-snug'
                                  }
                                >
                                  {item.title}
                                </h4>

                                {item.tags && (
                                  <div className="pt-1.5 flex flex-wrap gap-1.5 text-[11px] font-mono">
                                    {item.tags.map((tag) => (
                                      <span
                                        key={tag}
                                        className="px-2 py-0.5 rounded bg-[#f8f8fa] border border-[#dce0e8] text-[#1a1a1a]"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <div className="lg:col-span-3 text-xs text-[#555555] space-y-1">
                                {item.speaker && (
                                  <p>
                                    <span className="font-semibold text-[#1a1a1a]">
                                      {t('Intervenant :', 'Speaker:')}
                                    </span>{' '}
                                    {item.speaker}
                                  </p>
                                )}
                                {item.moderators && (
                                  <p>
                                    <span className="font-semibold text-[#1a1a1a]">
                                      {t('Modération :', 'Chair:')}
                                    </span>{' '}
                                    {item.moderators}
                                  </p>
                                )}
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

export default Program;