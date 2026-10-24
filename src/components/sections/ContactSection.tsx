import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { contact } from '../../data/contact'
import { buttonClass } from '../ui/buttonStyles'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

function InfoBlock({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-5 border-t border-ink/15 py-7">
      <span aria-hidden className="mt-1 text-mocha">
        {icon}
      </span>
      <div className="flex-1">
        <h3 className="eyebrow text-mocha">{title}</h3>
        <div className="mt-3 text-lg text-ink/85">{children}</div>
      </div>
    </div>
  )
}

/** Stylised map shown until a real embed URL is configured. */
function MapPlaceholder() {
  return (
    <div role="img" aria-label="Map placeholder — location to be confirmed" className="relative h-full w-full overflow-hidden bg-cream">
      <svg aria-hidden className="absolute inset-0 h-full w-full text-taupe/40" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 400">
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M-20 80 Q 120 120 200 60 T 420 90" />
          <path d="M-20 200 Q 100 160 210 220 T 420 190" strokeWidth="6" className="text-ivory" stroke="currentColor" />
          <path d="M-20 300 Q 160 280 240 330 T 420 300" />
          <path d="M90 -20 Q 120 160 80 420" />
          <path d="M260 -20 Q 230 180 290 420" strokeWidth="4" />
          <path d="M340 -20 L 330 420" />
          <circle cx="120" cy="300" r="40" className="text-sand" fill="currentColor" stroke="none" />
        </g>
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
        <span className="absolute top-full left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-oxblood/40" />
        <MapPin size={38} strokeWidth={1.2} className="fill-oxblood text-ivory" />
      </div>
      <p className="eyebrow absolute bottom-4 left-4 bg-ivory/90 px-3 py-2 text-mocha">Map embed — location to be added</p>
    </div>
  )
}

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <SectionHeading
          index="06"
          eyebrow="Contact & Location"
          id="contact-title"
          title={
            <>
              Visit the <em className="text-oxblood">institute</em>
            </>
          }
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <InfoBlock icon={<MapPin size={20} strokeWidth={1.3} />} title="Address">
              <address className="not-italic">
                {contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </InfoBlock>
            <InfoBlock icon={<Phone size={20} strokeWidth={1.3} />} title="Phone">
              <a href={contact.phoneHref} className="transition-colors hover:text-oxblood">
                {contact.phoneDisplay}
              </a>
            </InfoBlock>
            <InfoBlock icon={<Mail size={20} strokeWidth={1.3} />} title="Email">
              <a href={`mailto:${contact.email}`} className="break-all transition-colors hover:text-oxblood">
                {contact.email}
              </a>
            </InfoBlock>
            <InfoBlock icon={<Clock size={20} strokeWidth={1.3} />} title="Opening hours">
              <dl className="space-y-1.5 text-base">
                {contact.hours.map((row) => (
                  <div key={row.days} className="flex justify-between gap-6">
                    <dt className="text-ink/65">{row.days}</dt>
                    <dd>{row.hours}</dd>
                  </div>
                ))}
              </dl>
            </InfoBlock>
            <p className="border-t border-ink/15 pt-5 text-sm text-ink/50">
              All details above are placeholders and will be replaced with ERA Beauty's verified information.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col lg:col-span-7">
            <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/11] lg:aspect-auto lg:flex-1">
              {contact.mapEmbedUrl ? (
                <iframe
                  src={contact.mapEmbedUrl}
                  title="ERA Beauty location map"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0 grayscale-[0.4]"
                />
              ) : (
                <MapPlaceholder />
              )}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {contact.directionsUrl ? (
                <a href={contact.directionsUrl} target="_blank" rel="noreferrer" className={buttonClass('primary', 'md')}>
                  <Navigation size={15} strokeWidth={1.4} /> Directions
                </a>
              ) : (
                <span aria-disabled="true" className={buttonClass('primary', 'md', 'cursor-not-allowed opacity-40 hover:bg-ink')} title="Directions available once the address is confirmed">
                  <Navigation size={15} strokeWidth={1.4} /> Directions
                </span>
              )}
              <a href={contact.phoneHref} className={buttonClass('outline', 'md')}>
                <Phone size={15} strokeWidth={1.4} /> Call
              </a>
              <a href={`mailto:${contact.email}`} className={buttonClass('outline', 'md')}>
                <Mail size={15} strokeWidth={1.4} /> Email
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
