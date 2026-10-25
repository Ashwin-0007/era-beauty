import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { CalendarDays, MapPin } from 'lucide-react'
import { useState } from 'react'
import { useBooking } from '../../context/BookingContext'
import { scrollToSection } from '../../lib/navigation'
import { Button } from '../ui/Button'
import { luxeEase } from '../../lib/motion'
import { Wordmark } from './Wordmark'

interface HeaderProps {
  menuOpen: boolean
  onMenuToggle: () => void
}

export function Header({ menuOpen, onMenuToggle }: HeaderProps) {
  const { openBooking } = useBooking()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 20))

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.1, ease: luxeEase, delay: 0.15 }}
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-700 ease-[var(--ease-luxe)] ${
        scrolled
          ? 'border-b border-ink/8 bg-ivory/85 py-2.5 backdrop-blur-xl shadow-[0_12px_36px_-12px_rgba(51,38,42,0.08)]'
          : 'border-b border-transparent bg-transparent py-4'
      }`}
    >
      <div className="container-x grid grid-cols-[1fr_auto_1fr] items-center">
        <div className="flex items-center">
          <button
            type="button"
            onClick={onMenuToggle}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label="Ouvrir le menu"
            className="group relative -ml-2 flex h-11 items-center gap-3.5 rounded-full border border-ink/10 bg-ivory/60 px-4 backdrop-blur-md transition-all duration-500 ease-[var(--ease-luxe)] hover:border-oxblood/50 hover:bg-ivory hover:shadow-[0_4px_16px_-4px_rgba(183,110,121,0.25)] active:scale-95"
          >
            <span aria-hidden className="flex w-5 flex-col gap-[5px]">
              <span className="h-[1.5px] w-full rounded-full bg-ink transition-all duration-500 ease-[var(--ease-luxe)] group-hover:w-4 group-hover:bg-oxblood" />
              <span className="h-[1.5px] w-3.5 rounded-full bg-oxblood transition-all duration-500 ease-[var(--ease-luxe)] group-hover:w-full" />
              <span className="h-[1.5px] w-full rounded-full bg-ink transition-all duration-500 ease-[var(--ease-luxe)] group-hover:w-3 group-hover:bg-oxblood" />
            </span>
            <span className="eyebrow tracking-[0.26em] text-ink transition-colors group-hover:text-oxblood">
              Menu
            </span>
          </button>
        </div>

        <a
          href="#home"
          aria-label="ERA Beauty — retour en haut"
          onClick={(event) => {
            event.preventDefault()
            scrollToSection('home')
          }}
          className="group transition-transform duration-500 hover:scale-[1.02]"
        >
          <Wordmark accentClassName="text-oxblood" />
        </a>

        <div className="flex items-center justify-end gap-3">
          <div className="hidden sm:block">
            <Button
              variant="primary"
              size="md"
              onClick={() => openBooking()}
              icon={<CalendarDays size={14} strokeWidth={1.5} />}
              className="shadow-sm"
            >
              Prendre rendez-vous
            </Button>
          </div>
          <a
            href="#contact"
            onClick={(event) => {
              event.preventDefault()
              scrollToSection('contact')
            }}
            aria-label="Contact et accès"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-ivory/60 text-ink backdrop-blur-md transition-all duration-500 hover:border-oxblood hover:text-oxblood sm:hidden"
          >
            <MapPin size={18} strokeWidth={1.4} />
          </a>
        </div>
      </div>
    </motion.header>
  )
}
