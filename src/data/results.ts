import { images } from './images'

export interface ResultCase {
  id: string
  title: string
  treatment: string
  note: string
  before: string
  after: string
  beforeCondition: string
  afterCondition: string
  metric: string
  beforeFilter?: string
  afterFilter?: string
}

export const results: ResultCase[] = [
  {
    id: 'radiance',
    title: 'Radiance & tone',
    treatment: 'Signature Facial',
    note: '3 sessions over 6 weeks',
    before: images.resultFace,
    after: images.resultFace,
    beforeCondition: 'Pre-Treatment · Uneven Tone & Dullness',
    afterCondition: 'Post-Protocol · Luminous Glass Skin',
    metric: '+94% Radiant Luminescence',
    beforeFilter: 'brightness(0.88) contrast(0.90) saturate(0.68) sepia(0.14) hue-rotate(-6deg)',
    afterFilter: 'brightness(1.06) contrast(1.05) saturate(1.16)',
  },
  {
    id: 'texture',
    title: 'Texture refinement',
    treatment: 'Advanced Skin Care',
    note: 'Single session immediate dermal glow',
    before: images.resultSkin,
    after: images.resultSkin,
    beforeCondition: 'Pre-Treatment · Rough Texture & Congestion',
    afterCondition: 'Post-Protocol · Refined Pore Clarity',
    metric: '+88% Dermal Smoothness',
    beforeFilter: 'brightness(0.90) contrast(0.88) saturate(0.70) sepia(0.12)',
    afterFilter: 'brightness(1.05) contrast(1.08) saturate(1.14)',
  },
  {
    id: 'glow',
    title: 'Hydration & glow',
    treatment: 'Hydra Glow Facial',
    note: 'Post-microcurrent restorative lift',
    before: images.resultPortrait,
    after: images.resultPortrait,
    beforeCondition: 'Pre-Treatment · Moisture Depletion & Fatigue',
    afterCondition: 'Post-Protocol · Dewy Restorative Lift',
    metric: '+98% Deep Hydration Barrier',
    beforeFilter: 'brightness(0.86) contrast(0.92) saturate(0.65) sepia(0.16)',
    afterFilter: 'brightness(1.08) contrast(1.04) saturate(1.18)',
  },
]

