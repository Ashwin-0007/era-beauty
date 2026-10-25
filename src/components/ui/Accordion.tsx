import { AnimatePresence, motion } from 'motion/react'
import { Minus, Plus } from 'lucide-react'
import { useId, type ReactNode } from 'react'
import { luxeEase } from '../../lib/motion'

interface AccordionItemProps {
  title: ReactNode
  open: boolean
  onToggle: () => void
  children: ReactNode
  className?: string
  headerClassName?: string
}

export function AccordionItem({ title, open, onToggle, children, className = '', headerClassName = '' }: AccordionItemProps) {
  const id = useId()
  return (
    <div className={`border-b border-ink/10 ${className}`}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-header`}
          onClick={onToggle}
          className={`flex w-full items-center justify-between gap-4 py-4 text-left transition-colors ${open ? 'text-oxblood' : 'text-ink hover:text-oxblood'} ${headerClassName}`}
        >
          <span>{title}</span>
          <span aria-hidden className="shrink-0 text-oxblood">
            {open ? <Minus size={16} strokeWidth={1.4} /> : <Plus size={16} strokeWidth={1.4} />}
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-header`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: luxeEase }}
            className="overflow-hidden"
          >
            <div className="pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
