import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  max?: number
}

// Carte qui s'incline en 3D en suivant la souris, avec un reflet lumineux.
export function TiltCard({ children, className = '', max = 8 }: TiltCardProps) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const spring = { stiffness: 180, damping: 18 }
  const rotateX = useSpring(useTransform(y, [0, 1], [max, -max]), spring)
  const rotateY = useSpring(useTransform(x, [0, 1], [-max, max]), spring)
  const shine = useTransform([x, y], ([px, py]: number[]) => `radial-gradient(420px circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.22), transparent 55%)`)

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - rect.left) / rect.width)
    y.set((event.clientY - rect.top) / rect.height)
  }
  const reset = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <div className="[perspective:900px]">
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`group relative ${className}`}
      >
        {children}
        {!reduce && (
          <motion.div aria-hidden style={{ background: shine }} className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        )}
      </motion.div>
    </div>
  )
}
