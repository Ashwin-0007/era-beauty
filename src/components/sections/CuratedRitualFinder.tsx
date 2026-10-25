import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Sparkles, Clock, CheckCircle2, ArrowRight } from 'lucide-react'
import { useBooking } from '../../context/BookingContext'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'

interface RitualOption {
  title: string
  subtitle: string
  duration: string
  price: string
  serviceId: string
  actives: string[]
  sensoryNote: string
  description: string
}

const priorities = [
  { id: 'glow', label: 'Éclat & effet glass skin' },
  { id: 'sculpt', label: 'Sculpt & lift du visage' },
  { id: 'reset', label: 'Réparation de la barrière cutanée' },
  { id: 'purify', label: 'Purification des pores' },
] as const

const durations = [
  { id: '60', label: '60 min' },
  { id: '90', label: '90 min Signature' },
  { id: '120', label: '120 min Impérial' },
] as const

type PriorityId = typeof priorities[number]['id']
type DurationId = typeof durations[number]['id']

const protocolMatrix: Record<PriorityId, Record<DurationId, RitualOption>> = {
  glow: {
    '60': {
      title: 'L’Express Lumière',
      subtitle: 'Peeling oxygénant et triple infusion d’acide hyaluronique',
      duration: '60 min',
      price: '95 €',
      serviceId: 'facials',
      actives: ['Hydrolat de rose de Damas', 'Acide hyaluronique bas poids moléculaire', 'Ester de vitamine C'],
      sensoryNote: 'Rouleaux de quartz rafraîchis et délicate brume de rose française.',
      description: 'Un soin réveil pensé pour les peaux ternes, pour un rebond immédiat et un éclat parfait devant l’objectif.',
    },
    '90': {
      title: 'Le Protocole Éclat Impérial 24 carats',
      subtitle: 'Drainage lymphatique par microcourant et masque à l’or 24 carats',
      duration: '90 min',
      price: '150 €',
      serviceId: 'facials',
      actives: ['Or colloïdal 24 carats', 'Peptides bio-placentaires', 'Extrait de truffe blanche'],
      sensoryNote: 'Compresses botaniques dorées et chaudes, shiatsu rythmé des points de pression et globes cryo-sculptants.',
      description: 'Notre rituel le plus demandé avant un mariage ou un gala. Il relance la microcirculation et enveloppe la peau d’un éclat lumineux venu de l’intérieur.',
    },
    '120': {
      title: 'La Grande Cérémonie Illuminatrice',
      subtitle: 'Cérémonie de bio-infusion pour le visage, le décolleté et les mains',
      duration: '120 min',
      price: '210 €',
      serviceId: 'facials',
      actives: ['Edelweiss rare des Alpes', 'Ferment de cellules souches', 'Perles de collagène marin'],
      sensoryNote: 'Immersion botanique chaude du cuir chevelu en plusieurs étapes, infusion sonique et compresse pour les yeux en pure soie.',
      description: 'Un voyage sensoriel transformateur, tout en lenteur, qui redonne élasticité juvénile et luminosité de porcelaine au visage, au cou et aux mains.',
    },
  },
  sculpt: {
    '60': {
      title: 'Le Contour Architecture',
      subtitle: 'Massage facial profond et ciblé avec techniques buccales',
      duration: '60 min',
      price: '110 €',
      serviceId: 'facials',
      actives: ['Acétyl hexapeptide-8', 'Ginkgo biloba', 'Caféine vectorisée'],
      sensoryNote: 'Pierres de jade rafraîchissantes et lotions botaniques tonifiantes.',
      description: 'Redessine l’ovale du visage, réduit la rétention d’eau et tonifie la musculature faciale avec une grande précision anatomique.',
    },
    '90': {
      title: 'Le Haute Sculpt Signature',
      subtitle: 'Libération intrabuccale, lifting des fascias et microcourant',
      duration: '90 min',
      price: '175 €',
      serviceId: 'facials',
      actives: ['Tripeptide-1 de cuivre', 'Bio-élastine marine', 'Phytostérols de squalane'],
      sensoryNote: 'Pierres de basalte chaudes le long des cervicales et arômes revigorants de menthe poivrée.',
      description: 'Un lifting architectural non invasif qui libère les tensions de la mâchoire, rehausse les pommettes et redonne jeunesse aux contours du visage.',
    },
    '120': {
      title: 'Le Contour Impérial & Alignement du Corps',
      subtitle: 'Libération myofasciale de la tête aux pieds associée à un modelage haute performance',
      duration: '120 min',
      price: '240 €',
      serviceId: 'body',
      actives: ['Céramides bio-identiques', 'Huile d’argan bio', 'Centella asiatica'],
      sensoryNote: 'Compresses chaudes aux plantes sur tout le corps, encens de cèdre et harmonisation par bain sonore.',
      description: 'Le summum du modelage ressourçant. Apaise les tensions posturales du haut du corps et sculpte le visage sur mesure pour une légèreté totale.',
    },
  },
  reset: {
    '60': {
      title: 'Le Cocon Apaisant Barrière',
      subtitle: 'Voile probiotique délicat et infusion apaisante de camomille',
      duration: '60 min',
      price: '90 €',
      serviceId: 'advanced-skin',
      actives: ['Lysat de ferment de bifida', 'Camomille bleue allemande', 'Madécassoside'],
      sensoryNote: 'Compresses de velours ultra-douces et vapeur de lavande.',
      description: 'Apaise les inflammations, reconstitue le film lipidique et calme les peaux réactives ou sensibilisées.',
    },
    '90': {
      title: 'L’Infusion Cellulaire Réparatrice',
      subtitle: 'Renforcement de la barrière par électroporation et masque en bio-cellulose',
      duration: '90 min',
      price: '140 €',
      serviceId: 'advanced-skin',
      actives: ['Complexe de 5 céramides', 'Bêta-glucane', 'Avoine colloïdale micronisée'],
      sensoryNote: 'Cuillères en porcelaine rafraîchies et compresses apaisantes au thé vert.',
      description: 'Renforce la fragile barrière d’hydratation face à la pollution urbaine et aux climats rigoureux, en retenant l’hydratation au cœur de la peau.',
    },
    '120': {
      title: 'La Retraite de Renouveau Cellulaire Complète',
      subtitle: 'Réparation complète de la peau par photobiomodulation LED',
      duration: '120 min',
      price: '195 €',
      serviceId: 'advanced-skin',
      actives: ['Polynucléotides (PDRN)', 'Resvératrol', 'Lipides d’onagre'],
      sensoryNote: 'Cocon de photothérapie à la lumière rouge, bain de pieds chaud au jasmin et drainage lymphatique.',
      description: 'Répare les structures cellulaires fragilisées, stimule la synthèse de collagène et apporte un apaisement durable aux peaux irritées.',
    },
  },
  purify: {
    '60': {
      title: 'Le Soin Purifiant Botanique',
      subtitle: 'Extraction sonique des pores et ferment purifiant à l’arbre à thé',
      duration: '60 min',
      price: '85 €',
      serviceId: 'facials',
      actives: ['Salicine d’écorce de saule', 'Niacinamide 5 %', 'Argile verte française'],
      sensoryNote: 'Vapeur d’eucalyptus et hydrolat de citron vert rafraîchi.',
      description: 'Désobstrue en douceur les pores sans dessécher ni agresser la barrière cutanée, pour un grain de peau mat et affiné.',
    },
    '90': {
      title: 'Le Signature Purifiant Clinique',
      subtitle: 'Hydrodermabrasion, haute fréquence et voile minéral au zinc',
      duration: '90 min',
      price: '135 €',
      serviceId: 'advanced-skin',
      actives: ['Acide mandélique', 'Complexe de bio-soufre', 'Cire de propolis'],
      sensoryNote: 'Compresses rafraîchissantes à la menthe poivrée et voûte apaisante de LED bleues.',
      description: 'Un protocole de désobstruction en profondeur qui régule le sébum, apaise les imperfections et affine le grain de peau irrégulier.',
    },
    '120': {
      title: 'Le Grand Rituel Purifiant Impérial',
      subtitle: 'Soin détoxifiant complet du visage, du dos et du décolleté',
      duration: '120 min',
      price: '190 €',
      serviceId: 'body',
      actives: ['Bio-ferment de cendre volcanique', 'Complexe salicylique', 'Eau florale de romarin'],
      sensoryNote: 'Enveloppement chaud aux plantes pour le dos, brossage à sec du corps et massage purifiant du cuir chevelu.',
      description: 'Une purification complète du corps qui traite les imperfections tenaces du dos, des épaules et du visage, avec un soin tout en lenteur.',
    },
  },
}

export function CuratedRitualFinder() {
  const { openBooking } = useBooking()
  const [selectedPriority, setSelectedPriority] = useState<PriorityId>('glow')
  const [selectedDuration, setSelectedDuration] = useState<DurationId>('90')

  const ritual = protocolMatrix[selectedPriority][selectedDuration]

  return (
    <section aria-labelledby="curator-title" className="relative pt-6 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24 bg-ivory overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[650px] rounded-full bg-gradient-to-tr from-sand/20 via-oxblood/10 to-transparent blur-[120px]"
      />

      <div className="container-x relative">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow text-oxblood">Conciergerie de protocoles sur mesure</p>
          <h2 id="curator-title" className="display mt-3 text-[2.6rem] sm:text-[3.6rem] leading-[1.08] text-ink">
            Composez votre <em className="text-oxblood font-normal">rituel personnel</em>
          </h2>
          <p className="mt-4 text-ink/65 text-sm sm:text-base">
            Choisissez votre objectif beauté et le temps dont vous disposez. Notre algorithme clinique détermine la formulation et le déroulé de soin idéaux pour vous.
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {priorities.map((item) => {
              const active = selectedPriority === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedPriority(item.id)}
                  className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm tracking-wider uppercase transition-all duration-400 ${
                    active
                      ? 'bg-ink text-ivory shadow-luxe border border-ink'
                      : 'bg-cream/60 hover:bg-cream text-ink/75 border border-ink/10'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>

          <div className="glass-pill rounded-full p-1.5 flex gap-1 sm:gap-2">
            {durations.map((item) => {
              const active = selectedDuration === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedDuration(item.id)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-400 ${
                    active
                      ? 'bg-oxblood text-ivory shadow-sm'
                      : 'text-ink/60 hover:text-ink hover:bg-ivory/50'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>

        <Reveal className="mt-12 max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedPriority}-${selectedDuration}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.5 }}
              className="glass-card shimmer-hover rounded-3xl p-8 sm:p-12 border border-oxblood/20 shadow-luxe-lg relative overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/8 pb-6">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-oxblood/10 text-oxblood">
                    <Sparkles size={14} />
                  </span>
                  <span className="eyebrow text-oxblood">Protocole recommandé</span>
                </div>
                <div className="flex items-center gap-4 text-xs tracking-wider uppercase text-ink/70">
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} className="text-oxblood" />
                    {ritual.duration}
                  </span>
                  <span className="font-display text-xl text-ink font-normal">{ritual.price}</span>
                </div>
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-center">
                <div className="md:col-span-7">
                  <h3 className="display text-[2.2rem] sm:text-[3rem] leading-none text-ink">
                    {ritual.title}
                  </h3>
                  <p className="font-display italic text-lg sm:text-xl text-oxblood mt-2">
                    {ritual.subtitle}
                  </p>
                  <p className="mt-4 text-sm sm:text-base text-ink/75 leading-relaxed">
                    {ritual.description}
                  </p>

                  <div className="mt-6">
                    <p className="eyebrow text-ink/50 mb-2">Actifs clés</p>
                    <ul className="flex flex-wrap gap-2">
                      {ritual.actives.map((active) => (
                        <li
                          key={active}
                          className="glass-pill px-3 py-1 rounded-full text-xs text-ink/80 flex items-center gap-1.5"
                        >
                          <CheckCircle2 size={11} className="text-oxblood" />
                          {active}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="mt-5 text-xs text-ink/55 italic">
                    <span className="font-medium text-ink/70">Arômes &amp; toucher :</span> {ritual.sensoryNote}
                  </p>
                </div>

                <div className="md:col-span-5 flex flex-col items-center md:items-end justify-center border-t md:border-t-0 md:border-l border-ink/8 pt-6 md:pt-0 md:pl-8">
                  <div className="text-center md:text-right mb-6">
                    <span className="text-xs uppercase tracking-[0.25em] text-ink/45 block mb-1">Investissement estimé</span>
                    <span className="display text-4xl sm:text-5xl text-oxblood font-normal">{ritual.price}</span>
                    <span className="text-[0.7rem] block text-ink/40 mt-1 uppercase tracking-widest">Salon privé inclus</span>
                  </div>
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto px-8 shrink-0 whitespace-nowrap shadow-luxe"
                    icon={<ArrowRight size={15} strokeWidth={1.8} />}
                    onClick={() => openBooking(ritual.serviceId)}
                  >
                    Réserver ce protocole
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
