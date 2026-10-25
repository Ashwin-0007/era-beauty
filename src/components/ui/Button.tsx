import { motion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'
import { buttonClass, type Size, type Variant } from './buttonStyles'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  children: ReactNode
}

export function Button({ variant = 'primary', size = 'md', icon, className = '', children, type = 'button', ...rest }: ButtonProps) {
  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={buttonClass(variant, size, className)}
      {...rest}
    >
      <span className="relative z-10 inline-flex items-center justify-center gap-2.5 whitespace-nowrap">
        <span className="inline-flex items-center gap-2 whitespace-nowrap">{children}</span>
        {icon && (
          <span aria-hidden className="inline-flex shrink-0 items-center justify-center transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:translate-x-1.5">
            {icon}
          </span>
        )}
      </span>
    </motion.button>
  )
}
