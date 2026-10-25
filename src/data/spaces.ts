import { images } from './images'

import type {
  InstituteShowcaseVideo,
  InstituteSpace,
  SpaceCategory,
  SpaceCategoryOption,
} from '../components/institute/types'

export type {
  InstituteShowcaseVideo,
  InstituteSpace,
  SpaceCategory,
  SpaceCategoryOption,
}

export const instituteShowcaseVideo: InstituteShowcaseVideo = {
  url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-masseuse-giving-a-massage-to-a-client-41662-large.mp4',
  poster: images.instituteHero,
  title: 'Bienvenue chez ERA Beauty Saint-Cloud',
  eyebrow: 'Expérience visuelle',
  badge: 'Immersion vidéo',
}

export const spaceCategories: SpaceCategoryOption[] = [
  { id: 'all', label: 'Tous les espaces' },
  { id: 'care', label: 'Suites de soins' },
  { id: 'wellness', label: 'Bien-être & Head Spa' },
  { id: 'reception', label: 'Accueil & Détente' },
]

export const instituteSpaces: InstituteSpace[] = [
  {
    id: 'reception',
    name: 'L’Accueil & Salon de Réception',
    category: 'reception',
    categoryLabel: 'Accueil & Détente',
    tagline: 'L’élégance dès vos premiers pas',
    description:
      'Conçu sous de douces arches architecturales, notre salon d’accueil vous invite au calme immédiat. Vous y serez accueillie avec une boisson bienfaisante avant chaque protocole.',
    image: images.instituteNeonArch,
    highlights: ['Arches signature en plâtre texturé', 'Bar à infusions biologiques', 'Atmosphère feutrée et parfumée'],
  },
  {
    id: 'suite-visage',
    name: 'La Suite de Soins Visage & Dermo-Esthétique',
    category: 'care',
    categoryLabel: 'Suites de soins',
    tagline: 'Intimité feutrée & haute dermo-cosmétique',
    description:
      'Une cabine privative isolée du bruit extérieur, équipée d’une table chauffante ergonomique et d’éclairages réglables pour un lâcher-prise sensoriel total.',
    image: images.instituteSalonHero,
    highlights: ['Table de soin chauffante à mémoire de forme', 'Luminothérapie d’ambiance', 'Diagnostic cutané haute précision'],
  },
  {
    id: 'head-spa',
    name: 'L’Espace Head Spa & Relaxation',
    category: 'wellness',
    categoryLabel: 'Bien-être & Head Spa',
    tagline: 'L’art du rituel japonais au fil de l’eau',
    description:
      'Un sanctuaire dédié à la détente profonde du cuir chevelu et du visage, bercé par le ruissellement apaisant de l’eau thermale tiède.',
    image: images.headSpa,
    highlights: ['Bac ergonomique japonais à circulation continue', 'Vapeur tiède infusée d’actifs botaniques', 'Massage crânien signature'],
  },
  {
    id: 'suite-laser',
    name: 'La Cabine Laser Diode Haute Précision',
    category: 'care',
    categoryLabel: 'Suites de soins',
    tagline: 'Technologie d’exception & confort absolu',
    description:
      'Lieu d’application de notre protocole d’épilation laser diode, garantissant une efficacité éprouvée avec système de refroidissement continu pour un confort maximal.',
    image: images.instituteTable,
    highlights: ['Refroidissement dermo-contact instantané', 'Paramétrage individualisé par phototype', 'Hygiène clinique et stérile'],
  },
  {
    id: 'alcove-regard',
    name: 'L’Alcôve Beauté du Regard',
    category: 'care',
    categoryLabel: 'Suites de soins',
    tagline: 'Précision du geste & lumière naturelle',
    description:
      'Dédiée au rehaussement, brow lift et teintures, cette alcôve privilégie une lumière zénithale étudiée pour sculpter l’expression avec un naturel absolu.',
    image: images.archShelves,
    highlights: ['Fauteuil relaxant multi-positions', 'Lumière spectrale pure', 'Produits de soin vegan et certifiés'],
  },
  {
    id: 'lounge-detente',
    name: 'Le Salon Lounge & Sérénité',
    category: 'reception',
    categoryLabel: 'Accueil & Détente',
    tagline: 'Prolonger la quiétude après votre soin',
    description:
      'Un espace préservé pour reprendre vos esprits en douceur après un soin, feuilleter nos sélections bien-être ou déguster un thé aux fleurs.',
    image: images.instituteLounge,
    highlights: ['Canapés profonds en velours texturé', 'Coin lecture & bien-être', 'Conseils post-soin personnalisés'],
  },
]
