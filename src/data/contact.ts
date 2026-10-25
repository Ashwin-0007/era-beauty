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
    { days: 'Lundi – Vendredi', hours: '09:00 – 19:30' },
    { days: 'Samedi', hours: '10:00 – 18:00' },
    { days: 'Dimanche', hours: 'Salons privés sur demande' },
  ] as OpeningHours[],
  mapEmbedUrl: '',
  directionsUrl: 'https://maps.google.com/?q=18+Place+Vendome+Paris',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
  ] as SocialLink[],
}
