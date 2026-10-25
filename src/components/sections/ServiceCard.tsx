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
      transition={{ duration: 1.1, ease: luxeEase, delay: (index % 3) * 0.12 }}
      className="group relative flex flex-col rounded-3xl glass-card p-4 transition-all duration-700 hover:-translate-y-2.5 hover:shadow-luxe-lg hover:border-oxblood/35"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand/30 shadow-inner">
        <img
          src={service.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1.6s] ease-[var(--ease-luxe)] group-hover:scale-[1.08]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-85" />
        
        <span className="eyebrow absolute top-4 left-4 rounded-full border border-ivory/30 bg-ink/40 px-3 py-1 text-ivory backdrop-blur-md shadow-sm">
          {String(index + 1).padStart(2, '0')}
        </span>

        <ul className="absolute right-4 bottom-4 left-4 flex flex-wrap gap-2">
          {service.highlights.map((highlight) => (
            <li
              key={highlight}
              className="rounded-full border border-ivory/40 bg-ivory/20 px-3 py-1 text-[0.66rem] font-medium tracking-[0.12em] text-ivory uppercase backdrop-blur-md shadow-sm"
            >
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-1 flex-col px-2 pt-6 pb-2">
        <h3 className="display text-[2rem] leading-tight text-ink transition-colors duration-500 group-hover:text-oxblood">
          {service.title}
        </h3>
        <p className="mt-3 flex-1 text-[0.96rem] leading-relaxed text-ink/70">
          {service.summary}
        </p>

        <button
          type="button"
          onClick={() => onBook(service.id)}
          className="mt-6 flex items-center justify-between border-t border-ink/10 pt-4 text-left after:absolute after:inset-0 after:content-['']"
          aria-label={`Réserver ${service.title}`}
        >
          <span className="eyebrow text-mocha transition-colors duration-500 group-hover:text-oxblood font-normal">
            Explore &amp; Reserve
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-ivory/80 text-ink transition-all duration-500 group-hover:rotate-45 group-hover:border-oxblood group-hover:bg-oxblood group-hover:text-ivory group-hover:shadow-[0_4px_16px_-2px_rgba(183,110,121,0.5)]">
            <ArrowUpRight size={16} strokeWidth={1.4} />
          </span>
        </button>
      </div>
    </motion.article>
  )
}
