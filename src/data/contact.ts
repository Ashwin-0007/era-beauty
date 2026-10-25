export interface OpeningHours {
  days: string
  hours: string
}

export interface SocialLink {
  label: 'Instagram' | 'Facebook'
  href: string
}

export const contact = {
  addressLines: ['18 Place Vendôme', '75001 Paris', 'France'],
  phoneDisplay: '+33 1 42 68 55 00',
  phoneHref: 'tel:+33142685500',
  email: 'concierge@erabeauty.com',
  hours: [
    { days: 'Monday – Friday', hours: '09:00 – 19:30' },
    { days: 'Saturday', hours: '10:00 – 18:00' },
    { days: 'Sunday', hours: 'Private suites on request' },
  ] as OpeningHours[],
  mapEmbedUrl: '',
  directionsUrl: 'https://maps.google.com/?q=18+Place+Vendome+Paris',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
  ] as SocialLink[],
}
