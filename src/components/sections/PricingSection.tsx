import { AnimatePresence, motion } from 'motion/react'
import { Clock } from 'lucide-react'
import { useRef, useState, type KeyboardEvent } from 'react'
import { useBooking } from '../../context/BookingContext'
import { images } from '../../data/images'
import { pricing } from '../../data/pricing'
import { formatPrice } from '../../data/site'
import { Photo } from '../ui/Photo'
import { luxeEase } from '../../lib/motion'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function PricingSection() {
  const { openBooking } = useBooking()
  const [activeId, setActiveId] = useState(pricing[0].id)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const active = pricing.find((category) => category.id === activeId) ?? pricing[0]

  const onTabKeyDown = (event: KeyboardEvent, index: number) => {
    const last = pricing.length - 1
    const next =
      event.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : event.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : null
    if (next === null) return
    event.preventDefault()
    setActiveId(pricing[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="bg-cream py-16 sm:py-20 lg:py-24">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Pricing"
              id="pricing-title"
              title={
                <>
                  The treatment <em className="text-oxblood">menu</em>
                </>
              }
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-sm text-ink/65">
                Transparent pricing, with a consultation included for every first visit.
              </p>
            </Reveal>
            <Photo
              src={images.pricingFeature}
              alt="Hands holding a jar of skin cream"
              className="mt-10 hidden aspect-[5/4] lg:block"
            />
          </div>
        </div>

        <div className="min-w-0 lg:col-span-7">
          <div
            role="tablist"
            aria-label="Treatment categories"
            className="glass-pill p-1.5 rounded-full flex gap-1.5 overflow-x-auto [scrollbar-width:none] w-full max-w-full sm:w-auto sm:inline-flex"
          >
            {pricing.map((category, index) => {
              const selected = category.id === activeId
              return (
                <button
                  key={category.id}
                  ref={(el) => {
                    tabRefs.current[index] = el
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${category.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${category.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(category.id)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  className={`relative shrink-0 rounded-full px-5 py-2.5 text-[0.7rem] font-medium tracking-[0.2em] whitespace-nowrap uppercase transition-colors duration-300 z-10 ${
                    selected ? 'text-ivory' : 'text-ink/60 hover:text-ink'
                  }`}
                >
                  {category.label}
                  {selected && (
                    <motion.span
                      layoutId="pricing-tab-indicator"
                      className="absolute inset-0 rounded-full bg-ink -z-10 shadow-md"
                      transition={{ duration: 0.5, ease: luxeEase }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.ul
              key={active.id}
              id={`panel-${active.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${active.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: luxeEase }}
              className="mt-8 space-y-4"
            >
              {active.items.map((item) => (
                <li
                  key={item.name}
                  className="group glass-card rounded-2xl p-6 sm:p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-oxblood/35 hover:shadow-luxe"
                >
                  <div className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-2.5">
                    <h3 className="display text-[1.75rem] leading-tight text-ink transition-colors group-hover:text-oxblood sm:text-3xl">
                      {item.name}
                    </h3>
                    <p className="display self-start text-[1.75rem] leading-tight text-oxblood whitespace-nowrap sm:text-3xl font-light">
                      {item.from && <span className="mr-1.5 font-sans text-xs tracking-[0.16em] text-ink/50 uppercase">from</span>}
                      {formatPrice(item.price)}
                    </p>
                    <p className="text-[0.96rem] leading-relaxed text-ink/70">
                      {item.description}
                    </p>
                    <div className="col-span-2 mt-3 flex items-center justify-between sm:col-span-1 sm:col-start-2 sm:row-start-2 sm:mt-0 sm:justify-end sm:gap-6">
                      <span className="flex items-center gap-1.5 text-xs tracking-wider uppercase text-mocha">
                        <Clock aria-hidden size={13} strokeWidth={1.4} className="text-oxblood" /> {item.duration} min
                      </span>
                      <button
                        type="button"
                        onClick={() => openBooking(item.serviceId)}
                        aria-label={`Book ${item.name}`}
                        className="eyebrow rounded-full border border-ink/20 bg-ivory px-5 py-2.5 text-ink transition-all duration-500 hover:border-oxblood hover:bg-oxblood hover:text-ivory hover:shadow-[0_4px_16px_-2px_rgba(183,110,121,0.4)]"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
