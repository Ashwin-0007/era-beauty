import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { results } from '../../data/results'
import { luxeEase } from '../../lib/motion'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { BeforeAfterSlider } from './BeforeAfterSlider'

export function ResultsSection() {
  const [activeId, setActiveId] = useState(results[0].id)
  const active = results.find((result) => result.id === activeId) ?? results[0]

  return (
    <section id="results" data-surface="dark" aria-labelledby="results-title" className="bg-ink py-16 text-ivory sm:py-20 lg:py-24">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="05"
            eyebrow="Results"
            id="results-title"
            tone="light"
            title={
              <>
                Before <em className="text-champagne">&amp;</em> after
              </>
            }
          />
          <Reveal delay={0.1} className="max-w-sm">
            <p className="text-ivory/70 text-sm leading-relaxed">
              Documented skin transformations achieved through our bespoke protocol regimens. Results reflect individualized treatment plans.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: luxeEase }}
              >
                <BeforeAfterSlider before={active.before} after={active.after} label={active.title} simulateBefore={active.demo} />
              </motion.div>
            </AnimatePresence>
            <p className="mt-4 text-sm text-ivory/50">Drag the handle, or focus it and use the arrow keys.</p>
          </Reveal>

          <div className="lg:col-span-4">
            <p className="eyebrow text-champagne/80 tracking-[0.3em]" id="results-cases">
              Verified Case Studies
            </p>
            <ul aria-labelledby="results-cases" className="mt-5 space-y-3">
              {results.map((result, index) => {
                const selected = result.id === activeId
                return (
                  <li key={result.id}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setActiveId(result.id)}
                      className={`group flex w-full items-center gap-5 rounded-2xl p-3.5 text-left transition-all duration-500 ${
                        selected
                          ? 'border border-sand/50 bg-ivory/10 shadow-luxe'
                          : 'border border-ivory/10 bg-ivory/4 hover:border-ivory/20 hover:bg-ivory/8'
                      }`}
                    >
                      <span className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl border border-ivory/15 shadow-sm">
                        <img
                          src={result.after}
                          alt=""
                          loading="lazy"
                          className={`h-full w-full object-cover transition-all duration-700 ${
                            selected ? 'scale-105' : 'opacity-55 grayscale group-hover:opacity-85 group-hover:grayscale-0'
                          }`}
                        />
                      </span>
                      <span className="flex-1">
                        <span className="eyebrow block text-xs tracking-wider text-champagne/70">
                          {String(index + 1).padStart(2, '0')} · {result.treatment}
                        </span>
                        <span className={`display mt-1 block text-2xl transition-colors ${selected ? 'italic text-champagne' : 'text-ivory/90 group-hover:text-ivory'}`}>
                          {result.title}
                        </span>
                        <span className="mt-1 block text-xs text-ivory/40">
                          {result.note}
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
