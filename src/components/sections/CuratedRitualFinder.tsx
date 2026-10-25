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
  { id: 'glow', label: 'Radiance & Glass Glow' },
  { id: 'sculpt', label: 'Facial Sculpt & Lift' },
  { id: 'reset', label: 'Cellular Barrier Reset' },
  { id: 'purify', label: 'Deep Pore Clarification' },
] as const

const durations = [
  { id: '60', label: '60 Min' },
  { id: '90', label: '90 Min Signature' },
  { id: '120', label: '120 Min Imperial' },
] as const

type PriorityId = typeof priorities[number]['id']
type DurationId = typeof durations[number]['id']

const protocolMatrix: Record<PriorityId, Record<DurationId, RitualOption>> = {
  glow: {
    '60': {
      title: 'The Luminance Express',
      subtitle: 'Oxygenating peel with triple hyaluronic infusion',
      duration: '60 Min',
      price: '$95',
      serviceId: 'facials',
      actives: ['Damask Rose Hydrosol', 'Low-Molecular HA', 'Vitamin C Ester'],
      sensoryNote: 'Chilled quartz rollers and delicate French rose mist.',
      description: 'An awakening treatment designed for dull skin needing immediate camera-ready bounce and high-clarity reflection.',
    },
    '90': {
      title: 'The 24K Imperial Glow Protocol',
      subtitle: 'Micro-current lymphatic drainage with 24K bio-gold mask',
      duration: '90 Min',
      price: '$150',
      serviceId: 'facials',
      actives: ['24K Colloidal Gold', 'Bio-Placenta Peptides', 'White Truffle Extract'],
      sensoryNote: 'Warm golden botanical compresses, rhythmic pressure point shiatsu, and cryo-sculpt globes.',
      description: 'Our most requested bridal and gala preparation ritual. Revitalizes micro-circulation and blankets skin in an undeniable lit-from-within sheen.',
    },
    '120': {
      title: 'The Grand Illuminating Ceremony',
      subtitle: 'Full décolletage, hands, and facial bio-infusion ceremony',
      duration: '120 Min',
      price: '$210',
      serviceId: 'facials',
      actives: ['Rare Alpine Edelweiss', 'Stem Cell Ferment', 'Marine Collagen Pearls'],
      sensoryNote: 'Multi-step warm botanical scalp immersion, sonic infusion, and pure silk eye compress.',
      description: 'A transformative, unhurried sensory journey that restores youthful elasticity and porcelain luminosity across face, neck, and hands.',
    },
  },
  sculpt: {
    '60': {
      title: 'The Architecture Contour',
      subtitle: 'Focused deep tissue facial massage with buccal techniques',
      duration: '60 Min',
      price: '$110',
      serviceId: 'facials',
      actives: ['Acetyl Hexapeptide-8', 'Ginkgo Biloba', 'Caffeine Vector'],
      sensoryNote: 'Cooling jade contour stones and bracing botanical tonics.',
      description: 'Sharpens jawline definition, unburdens water retention, and tones the facial musculature with high anatomical precision.',
    },
    '90': {
      title: 'The Haute Sculpt Signature',
      subtitle: 'Buccal intra-oral release, fascia lifting, and micro-current',
      duration: '90 Min',
      price: '$175',
      serviceId: 'facials',
      actives: ['Copper Tripeptide-1', 'Marine Bio-Elastin', 'Squalane Phytosterols'],
      sensoryNote: 'Heated basalt stones along cervical spine and invigorating peppermint aromatics.',
      description: 'A non-invasive architectural face-lift that releases jaw tension, lifts cheeks, and restores youthfulness to facial contours.',
    },
    '120': {
      title: 'The Imperial Contour & Body Alignment',
      subtitle: 'Head-to-toe myofascial release paired with high-performance sculpting',
      duration: '120 Min',
      price: '$240',
      serviceId: 'body',
      actives: ['Bio-Identical Ceramides', 'Organic Argan Core Oil', 'Centella Asiatica'],
      sensoryNote: 'Full body warm herbal compresses, cedarwood incense, and sound-bath harmonization.',
      description: 'The pinnacle of restorative sculpt. Harmonizes upper postural tension with bespoke facial sculpting for total body lightness.',
    },
  },
  reset: {
    '60': {
      title: 'The Barrier Calming Cocoon',
      subtitle: 'Gentle probiotic veil with soothing chamomile infusion',
      duration: '60 Min',
      price: '$90',
      serviceId: 'advanced-skin',
      actives: ['Bifida Ferment Lysate', 'German Blue Chamomile', 'Madecassoside'],
      sensoryNote: 'Ultra-plush velvet compresses and lavender hydro-steam.',
      description: 'Extinguishes skin inflammation, replenishes the lipid mantle, and calms reactive or sensitized complexions.',
    },
    '90': {
      title: 'The Cellular Restorative Infusion',
      subtitle: 'Electroporation barrier reinforcement with bio-cellulose mask',
      duration: '90 Min',
      price: '$140',
      serviceId: 'advanced-skin',
      actives: ['5-Ceramide Matrix', 'Beta-Glucan', 'Colloidal Oatmeal Micro-milled'],
      sensoryNote: 'Chilled porcelain spoons and soothing green tea compresses.',
      description: 'Fortifies the delicate moisture barrier against urban pollutants and harsh climates, locking in deep intercellular moisture.',
    },
    '120': {
      title: 'The Complete Cellular Renewal Retreat',
      subtitle: 'Comprehensive skin recovery with LED photo-biomodulation',
      duration: '120 Min',
      price: '$195',
      serviceId: 'advanced-skin',
      actives: ['Polynucleotides (PDRN)', 'Resveratrol', 'Evening Primrose Lipids'],
      sensoryNote: 'Red light photo-therapy cocoon, warm jasmine foot bath, and lymphatic drainage.',
      description: 'Repairs compromised cellular structures, enhances collagen synthesis, and provides long-lasting serenity to irritated skin.',
    },
  },
  purify: {
    '60': {
      title: 'The Botanical Clarifying Flush',
      subtitle: 'Sonic pore extraction with clarifying tea-tree ferment',
      duration: '60 Min',
      price: '$85',
      serviceId: 'facials',
      actives: ['Willow Bark Salicin', 'Niacinamide 5%', 'French Green Clay'],
      sensoryNote: 'Eucalyptus steam vapor and chilled lime hydrosol.',
      description: 'Gently clears congested follicles without drying or stripping the skin barrier, leaving a matte, refined pore texture.',
    },
    '90': {
      title: 'The Clinical Clarifying Signature',
      subtitle: 'Hydro-dermabrasion, high-frequency, and zinc mineral veil',
      duration: '90 Min',
      price: '$135',
      serviceId: 'advanced-skin',
      actives: ['Mandelic Acid', 'Bio-Sulfur Complex', 'Propolis Cera'],
      sensoryNote: 'Cooling peppermint compresses and soothing blue LED canopy.',
      description: 'A deep-level decongestion protocol that balances sebum secretion, calms breakouts, and refines uneven dermal texture.',
    },
    '120': {
      title: 'The Imperial Purifying Master Ritual',
      subtitle: 'Complete face, back, and décolleté detoxifying treatment',
      duration: '120 Min',
      price: '$190',
      serviceId: 'body',
      actives: ['Volcanic Ash Bio-Ferment', 'Salicylic Complex', 'Rosemary Bio-Water'],
      sensoryNote: 'Warm herbal back pack, dry body brushing, and scalp purification massage.',
      description: 'Comprehensive total-body clearing that addresses stubborn congestion on the back, shoulders, and face with unhurried care.',
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
          <p className="eyebrow text-oxblood">Bespoke Protocol Concierge</p>
          <h2 id="curator-title" className="display mt-3 text-[2.6rem] sm:text-[3.6rem] leading-[1.08] text-ink">
            Curate Your <em className="text-oxblood font-normal">Personal Ritual</em>
          </h2>
          <p className="mt-4 text-ink/65 text-sm sm:text-base">
            Select your skin aspiration and available time. Our clinical algorithm calculates your ideal bespoke formulation and treatment architecture.
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
                  <span className="eyebrow text-oxblood">Formulated Protocol Recommendation</span>
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
                    <p className="eyebrow text-ink/50 mb-2">Key Dermal Actives</p>
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
                    <span className="font-medium text-ink/70">Aromatique &amp; Touch:</span> {ritual.sensoryNote}
                  </p>
                </div>

                <div className="md:col-span-5 flex flex-col items-center md:items-end justify-center border-t md:border-t-0 md:border-l border-ink/8 pt-6 md:pt-0 md:pl-8">
                  <div className="text-center md:text-right mb-6">
                    <span className="text-xs uppercase tracking-[0.25em] text-ink/45 block mb-1">Estimated Investment</span>
                    <span className="display text-4xl sm:text-5xl text-oxblood font-normal">{ritual.price}</span>
                    <span className="text-[0.7rem] block text-ink/40 mt-1 uppercase tracking-widest">Inclusive of Private Suite</span>
                  </div>
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto px-8 shrink-0 whitespace-nowrap shadow-luxe"
                    icon={<ArrowRight size={15} strokeWidth={1.8} />}
                    onClick={() => openBooking(ritual.serviceId)}
                  >
                    Reserve This Protocol
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
