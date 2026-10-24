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
      whileTap={{ scale: 0.97 }}
      className={buttonClass(variant, size, className)}
      {...rest}
    >
      <span>{children}</span>
      {icon && (
        <span aria-hidden className="transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </motion.button>
  )
}
