import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { contact } from '../../data/contact'
import { buttonClass } from '../ui/buttonStyles'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

function InfoBlock({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-5 border-t border-ink/10 py-6 first:border-t-0 first:pt-0">
      <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-oxblood/30 bg-oxblood/5 text-oxblood shadow-sm">
        {icon}
      </span>
      <div className="flex-1">
        <h3 className="eyebrow tracking-widest text-mocha font-normal">{title}</h3>
        <div className="mt-2 text-lg text-ink/85">{children}</div>
      </div>
    </div>
  )
}

function DistrictMap() {
  return (
    <div role="img" aria-label="Plan d’accès de l’Atelier ERA Beauty" className="relative h-full w-full overflow-hidden bg-cream/70">
      <svg aria-hidden className="absolute inset-0 h-full w-full text-taupe/35" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 400">
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M-20 80 Q 120 120 200 60 T 420 90" />
          <path d="M-20 200 Q 100 160 210 220 T 420 190" strokeWidth="6" className="text-ivory" stroke="currentColor" />
          <path d="M-20 300 Q 160 280 240 330 T 420 300" />
          <path d="M90 -20 Q 120 160 80 420" />
          <path d="M260 -20 Q 230 180 290 420" strokeWidth="4" />
          <path d="M340 -20 L 330 420" />
          <circle cx="120" cy="300" r="40" className="text-sand/60" fill="currentColor" stroke="none" />
        </g>
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
        <span className="absolute top-full left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-oxblood/50" />
        <MapPin size={42} strokeWidth={1.2} className="fill-oxblood text-ivory drop-shadow-md" />
      </div>
      <p className="eyebrow absolute bottom-4 left-4 rounded-full border border-ink/10 bg-ivory/95 px-4 py-2 text-mocha shadow-sm backdrop-blur-md">
        Plan de l’Atelier · Place Vendôme
      </p>
    </div>
  )
}

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-cream pt-14 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Contact & Accès"
          id="contact-title"
          title={
            <>
              Visitez l’<em className="text-oxblood">institut</em>
            </>
          }
        />

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12 items-stretch">
          <Reveal className="glass-card rounded-3xl p-8 sm:p-10 shadow-luxe lg:col-span-5 flex flex-col justify-between">
            <div>
              <InfoBlock icon={<MapPin size={18} strokeWidth={1.5} />} title="Adresse">
                <address className="not-italic leading-relaxed">
                  {contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </InfoBlock>
              <InfoBlock icon={<Phone size={18} strokeWidth={1.5} />} title="Téléphone">
                <a href={contact.phoneHref} className="transition-colors hover:text-oxblood">
                  {contact.phoneDisplay}
                </a>
              </InfoBlock>
              <InfoBlock icon={<Mail size={18} strokeWidth={1.5} />} title="E-mail">
                <a href={`mailto:${contact.email}`} className="break-all transition-colors hover:text-oxblood">
                  {contact.email}
                </a>
              </InfoBlock>
              <InfoBlock icon={<Clock size={18} strokeWidth={1.5} />} title="Horaires d’ouverture">
                <dl className="space-y-2 text-[0.95rem]">
                  {contact.hours.map((row) => (
                    <div key={row.days} className="flex justify-between gap-6 border-b border-ink/5 pb-1 last:border-b-0">
                      <dt className="text-ink/65">{row.days}</dt>
                      <dd className="font-normal text-ink">{row.hours}</dd>
                    </div>
                  ))}
                </dl>
              </InfoBlock>
            </div>
            <p className="border-t border-ink/10 pt-4 text-xs text-ink/45">
              Les rendez-vous ont lieu en salon privé, sur réservation préalable.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col lg:col-span-7">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-ink/10 shadow-luxe-lg sm:aspect-[16/11] lg:aspect-auto lg:flex-1">
              {contact.mapEmbedUrl ? (
                <iframe
                  src={contact.mapEmbedUrl}
                  title="Plan d’accès ERA Beauty"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0 grayscale-[0.3]"
                />
              ) : (
                <DistrictMap />
              )}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <a href={contact.directionsUrl} target="_blank" rel="noreferrer" className={buttonClass('primary', 'md', 'shadow-sm')}>
                <Navigation size={14} strokeWidth={1.4} /> Itinéraire
              </a>
              <a href={contact.phoneHref} className={buttonClass('outline', 'md', 'shadow-sm')}>
                <Phone size={14} strokeWidth={1.4} /> Appeler
              </a>
              <a href={`mailto:${contact.email}`} className={buttonClass('outline', 'md', 'shadow-sm')}>
                <Mail size={14} strokeWidth={1.4} /> E-mail
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
