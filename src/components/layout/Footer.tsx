import { ArrowRight, CalendarDays, Check, Clock, Loader2, Mail, MapPin, Plus } from 'lucide-react'
import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useBooking } from '../../context/BookingContext'
import { footerColumns, legalLinks, type NavLink } from '../../data/navigation'
import { site } from '../../data/site'
import { isEmail, submitForm } from '../../lib/forms'
import { SocialIcons } from '../ui/SocialIcons'
import { openCookieSettings } from '../../lib/cookies'
import { Wordmark } from './Header'

const infoIcons = [MapPin, Clock, CalendarDays, Mail]

function FooterLink({ link, icon }: { link: NavLink; icon?: ReactNode }) {
  const { openBooking } = useBooking()
  const className = 'inline-flex items-center gap-2.5 text-sm text-ivory/75 transition-colors hover:text-ivory'
  if (link.to === '#rendez-vous' || link.to === '#cookies') {
    return (
      <button type="button" className={className} onClick={() => (link.to === '#cookies' ? openCookieSettings() : openBooking())}>
        {icon}
        {link.label}
      </button>
    )
  }
  return (
    <Link to={link.to} className={className}>
      {icon}
      {link.label}
    </Link>
  )
}

function Newsletter() {
  const inputId = useId()
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!isEmail(email)) return setError('Veuillez saisir une adresse e-mail valide.')
    if (!consent) return setError('Veuillez accepter de recevoir nos communications.')
    setError('')
    setStatus('sending')
    try {
      await submitForm(site.newsletterEndpoint, { email, consent })
      setStatus('done')
    } catch {
      setStatus('error')
      setError('Une erreur est survenue. Veuillez réessayer.')
    }
  }

  if (status === 'done') {
    return (
      <p role="status" className="flex items-start gap-3 text-sm text-ivory/85">
        <Check size={18} className="mt-0.5 shrink-0 text-champagne" /> Merci ! Votre inscription à notre newsletter est confirmée.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="flex overflow-hidden rounded-full bg-ivory">
        <label htmlFor={inputId} className="sr-only">
          Votre adresse e-mail
        </label>
        <input
          id={inputId}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Votre adresse e-mail"
          className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm text-ink placeholder:text-ink/45 focus:outline-none"
        />
        <button type="submit" aria-label="S’inscrire à la newsletter" className="m-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-oxblood text-ivory hover:bg-bordeaux-deep">
          {status === 'sending' ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
        </button>
      </div>
      <label className="mt-3 flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-ivory/65">
        <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-champagne" />
        J’accepte de recevoir les communications d’ERA Beauty.
      </label>
      {error && (
        <p role="alert" className="mt-2 text-xs text-champagne">
          {error}
        </p>
      )}
    </form>
  )
}

function MobileSection({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-ivory/15">
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-4 text-sm">
        {title}
        <Plus aria-hidden size={16} className={`transition-transform ${open ? 'rotate-45' : ''}`} />
      </button>
      {open && <div className="pb-5">{children}</div>}
    </div>
  )
}

const Bottom = () => (
  <div className="flex flex-col gap-4 border-t border-ivory/15 py-6 text-xs text-ivory/60 md:flex-row md:items-center md:justify-between">
    <p>© {new Date().getFullYear()} ERA Beauty. Tous droits réservés.</p>
    <ul className="flex flex-wrap gap-x-5 gap-y-2">
      {legalLinks.map((link) => (
        <li key={link.label}>
          <FooterLink link={link} />
        </li>
      ))}
    </ul>
  </div>
)

export function Footer() {
  const [quick, services, info] = footerColumns
  const linkList = (links: NavLink[], icons = false) => (
    <ul className="space-y-2.5">
      {links.map((link, index) => {
        const Icon = infoIcons[index]
        return (
          <li key={link.label}>
            <FooterLink link={link} icon={icons && Icon ? <Icon aria-hidden size={14} strokeWidth={1.4} /> : undefined} />
          </li>
        )
      })}
    </ul>
  )

  const brand = (
    <>
      <Link to="/" aria-label="ERA Beauty — accueil">
        <Wordmark className="text-[1.9rem]" />
      </Link>
      <p className="eyebrow mt-2 text-[0.58rem] text-ivory/70">{site.motto}</p>
    </>
  )

  return (
    <footer data-surface="dark" className="bg-bordeaux-deep text-ivory">
      <div className="container-x hidden pt-16 md:block">
        <div className="grid gap-10 pb-12 lg:grid-cols-[1.25fr_0.75fr_0.95fr_0.95fr_1.4fr]">
          <div>
            {brand}
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/70">
              Un institut dédié à votre beauté, dans un cadre élégant et bienveillant. Des prestations haut de gamme, pour révéler votre confiance au
              quotidien.
            </p>
            <SocialIcons className="mt-5 -ml-2" linkClassName="text-ivory/80 hover:bg-ivory/10 hover:text-ivory" />
          </div>
          {[quick, services].map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="eyebrow mb-5 text-[0.62rem] text-ivory">{column.title}</p>
              {linkList(column.links)}
            </nav>
          ))}
          <nav aria-label={info.title}>
            <p className="eyebrow mb-5 text-[0.62rem] text-ivory">{info.title}</p>
            {linkList(info.links, true)}
          </nav>
          <div>
            <p className="eyebrow mb-3 text-[0.62rem] text-ivory">Rejoignez notre univers</p>
            <p className="mb-5 text-sm leading-relaxed text-ivory/70">Recevez nos actualités, offres exclusives et conseils beauté.</p>
            <Newsletter />
          </div>
        </div>
        <Bottom />
      </div>

      <div className="px-6 pt-12 md:hidden">
        <div className="text-center">
          {brand}
          <SocialIcons className="mt-5 justify-center" linkClassName="text-ivory/80 hover:bg-ivory/10" />
        </div>
        <div className="mt-8 border-t border-ivory/15">
          <MobileSection title={quick.title}>{linkList(quick.links)}</MobileSection>
          <MobileSection title={services.title}>{linkList(services.links)}</MobileSection>
          <MobileSection title={info.title}>{linkList(info.links, true)}</MobileSection>
          <MobileSection title="Rejoignez notre univers">
            <p className="mb-4 text-sm text-ivory/70">Recevez nos actualités, offres exclusives et conseils beauté.</p>
            <Newsletter />
          </MobileSection>
        </div>
        <div className="pb-24 text-center">
          <Bottom />
        </div>
      </div>
    </footer>
  )
}
