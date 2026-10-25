import { ChevronLeft, ChevronRight } from 'lucide-react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'

interface BeforeAfterSliderProps {
  // Photo réelle avant le soin, et photo réelle après le soin.
  before: string
  after: string
  label: string
  aspect?: string
  compact?: boolean
  className?: string
}

const clamp = (value: number) => Math.min(100, Math.max(0, value))

// Tant que la même photo sert d'avant et d'après (aucune paire réelle fournie),
// on simule l'écart par un léger filtre pour garder le comparateur lisible.
const simulatedBefore = 'brightness(0.9) contrast(0.92) saturate(0.7) sepia(0.12)'
const simulatedAfter = 'brightness(1.05) contrast(1.04) saturate(1.1)'

export function BeforeAfterSlider({ before, after, label, aspect = 'aspect-[4/3]', compact = false, className = '' }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const simulated = before === after
  const touched = useRef(false)
  const inView = useInView(containerRef, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()

  // À la première apparition, le curseur balaie l'image pour inviter à la manipuler.
  useEffect(() => {
    if (!inView || reduce) return
    const sweep = animate(50, [50, 22, 78, 50], {
      duration: 2.4,
      delay: 0.3,
      ease: 'easeInOut',
      onUpdate: (value) => {
        if (!touched.current) setPosition(value)
      },
    })
    return () => sweep.stop()
  }, [inView, reduce])

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect || rect.width === 0) return
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100))
  }, [])

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    touched.current = true
    dragging.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    updateFromClientX(event.clientX)
  }
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) updateFromClientX(event.clientX)
  }
  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    dragging.current = false
    try {
      event.currentTarget.releasePointerCapture(event.pointerId)
    } catch {
      // La capture a déjà été relâchée par le navigateur.
    }
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 2
    const keys: Record<string, number> = {
      ArrowLeft: position - step,
      ArrowDown: position - step,
      ArrowRight: position + step,
      ArrowUp: position + step,
      Home: 0,
      End: 100,
      PageDown: position - 10,
      PageUp: position + 10,
    }
    if (!(event.key in keys)) return
    event.preventDefault()
    touched.current = true
    setPosition(clamp(keys[event.key]))
  }

  const tag = `absolute bottom-3 z-10 rounded-sm bg-ivory/90 px-2.5 py-1 font-sans tracking-[0.18em] text-ink uppercase ${compact ? 'text-[0.5rem]' : 'text-[0.56rem]'}`

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      className={`relative w-full cursor-ew-resize touch-pan-y overflow-hidden rounded-xl bg-cream select-none ${aspect} ${className}`}
    >
      <img
        src={before}
        alt={`${label} — avant le soin`}
        draggable={false}
        loading="lazy"
        className="photo-warm absolute inset-0 h-full w-full object-cover"
        style={simulated ? { filter: simulatedBefore } : undefined}
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
        <img
          src={after}
          alt={`${label} — après le soin`}
          draggable={false}
          loading="lazy"
          className="photo-warm absolute inset-0 h-full w-full object-cover"
          style={simulated ? { filter: simulatedAfter } : undefined}
        />
      </div>

      <span className={`${tag} left-3 transition-opacity ${position < 12 ? 'opacity-0' : ''}`}>Avant</span>
      <span className={`${tag} right-3 transition-opacity ${position > 88 ? 'opacity-0' : ''}`}>Après</span>

      <div className="pointer-events-none absolute inset-y-0 w-px bg-ivory shadow-[0_0_6px_rgba(0,0,0,0.25)]" style={{ left: `${position}%` }}>
        <div
          role="slider"
          tabIndex={0}
          aria-label={`Comparer avant et après : ${label}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)} % de l’image avant affichée`}
          onKeyDown={onKeyDown}
          className={`pointer-events-auto absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-ivory text-ink shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-transform hover:scale-110 focus-visible:scale-110 ${
            compact ? 'h-7 w-7' : 'h-10 w-10'
          }`}
        >
          <ChevronLeft aria-hidden size={compact ? 11 : 14} strokeWidth={1.8} className="-mr-0.5" />
          <ChevronRight aria-hidden size={compact ? 11 : 14} strokeWidth={1.8} className="-ml-0.5" />
        </div>
      </div>
    </div>
  )
}
