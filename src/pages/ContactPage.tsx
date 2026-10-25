import { AlertCircle, ArrowRight, Car, CheckCircle2, Clock, Loader2, Mail, MapPin, Navigation, ParkingCircle, Phone, Share2, TrainFront, Users } from 'lucide-react'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { BookButton } from '../components/ui/BookButton'
import { Button } from '../components/ui/Button'
import { ButtonLink } from '../components/ui/ButtonLink'
import { CtaBand } from '../components/ui/CtaBand'
import { MobileCollapsible } from '../components/ui/MobileCollapsible'
import { PageHero } from '../components/ui/PageHero'
import { SocialIcons } from '../components/ui/SocialIcons'
import { images } from '../data/images'
import { contact, site } from '../data/site'
import { isEmail, submitForm } from '../lib/forms'
import { usePageMeta } from '../hooks/usePageMeta'

const subjects = ['Prise de rendez-vous', 'Information sur une prestation', 'Tarifs & forfaits', 'Carte cadeau', 'Autre demande']
const accessIcons = [Car, TrainFront, ParkingCircle]

interface ContactValues {
  name: string
  email: string
  subject: string
  message: string
}

type ContactErrors = Partial<Record<keyof ContactValues, string>>

const validate = (values: ContactValues): ContactErrors => {
  const errors: ContactErrors = {}
  if (values.name.trim().length < 2) errors.name = 'Veuillez indiquer votre nom et prénom.'
  if (!isEmail(values.email)) errors.email = 'Veuillez saisir une adresse e-mail valide.'
  if (!values.subject) errors.subject = 'Veuillez sélectionner un sujet.'
  if (values.message.trim().length < 10) errors.message = 'Votre message doit contenir au moins 10 caractères.'
  return errors
}

function ContactForm() {
  const empty: ContactValues = { name: '', email: '', subject: '', message: '' }
  // Champ piège invisible : rempli uniquement par les robots de spam.
  const [website, setWebsite] = useState('')
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const update = (field: keyof ContactValues) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [field]: event.target.value })
    if (errors[field]) setErrors({ ...errors, [field]: undefined })
  }

  const send = async () => {
    setStatus('sending')
    try {
      await submitForm(site.contactEndpoint, { ...values })
      setStatus('success')
      setValues(empty)
    } catch {
      setStatus('error')
    }
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (website) return setStatus('success')
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length === 0) void send()
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-2xl border border-ink/10 bg-ivory p-8 text-center">
        <CheckCircle2 aria-hidden size={40} strokeWidth={1.2} className="mx-auto text-oxblood" />
        <p className="mt-4 font-medium text-ink">Votre message a bien été envoyé !</p>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink/70">
          Nous vous remercions pour votre message. Notre équipe vous répondra dans les plus brefs délais, sous 24 à 48h.
        </p>
        <ButtonLink to="/" variant="outline" size="sm" className="mt-6">
          Retour à l’accueil
        </ButtonLink>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div role="alert" className="rounded-2xl border border-oxblood/30 bg-oxblood/5 p-8 text-center">
        <AlertCircle aria-hidden size={40} strokeWidth={1.2} className="mx-auto text-oxblood" />
        <p className="mt-4 font-medium text-oxblood">Une erreur est survenue</p>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink/70">
          Votre message n’a pas pu être envoyé. Veuillez réessayer dans quelques instants ou nous contacter directement par e-mail.
        </p>
        <Button variant="outline" size="sm" className="mt-6" onClick={() => void send()}>
          Réessayer
        </Button>
      </div>
    )
  }

  const field = (id: keyof ContactValues, label: string, input: JSX.Element) => (
    <div>
      <label htmlFor={`contact-${id}`} className="text-xs text-ink/80">
        {label} <span className="text-oxblood">*</span>
      </label>
      <div className="mt-1.5">{input}</div>
      {errors[id] && (
        <p id={`contact-${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs text-oxblood">
          <AlertCircle aria-hidden size={12} /> {errors[id]}
        </p>
      )}
    </div>
  )
  const inputClass = (id: keyof ContactValues) =>
    `w-full rounded-md border bg-ivory px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-oxblood focus:outline-none ${errors[id] ? 'border-oxblood' : 'border-ink/15'}`
  const aria = (id: keyof ContactValues) => ({ 'aria-invalid': Boolean(errors[id]), 'aria-describedby': errors[id] ? `contact-${id}-error` : undefined })

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          Site web
          <input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
        </label>
      </div>
      {field('name', 'Nom et prénom', <input id="contact-name" autoComplete="name" value={values.name} onChange={update('name')} placeholder="Votre nom" className={inputClass('name')} {...aria('name')} />)}
      {field(
        'email',
        'E-mail',
        <input id="contact-email" type="email" autoComplete="email" value={values.email} onChange={update('email')} placeholder="votre@email.fr" className={inputClass('email')} {...aria('email')} />,
      )}
      {field(
        'subject',
        'Objet',
        <select id="contact-subject" value={values.subject} onChange={update('subject')} className={inputClass('subject')} {...aria('subject')}>
          <option value="">Sélectionnez un sujet</option>
          {subjects.map((subject) => (
            <option key={subject}>{subject}</option>
          ))}
        </select>,
      )}
      {field(
        'message',
        'Message',
        <textarea id="contact-message" rows={5} value={values.message} onChange={update('message')} placeholder="Votre message…" className={`${inputClass('message')} resize-y`} {...aria('message')} />,
      )}
      <Button type="submit" className="w-full" disabled={status === 'sending'} icon={status === 'sending' ? <Loader2 size={14} className="animate-spin" /> : <ArrowRight size={14} />}>
        {status === 'sending' ? 'Envoi en cours' : 'Envoyer mon message'}
      </Button>
      <p className="text-xs leading-relaxed text-ink/55">
        Nous nous engageons à vous répondre dans les plus brefs délais, sous 24 à 48h (hors jours fériés). Vos données sont utilisées uniquement pour
        répondre à votre demande —{' '}
        <Link to="/politique-de-confidentialite" className="underline hover:text-oxblood">
          politique de confidentialité
        </Link>
        .
      </p>
    </form>
  )
}

export function ContactPage() {
  usePageMeta('Contact', `Contactez ERA Beauty : ${contact.street}, ${contact.city} · ${contact.phoneDisplay} · ${contact.email}. Horaires, accès et formulaire de contact.`)

  const cards = [
    { icon: MapPin, title: 'Notre adresse', lines: [contact.street, contact.city], href: contact.directionsUrl },
    { icon: Phone, title: 'Notre téléphone', lines: [contact.phoneDisplay, contact.phoneNote], href: contact.phoneHref },
    { icon: Mail, title: 'Notre e-mail', lines: [contact.email, contact.emailNote], href: `mailto:${contact.email}` },
  ]

  return (
    <>
      <PageHero
        eyebrow="Nous contacter"
        title={
          <>
            Restons <br />
            en contact.
          </>
        }
        text="Une question, une demande d’information ou tout simplement envie d’en savoir plus ? Notre équipe est à votre écoute et vous répond avec plaisir."
        image={images.reception}
        breadcrumb={[{ label: 'Accueil', to: '/' }, { label: 'Contact' }]}
      >
        <BookButton />
      </PageHero>

      <div className="container-x py-10">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, lines, href }) => (
            <li key={title}>
              <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex h-full gap-4 rounded-xl border border-ink/10 bg-ivory p-5 transition-colors hover:border-oxblood/40"
              >
                <Icon aria-hidden size={22} strokeWidth={1.2} className="shrink-0 text-oxblood" />
                <span>
                  <span className="eyebrow block text-[0.58rem] text-ink">{title}</span>
                  <span className="mt-1.5 block text-sm text-ink/80">{lines[0]}</span>
                  <span className="block text-xs text-ink/55">{lines[1]}</span>
                </span>
              </a>
            </li>
          ))}
          <li className="flex gap-4 rounded-xl border border-ink/10 bg-ivory p-5">
            <Share2 aria-hidden size={22} strokeWidth={1.2} className="shrink-0 text-oxblood" />
            <span>
              <span className="eyebrow block text-[0.58rem] text-ink">Nos réseaux sociaux</span>
              <SocialIcons className="mt-1 -ml-2" linkClassName="text-oxblood hover:bg-cream" />
            </span>
          </li>
        </ul>
      </div>

      <div className="container-x grid gap-10 pb-16 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-12 lg:col-span-7">
          <section id="localisation" data-anchor>
            <h2 className="flex items-center gap-3">
              <MapPin aria-hidden size={20} strokeWidth={1.3} className="text-oxblood" />
              <span className="title-caps text-xl text-ink">Notre localisation</span>
            </h2>
            <div className="mt-5 aspect-[16/10] overflow-hidden rounded-2xl border border-ink/10 bg-cream">
              <iframe title="Plan d’accès ERA Beauty" src={contact.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full border-0" />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <p className="flex items-center gap-2 text-sm text-ink/75">
                <MapPin aria-hidden size={15} className="text-oxblood" />
                {contact.street}, {contact.city}
              </p>
              <a
                href={contact.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-oxblood/50 px-5 text-[0.62rem] tracking-[0.18em] text-oxblood uppercase transition-colors hover:bg-oxblood hover:text-ivory"
              >
                <Navigation size={13} /> Itinéraire
              </a>
            </div>
          </section>

          <MobileCollapsible id="horaires" title="Nos horaires d’ouverture" icon={<Clock aria-hidden size={20} strokeWidth={1.3} className="text-oxblood" />}>
            <dl className="grid gap-x-10 sm:grid-cols-2">
              {contact.hours.map(({ day, hours }) => (
                <div key={day} className="flex justify-between border-b border-ink/8 py-2.5 text-sm">
                  <dt className="text-ink/80">{day}</dt>
                  <dd className={hours ? 'text-ink/70' : 'text-oxblood'}>{hours ?? 'Fermé'}</dd>
                </div>
              ))}
            </dl>
          </MobileCollapsible>
        </div>

        <div className="lg:col-span-5">
          <MobileCollapsible id="formulaire" title="Formulaire de contact" icon={<Mail aria-hidden size={20} strokeWidth={1.3} className="text-oxblood" />} className="lg:sticky lg:top-28">
            <ContactForm />
          </MobileCollapsible>
        </div>
      </div>

      <section className="bg-cream/50 py-14">
        <div className="container-x">
          <MobileCollapsible title="Comment venir ?" icon={<Users aria-hidden size={20} strokeWidth={1.3} className="text-oxblood" />}>
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <p className="text-sm text-ink/70">Notre institut est facilement accessible en voiture et en transports en commun.</p>
                <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                  {contact.access.map(({ title, text }, index) => {
                    const Icon = accessIcons[index]
                    return (
                      <li key={title} className="rounded-xl bg-ivory p-5">
                        <Icon aria-hidden size={22} strokeWidth={1.2} className="text-oxblood" />
                        <p className="eyebrow mt-3 text-[0.6rem] text-ink">{title}</p>
                        <p className="mt-2 text-sm leading-relaxed text-ink/70">{text}</p>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <img src={images.instituteLounge} alt="Accueil de l’institut ERA Beauty" loading="lazy" className="photo-warm h-full max-h-64 w-full rounded-xl object-cover lg:col-span-4" />
            </div>
          </MobileCollapsible>
        </div>
      </section>

      <CtaBand
        image={images.facialCream}
        title="Une dernière question ?"
        text="Notre équipe est là pour vous accompagner. N’hésitez pas à nous contacter ou à prendre directement rendez-vous en ligne."
        action={<BookButton />}
      />
    </>
  )
}
