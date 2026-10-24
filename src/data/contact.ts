/**
 * Placeholder contact details. These are intentionally fake — replace with
 * ERA Beauty's verified information before launch.
 */
export interface OpeningHours {
  days: string
  hours: string
}

export interface SocialLink {
  label: 'Instagram' | 'Facebook'
  href: string
}

export const contact = {
  addressLines: ['[Street address]', '[Postcode] [City]', '[Country]'],
  phoneDisplay: '+00 000 000 000',
  phoneHref: 'tel:+00000000000',
  email: 'hello@example.com',
  hours: [
    { days: 'Monday – Friday', hours: '09:00 – 19:00' },
    { days: 'Saturday', hours: '10:00 – 17:00' },
    { days: 'Sunday', hours: 'Closed' },
  ] as OpeningHours[],
  /** Google Maps embed URL. Leave empty to show the styled map placeholder. */
  mapEmbedUrl: '',
  /** Directions link. Leave empty until the address is confirmed. */
  directionsUrl: '',
  socials: [
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
  ] as SocialLink[],
}
