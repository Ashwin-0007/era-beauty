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

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: luxeEase, delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled ? 'border-b border-ink/10 bg-ivory/85 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-x grid h-[4.5rem] grid-cols-[1fr_auto_1fr] items-center">
        <div className="flex items-center">
          <button
            type="button"
            onClick={onMenuToggle}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label="Open menu"
            className="group -ml-2 flex h-12 items-center gap-3 px-2"
          >
            <span aria-hidden className="flex w-7 flex-col gap-[7px]">
              <span className="h-px w-full bg-ink transition-all duration-500 ease-[var(--ease-luxe)] group-hover:w-5" />
              <span className="h-px w-5 bg-ink transition-all duration-500 ease-[var(--ease-luxe)] group-hover:w-full" />
              <span className="h-px w-full bg-ink transition-all duration-500 ease-[var(--ease-luxe)] group-hover:w-3" />
            </span>
            <span className="eyebrow hidden sm:inline">Menu</span>
          </button>
        </div>

        <a
          href="#home"
          aria-label="ERA Beauty — back to top"
          onClick={(event) => {
            event.preventDefault()
            scrollToSection('home')
          }}
        >
          <Wordmark />
        </a>

        <div className="flex items-center justify-end">
          <div className="hidden md:block">
            <Button onClick={() => openBooking()} icon={<CalendarDays size={15} strokeWidth={1.4} />}>
              Book an Appointment
            </Button>
          </div>
          <a
            href="#contact"
            onClick={(event) => {
              event.preventDefault()
              scrollToSection('contact')
            }}
            aria-label="Contact and location"
            className="-mr-2 flex h-12 w-12 items-center justify-center md:hidden"
          >
            <MapPin size={20} strokeWidth={1.3} />
          </a>
        </div>
      </div>
    </motion.header>
  )
}
