import { motion, type HTMLMotionProps } from 'motion/react'
import { luxeEase } from '../../lib/motion'

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number
  /** Vertical travel distance in px. */
  y?: number
}

/** Fades and lifts content into place the first time it enters the viewport. */
export function Reveal({ delay = 0, y = 28, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1, ease: luxeEase, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
