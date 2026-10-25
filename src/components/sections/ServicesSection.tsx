import { useBooking } from '../../context/BookingContext'
import { services } from '../../data/services'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { ServiceCard } from './ServiceCard'

export function ServicesSection() {
  const { openBooking } = useBooking()

  return (
    <section id="services" aria-labelledby="services-title" className="bg-cream pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-24 lg:pb-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Services"
            id="services-title"
            title={
              <>
                Treatments, <em className="text-oxblood">tailored</em>
                <br className="hidden sm:block" /> to you.
              </>
            }
          />
          <Reveal delay={0.1} className="max-w-sm">
            <p className="text-ink/65">
              An intentional curriculum of bespoke facial architecture, targeted resurfacing, and full-body restorative therapies curated for long-term skin health.
            </p>
          </Reveal>
        </div>

        <div className="-mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:mt-20 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-x-8 sm:gap-y-16 sm:overflow-visible sm:px-0 lg:grid-cols-3 lg:[&>*:nth-child(3n+2)]:translate-y-20">
          {services.map((service, index) => (
            <div key={service.id} className="w-[78vw] max-w-[340px] shrink-0 snap-start sm:w-auto sm:max-w-none">
              <ServiceCard service={service} index={index} onBook={openBooking} />
            </div>
          ))}
        </div>
        <p className="eyebrow mt-4 text-mocha/70 sm:hidden" aria-hidden>
          Swipe to explore →
        </p>
      </div>
    </section>
  )
}
