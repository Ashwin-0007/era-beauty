import { images } from './images'

export interface ResultCase {
  id: string
  title: string
  treatment: string
  note: string
  before: string
  after: string
  demo: boolean
}

export const results: ResultCase[] = [
  { id: 'radiance', title: 'Radiance & tone', treatment: 'Signature Facial', note: '3 sessions over 6 weeks', before: images.resultFace, after: images.resultFace, demo: false },
  { id: 'texture', title: 'Texture refinement', treatment: 'Advanced Skin Care', note: 'Single session immediate dermal glow', before: images.resultSkin, after: images.resultSkin, demo: false },
  { id: 'glow', title: 'Hydration & glow', treatment: 'Hydra Glow Facial', note: 'Post-microcurrent restorative lift', before: images.resultPortrait, after: images.resultPortrait, demo: false },
]
