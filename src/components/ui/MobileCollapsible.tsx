import { Plus } from 'lucide-react'
import { useState, type ReactNode } from 'react'

interface MobileCollapsibleProps {
  id?: string
  title: ReactNode
  icon?: ReactNode
  children: ReactNode
  className?: string
}

// Section toujours ouverte sur ordinateur, repliable en accordéon sur téléphone.
export function MobileCollapsible({ id, title, icon, children, className = '' }: MobileCollapsibleProps) {
  const [open, setOpen] = useState(false)
  return (
    <section id={id} data-anchor className={className}>
      <h2 className="hidden items-center gap-3 lg:flex">
        {icon}
        <span className="title-caps text-xl text-ink">{title}</span>
      </h2>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 border-b border-ink/10 py-4 text-left lg:hidden"
      >
        <span className="flex items-center gap-3">
          {icon}
          <span className="title-caps text-lg text-ink">{title}</span>
        </span>
        <Plus aria-hidden size={16} className={`text-oxblood transition-transform ${open ? 'rotate-45' : ''}`} />
      </button>
      <div className={`${open ? 'block' : 'hidden'} pt-5 lg:block`}>{children}</div>
    </section>
  )
}
