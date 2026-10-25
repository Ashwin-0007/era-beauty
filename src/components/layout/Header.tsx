import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, CalendarDays, ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useBooking } from '../../context/BookingContext'
import { navItems, type NavItem } from '../../data/navigation'
import { useDialog } from '../../hooks/useDialog'
import { luxeEase } from '../../lib/motion'
import { Button } from '../ui/Button'
import { SocialIcons } from '../ui/SocialIcons'

export function Wordmark({ className = '' }: { className?: string }) {
  return <span className={`font-display text-[1.45rem] font-light tracking-[0.16em] whitespace-nowrap uppercase ${className}`}>ERA Beauty</span>
}

const isActive = (pathname: string, item: NavItem) => (item.to === '/' ? pathname === '/' : pathname.startsWith(item.to))

function MegaPanel({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  if (!item.children || !item.panel) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: luxeEase }}
      className="absolute top-full left-1/2 mt-3 w-[40rem] -translate-x-1/2 overflow-hidden rounded-2xl bg-ivory text-ink shadow-luxe-lg"
    >
      <div className="grid grid-cols-[1fr_1.05fr]">
        <ul className="py-5">
          {item.children.map((child) => (
            <li key={child.to}>
              <Link
                to={child.to}
                onClick={onNavigate}
                className="flex items-center justify-between px-7 py-2.5 text-[0.68rem] tracking-[0.18em] uppercase transition-colors hover:bg-cream hover:text-oxblood"
              >
                {child.label}
                <ChevronRight aria-hidden size={13} className="text-ink/35" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="border-l border-ink/8 p-4">
          <img src={item.panel.image} alt="" className="photo-warm h-36 w-full rounded-xl object-cover" />
          <p className="eyebrow mt-4 text-[0.6rem] text-mocha">{item.panel.eyebrow}</p>
          <p className="title-caps mt-1.5 text-lg">{item.panel.title}</p>
          <p className="mt-1.5 text-xs leading-relaxed text-ink/65">{item.panel.text}</p>
          <Link to={item.panel.cta.to} onClick={onNavigate} className="mt-3 inline-flex items-center gap-2 text-[0.62rem] tracking-[0.2em] text-oxblood uppercase hover:underline">
            {item.panel.cta.label} <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState<string | null>(null)
  const { pathname } = useLocation()
  const { openBooking } = useBooking()
  useDialog(open, onClose, ref)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: luxeEase }}
          className="fixed inset-0 z-[55] flex flex-col overflow-y-auto bg-ivory text-ink lg:hidden"
        >
          <div className="flex h-[4.5rem] shrink-0 items-center justify-between border-b border-ink/10 px-5">
            <span className="w-10" />
            <Link to="/" onClick={onClose} aria-label="ERA Beauty — accueil">
              <Wordmark className="text-[1.25rem]" />
            </Link>
            <button type="button" onClick={onClose} aria-label="Fermer le menu" data-autofocus className="flex h-10 w-10 items-center justify-center">
              <X size={22} strokeWidth={1.3} />
            </button>
          </div>
          <nav aria-label="Navigation principale" className="flex-1 px-6 py-4">
            <ul>
              {navItems.map((item) => {
                const isOpen = expanded === item.to
                return (
                  <li key={item.to} className="border-b border-ink/10">
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => setExpanded(isOpen ? null : item.to)}
                          className={`flex w-full items-center justify-between py-4 text-left text-[0.78rem] tracking-[0.2em] uppercase ${isActive(pathname, item) ? 'text-oxblood' : ''}`}
                        >
                          {item.label}
                          <ChevronRight aria-hidden size={16} className={`transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.ul initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                              <li>
                                <Link to={item.to} onClick={onClose} className="block py-2.5 pl-4 text-sm text-oxblood">
                                  Voir tout
                                </Link>
                              </li>
                              {item.children.map((child) => (
                                <li key={child.to}>
                                  <Link to={child.to} onClick={onClose} className="block py-2.5 pl-4 text-sm text-ink/75">
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                              <li className="h-3" />
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={item.to}
                        onClick={onClose}
                        className={`block py-4 text-[0.78rem] tracking-[0.2em] uppercase ${isActive(pathname, item) ? 'text-oxblood' : ''}`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
            <Button
              className="mt-8 w-full"
              size="lg"
              icon={<ArrowRight size={14} />}
              onClick={() => {
                onClose()
                openBooking()
              }}
            >
              Prendre rendez-vous
            </Button>
            <SocialIcons className="mt-6 justify-center" linkClassName="text-oxblood hover:bg-cream" />
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Header() {
  const { pathname } = useLocation()
  const { openBooking } = useBooking()
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const transparent = pathname === '/' && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <header
        onMouseLeave={() => setOpenMenu(null)}
        onKeyDown={(event) => event.key === 'Escape' && setOpenMenu(null)}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow,backdrop-filter] duration-500 ${
          transparent
            ? 'bg-transparent text-ivory'
            : // Barre crème sur téléphone, barre brune sur ordinateur (maquettes).
              'border-b border-ink/10 bg-ivory/95 text-ink shadow-[0_6px_20px_-12px_rgba(42,30,26,0.25)] backdrop-blur-md lg:border-0 lg:bg-espresso/95 lg:text-ivory lg:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.4)]'
        }`}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-6">
          <span className="w-10 lg:hidden" />
          <Link to="/" aria-label="ERA Beauty — accueil" className="transition-opacity hover:opacity-80">
            <Wordmark />
          </Link>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-3">
              {navItems.map((item) => (
                <li key={item.to} className="relative" onMouseEnter={() => setOpenMenu(item.children ? item.to : null)}>
                  <div className="flex items-center">
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive: active }) =>
                        `relative px-2 py-2 text-[0.64rem] tracking-[0.2em] uppercase transition-colors hover:text-champagne ${
                          active ? 'after:absolute after:inset-x-2 after:-bottom-0.5 after:h-px after:bg-current' : ''
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                    {item.children && (
                      <button
                        type="button"
                        aria-label={`Sous-menu ${item.label}`}
                        aria-expanded={openMenu === item.to}
                        onClick={() => setOpenMenu(openMenu === item.to ? null : item.to)}
                        className="-ml-1.5 p-1 text-ivory/60 hover:text-champagne"
                      >
                        <ChevronDown aria-hidden size={11} className={`transition-transform ${openMenu === item.to ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  <AnimatePresence>{openMenu === item.to && <MegaPanel item={item} onNavigate={() => setOpenMenu(null)} />}</AnimatePresence>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center">
            <div className="hidden lg:block">
              <Button size="sm" onClick={() => openBooking()} icon={<ArrowRight size={13} />}>
                Prendre rendez-vous
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 items-center justify-center lg:hidden"
            >
              <Menu size={22} strokeWidth={1.3} />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}

export function MobileBookingButton() {
  const { openBooking } = useBooking()
  return (
    <button
      type="button"
      onClick={() => openBooking()}
      aria-label="Prendre rendez-vous"
      className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 flex h-14 w-14 items-center justify-center rounded-full bg-oxblood text-ivory shadow-[0_12px_30px_-8px_rgba(110,10,40,0.6)] transition-transform active:scale-95 lg:hidden"
    >
      <CalendarDays size={22} strokeWidth={1.4} />
    </button>
  )
}
