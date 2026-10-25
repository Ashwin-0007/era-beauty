import { useState, type FormEvent } from 'react'
import { ArrowUp, Facebook, Instagram, Sparkles, Check, ArrowRight, MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react'
import { contact, type SocialLink } from '../../data/contact'
import { navItems, type SectionId } from '../../data/navigation'
import { site } from '../../data/site'
import { Button } from '../ui/Button'
import { LogoMark } from './LogoMark'

const socialIcons: Record<SocialLink['label'], typeof Instagram> = {
  Instagram,
  Facebook,
}

interface FooterProps {
  onNavigate: (id: SectionId) => void
}

export function Footer({ onNavigate }: FooterProps) {
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
  }

  return (
    <footer data-surface="dark" className="relative bg-ink text-ivory overflow-hidden border-t border-ivory/10">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/4 h-[550px] w-[550px] rounded-full bg-oxblood/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-12 right-10 h-[400px] w-[400px] rounded-full bg-sand/10 blur-[120px]"
      />

      <div className="container-x pt-16 pb-12 sm:pt-20 sm:pb-16 relative">
        <div className="glass-dark shimmer-hover rounded-3xl p-8 sm:p-12 mb-16 border border-oxblood/20 shadow-luxe-lg relative overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-champagne/30 bg-ivory/5 px-3.5 py-1 text-xs text-champagne mb-3">
                <Sparkles size={13} className="text-champagne" />
                <span className="eyebrow tracking-[0.25em] text-champagne font-normal">
                  La Gazette de l’Atelier
                </span>
              </div>
              <h3 className="display text-3xl sm:text-4xl text-ivory leading-tight">
                Invitations privées &amp; <em className="gold-foil-text font-normal italic">Chroniques de la peau</em>
              </h3>
              <p className="mt-3 text-sm sm:text-base text-ivory/70 max-w-md leading-relaxed">
                Recevez en avant-première nos protocoles de saison, nos réservations privées et nos conseils dermatologiques directement dans votre boîte mail.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="glass-pill rounded-2xl p-6 text-center sm:text-left flex items-center gap-4 border border-champagne/40 bg-ivory/10 shadow-glow-rose">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-oxblood text-ivory shadow-md">
                    <Check size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="font-display text-lg text-ivory font-medium">Bienvenue dans le Cercle de l’Atelier</h4>
                    <p className="text-xs text-ivory/65 mt-0.5">Votre adresse e-mail a bien été enregistrée dans notre registre privé.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Saisissez votre adresse e-mail"
                    className="flex-1 rounded-full border border-ivory/20 bg-ivory/5 px-6 py-3.5 text-sm text-ivory placeholder:text-ivory/40 focus:border-oxblood focus:outline-none focus:ring-1 focus:ring-oxblood transition-all"
                  />
                  <Button
                    type="submit"
                    variant="light"
                    size="md"
                    icon={<ArrowRight size={14} strokeWidth={1.8} />}
                    className="shadow-luxe px-7 shrink-0 whitespace-nowrap"
                  >
                    S’abonner
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-end gap-5 sm:gap-7">
              <LogoMark accentClassName="text-champagne" className="h-[4.8rem] w-auto shrink-0 sm:h-[6.5rem]" />
              <div>
                <p className="display text-[4.5rem] leading-[0.8] tracking-[0.12em] sm:text-[6.5rem]">ERA</p>
                <p className="eyebrow mt-1 text-champagne tracking-[0.34em]">Institut de Beauté</p>
              </div>
            </div>
            
            <p className="mt-7 max-w-md text-ivory/70 leading-relaxed text-sm sm:text-base">
              Un sanctuaire paisible et architectural dédié aux rituels de la peau, du visage et du corps. Ancré dans la science cellulaire, la discrétion et la beauté naturelle.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              <span className="group rounded-full bg-cream px-3.5 py-1.5 text-[0.7rem] tracking-wider uppercase text-ink font-medium flex items-center gap-2 border border-sand/50 shadow-sm transition-all duration-300 hover:bg-oxblood hover:border-oxblood hover:shadow-glow-rose cursor-default">
                <ShieldCheck size={13} className="text-oxblood shrink-0 transition-colors group-hover:text-ivory" />
                <span className="text-ink transition-colors group-hover:text-ivory">Expertise dermatologique certifiée</span>
              </span>
              <span className="group rounded-full bg-cream px-3.5 py-1.5 text-[0.7rem] tracking-wider uppercase text-ink font-medium flex items-center gap-2 border border-sand/50 shadow-sm transition-all duration-300 hover:bg-oxblood hover:border-oxblood hover:shadow-glow-rose cursor-default">
                <Sparkles size={13} className="text-oxblood shrink-0 transition-colors group-hover:text-ivory" />
                <span className="text-ink transition-colors group-hover:text-ivory">Protocole en salon privé</span>
              </span>
            </div>
          </div>

          <nav aria-label="Footer Navigation" className="lg:col-span-3">
            <p className="eyebrow text-champagne/90 tracking-[0.28em]">01 · Navigation</p>
            <ul className="mt-6 space-y-3.5">
              {navItems.map((nav) => (
                <li key={nav.id}>
                  <a
                    href={nav.href}
                    onClick={(event) => {
                      event.preventDefault()
                      onNavigate(nav.id)
                    }}
                    className="group inline-flex items-center gap-2.5 text-sm text-ivory/75 transition-all duration-300 hover:text-champagne hover:translate-x-1"
                  >
                    <span className="h-1 w-1 rounded-full bg-oxblood opacity-0 transition-all duration-300 group-hover:w-2 group-hover:opacity-100" />
                    <span>{nav.label}</span>
                    <span className="text-[0.7rem] text-ivory/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      ({nav.caption})
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="eyebrow text-champagne/90 tracking-[0.28em]">02 · Conciergerie &amp; Visite</p>
            <div className="glass-dark rounded-2xl p-6 mt-6 border border-ivory/10 space-y-4">
              <div className="flex items-start gap-3 text-sm text-ivory/80">
                <MapPin size={16} className="text-oxblood shrink-0 mt-0.5" />
                <address className="not-italic leading-relaxed">
                  {contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>

              <div className="flex items-center gap-3 text-sm text-ivory/80 border-t border-ivory/10 pt-3">
                <Phone size={15} className="text-oxblood shrink-0" />
                <a
                  href={contact.phoneHref}
                  className="transition-colors hover:text-champagne"
                >
                  {contact.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-3 text-sm text-ivory/80">
                <Mail size={15} className="text-oxblood shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-champagne"
                >
                  {contact.email}
                </a>
              </div>

              <div className="flex items-center gap-3 text-xs text-ivory/55 border-t border-ivory/10 pt-3">
                <Clock size={14} className="text-champagne shrink-0" />
                <span>Lun–Sam 9h00 — 19h30 • Horaires des salons privés</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <span className="eyebrow text-[0.65rem] text-ivory/45">Suivez-nous</span>
              <ul className="flex gap-2.5">
                {contact.socials.map((social) => {
                  const Icon = socialIcons[social.label]
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`ERA Beauty sur ${social.label}`}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 bg-ivory/5 text-ivory/80 transition-all duration-300 hover:border-oxblood hover:bg-oxblood hover:text-ivory hover:shadow-glow-rose hover:scale-110"
                      >
                        <Icon size={16} strokeWidth={1.4} />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse gap-6 border-t border-ivory/10 pt-8 text-xs text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved. Haute Parfumerie &amp; Clinical Aesthetic Atelier.
          </p>

          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="group inline-flex items-center gap-3 self-start rounded-full bg-cream px-5 py-2.5 uppercase tracking-[0.22em] text-ink text-xs font-medium border border-sand/50 shadow-luxe transition-all duration-300 hover:bg-oxblood hover:border-oxblood hover:shadow-glow-rose hover:scale-105 sm:self-auto"
          >
            <span className="text-ink font-medium transition-colors group-hover:text-ivory">Retour en haut</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-ivory transition-all duration-500 group-hover:-translate-y-0.5 group-hover:bg-ivory group-hover:text-ink">
              <ArrowUp size={13} strokeWidth={2} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
