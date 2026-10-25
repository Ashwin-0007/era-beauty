import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { luxeEase } from '../../lib/motion'

interface SectionTitleProps {
  number?: string
  eyebrow?: string
  title: ReactNode
  subtitle?: string
  className?: string
  as?: 'h2' | 'h3'
}

// Les mots du titre montent un par un depuis un masque lorsqu'il entre dans l'écran.
function RevealWords({ text }: { text: string }) {
  return (
    <motion.span initial="hidden" whileInView="shown" viewport={{ once: true, margin: '0px 0px -8% 0px' }} transition={{ staggerChildren: 0.06 }}>
      {text.split(' ').map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: '105%' }, shown: { y: '0%' } }}
            transition={{ duration: 0.85, ease: luxeEase }}
          >
            {word}
            {' '}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

// Titre de section façon maquette : « 01 — » puis titre en capitales serif.
export function SectionTitle({ number, eyebrow, title, subtitle, className = '', as: Tag = 'h2' }: SectionTitleProps) {
  return (
    <div className={className}>
      {(number || eyebrow) && (
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: luxeEase }}
          className="eyebrow flex items-center gap-3 text-mocha"
        >
          {number && <span>{number}</span>}
          {number && (
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: luxeEase }}
              className="h-px w-8 origin-left bg-mocha/50"
            />
          )}
          {eyebrow && <span>{eyebrow}</span>}
        </motion.p>
      )}
      <Tag className="title-caps mt-3 text-3xl text-ink sm:text-[2.3rem]">{typeof title === 'string' ? <RevealWords text={title} /> : title}</Tag>
      {subtitle && <p className="eyebrow mt-3 tracking-[0.18em] text-ink/75">{subtitle}</p>}
    </div>
  )
}
