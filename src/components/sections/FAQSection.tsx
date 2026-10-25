import { AnimatePresence, motion } from 'motion/react'
import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { useBooking } from '../../context/BookingContext'
import { faqs } from '../../data/faq'
import { images } from '../../data/images'
import { Button } from '../ui/Button'
import { Photo } from '../ui/Photo'
import { luxeEase } from '../../lib/motion'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function FAQSection() {
  const { openBooking } = useBooking()
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const baseId = useId()
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const last = faqs.length - 1
    const target =
      event.key === 'ArrowDown' ? Math.min(index + 1, last)
      : event.key === 'ArrowUp' ? Math.max(index - 1, 0)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : null
    if (target === null) return
    event.preventDefault()
    buttonRefs.current[target]?.focus()
  }

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-ivory py-16 sm:py-20 lg:py-24">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="FAQ"
              id="faq-title"
              title={
                <>
                  Good to <em className="text-oxblood">know</em>
                </>
              }
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xs text-ink/65">Still wondering about something? We are happy to help before you book.</p>
              <Button variant="outline" className="mt-8" onClick={() => openBooking()}>
                Request an Appointment
              </Button>
            </Reveal>
            <Photo src={images.faqFeature} alt="Skin care product resting on soft fabric" className="arch mt-12 hidden aspect-[3/4] w-56 lg:block" />
          </div>
        </div>

        <Reveal className="lg:col-span-7 lg:col-start-6">
          <div className="space-y-3.5">
            {faqs.map((faq, index) => {
              const open = openIndex === index
              const buttonId = `${baseId}-q${index}`
              const panelId = `${baseId}-a${index}`
              return (
                <div
                  key={faq.question}
                  className={`glass-card rounded-2xl px-6 sm:px-8 transition-all duration-500 overflow-hidden ${
                    open ? 'border-oxblood/40 bg-ivory/95 shadow-luxe' : 'border-ink/8 hover:border-ink/20 hover:bg-ivory/70'
                  }`}
                >
                  <h3>
                    <button
                      ref={(el) => {
                        buttonRefs.current[index] = el
                      }}
                      id={buttonId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : index)}
                      onKeyDown={(event) => onKeyDown(event, index)}
                      className="group flex w-full items-center gap-6 py-6 text-left"
                    >
                      <span className="eyebrow w-6 shrink-0 text-oxblood font-normal">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className={`display flex-1 text-[1.45rem] leading-snug transition-colors sm:text-[1.8rem] ${open ? 'text-oxblood font-normal' : 'text-ink group-hover:text-oxblood'}`}>
                        {faq.question}
                      </span>
                      <span
                        aria-hidden
                        className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                          open
                            ? 'border-oxblood bg-oxblood text-ivory shadow-[0_4px_16px_-2px_rgba(183,110,121,0.5)]'
                            : 'border-ink/15 bg-ivory text-ink group-hover:border-oxblood group-hover:text-oxblood'
                        }`}
                      >
                        <span className="absolute h-px w-3.5 bg-current" />
                        <span className={`absolute h-px w-3.5 bg-current transition-transform duration-500 ease-[var(--ease-luxe)] ${open ? 'rotate-0' : 'rotate-90'}`} />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: luxeEase }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-7 pl-12 text-[0.98rem] leading-relaxed text-ink/75 sm:pr-8">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
