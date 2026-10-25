export type SectionId = 'home' | 'institute' | 'services' | 'pricing' | 'results' | 'chronicles' | 'contact' | 'faq'

export interface NavItem {
  id: SectionId
  label: string
  caption: string
  href: `#${SectionId}`
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home', caption: 'Welcome', href: '#home' },
  { id: 'institute', label: 'The Institute', caption: 'About us', href: '#institute' },
  { id: 'services', label: 'Services', caption: 'Treatments', href: '#services' },
  { id: 'pricing', label: 'Pricing', caption: 'Menu & rates', href: '#pricing' },
  { id: 'results', label: 'Results', caption: 'Before & after', href: '#results' },
  { id: 'chronicles', label: 'Guest Chronicles', caption: 'Client stories', href: '#chronicles' },
  { id: 'contact', label: 'Contact & Location', caption: 'Visit us', href: '#contact' },
  { id: 'faq', label: 'FAQ', caption: 'Good to know', href: '#faq' },
]
