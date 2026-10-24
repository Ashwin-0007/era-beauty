import { AnimatePresence, motion } from 'motion/react'
import { Clock, Info } from 'lucide-react'
import { useRef, useState, type KeyboardEvent } from 'react'
import { useBooking } from '../../context/BookingContext'
import { images } from '../../data/images'
import { pricing } from '../../data/pricing'
import { formatPrice, site } from '../../data/site'
import { Photo } from '../ui/Photo'
import { luxeEase } from '../../lib/motion'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function PricingSection() {
  const { openBooking } = useBooking()
  const [activeId, setActiveId] = useState(pricing[0].id)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const active = pricing.find((category) => category.id === activeId) ?? pricing[0]

  // WAI-ARIA tabs: arrow keys move between tabs.
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
    <section id="pricing" aria-labelledby="pricing-title" className="bg-ivory py-24 sm:py-32 lg:pt-52 lg:pb-40">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              index="04"
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
              {site.pricesArePlaceholders && (
                <p className="mt-6 flex max-w-sm items-start gap-3 border-l-2 border-oxblood/60 bg-cream/70 px-4 py-3 text-sm text-ink/75">
                  <Info aria-hidden size={16} strokeWidth={1.4} className="mt-0.5 shrink-0 text-oxblood" />
                  Sample prices for layout only — not confirmed ERA Beauty pricing.
                </p>
              )}
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
            className="-mx-5 flex gap-1 overflow-x-auto border-b border-ink/15 px-5 [scrollbar-width:none] sm:mx-0 sm:px-0"
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
                  className={`relative shrink-0 px-4 py-4 text-[0.72rem] tracking-[0.2em] whitespace-nowrap uppercase transition-colors ${
                    selected ? 'text-ink' : 'text-ink/45 hover:text-ink/80'
                  }`}
                >
                  {category.label}
                  {selected && (
                    <motion.span
                      layoutId="pricing-tab-indicator"
                      className="absolute inset-x-3 -bottom-px h-[2px] bg-oxblood"
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
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: luxeEase }}
            >
              {active.items.map((item) => (
                <li key={item.name} className="group border-b border-ink/10">
                  <div className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 py-7">
                    <h3 className="display text-[1.65rem] leading-tight sm:text-3xl">{item.name}</h3>
                    <p className="display self-start text-[1.65rem] leading-tight whitespace-nowrap sm:text-3xl">
                      {item.from && <span className="mr-1.5 font-sans text-xs tracking-[0.16em] text-ink/50 uppercase">from</span>}
                      {formatPrice(item.price)}
                    </p>
                    <p className="text-ink/65">{item.description}</p>
                    <div className="col-span-2 mt-2 flex items-center justify-between sm:col-span-1 sm:col-start-2 sm:row-start-2 sm:mt-0 sm:justify-end sm:gap-5">
                      <span className="flex items-center gap-1.5 text-sm text-ink/50">
                        <Clock aria-hidden size={14} strokeWidth={1.3} /> {item.duration} min
                      </span>
                      <button
                        type="button"
                        onClick={() => openBooking(item.serviceId)}
                        aria-label={`Book ${item.name}`}
                        className="eyebrow rounded-full border border-ink/20 px-4 py-2.5 transition-colors hover:border-oxblood hover:bg-oxblood hover:text-ivory"
                      >
                        Book
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
