import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { srcSet } from '../../data/images'

export type Media = { type: 'image'; src: string } | { type: 'video'; src: string; poster?: string }

interface MediaCycleProps {
  items: Media[]
  interval?: number
  className?: string
}

// Alterne photos et vidéos en fondu enchaîné, avec un lent zoom « cinéma » sur chaque image.
// Le zoom est une animation CSS (gérée par la carte graphique) et tout se met en pause hors de l'écran.
export function MediaCycle({ items, interval = 7000, className = '' }: MediaCycleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { amount: 0.05 })
  const [index, setIndex] = useState(0)
  const media = items[index]

  useEffect(() => {
    if (reduce || !inView || items.length < 2) return
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % items.length), interval)
    return () => window.clearTimeout(timer)
  }, [index, interval, items.length, reduce, inView])

  const zoom: CSSProperties = reduce
    ? {}
    : { animation: `ken-burns ${interval / 1000 + 2}s linear forwards`, animationPlayState: inView ? 'running' : 'paused' }

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        >
          {media.type === 'video' ? (
            <video autoPlay muted loop playsInline poster={media.poster} className="h-full w-full object-cover">
              <source src={media.src} type="video/mp4" />
            </video>
          ) : (
            <img
              src={media.src}
              srcSet={srcSet(media.src)}
              sizes="100vw"
              decoding="async"
              alt=""
              style={zoom}
              className="photo-warm h-full w-full object-cover will-change-transform"
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
