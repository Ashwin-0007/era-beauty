export interface PriceItem {
  name: string
  description: string
  duration: number
  price: number
  from?: boolean
  serviceId: string
}

export interface PriceCategory {
  id: string
  label: string
  items: PriceItem[]
}

export const pricing: PriceCategory[] = [
  {
    id: 'face',
    label: 'Face',
    items: [
      { name: 'Signature Facial', description: 'Cleanse, exfoliation, extraction, mask and massage.', duration: 60, price: 90, serviceId: 'facials' },
      { name: 'Hydra Glow Facial', description: 'Intensive hydration for dull or dehydrated skin.', duration: 75, price: 120, serviceId: 'facials' },
      { name: 'Express Radiance', description: 'A focused refresh for skin on the go.', duration: 30, price: 55, serviceId: 'facials' },
      { name: 'Chemical Peel', description: 'Professional-grade resurfacing, assessed per skin type.', duration: 45, price: 110, from: true, serviceId: 'advanced-skin' },
      { name: 'Microneedling', description: 'Collagen induction for texture and tone.', duration: 60, price: 180, from: true, serviceId: 'advanced-skin' },
    ],
  },
  {
    id: 'lash-brow',
    label: 'Lash & Brow',
    items: [
      { name: 'Lash Lift & Tint', description: 'A lifted, defined natural lash.', duration: 60, price: 65, serviceId: 'lash-brow' },
      { name: 'Brow Lamination', description: 'Brushed-up, fuller looking brows.', duration: 45, price: 55, serviceId: 'lash-brow' },
      { name: 'Brow Shape & Tint', description: 'Mapping, shaping and tint.', duration: 30, price: 35, serviceId: 'lash-brow' },
    ],
  },
  {
    id: 'body',
    label: 'Body',
    items: [
      { name: 'Relaxing Massage', description: 'Full body massage with warm oils.', duration: 60, price: 85, serviceId: 'body' },
      { name: 'Hot Stone Ritual', description: 'Deeply restorative heated stone massage.', duration: 75, price: 105, serviceId: 'body' },
      { name: 'Body Polish', description: 'Exfoliation followed by nourishing hydration.', duration: 45, price: 70, serviceId: 'body' },
    ],
  },
  {
    id: 'hands-makeup',
    label: 'Hands & Makeup',
    items: [
      { name: 'Classic Manicure', description: 'Shape, cuticle care and polish.', duration: 45, price: 35, serviceId: 'hands-feet' },
      { name: 'Spa Pedicure', description: 'Soak, exfoliation, massage and polish.', duration: 60, price: 50, serviceId: 'hands-feet' },
      { name: 'Event Makeup', description: 'Full makeup for occasions and photography.', duration: 60, price: 80, serviceId: 'makeup' },
      { name: 'Bridal Makeup', description: 'Includes consultation and trial.', duration: 120, price: 220, from: true, serviceId: 'makeup' },
    ],
  },
]
