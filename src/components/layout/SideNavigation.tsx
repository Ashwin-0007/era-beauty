import { AnimatePresence, motion, type Variants } from 'motion/react'
import { ArrowUpRight, CalendarDays, Instagram, Facebook, Mail, Phone, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { contact } from '../../data/contact'
import { images } from '../../data/images'
import { navItems, type SectionId } from '../../data/navigation'
import { useDialog } from '../../hooks/useDialog'
import { Button } from '../ui/Button'
import { luxeEase } from '../../lib/motion'
import { Wordmark } from './Wordmark'

interface SideNavigationProps {
  open: boolean
  activeId: SectionId
  onClose: () => void
  onNavigate: (id: SectionId) => void
  onBook: () => void
}

const previewMap: Record<SectionId, { image: string; tag: string; quote: string }> = {
  home: { image: images.heroPortrait, tag: '01 · Welcome', quote: 'Beauty in its finest era.' },
  institute: { image: images.aboutInterior, tag: '02 · About us', quote: 'A calm, considered sanctuary for skin.' },
  services: { image: images.serviceFacial, tag: '03 · Treatments', quote: 'Tailored rituals, guided by your skin.' },
  pricing: { image: images.pricingFeature, tag: '04 · Menu & rates', quote: 'Transparent pricing with consultations.' },
  results: { image: images.resultFace, tag: '05 · Before & after', quote: 'Proven radiance & clinical precision.' },
  chronicles: { image: images.serviceSkin, tag: '06 · Chronicles', quote: 'Impressions & words from verified patrons.' },
  contact: { image: images.contactFeature, tag: '07 · Location', quote: 'Find our doors & opening hours.' },
  faq: { image: images.faqFeature, tag: '08 · Answers', quote: 'Preparation, bookings & policies.' },
}

const list: Variants = {
  open: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
  closed: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
}

const item: Variants = {
  open: { opacity: 1, x: 0, transition: { duration: 0.7, ease: luxeEase } },
  closed: { opacity: 0, x: -20, transition: { duration: 0.3 } },
}

export function SideNavigation({ open, activeId, onClose, onNavigate, onBook }: SideNavigationProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [hoveredSection, setHoveredSection] = useState<SectionId>(activeId)
  useDialog(open, onClose, panelRef)

  const activePreview = previewMap[hoveredSection] ?? previewMap[activeId] ?? previewMap.home

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 overflow-hidden" data-surface="dark">
          <motion.div
            aria-hidden
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: luxeEase }}
            className="absolute inset-0 bg-ink/75 backdrop-blur-md"
          />

          <motion.div
            ref={panelRef}
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.75, ease: luxeEase }}
            className="absolute inset-y-0 left-0 flex w-full max-w-[94vw] flex-col overflow-y-auto overscroll-contain bg-ink text-ivory shadow-2xl sm:max-w-[620px] lg:max-w-[760px]"
          >
            <div className="flex h-20 shrink-0 items-center justify-between border-b border-ivory/10 px-6 sm:px-12">
              <Wordmark accentClassName="text-champagne" size="sm" />
              <button
                type="button"
                onClick={onClose}
                data-autofocus
                aria-label="Close menu"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 bg-ivory/5 transition-all duration-500 ease-[var(--ease-luxe)] hover:rotate-90 hover:border-champagne hover:bg-champagne/15 hover:text-champagne active:scale-95"
              >
                <X size={20} strokeWidth={1.3} />
              </button>
            </div>

            <div className="grid flex-1 items-stretch lg:grid-cols-12">
              <nav aria-label="Main navigation" className="flex flex-col justify-between px-6 py-8 sm:px-12 lg:col-span-7 lg:border-r lg:border-ivory/10 lg:py-10">
                <motion.ul variants={list} initial="closed" animate="open" exit="closed" className="space-y-1">
                  {navItems.map((nav, index) => {
                    const active = nav.id === activeId
                    const isHovered = nav.id === hoveredSection
                    return (
                      <motion.li key={nav.id} variants={item}>
                        <a
                          href={nav.href}
                          aria-current={active ? 'location' : undefined}
                          onMouseEnter={() => setHoveredSection(nav.id)}
                          onFocus={() => setHoveredSection(nav.id)}
                          onClick={(event) => {
                            event.preventDefault()
                            onNavigate(nav.id)
                          }}
                          className={`group relative flex items-baseline gap-4 rounded-xl py-3.5 px-3 transition-all duration-500 sm:py-4 sm:px-4 ${
                            isHovered ? 'bg-ivory/8' : ''
                          }`}
                        >
                          <span className="eyebrow w-6 shrink-0 text-ivory/40 transition-colors group-hover:text-champagne">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="relative flex-1">
                            <span
                              className={`display block text-[1.85rem] leading-none tracking-tight transition-all duration-500 ease-[var(--ease-luxe)] sm:text-4xl ${
                                active
                                  ? 'italic text-champagne'
                                  : 'text-ivory/90 group-hover:translate-x-2 group-hover:text-champagne'
                              }`}
                            >
                              {nav.label}
                            </span>
                          </span>
                          <span className="hidden text-[0.68rem] tracking-[0.2em] text-ivory/40 uppercase sm:inline group-hover:text-ivory/70">
                            {nav.caption}
                          </span>
                          <ArrowUpRight
                            aria-hidden
                            size={16}
                            strokeWidth={1.3}
                            className="shrink-0 -translate-x-2 text-champagne opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                          />
                        </a>
                      </motion.li>
                    )
                  })}
                </motion.ul>

                <div className="mt-8 border-t border-ivory/10 pt-6">
                  <Button
                    variant="light"
                    size="lg"
                    onClick={onBook}
                    icon={<CalendarDays size={16} strokeWidth={1.4} />}
                    className="w-full shadow-lg"
                  >
                    Book an Appointment
                  </Button>
                </div>
              </nav>

              <div className="hidden flex-col justify-between bg-ink-soft/40 p-8 lg:col-span-5 lg:flex">
                <div className="space-y-4">
                  <div className="arch relative aspect-[3/4] w-full overflow-hidden border border-ivory/15 bg-sand/30 shadow-2xl">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activePreview.image}
                        src={activePreview.image}
                        alt=""
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.04 }}
                        transition={{ duration: 0.6, ease: luxeEase }}
                        className="h-full w-full object-cover"
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                    <span className="eyebrow absolute bottom-4 left-4 text-champagne">
                      {activePreview.tag}
                    </span>
                  </div>
                  <p className="display text-lg italic text-ivory/75">
                    "{activePreview.quote}"
                  </p>
                </div>

                <div className="border-t border-ivory/10 pt-6 text-xs text-ivory/60 space-y-2">
                  <p className="eyebrow text-champagne/80">Institute Visit</p>
                  <p className="text-ivory/80 leading-relaxed">
                    {contact.addressLines.join(', ')}
                  </p>
                  <div className="pt-2 flex items-center gap-4 text-ivory/75">
                    <a href={contact.phoneHref} className="flex items-center gap-1.5 hover:text-champagne transition-colors">
                      <Phone size={13} strokeWidth={1.3} /> {contact.phoneDisplay}
                    </a>
                  </div>
                  <div className="flex gap-2.5 pt-2">
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-8 w-8 items-center justify-center rounded-full border border-ivory/20 hover:border-champagne hover:text-champagne transition-colors">
                      <Instagram size={14} strokeWidth={1.3} />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-8 w-8 items-center justify-center rounded-full border border-ivory/20 hover:border-champagne hover:text-champagne transition-colors">
                      <Facebook size={14} strokeWidth={1.3} />
                    </a>
                    <a href={`mailto:${contact.email}`} aria-label="Email" className="flex h-8 w-8 items-center justify-center rounded-full border border-ivory/20 hover:border-champagne hover:text-champagne transition-colors">
                      <Mail size={14} strokeWidth={1.3} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
