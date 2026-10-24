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
      {/* Soft tonal wash behind the image column */}
      <div aria-hidden className="absolute inset-y-0 right-0 hidden w-[38%] bg-cream lg:block" />

      <div className="container-x relative grid min-h-[100svh] items-center gap-12 pt-28 pb-14 lg:grid-cols-12 lg:gap-8 lg:pt-24 lg:pb-20">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: luxeEase, delay: 0.3 }}
            className="eyebrow flex items-center gap-4 text-mocha"
          >
            <span aria-hidden className="h-px w-10 bg-current opacity-50" />
            Beauty Institute
          </motion.p>

          <h1 id="hero-title" className="display mt-6 text-[clamp(3.4rem,10.5vw,8.6rem)] leading-[0.92] lg:text-[clamp(4rem,7.6vw,8.6rem)]">
            {headline.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={`block ${index === 2 ? 'italic text-oxblood' : ''} ${index === 1 ? 'pl-[8vw] lg:pl-24' : ''}`}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, ease: luxeEase, delay: 0.45 + index * 0.12 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: luxeEase, delay: 0.95 }}
            className="mt-8 max-w-xl lg:ml-24"
          >
            <p className="max-w-md text-[1.05rem] leading-relaxed text-ink/70">
              Personalised skin, face and body treatments delivered with expert care in a calm, considered setting.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button size="lg" onClick={() => openBooking()} icon={<ArrowRight size={15} strokeWidth={1.4} />}>
                Book an Appointment
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('services')}>
                Explore Our Services
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="relative lg:col-span-5">
          <motion.div
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 1.6, ease: luxeEase, delay: 0.2 }}
            className="arch relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden bg-sand sm:aspect-[3/4]"
          >
            <motion.img
              src={images.heroPortrait}
              alt="Portrait of a woman with calm, radiant skin"
              initial={{ scale: 1.25 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.2, ease: luxeEase, delay: 0.2 }}
              style={{ y: imageY }}
              className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover object-[50%_30%]"
            />
          </motion.div>

          {/* Overlapping detail card, echoing editorial skincare layouts */}
          <motion.div
            style={{ y: detailY }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: luxeEase, delay: 1.1 }}
            className="absolute -bottom-6 left-0 hidden w-56 bg-ivory p-3 shadow-[0_30px_60px_-30px_rgba(35,31,28,0.35)] sm:block lg:-left-4 xl:-left-16"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img src={images.heroDetail} alt="" className="h-full w-full object-cover" />
            </div>
            <p className="display mt-3 text-xl">Signature Facial</p>
            <button
              type="button"
              onClick={() => openBooking('facials')}
              className="eyebrow mt-1 flex items-center gap-2 text-mocha transition-colors hover:text-oxblood"
            >
              Reserve <ArrowRight size={12} strokeWidth={1.4} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: luxeEase, delay: 1.3 }}
            className="absolute -top-6 right-2 h-24 w-24 text-mocha sm:-right-4 sm:h-28 sm:w-28"
          >
            <RotatingBadge />
            <span className="display absolute inset-0 flex items-center justify-center text-2xl italic text-ink">E</span>
          </motion.div>
        </div>

        <motion.button
          type="button"
          onClick={() => scrollToSection('institute')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="eyebrow absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-mocha lg:flex"
        >
          Scroll <ArrowDown size={13} strokeWidth={1.3} className="animate-bounce" />
        </motion.button>
      </div>

      <div className="border-y border-ink/10 bg-cream py-5 text-mocha">
        <Marquee items={services.map((service) => service.title)} />
      </div>
    </section>
  )
}
