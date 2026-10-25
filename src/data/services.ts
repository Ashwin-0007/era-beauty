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
    title: 'Signature Facials',
    summary: 'Tailored facial rituals that cleanse, restore and illuminate, adapted to your skin on the day.',
    image: images.serviceFacial,
    highlights: ['Hydration', 'Radiance', 'Deep cleanse'],
  },
  {
    id: 'advanced-skin',
    title: 'Advanced Skin Care',
    summary: 'Targeted treatments for texture, tone and congestion, guided by a professional skin assessment.',
    image: images.serviceSkin,
    highlights: ['Peels', 'Microneedling', 'Analysis'],
  },
  {
    id: 'lash-brow',
    title: 'Lash & Brow',
    summary: 'Precise shaping, tinting and lifting to frame the face with a soft, natural definition.',
    image: images.serviceLashBrow,
    highlights: ['Lash lift', 'Lamination', 'Tint'],
  },
  {
    id: 'body',
    title: 'Body Rituals',
    summary: 'Restorative massage and body treatments designed to release tension and renew the skin.',
    image: images.serviceBody,
    highlights: ['Massage', 'Scrubs', 'Wraps'],
  },
  {
    id: 'hands-feet',
    title: 'Hands & Feet',
    summary: 'Meticulous manicure and pedicure care with a quiet, unhurried finish.',
    image: images.serviceHandsFeet,
    highlights: ['Manicure', 'Pedicure', 'Gel'],
  },
  {
    id: 'makeup',
    title: 'Makeup Artistry',
    summary: 'Occasion and bridal makeup that enhances rather than conceals, built to last the day.',
    image: images.serviceMakeup,
    highlights: ['Bridal', 'Events', 'Lessons'],
  },
]
