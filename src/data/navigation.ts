export type SectionId = 'home' | 'institute' | 'services' | 'pricing' | 'results' | 'contact' | 'faq'

export interface NavItem {
  id: SectionId
  label: string
  /** Compact label for the desktop header; falls back to `label`. */
  shortLabel?: string
  /** Short descriptor shown in the side navigation. */
  caption: string
  /**
   * Destination. Today these are in-page anchors; switch to route paths
   * (e.g. '/services') when sections become separate pages.
   */
  href: `#${SectionId}`
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home', caption: 'Welcome', href: '#home' },
  { id: 'institute', label: 'The Institute', shortLabel: 'Institute', caption: 'About us', href: '#institute' },
  { id: 'services', label: 'Services', caption: 'Treatments', href: '#services' },
  { id: 'pricing', label: 'Pricing', caption: 'Menu & rates', href: '#pricing' },
  { id: 'results', label: 'Results', caption: 'Before & after', href: '#results' },
  { id: 'contact', label: 'Contact & Location', shortLabel: 'Contact', caption: 'Visit us', href: '#contact' },
  { id: 'faq', label: 'FAQ', caption: 'Good to know', href: '#faq' },
]
