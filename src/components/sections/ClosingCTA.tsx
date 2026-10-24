import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { useBooking } from '../../context/BookingContext'
import { images } from '../../data/images'
import { useParallax } from '../../hooks/useParallax'
import { Button } from '../ui/Button'
import { Photo } from '../ui/Photo'
import { Reveal } from '../ui/Reveal'

/** Full-bleed image band inviting visitors to book, placed before the footer. */
export function ClosingCTA() {
  const { openBooking } = useBooking()
  const ref = useRef<HTMLElement>(null)
  const y = useParallax(ref, 8)

  return (
    <section ref={ref} aria-label="Book your visit" data-surface="dark" className="relative isolate overflow-hidden bg-ink text-ivory">
      <Photo src={images.ctaBand} alt="" parallaxY={y} reveal={false} className="absolute inset-0 -z-10 opacity-55" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/40 to-oxblood/40" />
      <div className="container-x py-28 sm:py-36 lg:py-44">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-champagne">Your ritual awaits</p>
          <p className="display mt-6 text-[2.8rem] leading-[1] sm:text-7xl">
            Begin your <em>new era</em> of radiant skin.
          </p>
          <Button variant="light" size="lg" className="mt-10" onClick={() => openBooking()} icon={<ArrowRight size={15} strokeWidth={1.4} />}>
            Book an Appointment
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
