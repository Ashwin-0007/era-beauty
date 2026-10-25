export interface Testimonial {
  id: string
  quote: string
  client: string
  treatment: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Un accueil chaleureux et un cadre magnifique. Mon rehaussement de cils est parfait, je ne peux plus m’en passer !',
    client: 'Sarah M.',
    treatment: 'Rehaussement de cils',
    rating: 5,
  },
  {
    id: 't2',
    quote:
      'Après seulement quelques séances de laser, la différence est déjà visible. Une équipe professionnelle et à l’écoute.',
    client: 'Inès B.',
    treatment: 'Épilation laser diode',
    rating: 5,
  },
  {
    id: 't3',
    quote: 'Le Head Spa est un vrai moment hors du temps. Je suis ressortie détendue, avec une peau lumineuse.',
    client: 'Camille D.',
    treatment: 'Head Spa & soin visage',
    rating: 5,
  },
]
