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
    label: 'Visage',
    items: [
      { name: 'Soin Visage Signature', description: 'Nettoyage, exfoliation, extraction, masque et massage.', duration: 60, price: 90, serviceId: 'facials' },
      { name: 'Soin Hydra Glow', description: 'Hydratation intense pour les peaux ternes ou déshydratées.', duration: 75, price: 120, serviceId: 'facials' },
      { name: 'Éclat Express', description: 'Un coup de frais ciblé pour les peaux pressées.', duration: 30, price: 55, serviceId: 'facials' },
      { name: 'Peeling Chimique', description: 'Resurfaçage professionnel, adapté à chaque type de peau.', duration: 45, price: 110, from: true, serviceId: 'advanced-skin' },
      { name: 'Microneedling', description: 'Induction de collagène pour le grain et l’uniformité de la peau.', duration: 60, price: 180, from: true, serviceId: 'advanced-skin' },
    ],
  },
  {
    id: 'lash-brow',
    label: 'Cils & Sourcils',
    items: [
      { name: 'Rehaussement & Teinture des Cils', description: 'Des cils naturels, recourbés et sublimés.', duration: 60, price: 65, serviceId: 'lash-brow' },
      { name: 'Lamination des Sourcils', description: 'Des sourcils brossés vers le haut, visiblement plus fournis.', duration: 45, price: 55, serviceId: 'lash-brow' },
      { name: 'Restructuration & Teinture des Sourcils', description: 'Tracé, épilation et teinture.', duration: 30, price: 35, serviceId: 'lash-brow' },
    ],
  },
  {
    id: 'body',
    label: 'Corps',
    items: [
      { name: 'Massage Relaxant', description: 'Massage du corps entier aux huiles chaudes.', duration: 60, price: 85, serviceId: 'body' },
      { name: 'Rituel aux Pierres Chaudes', description: 'Massage profondément ressourçant aux pierres chauffées.', duration: 75, price: 105, serviceId: 'body' },
      { name: 'Gommage Corps', description: 'Exfoliation suivie d’une hydratation nourrissante.', duration: 45, price: 70, serviceId: 'body' },
    ],
  },
  {
    id: 'hands-makeup',
    label: 'Mains & Maquillage',
    items: [
      { name: 'Manucure Classique', description: 'Limage, soin des cuticules et vernis.', duration: 45, price: 35, serviceId: 'hands-feet' },
      { name: 'Pédicure Spa', description: 'Bain, exfoliation, massage et vernis.', duration: 60, price: 50, serviceId: 'hands-feet' },
      { name: 'Maquillage Événement', description: 'Maquillage complet pour vos occasions et séances photo.', duration: 60, price: 80, serviceId: 'makeup' },
      { name: 'Maquillage Mariée', description: 'Consultation et essai inclus.', duration: 120, price: 220, from: true, serviceId: 'makeup' },
    ],
  },
]
