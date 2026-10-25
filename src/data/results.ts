import { images } from './images'

export interface ResultCase {
  id: string
  title: string
  // Identifiant de la prestation (catalog) pour le bouton « Voir la prestation ».
  categorySlug: string
  filter: string
  description: string
  // Paire de photos réelles avant / après (même cadrage). Une seule photo = rendu simulé.
  before: string
  after: string
  quote?: string
  video?: { label: string; image: string; url?: string }
}

export const resultFilters = ['Tous', 'Rehaussement de cils', 'Brow Lift', 'Soins visage'] as const

export const featuredResults: ResultCase[] = [
  {
    id: 'rehaussement',
    title: 'Rehaussement de cils',
    categorySlug: 'beaute-du-regard',
    filter: 'Rehaussement de cils',
    description: 'Des cils naturellement plus longs, plus courbés et un regard sublimé dès la première séance.',
    before: images.eyeLashes,
    after: images.eyeLashes,
    quote: 'Un résultat incroyable ! Mon regard est plus ouvert et mes cils sont parfaitement courbés.',
    video: { label: 'Rehaussement de cils', image: images.eyeClosed },
  },
  {
    id: 'brow-lift',
    title: 'Brow Lift',
    categorySlug: 'beaute-du-regard',
    filter: 'Brow Lift',
    description: 'Des sourcils plus disciplinés, des poils restructurés et un regard intensifié, tout en naturel.',
    before: images.eyeBrow,
    after: images.eyeBrow,
  },
  {
    id: 'soin-visage',
    title: 'Soin visage signature',
    categorySlug: 'soins-visage-head-spa',
    filter: 'Soins visage',
    description: 'Un teint plus uniforme, une peau hydratée et un éclat retrouvé après une cure de 3 soins.',
    before: images.facialSkin,
    after: images.facialSkin,
  },
]

export const otherResults: ResultCase[] = [
  {
    id: 'teinture',
    title: 'Teinture cils et sourcils',
    categorySlug: 'beaute-du-regard',
    filter: 'Rehaussement de cils',
    description: '',
    before: images.browPortrait,
    after: images.browPortrait,
  },
  {
    id: 'brow-lift-video',
    title: 'Brow Lift',
    categorySlug: 'beaute-du-regard',
    filter: 'Brow Lift',
    description: '',
    before: images.browTweezers,
    after: images.browTweezers,
    video: { label: 'Résultat en vidéo', image: images.browCare },
  },
  {
    id: 'rehaussement-2',
    title: 'Rehaussement de cils',
    categorySlug: 'beaute-du-regard',
    filter: 'Rehaussement de cils',
    description: '',
    before: images.eyeClosed,
    after: images.eyeClosed,
  },
  {
    id: 'eclat',
    title: 'Soin hydratant intense',
    categorySlug: 'soins-visage-head-spa',
    filter: 'Soins visage',
    description: '',
    before: images.portraitSkin,
    after: images.portraitSkin,
  },
]

export const resultQuote = {
  text: 'J’adore le résultat, mes sourcils sont beaucoup plus nets et mon regard est plus intense.',
  author: 'Cliente ERA Beauty',
}
