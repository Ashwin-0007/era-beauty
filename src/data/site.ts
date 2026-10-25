export interface SocialLink {
  label: 'Instagram' | 'TikTok' | 'YouTube'
  href: string
}

export interface OpeningDay {
  day: string
  hours: string | null
}

export const site = {
  name: 'ERA Beauty',
  tagline: 'Institut de Beauté',
  motto: 'Beauté · Soin · Confiance',
  currency: '€',

  // Lien vers la plateforme de réservation officielle (Planity, Treatwell…).
  // Laisser vide pour utiliser le formulaire de demande intégré au site.
  bookingUrl: '',

  // Points d'envoi des formulaires (Formspree, Brevo, back-office…).
  // Laisser vide pour une simulation locale de l'envoi.
  contactEndpoint: '',
  newsletterEndpoint: '',

  // Vidéo d'ambiance facultative pour la page d'accueil (fichier .mp4).
  heroVideoUrl: '',
} as const

export const contact = {
  street: '12 rue Dailly',
  city: '92210 Saint-Cloud',
  phoneDisplay: '01 23 45 67 89',
  phoneHref: 'tel:+33123456789',
  phoneNote: 'Du lundi au samedi',
  email: 'contact@erabeauty.fr',
  emailNote: 'Réponse sous 24 à 48h',
  mapEmbedUrl: 'https://www.google.com/maps?q=12+rue+Dailly,+92210+Saint-Cloud&output=embed',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=12+rue+Dailly,+92210+Saint-Cloud',
  hours: [
    { day: 'Lundi', hours: '10h00 – 19h00' },
    { day: 'Mardi', hours: '10h00 – 19h00' },
    { day: 'Mercredi', hours: '10h00 – 19h00' },
    { day: 'Jeudi', hours: '10h00 – 19h00' },
    { day: 'Vendredi', hours: '10h00 – 20h00' },
    { day: 'Samedi', hours: '10h00 – 20h00' },
    { day: 'Dimanche', hours: null },
  ] as OpeningDay[],
  access: [
    { title: 'En voiture', text: 'Des places de stationnement sont disponibles à proximité de l’institut.' },
    { title: 'En transports', text: 'Gare de Saint-Cloud à 5 minutes à pied (Ligne L).' },
    { title: 'Stationnement', text: 'Parkings publics à proximité : Parking Indigo Saint-Cloud, Parking Centre.' },
  ],
  socials: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'TikTok', href: 'https://tiktok.com' },
    { label: 'YouTube', href: 'https://youtube.com' },
  ] as SocialLink[],
}
