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
    title: 'Éclat & teint',
    treatment: 'Soin Visage Signature',
    note: '3 séances sur 6 semaines',
    before: images.resultFace,
    after: images.resultFace,
    beforeCondition: 'Avant le soin · Teint irrégulier & terne',
    afterCondition: 'Après le protocole · Peau lumineuse effet glass skin',
    metric: '+94 % de luminosité',
    beforeFilter: 'brightness(0.88) contrast(0.90) saturate(0.68) sepia(0.14) hue-rotate(-6deg)',
    afterFilter: 'brightness(1.06) contrast(1.05) saturate(1.16)',
  },
  {
    id: 'texture',
    title: 'Affinement du grain',
    treatment: 'Soins Experts de la Peau',
    note: 'Éclat immédiat dès la première séance',
    before: images.resultSkin,
    after: images.resultSkin,
    beforeCondition: 'Avant le soin · Grain irrégulier & pores obstrués',
    afterCondition: 'Après le protocole · Pores affinés & peau nette',
    metric: '+88 % de douceur cutanée',
    beforeFilter: 'brightness(0.90) contrast(0.88) saturate(0.70) sepia(0.12)',
    afterFilter: 'brightness(1.05) contrast(1.08) saturate(1.14)',
  },
  {
    id: 'glow',
    title: 'Hydratation & éclat',
    treatment: 'Soin Hydra Glow',
    note: 'Effet liftant réparateur après microcourant',
    before: images.resultPortrait,
    after: images.resultPortrait,
    beforeCondition: 'Avant le soin · Déshydratation & fatigue',
    afterCondition: 'Après le protocole · Peau repulpée & rayonnante',
    metric: '+98 % de barrière d’hydratation',
    beforeFilter: 'brightness(0.86) contrast(0.92) saturate(0.65) sepia(0.16)',
    afterFilter: 'brightness(1.08) contrast(1.04) saturate(1.18)',
  },
]
