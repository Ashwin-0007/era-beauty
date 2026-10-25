import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { buttonClass, type Size, type Variant } from './buttonStyles'

interface ButtonLinkProps {
  to: string
  variant?: Variant
  size?: Size
  icon?: ReactNode
  className?: string
  children: ReactNode
}

export function ButtonLink({ to, variant = 'primary', size = 'md', icon, className = '', children }: ButtonLinkProps) {
  return (
    <Link to={to} className={buttonClass(variant, size, className)}>
      <span>{children}</span>
      {icon && (
        <span aria-hidden className="inline-flex transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </Link>
  )
}
