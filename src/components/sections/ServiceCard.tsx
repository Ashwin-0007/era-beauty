import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import type { Service } from '../../data/services'
import { luxeEase } from '../../lib/motion'

interface ServiceCardProps {
  service: Service
  index: number
  onBook: (serviceId: string) => void
}

export function ServiceCard({ service, index, onBook }: ServiceCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1, ease: luxeEase, delay: (index % 3) * 0.1 }}
      className="group relative flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <img
          src={service.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-[1.06]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/0 to-ink/0 opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
        <span className="eyebrow absolute top-4 left-4 text-ivory">{String(index + 1).padStart(2, '0')}</span>
        <ul className="absolute right-4 bottom-4 left-4 flex flex-wrap gap-2">
          {service.highlights.map((highlight) => (
            <li key={highlight} className="rounded-full border border-ivory/50 px-3 py-1 text-[0.68rem] tracking-[0.1em] text-ivory uppercase backdrop-blur-sm">
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-1 flex-col pt-6">
        <h3 className="display text-[2rem] leading-tight">{service.title}</h3>
        <p className="mt-3 flex-1 text-ink/65">{service.summary}</p>
        <button
          type="button"
          onClick={() => onBook(service.id)}
          className="mt-6 flex items-center justify-between border-t border-ink/15 pt-4 text-left after:absolute after:inset-0 after:content-['']"
          aria-label={`Book ${service.title}`}
        >
          <span className="eyebrow text-ink transition-colors group-hover:text-oxblood">Learn more &amp; book</span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-oxblood group-hover:bg-oxblood group-hover:text-ivory">
            <ArrowUpRight size={16} strokeWidth={1.3} />
          </span>
        </button>
      </div>
    </motion.article>
  )
}
