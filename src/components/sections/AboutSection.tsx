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
    <section id="institute" ref={ref} aria-labelledby="institute-title" className="bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <SectionHeading
            index="02"
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
              Placeholder introduction: share the institute's story, founder, qualifications and what makes the ERA
              experience distinct. This copy will be replaced with the final brand narrative.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-12 items-end gap-4 sm:mt-24 sm:gap-6 lg:gap-8">
          <Photo
            src={images.aboutInterior}
            alt="Calm treatment space with natural light and plants"
            parallaxY={slow}
            className="col-span-12 aspect-[4/3] sm:col-span-8 sm:aspect-[16/11]"
          />
          <div className="col-span-7 col-start-6 -mt-24 sm:col-span-4 sm:mt-0">
            <Photo
              src={images.aboutTreatment}
              alt="Therapist performing a gentle facial treatment"
              parallaxY={fast}
              className="arch aspect-[3/4] border-[6px] border-ivory sm:border-0"
            />
          </div>
        </div>

        <ol className="mt-20 grid gap-x-10 sm:mt-28 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <motion.li
              key={pillar.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -12% 0px' }}
              transition={{ duration: 1, ease: luxeEase, delay: index * 0.08 }}
              className="border-t border-ink/15 py-8"
            >
              <span className="eyebrow text-mocha">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="display mt-4 text-3xl">{pillar.title}</h3>
              <p className="mt-3 text-ink/65">{pillar.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
