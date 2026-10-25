import { useReducedMotion, useScroll, useTransform } from 'motion/react'
import type { RefObject } from 'react'

export function useParallax(target: RefObject<HTMLElement | null>, distance = 8) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target, offset: ['start end', 'end start'] })
  const amount = reduce ? 0 : distance
  return useTransform(scrollYProgress, [0, 1], [`${-amount}%`, `${amount}%`])
}
