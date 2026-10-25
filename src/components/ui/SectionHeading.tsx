import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: ReactNode
  id?: string
  tone?: 'dark' | 'light'
  className?: string
}

export function SectionHeading({ index, eyebrow, title, id, tone = 'dark', className = '' }: SectionHeadingProps) {
  const muted = tone === 'dark' ? 'text-mocha' : 'text-champagne'
  return (
    <Reveal className={className}>
      <p className={`eyebrow flex items-center gap-4 ${muted}`}>
        <span>{index}</span>
        <span aria-hidden className="h-px w-10 bg-current opacity-50" />
        <span>{eyebrow}</span>
      </p>
      <h2 id={id} className="display mt-5 text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-7xl">
        {title}
      </h2>
    </Reveal>
  )
}
