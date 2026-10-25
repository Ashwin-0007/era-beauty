import { ChevronRight } from 'lucide-react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export interface Crumb {
  label: string
  to?: string
}

export function Breadcrumb({ items, className = '' }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Fil d’Ariane" className={`items-center gap-2 text-[0.62rem] tracking-[0.2em] text-ink/55 uppercase ${className}`}>
      {items.map((item, index) => (
        <Fragment key={item.label}>
          {index > 0 && <ChevronRight aria-hidden size={11} />}
          {item.to ? (
            <Link to={item.to} className="transition-colors hover:text-oxblood">
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className="text-ink/80">
              {item.label}
            </span>
          )}
        </Fragment>
      ))}
    </nav>
  )
}
