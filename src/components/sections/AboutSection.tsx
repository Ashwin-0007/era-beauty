import { motion } from 'motion/react'
import { useRef } from 'react'
import { images } from '../../data/images'
import { useParallax } from '../../hooks/useParallax'
import { Photo } from '../ui/Photo'
import { luxeEase } from '../../lib/motion'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const pillars = [
  { title: 'Philosophy', text: 'Beauty that looks and feels like you — refined, healthy and quietly confident.' },
  { title: 'Expertise', text: 'Qualified therapists who keep learning, using professional techniques and products.' },
  { title: 'Approach', text: 'Every treatment begins with listening, so your plan is built around your skin and goals.' },
  { title: 'Experience', text: 'An unhurried, welcoming space where every detail is designed for your comfort.' },
]

export function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const slow = useParallax(ref, 6)
  const fast = useParallax(ref, 3)

  return (
    <section id="institute" ref={ref} aria-labelledby="institute-title" className="bg-ivory py-16 sm:py-20 lg:py-24">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <SectionHeading
            eyebrow="The Institute"
            id="institute-title"
            className="lg:col-span-6"
            title={
              <>
                A sanctuary for <em className="text-oxblood">modern</em> skin care.
              </>
            }
          />
          <Reveal delay={0.15} className="self-end lg:col-span-5 lg:col-start-8">
            <p className="display text-2xl leading-snug text-ink/85 sm:text-[1.75rem]">
              ERA Beauty brings together clinical knowledge and the art of care — treatments that respect your skin,
              your time and the way you want to feel.
            </p>
            <p className="mt-6 text-ink/65">
              Founded on the principle of bespoke dermal science, our suites offer private, restorative rituals designed to restore equilibrium and radiant cellular vitality through tailored protocols and sensorial mastery.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-12 items-end gap-6 sm:mt-24 sm:gap-8 lg:gap-10">
          <div className="col-span-12 overflow-hidden rounded-3xl shadow-luxe-lg sm:col-span-8">
            <Photo
              src={images.aboutInterior}
              alt="Calm treatment space with natural light and plants"
              parallaxY={slow}
              className="aspect-[4/3] sm:aspect-[16/11]"
            />
          </div>
          <div className="col-span-8 col-start-5 -mt-24 sm:col-span-4 sm:mt-0">
            <div className="arch overflow-hidden border-[6px] border-ivory shadow-luxe-lg transition-transform duration-700 hover:scale-[1.02]">
              <Photo
                src={images.aboutTreatment}
                alt="Therapist performing a gentle facial treatment"
                parallaxY={fast}
                className="aspect-[3/4]"
              />
            </div>
          </div>
        </div>

        <ol className="mt-20 grid gap-6 sm:mt-28 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <motion.li
              key={pillar.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 1, ease: luxeEase, delay: index * 0.1 }}
              className="group glass-card rounded-2xl p-7 transition-all duration-500 hover:-translate-y-2 hover:border-oxblood/40 hover:shadow-luxe-lg"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-oxblood/30 bg-oxblood/5 text-[0.7rem] font-medium tracking-widest text-oxblood transition-colors group-hover:bg-oxblood group-hover:text-ivory">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span aria-hidden className="h-px w-8 bg-ink/10 transition-all group-hover:w-12 group-hover:bg-oxblood/40" />
              </div>
              <h3 className="display mt-6 text-3xl font-light text-ink transition-colors group-hover:text-oxblood">
                {pillar.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">
                {pillar.text}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
