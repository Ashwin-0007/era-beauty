import { AnimatePresence, motion, type Variants } from 'motion/react'
import { ArrowUpRight, CalendarDays, X } from 'lucide-react'
import { useRef } from 'react'
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

const list: Variants = {
  open: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } },
  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
}

const item: Variants = {
  open: { opacity: 1, x: 0, transition: { duration: 0.8, ease: luxeEase } },
  closed: { opacity: 0, x: -24, transition: { duration: 0.3 } },
}

export function SideNavigation({ open, activeId, onClose, onNavigate, onBook }: SideNavigationProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  useDialog(open, onClose, panelRef)

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50" data-surface="dark">
          <motion.div
            aria-hidden
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-ink/55 backdrop-blur-[3px]"
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
            className="absolute inset-y-0 left-0 flex w-[88vw] max-w-[480px] flex-col overflow-y-auto overscroll-contain bg-ink text-ivory"
          >
            <div className="flex h-[4.5rem] shrink-0 items-center justify-between px-6 sm:px-10">
              <Wordmark accentClassName="text-champagne" />
              <button
                type="button"
                onClick={onClose}
                data-autofocus
                aria-label="Close menu"
                className="group -mr-2 flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-ivory/10"
              >
                <X size={22} strokeWidth={1.2} className="transition-transform duration-500 group-hover:rotate-90" />
              </button>
            </div>

            <nav aria-label="Main" className="flex-1 px-6 pt-6 sm:px-10 sm:pt-10">
              <motion.ul variants={list} initial="closed" animate="open" exit="closed" className="border-t border-ivory/10">
                {navItems.map((nav, index) => {
                  const active = nav.id === activeId
                  return (
                    <motion.li key={nav.id} variants={item} className="border-b border-ivory/10">
                      <a
                        href={nav.href}
                        aria-current={active ? 'location' : undefined}
                        onClick={(event) => {
                          event.preventDefault()
                          onNavigate(nav.id)
                        }}
                        className="group flex items-baseline gap-5 py-4 sm:py-5"
                      >
                        <span className="eyebrow w-6 shrink-0 text-ivory/40">{String(index + 1).padStart(2, '0')}</span>
                        <span className="relative flex-1">
                          <span
                            className={`display block text-[1.9rem] leading-none transition-[transform,color] duration-500 ease-[var(--ease-luxe)] group-hover:translate-x-2 group-hover:text-champagne sm:text-4xl ${
                              active ? 'text-champagne italic' : ''
                            }`}
                          >
                            {nav.label}
                          </span>
                        </span>
                        <span className="hidden text-[0.7rem] tracking-[0.16em] text-ivory/40 uppercase sm:inline">
                          {nav.caption}
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          size={16}
                          strokeWidth={1.2}
                          className="shrink-0 -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                        />
                      </a>
                    </motion.li>
                  )
                })}
              </motion.ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.65, duration: 0.8, ease: luxeEase } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="flex items-end gap-5 px-6 pb-8 pt-10 sm:px-10"
            >
              <div className="flex-1 space-y-5">
                <Button variant="light" onClick={onBook} icon={<CalendarDays size={15} strokeWidth={1.4} />} className="w-full">
                  Book an Appointment
                </Button>
                <div className="space-y-1 text-sm text-ivory/60">
                  <a href={contact.phoneHref} className="block transition-colors hover:text-ivory">
                    {contact.phoneDisplay}
                  </a>
                  <a href={`mailto:${contact.email}`} className="block transition-colors hover:text-ivory">
                    {contact.email}
                  </a>
                </div>
              </div>
              <div className="arch hidden h-36 w-24 shrink-0 overflow-hidden sm:block">
                <img src={images.menuFeature} alt="" className="h-full w-full object-cover opacity-80" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
