import { motion } from 'motion/react'
import { Sparkles } from 'lucide-react'

const accolades = [
  { publication: 'VOGUE', quote: 'The most transcendent skin sanctuary of the decade.' },
  { publication: "HARPER'S BAZAAR", quote: 'Where cellular precision meets poetic calm.' },
  { publication: 'ELLE LUXE', quote: 'A masterclass in modern French dermatological elegance.' },
  { publication: 'VANITY FAIR', quote: 'Redefining restorative facial architecture.' },
]

export function PressAccolades() {
  return (
    <section aria-label="Press and Recognition" className="relative border-y border-ink/8 bg-cream/40 py-8 overflow-hidden backdrop-blur-sm">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8 items-center justify-between">
          {accolades.map((item, idx) => (
            <motion.div
              key={item.publication}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.12 }}
              className="flex flex-col items-center text-center px-3"
            >
              <div className="flex items-center gap-1.5 text-oxblood/80 mb-2">
                <Sparkles size={11} strokeWidth={1.5} />
                <span className="font-display font-medium text-xs tracking-[0.28em] text-ink/80 uppercase">
                  {item.publication}
                </span>
                <Sparkles size={11} strokeWidth={1.5} />
              </div>
              <p className="font-display italic text-sm sm:text-base text-ink/75 leading-tight">
                "{item.quote}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
