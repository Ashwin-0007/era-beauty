import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { useBooking } from '../../context/BookingContext'
import { images } from '../../data/images'
import { services } from '../../data/services'
import { scrollToSection } from '../../lib/navigation'
import { Button } from '../ui/Button'
import { Marquee } from '../ui/Marquee'
import { luxeEase } from '../../lib/motion'

const headline = ['Beauty,', 'in its finest', 'era.']

function RotatingBadge() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden className="h-full w-full animate-[spin_24s_linear_infinite]">
      <defs>
        <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
      </defs>
      <text className="fill-current font-sans text-[9.4px] uppercase" letterSpacing="3.2">
        <textPath href="#badge-circle">Skin · Face · Body · Rituals · Care · </textPath>
      </text>
    </svg>
  )
}

export function HeroSection() {
  const { openBooking } = useBooking()
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '14%'])
  const detailY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-40%'])

  return (
    <section id="home" ref={ref} aria-labelledby="hero-title" className="relative overflow-hidden bg-ivory">
      <div aria-hidden className="pointer-events-none absolute top-12 right-0 h-[640px] w-[640px] rounded-full bg-gradient-to-bl from-sand/35 via-oxblood/10 to-transparent blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 left-0 h-[480px] w-[480px] rounded-full bg-gradient-to-tr from-cream/60 via-sand/20 to-transparent blur-2xl" />
      <div aria-hidden className="absolute inset-y-0 right-0 hidden w-[38%] bg-cream/70 lg:block border-l border-ink/5" />

      <div className="container-x relative grid min-h-[100svh] items-center gap-12 pt-32 pb-16 lg:grid-cols-12 lg:gap-8 lg:pt-28 lg:pb-24">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: luxeEase, delay: 0.25 }}
            className="flex items-center gap-4"
          >
            <span aria-hidden className="h-px w-10 bg-oxblood/60" />
            <p className="eyebrow tracking-[0.34em] text-mocha font-normal">
              Beauty Institute · Haute Esthétique
            </p>
          </motion.div>

          <h1 id="hero-title" className="display mt-6 text-[clamp(3.4rem,10.2vw,8.5rem)] leading-[0.92] lg:text-[clamp(4rem,7.5vw,8.6rem)]">
            {headline.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={`block ${index === 2 ? 'italic text-oxblood' : ''} ${index === 1 ? 'pl-[6vw] lg:pl-20' : ''}`}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.25, ease: luxeEase, delay: 0.4 + index * 0.12 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: luxeEase, delay: 0.9 }}
            className="mt-8 max-w-xl lg:ml-20"
          >
            <p className="max-w-md text-[1.08rem] leading-relaxed text-ink/75 font-light">
              Personalised skin, face and body treatments delivered with clinical precision and unhurried holistic care.
            </p>
            <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center">
              <Button size="lg" onClick={() => openBooking()} icon={<ArrowRight size={15} strokeWidth={1.4} />} className="shadow-luxe">
                Book an Appointment
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('services')}>
                Explore Treatments
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="relative lg:col-span-5">
          <div className="arch absolute -inset-3.5 border border-oxblood/25 hidden sm:block pointer-events-none" />

          <motion.div
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 1.6, ease: luxeEase, delay: 0.2 }}
            className="arch relative mx-auto aspect-[4/5] w-full max-w-[500px] overflow-hidden bg-sand/40 shadow-luxe-lg sm:aspect-[3/4]"
          >
            <motion.img
              src={images.heroPortrait}
              alt="Portrait of a woman with calm, radiant skin"
              initial={{ scale: 1.22 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.2, ease: luxeEase, delay: 0.2 }}
              style={{ y: imageY }}
              className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover object-[50%_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          <motion.div
            style={{ y: detailY }}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: luxeEase, delay: 1.05 }}
            className="glass-card absolute -bottom-8 left-0 hidden w-64 rounded-2xl p-3.5 shadow-luxe-lg sm:block lg:-left-6 xl:-left-14"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-xl">
              <img src={images.heroDetail} alt="" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
            <div className="pt-3">
              <span className="eyebrow text-[0.62rem] text-oxblood font-normal">Signature Care</span>
              <p className="display mt-1 text-2xl font-light">Hydra Glow Facial</p>
              <button
                type="button"
                onClick={() => openBooking('facials')}
                className="eyebrow mt-2 flex items-center gap-2 text-mocha transition-all duration-300 hover:text-oxblood hover:translate-x-1"
              >
                Reserve Treatment <ArrowRight size={12} strokeWidth={1.5} />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: luxeEase, delay: 1.2 }}
            className="absolute -top-7 right-1 h-26 w-26 text-mocha sm:-right-4 sm:h-30 sm:w-30 animate-float"
          >
            <div className="relative h-full w-full rounded-full bg-ivory/90 p-2 shadow-luxe backdrop-blur-md border border-sand/40">
              <RotatingBadge />
              <span className="display absolute inset-0 flex items-center justify-center text-3xl italic text-oxblood">E</span>
            </div>
          </motion.div>
        </div>

        <motion.button
          type="button"
          onClick={() => scrollToSection('institute')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="glass-pill absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 rounded-full px-5 py-2.5 text-mocha transition-all duration-300 hover:border-oxblood hover:text-oxblood lg:flex"
        >
          <span className="eyebrow text-[0.65rem]">Scroll to discover</span>
          <ArrowDown size={12} strokeWidth={1.5} className="animate-bounce text-oxblood" />
        </motion.button>
      </div>

      <div className="border-y border-ink/8 bg-cream/90 py-5 text-mocha shadow-inner backdrop-blur-sm">
        <Marquee items={services.map((service) => service.title)} />
      </div>
    </section>
  )
}
