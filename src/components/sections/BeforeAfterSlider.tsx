import { MoveHorizontal } from 'lucide-react'
import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'

interface BeforeAfterSliderProps {
  before: string
  after: string
  label: string
  /** Applies a simulated "before" look to demo imagery. */
  simulateBefore?: boolean
}

const clamp = (value: number) => Math.min(100, Math.max(0, value))

/**
 * Drag (mouse/touch/pen) or use arrow keys to compare two images.
 * `touch-action: pan-y` keeps vertical page scrolling working on phones.
 */
export function BeforeAfterSlider({ before, after, label, simulateBefore = false }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect || rect.width === 0) return
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100))
  }, [])

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    updateFromClientX(event.clientX)
  }
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) updateFromClientX(event.clientX)
  }
  const stopDragging = () => {
    dragging.current = false
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
    setPosition(clamp(keys[event.key]))
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      className="relative aspect-[4/5] w-full cursor-ew-resize touch-pan-y overflow-hidden bg-ink-soft select-none sm:aspect-[5/4]"
    >
      {/* Before: full image underneath */}
      <img
        src={before}
        alt={`${label} — before`}
        draggable={false}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        style={simulateBefore ? { filter: 'saturate(0.55) contrast(0.88) brightness(0.92) sepia(0.12)' } : undefined}
      />
      {/* After: clipped from the left edge to the handle */}
      <img
        src={after}
        alt={`${label} — after`}
        draggable={false}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      />

      <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 [writing-mode:vertical-rl] rotate-180 text-[0.7rem] tracking-[0.5em] text-ivory uppercase drop-shadow sm:left-5">
        Before
      </span>
      <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 [writing-mode:vertical-rl] text-[0.7rem] tracking-[0.5em] text-ivory uppercase drop-shadow sm:right-5">
        After
      </span>

      <div className="pointer-events-none absolute inset-y-0 w-px bg-ivory/90" style={{ left: `${position}%` }}>
        <div
          role="slider"
          tabIndex={0}
          aria-label={`Compare before and after: ${label}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)}% before shown`}
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/80 bg-ink/40 text-ivory backdrop-blur-md transition-transform hover:scale-105 focus-visible:scale-105"
        >
          <MoveHorizontal aria-hidden size={20} strokeWidth={1.3} />
        </div>
      </div>
    </div>
  )
}
