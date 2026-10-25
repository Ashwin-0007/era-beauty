import { images } from './images'

export interface PriceRow {
  label: string
  values: string[]
}

export interface PriceGroup {
  title: string
  columns: string[]
  rows: PriceRow[]
}

export interface PriceTab {
  label: string
  groups: PriceGroup[]
}

export interface PriceSection {
  id: string
  // Slug de la catégorie liée (prestations) ; absent pour les packs transverses.
  categorySlug?: string
  name: string
  subtitle: string
  description: string
  note?: string
  image: string
  tabs: PriceTab[]
}

const laserCols = ['Séance', 'Forfait 6 séances']
const careCols = ['Durée', 'Tarif']

const laserRow = (label: string, session: number, pack: number): PriceRow => ({
  label,
  values: [`${session} €`, `${pack} €`],
})

const careRow = (label: string, duration: string, price: string): PriceRow => ({ label, values: [duration, price] })

export const pricingSections: PriceSection[] = [
  {
    id: 'epilation-laser',
    categorySlug: 'epilation-laser',
    name: 'Épilation laser diode',
    subtitle: 'Tarifs femmes & hommes',
    description:
      'Retrouvez ci-dessous l’ensemble de nos tarifs par zone, à la séance et en forfait. Des solutions adaptées à chaque besoin pour une peau durablement plus belle.',
    note: 'Des forfaits avantageux sont proposés pour plusieurs zones.',
    image: images.laserLeg,
    tabs: [
      {
        label: 'Femme',
        groups: [
          {
            title: 'Visage',
            columns: laserCols,
            rows: [
              laserRow('Lèvre supérieure', 35, 180),
              laserRow('Menton', 35, 180),
              laserRow('Joues', 35, 180),
              laserRow('Cou', 35, 180),
              laserRow('Visage complet', 65, 320),
            ],
          },
          {
            title: 'Haut du corps',
            columns: laserCols,
            rows: [
              laserRow('Aisselles', 45, 230),
              laserRow('Avant-bras', 70, 360),
              laserRow('Bras complets', 110, 560),
              laserRow('Ligne ombilicale', 35, 180),
            ],
          },
          {
            title: 'Bas du corps',
            columns: laserCols,
            rows: [
              laserRow('Demi-jambes', 120, 620),
              laserRow('Cuisses', 130, 660),
              laserRow('Jambes complètes', 190, 960),
              laserRow('Pieds & orteils', 35, 180),
            ],
          },
          {
            title: 'Zones intimes',
            columns: laserCols,
            rows: [
              laserRow('Maillot classique', 60, 300),
              laserRow('Maillot échancré', 75, 380),
              laserRow('Maillot intégral', 95, 480),
              laserRow('Sillon interfessier', 40, 200),
            ],
          },
        ],
      },
      {
        label: 'Homme',
        groups: [
          {
            title: 'Visage',
            columns: laserCols,
            rows: [laserRow('Contour de barbe', 50, 250), laserRow('Pommettes', 40, 200), laserRow('Nuque', 45, 230)],
          },
          {
            title: 'Haut du corps',
            columns: laserCols,
            rows: [
              laserRow('Aisselles', 50, 250),
              laserRow('Épaules', 60, 300),
              laserRow('Torse', 90, 460),
              laserRow('Dos complet', 130, 660),
            ],
          },
          {
            title: 'Bas du corps',
            columns: laserCols,
            rows: [laserRow('Demi-jambes', 130, 660), laserRow('Jambes complètes', 210, 1060)],
          },
        ],
      },
      {
        label: 'Forfaits',
        groups: [
          {
            title: 'Forfaits multizones',
            columns: ['Détail', 'Tarif'],
            rows: [
              careRow('Aisselles + maillot classique', '6 séances', '480 €'),
              careRow('Aisselles + maillot intégral', '6 séances', '650 €'),
              careRow('Jambes complètes + aisselles + maillot', '6 séances', '1 190 €'),
              careRow('Corps complet', '6 séances', '1 690 €'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'beaute-du-regard',
    categorySlug: 'beaute-du-regard',
    name: 'Beauté du regard',
    subtitle: 'Tarifs des prestations',
    description:
      'Sublimez votre regard avec nos prestations sur-mesure : rehaussement de cils, brow lift, teintures et soins nourrissants.',
    image: images.eyeLashes,
    tabs: [
      {
        label: 'Prestations',
        groups: [
          {
            title: 'Rehaussement de cils',
            columns: careCols,
            rows: [careRow('Rehaussement de cils', '45 min', '70 €'), careRow('Rehaussement + soin kératine', '50 min', '78 €')],
          },
          { title: 'Korean Lash Lift', columns: careCols, rows: [careRow('Korean Lash Lift', '1h', '80 €')] },
          { title: 'Brow Lift', columns: careCols, rows: [careRow('Brow Lift', '45 min', '70 €'), careRow('Brow Lift + restructuration', '1h', '80 €')] },
          { title: 'Bleach Brow', columns: careCols, rows: [careRow('Bleach Brow', '30 min', '40 €')] },
          {
            title: 'Teinture cils et sourcils',
            columns: careCols,
            rows: [careRow('Teinture cils', '20 min', '25 €'), careRow('Teinture sourcils', '20 min', '20 €'), careRow('Teinture cils et sourcils', '30 min', '30 €')],
          },
          {
            title: 'Packs regard',
            columns: careCols,
            rows: [
              careRow('Rehaussement de cils + Teinture', '1h', '85 €'),
              careRow('Brow Lift + Teinture', '1h', '85 €'),
              careRow('Pack complet', '1h45', '140 €'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'soins-visage-head-spa',
    categorySlug: 'soins-visage-head-spa',
    name: 'Soins visage & Head Spa',
    subtitle: 'Tarifs des soins',
    description: 'Des soins experts pour une peau éclatante et un bien-être profond.',
    image: images.headSpa,
    tabs: [
      {
        label: 'Soins',
        groups: [
          {
            title: 'Soins visage',
            columns: careCols,
            rows: [careRow('Soin visage signature', '1h', '90 €'), careRow('Soin hydratant intense', '1h15', '110 €'), careRow('Soin éclat express', '30 min', '55 €')],
          },
          { title: 'Head Spa', columns: careCols, rows: [careRow('Head Spa', '1h', '85 €'), careRow('Head Spa & soin visage', '1h30', '140 €')] },
          { title: 'Soins spécifiques', columns: careCols, rows: [careRow('Soin purifiant', '1h', '95 €'), careRow('Soin anti-âge', '1h15', '120 €')] },
        ],
      },
    ],
  },
  {
    id: 'soins-corps',
    categorySlug: 'soins-corps',
    name: 'Soins corps',
    subtitle: 'Tarifs des soins',
    description: 'Des soins corps experts pour une silhouette sublimée et une détente profonde.',
    image: images.bodyMassage,
    tabs: [
      {
        label: 'Soins',
        groups: [
          { title: 'Massages', columns: careCols, rows: [careRow('Massage relaxant', '1h', '85 €'), careRow('Rituel aux pierres chaudes', '1h15', '105 €')] },
          { title: 'Soins spécifiques', columns: careCols, rows: [careRow('Drainage lymphatique', '1h', '90 €'), careRow('Gommage corps', '45 min', '70 €')] },
        ],
      },
    ],
  },
  {
    id: 'blanchiment-strass-dentaires',
    categorySlug: 'blanchiment-strass-dentaires',
    name: 'Blanchiment & strass dentaires',
    subtitle: 'Tarifs des prestations',
    description: 'Un sourire plus blanc et plus unique, en toute sécurité.',
    image: images.smile,
    tabs: [
      {
        label: 'Prestations',
        groups: [
          { title: 'Blanchiment dentaire', columns: careCols, rows: [careRow('Séance de blanchiment', '1h', '89 €'), careRow('Cure 2 séances', '2 × 1h', '159 €')] },
          { title: 'Strass dentaires', columns: careCols, rows: [careRow('Pose d’un strass', '20 min', '30 €'), careRow('Blanchiment + strass', '1h20', '109 €')] },
        ],
      },
    ],
  },
  {
    id: 'cabine-uv',
    categorySlug: 'cabine-uv',
    name: 'Cabine UV',
    subtitle: 'Tarifs des séances',
    description: 'Un bronzage naturel et maîtrisé, toute l’année.',
    image: images.uvGlow,
    tabs: [
      {
        label: 'Séances',
        groups: [
          {
            title: 'Séances UV',
            columns: ['Validité', 'Tarif'],
            rows: [careRow('Séance à l’unité', '—', '12 €'), careRow('Carte 5 séances', '3 mois', '55 €'), careRow('Carte 10 séances', '6 mois', '100 €')],
          },
        ],
      },
    ],
  },
  {
    id: 'packs',
    name: 'Nos packs',
    subtitle: 'Des combinaisons avantageuses',
    description: 'Associez plusieurs prestations pour un résultat complet, à un tarif préférentiel.',
    image: images.instituteLounge,
    tabs: [
      {
        label: 'Packs',
        groups: [
          {
            title: 'Packs signature',
            columns: careCols,
            rows: [
              careRow('Pack regard complet', '1h45', '140 €'),
              careRow('Pack éclat (soin visage + Head Spa)', '1h30', '140 €'),
              careRow('Pack sourire (blanchiment + strass)', '1h20', '109 €'),
            ],
          },
        ],
      },
    ],
  },
]

export const pricingInfo = [
  'Les tarifs indiqués sont valables à la séance et en forfait.',
  'Une première consultation est obligatoire avant toute séance de laser.',
  'Les forfaits sont personnalisables selon vos besoins.',
  'Retrouvez toutes nos recommandations dans la rubrique FAQ.',
]
