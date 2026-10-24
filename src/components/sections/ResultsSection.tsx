import { AnimatePresence, motion } from 'motion/react'
import { Info } from 'lucide-react'
import { useState } from 'react'
import { results } from '../../data/results'
import { luxeEase } from '../../lib/motion'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { BeforeAfterSlider } from './BeforeAfterSlider'

export function ResultsSection() {
  const [activeId, setActiveId] = useState(results[0].id)
  const active = results.find((result) => result.id === activeId) ?? results[0]
  const hasDemo = results.some((result) => result.demo)

  return (
    <section id="results" data-surface="dark" aria-labelledby="results-title" className="bg-ink py-24 text-ivory sm:py-32 lg:py-40">
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
          {hasDemo && (
            <Reveal delay={0.1} className="max-w-sm">
              <p className="flex items-start gap-3 border border-champagne/30 px-4 py-3 text-sm text-ivory/75">
                <Info aria-hidden size={16} strokeWidth={1.4} className="mt-0.5 shrink-0 text-champagne" />
                Demonstration content: stock imagery with a simulated "before". These are not client results. Genuine,
                approved results will replace them.
              </p>
            </Reveal>
          )}
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
            <p className="eyebrow text-ivory/45" id="results-cases">
              Case studies
            </p>
            <ul aria-labelledby="results-cases" className="mt-5 border-t border-ivory/10">
              {results.map((result, index) => {
                const selected = result.id === activeId
                return (
                  <li key={result.id} className="border-b border-ivory/10">
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setActiveId(result.id)}
                      className="group flex w-full items-center gap-5 py-5 text-left"
                    >
                      <span className="relative h-20 w-16 shrink-0 overflow-hidden">
                        <img
                          src={result.after}
                          alt=""
                          loading="lazy"
                          className={`h-full w-full object-cover transition-all duration-700 ${selected ? '' : 'opacity-50 grayscale group-hover:opacity-80'}`}
                        />
                      </span>
                      <span className="flex-1">
                        <span className="eyebrow block text-ivory/40">{String(index + 1).padStart(2, '0')} · {result.treatment}</span>
                        <span className={`display mt-1 block text-2xl transition-colors ${selected ? 'text-champagne italic' : 'group-hover:text-ivory'}`}>
                          {result.title}
                        </span>
                        <span className="mt-1 block text-xs text-ivory/40">{result.demo ? 'Demonstration image' : result.note}</span>
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
