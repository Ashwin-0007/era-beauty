export type SectionId = 'home' | 'institute' | 'services' | 'pricing' | 'results' | 'chronicles' | 'contact' | 'faq'

export interface NavItem {
  id: SectionId
  label: string
  caption: string
  href: `#${SectionId}`
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Accueil', caption: 'Bienvenue', href: '#home' },
  { id: 'institute', label: 'L’Institut', caption: 'À propos', href: '#institute' },
  { id: 'services', label: 'Soins', caption: 'Nos prestations', href: '#services' },
  { id: 'pricing', label: 'Tarifs', caption: 'Carte & prix', href: '#pricing' },
  { id: 'results', label: 'Résultats', caption: 'Avant & après', href: '#results' },
  { id: 'chronicles', label: 'Témoignages', caption: 'Paroles de clientes', href: '#chronicles' },
  { id: 'contact', label: 'Contact & Accès', caption: 'Nous rendre visite', href: '#contact' },
  { id: 'faq', label: 'FAQ', caption: 'Bon à savoir', href: '#faq' },
]
