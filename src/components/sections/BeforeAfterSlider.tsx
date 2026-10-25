import { MoveHorizontal } from 'lucide-react'
import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'

interface BeforeAfterSliderProps {
  before: string
  after: string
  label: string
  simulateBefore?: boolean
}

const clamp = (value: number) => Math.min(100, Math.max(0, value))

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
      className="relative aspect-[4/5] w-full cursor-ew-resize touch-pan-y overflow-hidden rounded-3xl border border-ivory/15 bg-ink-soft select-none shadow-2xl sm:aspect-[5/4]"
    >
      <img
        src={before}
        alt={`${label} — before`}
        draggable={false}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        style={simulateBefore ? { filter: 'saturate(0.55) contrast(0.88) brightness(0.92) sepia(0.12)' } : undefined}
      />
      <img
        src={after}
        alt={`${label} — after`}
        draggable={false}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      />

      <div className="pointer-events-none absolute top-5 left-5 z-10">
        <span className="rounded-full border border-ivory/25 bg-ink/65 px-4 py-1.5 text-[0.65rem] font-medium tracking-[0.25em] text-ivory/90 uppercase backdrop-blur-md shadow-md">
          Before
        </span>
      </div>
      <div className="pointer-events-none absolute top-5 right-5 z-10">
        <span className="rounded-full border border-sand/40 bg-ink/65 px-4 py-1.5 text-[0.65rem] font-medium tracking-[0.25em] text-sand uppercase backdrop-blur-md shadow-md">
          After
        </span>
      </div>

      <div className="pointer-events-none absolute inset-y-0 w-[2px] bg-gradient-to-b from-transparent via-sand to-transparent shadow-[0_0_12px_rgba(217,167,155,0.7)]" style={{ left: `${position}%` }}>
        <div
          role="slider"
          tabIndex={0}
          aria-label={`Compare before and after: ${label}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)}% before shown`}
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute top-1/2 left-1/2 flex h-13 w-13 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-sand/80 bg-ink/85 text-sand shadow-glow-rose backdrop-blur-lg transition-transform duration-300 hover:scale-110 focus-visible:scale-110"
        >
          <MoveHorizontal aria-hidden size={18} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  )
}
