import type { SVGProps } from 'react'

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  size?: number | string
  strokeWidth?: number | string
}

// Icônes au trait fin, dans le style des icônes Lucide, absentes de la bibliothèque.
const base = (size: number | string, strokeWidth: number | string) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
})

export function ToothIcon({ size = 24, strokeWidth = 2, ...rest }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} {...rest}>
      <path d="M7.5 3.5c-2.4 0-4 1.9-4 4.4 0 2.2.8 3.6 1.5 5.3.7 1.8.8 3.9 1.3 5.7.4 1.4 1 2.1 1.8 2.1 1.2 0 1.4-1.6 1.7-3.3.3-1.6.8-3 2.2-3s1.9 1.4 2.2 3c.3 1.7.5 3.3 1.7 3.3.8 0 1.4-.7 1.8-2.1.5-1.8.6-3.9 1.3-5.7.7-1.7 1.5-3.1 1.5-5.3 0-2.5-1.6-4.4-4-4.4-1.6 0-2.6.8-4.5.8s-2.9-.8-4.5-.8Z" />
    </svg>
  )
}

export function LotusIcon({ size = 24, strokeWidth = 2, ...rest }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} {...rest}>
      <path d="M12 19c-2.5-1.6-3.8-4-3.8-6.8S9.6 6.9 12 4.5c2.4 2.4 3.8 4.9 3.8 7.7S14.5 17.4 12 19Z" />
      <path d="M12 19c-3.6.4-6.6-.8-8.5-3.6 1-1.7 2.6-2.8 4.6-3.2" />
      <path d="M12 19c3.6.4 6.6-.8 8.5-3.6-1-1.7-2.6-2.8-4.6-3.2" />
      <path d="M3 19.5h18" />
    </svg>
  )
}
