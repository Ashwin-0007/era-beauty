import { ArrowRight, Sparkles, ShieldCheck, Clock, Phone, HeartHandshake } from 'lucide-react'
import { useRef } from 'react'
import { useBooking } from '../../context/BookingContext'
import { contact } from '../../data/contact'
import { images } from '../../data/images'
import { useParallax } from '../../hooks/useParallax'
import { Button } from '../ui/Button'
import { Photo } from '../ui/Photo'
import { Reveal } from '../ui/Reveal'

const guarantees = [
  {
    icon: ShieldCheck,
    title: 'La discrétion du salon privé',
    desc: 'Une seule cliente par salon privé, pour une tranquillité et une confidentialité totales.',
  },
  {
    icon: HeartHandshake,
    title: 'Diagnostic cutané cellulaire',
    desc: 'Imagerie cutanée haute résolution associée à un programme de soins sur mesure.',
  },
  {
    icon: Sparkles,
    title: 'Conciergerie offerte',
    desc: 'Champagne frais, infusions de plantes et voiturier dès votre arrivée.',
  },
]

export function ClosingCTA() {
  const { openBooking } = useBooking()
  const ref = useRef<HTMLElement>(null)
  const y = useParallax(ref, 8)

  return (
    <section
      ref={ref}
      aria-label="Réservez votre visite"
      data-surface="dark"
      className="relative isolate overflow-hidden bg-ink text-ivory"
    >
      <Photo
        src={images.ctaBand}
        alt=""
        parallaxY={y}
        reveal={false}
        className="absolute inset-0 -z-10 opacity-30 scale-105"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/85 to-oxblood/40"
      />
      <div
        aria-hidden
        className="absolute -top-32 right-10 h-96 w-96 rounded-full bg-sand/20 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 left-12 h-80 w-80 rounded-full bg-oxblood/15 blur-3xl pointer-events-none"
      />

      <div className="container-x py-16 sm:py-24 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
          <Reveal className="lg:col-span-7 flex flex-col justify-between glass-dark shimmer-hover rounded-3xl p-8 sm:p-12 lg:p-14 border border-ivory/15 shadow-2xl relative overflow-hidden">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-champagne/30 bg-ivory/5 px-4 py-1.5 text-xs text-champagne backdrop-blur-sm">
                <Sparkles size={13} className="text-champagne" />
                <span className="eyebrow tracking-[0.28em] text-champagne font-normal">
                  Réservations en salon privé
                </span>
              </div>

              <h2 className="display mt-6 text-[2.6rem] leading-[1.02] sm:text-5xl lg:text-[4.2rem]">
                Ouvrez une <em className="gold-foil-text font-normal italic">nouvelle ère</em> pour votre peau.
              </h2>

              <p className="mt-5 max-w-xl text-base sm:text-lg text-ivory/75 font-light leading-relaxed">
                Réservez votre consultation privée et découvrez des rituels visage, peau et corps sur mesure, adaptés à votre profil cellulaire unique.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3 border-t border-ivory/10 pt-8">
                {guarantees.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="flex flex-col">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-oxblood/20 text-champagne border border-oxblood/30 mb-3">
                        <Icon size={16} />
                      </span>
                      <h4 className="font-display font-medium text-sm text-ivory">{item.title}</h4>
                      <p className="mt-1 text-xs text-ivory/60 leading-normal">{item.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5 pt-4">
              <Button
                variant="light"
                size="lg"
                onClick={() => openBooking()}
                icon={<ArrowRight size={15} strokeWidth={1.8} />}
                className="shadow-luxe px-8"
              >
                Réserver une consultation
              </Button>

              <a
                href="#services"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-ivory/75 transition-colors hover:text-champagne group"
              >
                <span>Voir la carte des soins</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-5 flex flex-col justify-between glass-dark shimmer-hover rounded-3xl p-8 sm:p-10 border border-ivory/15 shadow-2xl relative overflow-hidden">
            <div className="relative aspect-[16/10] sm:aspect-[16/11] w-full overflow-hidden rounded-2xl border border-ivory/15">
              <img
                src={images.aboutInterior}
                alt="Intérieur d’un salon de soin privé ERA Beauty"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 glass-pill rounded-xl p-3 border border-ivory/20 bg-ink/75 backdrop-blur-md">
                <p className="font-display italic text-xs sm:text-sm text-ivory/90 leading-snug">
                  « Seulement 8 rendez-vous sur mesure par jour, pour un calme absolu. »
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2.5 rounded-full border border-oxblood/35 bg-oxblood/15 px-4 py-2 text-xs backdrop-blur-sm shadow-[0_0_20px_-5px_rgba(183,110,121,0.25)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-oxblood opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-oxblood shadow-[0_0_8px_rgba(183,110,121,0.8)]" />
                </span>
                <span className="font-sans uppercase tracking-widest text-[0.68rem] text-ivory/95">
                  Salons privés disponibles cette semaine
                </span>
              </div>

              <div className="rounded-2xl border border-ivory/10 bg-ivory/5 p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-ivory/70 border-b border-ivory/10 pb-3">
                  <span className="flex items-center gap-2">
                    <Clock size={13} className="text-champagne" />
                    Horaires de l’Atelier
                  </span>
                  <span className="text-ivory font-medium">Lun–Sam 9h00 — 19h30</span>
                </div>

                <div className="flex items-center justify-between text-xs text-ivory/70">
                  <span className="flex items-center gap-2">
                    <Phone size={13} className="text-champagne" />
                    Ligne de la conciergerie
                  </span>
                  <a
                    href={contact.phoneHref}
                    className="text-champagne hover:underline font-medium transition-colors"
                  >
                    {contact.phoneDisplay}
                  </a>
                </div>
              </div>

              <Button
                variant="light"
                size="md"
                onClick={() => openBooking()}
                className="w-full shadow-luxe"
              >
                Instant Date &amp; Time Check
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
