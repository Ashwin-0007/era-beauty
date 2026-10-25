import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowRight, Clock, Droplets, Hourglass, Leaf, Mail, MapPin, Navigation, Phone, Sparkles, type LucideIcon } from 'lucide-react'
import { Fragment, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { BeforeAfterSlider } from '../components/sections/BeforeAfterSlider'
import { TestimonialCards } from '../components/sections/TestimonialCards'
import { AccordionItem } from '../components/ui/Accordion'
import { BookButton } from '../components/ui/BookButton'
import { ButtonLink } from '../components/ui/ButtonLink'
import { MediaCycle, type Media } from '../components/ui/MediaCycle'
import { Photo } from '../components/ui/Photo'
import { Reveal } from '../components/ui/Reveal'
import { SectionTitle } from '../components/ui/SectionTitle'
import { categoryPath, findCategory } from '../data/catalog'
import { faqCategories } from '../data/faq'
import { images, srcSet } from '../data/images'
import { featuredResults } from '../data/results'
import { contact, site } from '../data/site'
import { useLiteMotion } from '../hooks/useLiteMotion'
import { usePageMeta } from '../hooks/usePageMeta'
import { luxeEase } from '../lib/motion'

// Photos (et vidéo si renseignée) qui s'alternent en arrière-plan de l'accueil.
const heroMedia: Media[] = [
  ...(site.heroVideoUrl ? [{ type: 'video' as const, src: site.heroVideoUrl, poster: images.instituteHero }] : []),
  { type: 'image', src: images.instituteHero },
  { type: 'image', src: images.reception },
  { type: 'image', src: images.instituteRoom },
]

const heroWords = ['ERA', 'Beauty']

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const lite = useLiteMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', lite ? '0%' : '18%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-25%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0])
  // Léger décalage de l'arrière-plan selon la position de la souris.
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 })
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 })
  const onMove = (event: MouseEvent<HTMLElement>) => {
    if (reduce) return
    mouseX.set((event.clientX / window.innerWidth - 0.5) * -18)
    mouseY.set((event.clientY / window.innerHeight - 0.5) * -12)
  }

  return (
    <section ref={ref} onMouseMove={onMove} aria-labelledby="hero-title" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-espresso text-ivory">
      <motion.div style={{ y: imageY }} className="absolute -inset-6">
        <motion.div style={{ x: mouseX, y: mouseY }} className="absolute inset-0">
          <MediaCycle items={heroMedia} />
        </motion.div>
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-espresso/70 via-espresso/30 to-espresso/90" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          animate={{ opacity: 1, letterSpacing: '0.32em' }}
          transition={{ duration: 1.8, delay: 0.3, ease: luxeEase }}
          className="eyebrow text-ivory/85"
        >
          Institut de beauté
        </motion.p>
        <h1 id="hero-title" className="title-caps mt-5 text-[3.4rem] leading-[0.95] sm:text-7xl lg:text-[6.5rem]">
          {heroWords.map((word, wordIndex) => (
            <Fragment key={word}>
              {wordIndex > 0 && (
                <>
                  {' '}
                  <br className="sm:hidden" />
                </>
              )}
              <span className="inline-block whitespace-nowrap">
                {word.split('').map((letter, index) => (
                  <span key={index} className="inline-block overflow-hidden align-bottom">
                    <motion.span
                      className="inline-block"
                      initial={{ y: '110%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      transition={{ duration: 1.3, delay: 0.5 + (wordIndex * 4 + index) * 0.07, ease: luxeEase }}
                    >
                      {letter}
                    </motion.span>
                  </span>
                ))}
              </span>
            </Fragment>
          ))}
        </h1>
        <motion.div aria-hidden initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.4, delay: 1.2, ease: luxeEase }} className="mx-auto mt-6 h-px w-24 bg-champagne/70" />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.3, ease: luxeEase }}
          className="eyebrow mt-6 text-[0.62rem] text-ivory/85 sm:text-[0.7rem]"
        >
          Beauté · Soin · Bien-être · Résultats
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 1.5, ease: luxeEase }} className="mt-10">
          <BookButton size="lg" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Image d'arrière-plan qui glisse légèrement au défilement (parallaxe) et zoome au survol.
function ParallaxImage({ src, className = '' }: { src: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const lite = useLiteMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], lite ? ['0%', '0%'] : ['-8%', '8%'])
  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.img
        src={src}
        srcSet={srcSet(src)}
        sizes="100vw"
        decoding="async"
        alt=""
        loading="lazy"
        style={{ y }}
        initial={{ scale: 1.15, opacity: 0 }}
        whileInView={{ scale: 1.08, opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.8, ease: luxeEase }}
        className="photo-warm absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover"
      />
    </div>
  )
}

interface ServiceBlock {
  slug: string
  layout: 'overlay' | 'split'
  title: ReactNode
  text: string
  strip?: string[]
  icons?: { icon: LucideIcon; label: string }[]
}

// Section 2 de la maquette : aperçu des catégories, en blocs alternés.
const serviceBlocks: ServiceBlock[] = [
  {
    slug: 'epilation-laser',
    layout: 'overlay',
    title: (
      <>
        Épilation <br />
        laser diode
      </>
    ),
    text: 'Une peau lisse durablement, grâce à une technologie de dernière génération.',
    strip: ['Résultats visibles dès les premières séances', 'Tous types de peaux'],
  },
  {
    slug: 'soins-visage-head-spa',
    layout: 'split',
    title: 'Soins visage',
    text: 'Des protocoles sur mesure pour une peau plus éclatante, saine et visiblement plus belle.',
    icons: [
      { icon: Sparkles, label: 'Éclat' },
      { icon: Droplets, label: 'Hydratation' },
      { icon: Hourglass, label: 'Anti-âge' },
      { icon: Leaf, label: 'Peaux sensibles' },
    ],
  },
  {
    slug: 'beaute-du-regard',
    layout: 'overlay',
    title: (
      <>
        Beauté <br />
        du regard
      </>
    ),
    text: 'Des prestations expertes pour sublimer votre regard naturellement.',
    strip: ['Cils', 'Sourcils', 'Résultats naturels', 'Effet waouh'],
  },
  {
    slug: 'soins-corps',
    layout: 'split',
    title: 'Soins corps',
    text: 'Des techniques ciblées pour raffermir, lisser et sublimer votre silhouette.',
  },
]

function ServiceOverview() {
  const blocks = serviceBlocks.map((block) => ({ block, category: findCategory(block.slug) }))

  return (
    <section id="decouvrir" aria-labelledby="prestations-title">
      <div className="relative flex min-h-[22rem] items-center justify-center overflow-hidden bg-espresso px-6 py-20 text-center text-ivory lg:min-h-[28rem]">
        <ParallaxImage src={images.instituteRoom} />
        <div aria-hidden className="absolute inset-0 bg-espresso/55" />
        <Reveal className="relative">
          <p className="eyebrow text-ivory/80">Nos prestations</p>
          <h2 id="prestations-title" className="title-caps mt-4 text-4xl sm:text-5xl lg:text-6xl">
            L’expertise ERA Beauty
          </h2>
          <p className="eyebrow mt-5 text-[0.62rem] tracking-[0.24em] text-ivory/80">Des soins d’exception pour révéler votre beauté</p>
        </Reveal>
      </div>

      {blocks.map(({ block, category }, index) => {
        if (!category) return null
        const number = String(index + 1).padStart(2, '0')
        const icons = block.icons ?? category.overviewBenefits
        const button = (
          <ButtonLink to={categoryPath(category.slug)} size="sm" icon={<ArrowRight size={13} />}>
            Découvrir et réserver
          </ButtonLink>
        )

        if (block.layout === 'overlay') {
          return (
            <article key={block.slug} className="group relative overflow-hidden bg-espresso text-ivory">
              <div className="absolute inset-0 transition-transform duration-[1.6s] ease-[var(--ease-luxe)] group-hover:scale-[1.03]">
                <ParallaxImage src={category.image} />
              </div>
              <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/55 to-transparent" />
              <div className="container-x relative flex min-h-[24rem] flex-col justify-center py-14 lg:min-h-[28rem]">
                <Reveal className="max-w-md">
                  <p className="font-display text-4xl font-light text-ivory/90">{number}</p>
                  <h3 className="title-caps mt-2 text-4xl leading-[1.05] sm:text-5xl">{block.title}</h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/85">{block.text}</p>
                  <div className="mt-7">{button}</div>
                </Reveal>
              </div>
              {block.strip && (
                <div className="relative border-t border-ivory/15 bg-espresso/70 lg:bg-espresso/60 lg:backdrop-blur-sm">
                  <ul className="container-x flex flex-wrap gap-x-4 gap-y-1 py-3 text-[0.58rem] tracking-[0.2em] text-ivory/80 uppercase">
                    {block.strip.map((item, itemIndex) => (
                      <li key={item} className="flex items-center gap-4">
                        {itemIndex > 0 && <span aria-hidden className="h-3 w-px bg-ivory/40" />}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          )
        }

        return (
          <article key={block.slug} className="group relative grid overflow-hidden bg-ivory md:grid-cols-2">
            <div className="relative min-h-[18rem] overflow-hidden md:min-h-[26rem]">
              <Photo
                src={category.image}
                alt={category.name}
                className="absolute inset-0 h-full"
                imgClassName="transition-transform duration-[1.6s] ease-[var(--ease-luxe)] group-hover:scale-105"
                curtainClassName="bg-ivory"
              />
            </div>
            <div className="relative flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16">
              <motion.span
                aria-hidden
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: luxeEase }}
                className="pointer-events-none absolute right-6 bottom-2 font-display text-[9rem] leading-none font-light text-ink/[0.05] select-none lg:text-[12rem]"
              >
                {number}
              </motion.span>
              <Reveal className="relative">
                <p className="font-display text-3xl font-light text-mocha">{number}</p>
                <h3 className="title-caps mt-2 text-3xl text-ink sm:text-4xl">{block.title}</h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/70">{block.text}</p>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-4">
                  {icons.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex flex-col items-center gap-2 text-center">
                      <Icon aria-hidden size={20} strokeWidth={1.2} className="text-oxblood" />
                      <span className="text-[0.56rem] tracking-[0.16em] text-ink/70 uppercase">{label}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7">{button}</div>
              </Reveal>
            </div>
          </article>
        )
      })}
    </section>
  )
}

// Contenu à personnaliser : photos et prénoms de l'équipe.
const team = [
  { name: 'Erella', role: 'Fondatrice', image: images.portrait },
  { name: 'Soins visage', role: '', image: images.facialMassage },
  { name: 'Beauté du regard', role: '', image: images.lashBrowCare },
  { name: 'Épilation laser & soins corps', role: '', image: images.laserFace },
]

function AboutSection() {
  const track = useRef<HTMLUListElement>(null)
  const [slide, setSlide] = useState(0)
  const onScroll = () => {
    const el = track.current
    if (el) setSlide(Math.round(el.scrollLeft / (el.scrollWidth / team.length)))
  }

  return (
    <section aria-label="Notre univers" className="bg-ivory">
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 hidden w-[62%] lg:block">
          <ParallaxImage src={images.reception} />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/30 to-transparent" />
        </div>
        <div className="container-x relative grid gap-8 py-16 lg:min-h-[32rem] lg:grid-cols-12 lg:items-center lg:py-20">
          <Reveal className="lg:col-span-5">
            <SectionTitle number="01" eyebrow="Notre univers" title="Bien plus qu’un institut, une expérience." />
            <p className="mt-5 max-w-md leading-relaxed text-ink/70">
              Chez ERA Beauty, nous croyons que la beauté passe avant tout par le bien-être. C’est un lieu où l’on prend le temps, où chaque détail
              compte, pour vous offrir une expérience unique, dans un cadre raffiné et apaisant.
            </p>
            <ButtonLink to="/institut" className="mt-8" icon={<ArrowRight size={13} />}>
              Découvrir l’institut
            </ButtonLink>
          </Reveal>
          <Photo src={images.reception} alt="Accueil de l’institut ERA Beauty" className="aspect-[4/3] rounded-2xl lg:hidden" curtainClassName="bg-ivory" />
        </div>
      </div>

      <div className="container-x grid items-center gap-10 py-16 lg:grid-cols-12 lg:gap-14">
        <Photo src={images.portrait} alt="Erella, fondatrice d’ERA Beauty" className="aspect-[4/3] rounded-2xl lg:col-span-6" curtainClassName="bg-ivory" />
        <Reveal delay={0.1} className="lg:col-span-6">
          <SectionTitle number="02" eyebrow="La fondatrice" title="Derrière ERA Beauty, il y a Erella." />
          <p className="mt-5 max-w-md leading-relaxed text-ink/70">
            Passionnée par la beauté et le bien-être, j’ai créé ERA Beauty avec la volonté d’offrir bien plus que des soins : une véritable
            expérience, dans un lieu pensé pour vous. Chaque détail a été imaginé pour que vous vous sentiez unique.
          </p>
          <ButtonLink to="/institut#presentation" className="mt-8" icon={<ArrowRight size={13} />}>
            Découvrir notre histoire
          </ButtonLink>
        </Reveal>
      </div>

      <div className="container-x pb-20">
        <SectionTitle number="03" eyebrow="Notre équipe" title="Une équipe passionnée à votre service." />
        <ul
          ref={track}
          onScroll={onScroll}
          className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0"
        >
          {team.map((member, index) => (
            <li key={member.name} className="w-[72%] shrink-0 snap-start sm:w-[45%] md:w-auto">
              <Reveal delay={index * 0.08}>
                <Link to="/institut#equipe" className="group relative block aspect-[3/4] overflow-hidden rounded-xl">
                  <img
                    src={member.image}
                    srcSet={srcSet(member.image)}
                    sizes="(min-width: 768px) 25vw, 72vw"
                    decoding="async"
                    alt=""
                    loading="lazy"
                    className="photo-warm h-full w-full object-cover transition-transform duration-[1.6s] ease-[var(--ease-luxe)] group-hover:scale-105"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/10 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-ivory">
                    <p className="text-[0.66rem] leading-snug tracking-[0.18em] uppercase">
                      <span className="block font-display text-lg tracking-[0.06em]">{member.name}</span>
                      {member.role}
                    </p>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ivory/60 transition-colors duration-500 group-hover:border-oxblood group-hover:bg-oxblood">
                      <ArrowRight aria-hidden size={14} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
        <div aria-hidden className="mt-5 flex justify-center gap-2 md:hidden">
          {team.map((member, index) => (
            <span key={member.name} className={`h-1.5 rounded-full transition-all duration-500 ${slide === index ? 'w-5 bg-oxblood' : 'w-1.5 bg-ink/20'}`} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactPreview() {
  const general = faqCategories[0].items.slice(0, 5)
  const [open, setOpen] = useState(-1)
  const details = [
    { icon: MapPin, text: `${contact.street}, ${contact.city}` },
    { icon: Clock, text: 'Du lundi au samedi · 10h00 – 20h00' },
    { icon: Phone, text: contact.phoneDisplay, href: contact.phoneHref },
    { icon: Mail, text: contact.email, href: `mailto:${contact.email}` },
  ]

  return (
    <section aria-label="Contact" className="bg-cream/60">
      <div className="container-x grid gap-10 py-16 lg:grid-cols-12 lg:py-20">
        <Reveal className="lg:col-span-5">
          <SectionTitle number="04" eyebrow="Nous trouver" title="Un lieu pensé pour vous." />
          <p className="mt-5 max-w-md leading-relaxed text-ink/70">
            Dans un cadre élégant et apaisant, notre institut vous accueille pour un moment de beauté et de bien-être.
          </p>
          <ul className="mt-6 space-y-3">
            {details.map(({ icon: Icon, text, href }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-ink/80">
                <Icon aria-hidden size={16} strokeWidth={1.4} className="shrink-0 text-oxblood" />
                {href ? (
                  <a href={href} className="hover:text-oxblood">
                    {text}
                  </a>
                ) : (
                  text
                )}
              </li>
            ))}
          </ul>
          <a
            href={contact.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-oxblood px-7 text-[0.66rem] tracking-[0.2em] text-ivory uppercase transition-colors hover:bg-bordeaux-deep"
          >
            <Navigation size={13} /> Itinéraire
          </a>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-ink/10 bg-cream shadow-luxe">
            <iframe title="Plan d’accès ERA Beauty" src={contact.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full border-0" />
          </div>
        </Reveal>
      </div>

      <div className="container-x grid gap-10 pb-16 lg:grid-cols-12 lg:pb-20">
        <Reveal className="lg:col-span-5">
          <SectionTitle title="On répond à vos questions." />
          <p className="mt-5 max-w-md leading-relaxed text-ink/70">Une question avant votre rendez-vous ? Retrouvez les réponses aux questions les plus fréquentes.</p>
          <ButtonLink to="/faq" variant="outline" className="mt-8" icon={<ArrowRight size={13} />}>
            Voir toutes les questions
          </ButtonLink>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          {general.map((item, index) => (
            <AccordionItem
              key={item.question}
              title={<span className="text-[0.95rem]">{item.question}</span>}
              open={open === index}
              onToggle={() => setOpen(open === index ? -1 : index)}
            >
              <p className="text-sm leading-relaxed text-ink/70">{item.answer}</p>
            </AccordionItem>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-espresso text-ivory">
      <ParallaxImage src={images.uvGlow} />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/50 to-transparent" />
      <div className="container-x relative flex min-h-[24rem] items-center py-16">
        <Reveal>
          <h2 className="title-caps text-5xl sm:text-6xl">Commence ici.</h2>
          <p className="mt-4 text-ivory/85">Offrez-vous un moment pour vous.</p>
          <BookButton className="mt-8" />
        </Reveal>
      </div>
    </section>
  )
}

export function HomePage() {
  usePageMeta(
    '',
    'ERA Beauty, institut de beauté à Saint-Cloud : épilation laser diode, beauté du regard, soins visage & Head Spa, soins corps, blanchiment dentaire et cabine UV.',
  )
  const result = featuredResults[0]

  return (
    <>
      <Hero />
      <ServiceOverview />
      <AboutSection />

      <section className="bg-cream/60 py-20 lg:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionTitle eyebrow="Nos résultats" title="Le résultat, dans chaque détail." />
            <p className="mt-6 max-w-md leading-relaxed text-ink/70">
              Découvrez les transformations réalisées dans notre institut. Des résultats naturels, élégants et adaptés à chaque beauté.
            </p>
            <ButtonLink to="/resultats" variant="outline" className="mt-8" icon={<ArrowRight size={13} />}>
              Découvrir les résultats
            </ButtonLink>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <BeforeAfterSlider before={result.before} after={result.after} label={result.title} />
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container-x">
          <SectionTitle eyebrow="Avis clients" title="Elles nous font confiance" className="mb-12 text-center" />
          <TestimonialCards />
        </div>
      </section>

      <ContactPreview />
      <FinalCta />
    </>
  )
}
