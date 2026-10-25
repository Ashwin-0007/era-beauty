import { motion, useScroll, useSpring } from 'motion/react'

// Fine ligne bordeaux sous l'en-tête qui indique la progression de lecture.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })
  return <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-oxblood" />
}
