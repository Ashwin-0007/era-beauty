import { images } from './images'

export interface ResultCase {
  id: string
  title: string
  treatment: string
  note: string
  before: string
  after: string
  /**
   * Demonstration content: the same stock image is shown with a simulated
   * "before" filter. Set to false only for genuine, approved client results.
   */
  demo: boolean
}

export const results: ResultCase[] = [
  { id: 'radiance', title: 'Radiance & tone', treatment: 'Signature Facial', note: 'Illustrative example', before: images.resultFace, after: images.resultFace, demo: true },
  { id: 'texture', title: 'Texture refinement', treatment: 'Advanced Skin Care', note: 'Illustrative example', before: images.resultSkin, after: images.resultSkin, demo: true },
  { id: 'glow', title: 'Hydration & glow', treatment: 'Hydra Glow Facial', note: 'Illustrative example', before: images.resultPortrait, after: images.resultPortrait, demo: true },
]
