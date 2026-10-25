import type { Benefit } from '../../data/catalog'

interface BenefitIconsProps {
  items: Benefit[]
  className?: string
  size?: 'sm' | 'md'
}

export function BenefitIcons({ items, className = '', size = 'sm' }: BenefitIconsProps) {
  return (
    <ul className={`grid gap-4 ${size === 'md' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5' : 'grid-cols-3'} ${className}`}>
      {items.map(({ icon: Icon, label }) => (
        <li key={label} className={`flex items-center gap-3 ${size === 'md' ? 'flex-col text-center' : ''}`}>
          <Icon aria-hidden size={size === 'md' ? 26 : 20} strokeWidth={1.2} className="shrink-0 text-oxblood" />
          <span className={`leading-snug tracking-[0.12em] text-ink/75 uppercase ${size === 'md' ? 'text-[0.62rem]' : 'text-[0.58rem]'}`}>{label}</span>
        </li>
      ))}
    </ul>
  )
}
