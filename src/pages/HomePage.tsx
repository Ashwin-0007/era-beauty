import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Fragment, useRef, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { BeforeAfterSlider } from '../components/sections/BeforeAfterSlider'
import { TestimonialCards } from '../components/sections/TestimonialCards'
import { BookButton } from '../components/ui/BookButton'
import { ButtonLink } from '../components/ui/ButtonLink'
import { CtaBand } from '../components/ui/CtaBand'
import { Marquee } from '../components/ui/Marquee'
import { Photo } from '../components/ui/Photo'
import { Reveal } from '../components/ui/Reveal'
import { RotatingBadge } from '../components/ui/RotatingBadge'
import { SectionTitle } from '../components/ui/SectionTitle'
import { TiltCard } from '../components/ui/TiltCard'
import { activeCategories, categoryPath } from '../data/catalog'
import { images } from '../data/images'
import { featuredResults } from '../data/results'
import { site } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import { luxeEase } from '../lib/motion'

const heroWords = ['ERA', 'Beauty']

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-30%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0])
  // Léger décalage de la photo selon la position de la souris.
  const mouseX = useSpring(0, { stiffness: 60, damping: 20 })
  const mouseY = useSpring(0, { stiffness: 60, damping: 20 })
  const onMove = (event: MouseEvent<HTMLElement>) => {
    if (reduce) return
    mouseX.set((event.clientX / window.innerWidth - 0.5) * -24)
    mouseY.set((event.clientY / window.innerHeight - 0.5) * -16)
  }

  return (
    <section ref={ref} onMouseMove={onMove} aria-labelledby="hero-title" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-espresso text-ivory">
      <motion.div style={{ y: imageY }} className="absolute -inset-x-6 -top-6 -bottom-6">
        {site.heroVideoUrl ? (
          <video autoPlay muted loop playsInline poster={images.instituteHero} className="h-full w-full object-cover">
            <source src={site.heroVideoUrl} type="video/mp4" />
          </video>
        ) : (
          <motion.img
            src={images.instituteHero}
            alt=""
            style={{ x: mouseX, y: mouseY }}
            initial={{ scale: 1.15 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 2.6, ease: luxeEase }}
            className="photo-warm h-full w-full object-cover"
          />
        )}
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-espresso/70 via-espresso/30 to-espresso" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 px-6 text-center">
        <motion.p initial={{ opacity: 0, letterSpacing: '0.6em' }} animate={{ opacity: 1, letterSpacing: '0.32em' }} transition={{ duration: 1.6, delay: 0.2, ease: luxeEase }} className="eyebrow text-ivory/85">
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
                      transition={{ duration: 1.1, delay: 0.35 + (wordIndex * 4 + index) * 0.06, ease: luxeEase }}
                    >
                      {letter}
                    </motion.span>
                  </span>
                ))}
              </span>
            </Fragment>
          ))}
        </h1>
        <motion.div aria-hidden initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: 1, ease: luxeEase }} className="mx-auto mt-6 h-px w-24 bg-champagne/70" />
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.1, ease: luxeEase }} className="eyebrow mt-6 text-[0.62rem] text-ivory/85 sm:text-[0.7rem]">
          Beauté · Soin · Bien-être · Résultats
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.3, ease: luxeEase }} className="mt-10">
          <BookButton size="lg" />
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 1.6, ease: luxeEase }} className="absolute right-10 bottom-10 z-10 hidden text-ivory/80 lg:block">
        <RotatingBadge text="Beauté · Soin · Bien-être ·" className="h-28 w-28" />
      </motion.div>

      <a href="#decouvrir" className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-ivory/80 transition-colors hover:text-ivory">
        <span className="eyebrow text-[0.58rem]">Scroller</span>
        <span aria-hidden className="relative h-12 w-px overflow-hidden bg-ivory/25">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-line_2s_ease-in-out_infinite] bg-ivory" />
        </span>
      </a>
    </section>
  )
}

export function HomePage() {
  usePageMeta('', 'ERA Beauty, institut de beauté à Saint-Cloud : épilation laser diode, beauté du regard, soins visage & Head Spa, blanchiment dentaire et cabine UV.')
  const result = featuredResults[0]

  return (
    <>
      <Hero />

      <div className="border-b border-ink/10 bg-cream py-5 text-oxblood">
        <Marquee items={activeCategories.map((category) => category.shortName)} />
      </div>

      <section id="decouvrir" className="container-x py-20 lg:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle eyebrow="Nos prestations" title="Une expertise globale pour prendre soin de vous" className="max-w-xl" />
          <ButtonLink to="/prestations" variant="outline" icon={<ArrowRight size={13} />}>
            Toutes nos prestations
          </ButtonLink>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {activeCategories.map((category, index) => (
            <li key={category.slug} className={index === 0 ? 'col-span-2 md:col-span-1' : ''}>
              <Reveal delay={index * 0.08}>
                <TiltCard className="rounded-xl">
                  <Link to={categoryPath(category.slug)} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                      <img src={category.image} alt="" loading="lazy" className="photo-warm h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-transparent to-transparent" />
                      <div className="absolute inset-x-4 bottom-4 text-ivory">
                        <p className="title-caps text-xl leading-tight">{category.shortName}</p>
                        <p className="mt-2 flex items-center gap-2 text-[0.58rem] tracking-[0.2em] uppercase opacity-80 transition-opacity group-hover:opacity-100">
                          Découvrir <ArrowRight size={11} />
                        </p>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-cream/60 py-20 lg:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="grid grid-cols-5 gap-4">
            <Photo src={images.instituteRoom} alt="Cabine de soin de l’institut ERA Beauty" className="col-span-3 aspect-[3/4] rounded-2xl" curtainClassName="bg-cream" />
            <Photo src={images.instituteLounge} alt="Espace détente de l’institut" className="col-span-2 mt-16 aspect-[3/5] rounded-2xl" curtainClassName="bg-cream" />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionTitle eyebrow="L’institut" title="Bien plus qu’un institut, une expérience." />
            <p className="mt-6 max-w-lg leading-relaxed text-ink/70">
              Chez ERA Beauty, chaque prestation est pensée pour sublimer votre beauté naturelle grâce à des technologies performantes, des protocoles
              sur-mesure et une approche centrée sur le bien-être.
            </p>
            <p className="mt-4 max-w-lg leading-relaxed text-ink/70">
              Dans un cadre élégant et apaisant, notre équipe vous accompagne à chaque étape, de la consultation aux conseils après soin.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/institut" icon={<ArrowRight size={13} />}>
                Découvrir l’institut
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12">
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

      <section className="bg-cream/60 py-20 lg:py-24">
        <div className="container-x">
          <SectionTitle eyebrow="Avis clients" title="Elles nous font confiance" className="mb-12 text-center" />
          <TestimonialCards />
        </div>
      </section>

      <CtaBand
        image={images.facialMassage}
        title="Prête à révéler votre beauté ?"
        text="Réservez votre rendez-vous en quelques clics et laissez-vous guider par nos expertes."
        action={<BookButton />}
      />
    </>
  )
}
