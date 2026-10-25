import { motion } from 'motion/react'
import { Sparkles } from 'lucide-react'
import { testimonials } from '../../data/testimonials'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function TestimonialsSection() {
  return (
    <section id="chronicles" aria-labelledby="chronicles-title" className="bg-ivory pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-16 relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-oxblood/8 blur-3xl"
      />

      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Guest Chronicles"
            id="chronicles-title"
            title={
              <>
                Voices of the <em className="text-oxblood">Atelier</em>
              </>
            }
          />
          <Reveal delay={0.1} className="max-w-sm">
            <p className="text-ink/65 text-sm sm:text-base">
              Reflections from patrons who entrust their skin, face, and quiet hours to our restorative care.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="glass-card shimmer-hover rounded-3xl p-8 sm:p-10 flex flex-col justify-between border border-ink/8 hover:border-oxblood/35 hover:shadow-luxe-lg transition-all"
            >
              <div>
                <div className="flex items-center gap-1.5 text-oxblood mb-6">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Sparkles key={i} size={14} className="fill-oxblood/20" />
                  ))}
                  <span className="eyebrow ml-2 text-[0.65rem] text-oxblood">5.0 Signature Standard</span>
                </div>

                <p className="font-display italic text-xl sm:text-2xl text-ink leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-ink/8">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-medium text-lg text-ink">{item.client}</h4>
                    <p className="text-xs text-ink/55 mt-0.5">{item.roleOrLocation}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="glass-pill px-3 py-1 rounded-full text-[0.7rem] uppercase tracking-wider text-oxblood font-normal">
                    {item.treatment}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
