import { activeCategories, categoryPath } from './catalog'
import { images } from './images'

export interface NavLink {
  label: string
  to: string
}

export interface NavItem extends NavLink {
  children?: NavLink[]
  panel?: { image: string; eyebrow: string; title: string; text: string; cta: NavLink }
}

export const navItems: NavItem[] = [
  { label: 'Accueil', to: '/' },
  {
    label: 'L’institut',
    to: '/institut',
    children: [
      { label: 'Présentation', to: '/institut#presentation' },
      { label: 'Notre équipe', to: '/institut#equipe' },
      { label: 'Nos valeurs', to: '/institut#valeurs' },
      { label: 'Le lieu', to: '/institut#lieu' },
    ],
    panel: {
      image: images.instituteNeonArch,
      eyebrow: 'L’institut',
      title: 'Bien plus qu’un institut, une expérience.',
      text: 'Découvrez notre histoire, notre équipe et nos valeurs.',
      cta: { label: 'Découvrir notre univers', to: '/institut#lieu' },
    },
  },
  {
    label: 'Prestations',
    to: '/prestations',
    children: activeCategories.map((category) => ({ label: category.menuLabel, to: categoryPath(category.slug) })),
    panel: {
      image: images.facialTreatmentMockup,
      eyebrow: 'Nos prestations',
      title: 'Des soins d’exception pour révéler votre beauté.',
      text: 'Une expertise globale pour prendre soin de vous.',
      cta: { label: 'Toutes les prestations', to: '/prestations' },
    },
  },
  {
    label: 'Tarifs',
    to: '/tarifs',
    children: [
      ...activeCategories.map((category) => ({ label: category.menuLabel, to: `/tarifs#${category.slug}` })),
      { label: 'Nos packs', to: '/tarifs#packs' },
    ],
    panel: {
      image: images.instituteSalonHero,
      eyebrow: 'Nos tarifs',
      title: 'Des prestations accessibles pour toutes.',
      text: 'Des tarifs clairs, à la séance ou en forfait.',
      cta: { label: 'Voir tous les tarifs', to: '/tarifs' },
    },
  },
  {
    label: 'Résultats',
    to: '/resultats',
    children: [
      { label: 'Avant / après', to: '/resultats#avant-apres' },
      { label: 'Avis clients', to: '/resultats#avis' },
      { label: 'Témoignages', to: '/resultats#temoignages' },
    ],
    panel: {
      image: images.lipBeforeAfterMockup,
      eyebrow: 'Des résultats réels',
      title: 'Des peaux plus nettes, plus lumineuses.',
      text: 'Découvrez les transformations réalisées dans notre institut.',
      cta: { label: 'Découvrir les résultats', to: '/resultats' },
    },
  },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: 'Liens rapides',
    links: [
      { label: 'Accueil', to: '/' },
      { label: 'L’institut', to: '/institut' },
      { label: 'Nos prestations', to: '/prestations' },
      { label: 'Tarifs', to: '/tarifs' },
      { label: 'Résultats', to: '/resultats' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Nous contacter', to: '/contact' },
    ],
  },
  {
    title: 'Nos prestations',
    links: activeCategories.map((category) => ({ label: category.menuLabel, to: categoryPath(category.slug) })),
  },
  {
    title: 'Informations',
    links: [
      { label: 'Adresse de l’institut', to: '/contact#localisation' },
      { label: 'Horaires d’ouverture', to: '/contact#horaires' },
      { label: 'Prendre rendez-vous', to: '#rendez-vous' },
      { label: 'Nous contacter', to: '/contact#formulaire' },
    ],
  },
]

export const legalLinks: NavLink[] = [
  { label: 'Mentions légales', to: '/mentions-legales' },
  { label: 'Politique de confidentialité', to: '/politique-de-confidentialite' },
  { label: 'Gestion des cookies', to: '#cookies' },
  { label: 'Plan du site', to: '/plan-du-site' },
]
