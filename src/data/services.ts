import { images } from './images'

export interface Service {
  id: string
  title: string
  summary: string
  image: string
  highlights: string[]
}

export const services: Service[] = [
  {
    id: 'facials',
    title: 'Soins Visage Signature',
    summary: 'Des rituels visage sur mesure qui purifient, réparent et illuminent, adaptés à votre peau du jour.',
    image: images.serviceFacial,
    highlights: ['Hydratation', 'Éclat', 'Nettoyage profond'],
  },
  {
    id: 'advanced-skin',
    title: 'Soins Experts de la Peau',
    summary: 'Des soins ciblés pour le grain, le teint et les imperfections, guidés par un diagnostic de peau professionnel.',
    image: images.serviceSkin,
    highlights: ['Peelings', 'Microneedling', 'Diagnostic'],
  },
  {
    id: 'lash-brow',
    title: 'Cils & Sourcils',
    summary: 'Restructuration, teinture et rehaussement précis pour encadrer le visage avec une définition douce et naturelle.',
    image: images.serviceLashBrow,
    highlights: ['Rehaussement', 'Lamination', 'Teinture'],
  },
  {
    id: 'body',
    title: 'Rituels Corps',
    summary: 'Des massages et soins du corps ressourçants, conçus pour libérer les tensions et renouveler la peau.',
    image: images.serviceBody,
    highlights: ['Massage', 'Gommages', 'Enveloppements'],
  },
  {
    id: 'hands-feet',
    title: 'Mains & Pieds',
    summary: 'Manucure et pédicure méticuleuses, pour une finition sereine et sans précipitation.',
    image: images.serviceHandsFeet,
    highlights: ['Manucure', 'Pédicure', 'Gel'],
  },
  {
    id: 'makeup',
    title: 'Art du Maquillage',
    summary: 'Un maquillage d’occasion ou de mariée qui sublime sans masquer, conçu pour tenir toute la journée.',
    image: images.serviceMakeup,
    highlights: ['Mariée', 'Événements', 'Cours'],
  },
]
