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
      'ERA Beauty a complètement redéfini l’architecture de mon visage. Le Protocole Signature de 90 minutes a offert à ma peau une clarté lumineuse, presque translucide, qui a duré des semaines jusqu’à la fashion week.',
    client: 'Geneviève Laurent',
    roleOrLocation: 'Membre du Salon Privé • New York',
    treatment: 'Rituel Visage Signature',
    rating: 5,
  },
  {
    id: 't2',
    quote:
      'La discrétion feutrée et la précision scientifique méticuleuse sont incomparables. Dès l’entrée dans l’atelier, le rythme cardiaque ralentit. Ce n’est pas simplement un soin de la peau ; c’est une poésie réparatrice.',
    client: 'Dr. Alistair Vance',
    roleOrLocation: 'Client de l’Atelier • Londres & Zurich',
    treatment: 'Induction de Collagène Avancée',
    rating: 5,
  },
  {
    id: 't3',
    quote:
      'J’ai été stupéfaite par l’effet sculptant et l’éclat immédiats après le soin Hydra Glow. Ma barrière cutanée n’a jamais été aussi apaisée, profondément hydratée et résistante à la fatigue des voyages.',
    client: 'Camille de Montreuil',
    roleOrLocation: 'Contributrice Éditoriale • Paris',
    treatment: 'Hydra Glow & Drainage Lymphatique',
    rating: 5,
  },
]
