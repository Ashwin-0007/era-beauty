export interface Testimonial {
  id: string
  quote: string
  client: string
  roleOrLocation: string
  treatment: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'ERA Beauty has completely redefined facial architecture for me. The 90-minute Signature Protocol left my skin with a luminous glass-like clarity that lasted for weeks leading up to fashion week.',
    client: 'Geneviève Laurent',
    roleOrLocation: 'Private Suite Member • New York',
    treatment: 'Signature Facial Ritual',
    rating: 5,
  },
  {
    id: 't2',
    quote:
      'The quiet discretion and meticulous scientific precision are unparalleled. Walking into the atelier immediately drops your heart rate. It is not merely skincare; it is restorative poetry.',
    client: 'Dr. Alistair Vance',
    roleOrLocation: 'Atelier Patron • London & Zurich',
    treatment: 'Advanced Collagen Induction',
    rating: 5,
  },
  {
    id: 't3',
    quote:
      'I was astonished by the immediate sculpt and radiance following the Hydra Glow treatment. My skin barrier has never felt this calm, deeply hydrated, and resilient against travel fatigue.',
    client: 'Camille de Montreuil',
    roleOrLocation: 'Editorial Contributor • Paris',
    treatment: 'Hydra Glow & Lymphatic Reset',
    rating: 5,
  },
]
