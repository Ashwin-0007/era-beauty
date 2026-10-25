import { Quote, Star } from 'lucide-react'
import { testimonials } from '../../data/testimonials'
import { Reveal } from '../ui/Reveal'

export function TestimonialCards() {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <li key={testimonial.id}>
          <Reveal delay={index * 0.08} className="flex h-full flex-col rounded-2xl border border-ink/8 bg-ivory p-7">
            <div className="flex items-center justify-between">
              <Quote aria-hidden size={22} className="text-champagne" />
              <span className="flex gap-0.5 text-oxblood" aria-label={`Note : ${testimonial.rating} sur 5`}>
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <Star key={i} aria-hidden size={12} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
            </div>
            <blockquote className="mt-5 flex-1 font-display text-xl leading-snug text-ink italic">« {testimonial.quote} »</blockquote>
            <p className="mt-6 text-sm text-ink">{testimonial.client}</p>
            <p className="eyebrow mt-1 text-[0.58rem] text-mocha">{testimonial.treatment}</p>
          </Reveal>
        </li>
      ))}
    </ul>
  )
}
