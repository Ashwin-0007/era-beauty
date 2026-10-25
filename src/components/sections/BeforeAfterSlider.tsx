import { MoveHorizontal } from 'lucide-react'
import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'

interface BeforeAfterSliderProps {
  before: string
  after: string
  label: string
  beforeCondition?: string
  afterCondition?: string
  beforeFilter?: string
  afterFilter?: string
}

const clamp = (value: number) => Math.min(100, Math.max(0, value))

const defaultBeforeFilter = 'brightness(0.88) contrast(0.90) saturate(0.68) sepia(0.14) hue-rotate(-6deg)'
const defaultAfterFilter = 'brightness(1.06) contrast(1.05) saturate(1.16)'

export function BeforeAfterSlider({
  before,
  after,
  label,
  beforeCondition,
  afterCondition,
  beforeFilter = defaultBeforeFilter,
  afterFilter = defaultAfterFilter,
}: BeforeAfterSliderProps) {
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
  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) {
      dragging.current = false
      try {
        event.currentTarget.releasePointerCapture(event.pointerId)
      } catch {
        // pointer capture fallback
      }
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
      {/* Before Layer (Pre-treatment: fatigued, dull complexion, muted vibrancy) */}
      <div className="absolute inset-0 h-full w-full">
        <img
          src={before}
          alt={`${label} — avant le soin`}
          draggable={false}
          loading="lazy"
          className="h-full w-full object-cover"
          style={{ filter: beforeFilter }}
        />
        <div className="pointer-events-none absolute inset-0 bg-ink/15 mix-blend-multiply" />
      </div>

      {/* After Layer (Post-protocol: radiant glass skin, plump hydration, healthy glow) */}
      <div
        className="absolute inset-0 h-full w-full overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        <img
          src={after}
          alt={`${label} — après le soin`}
          draggable={false}
          loading="lazy"
          className="h-full w-full object-cover"
          style={{ filter: afterFilter }}
        />
        {/* Luminous dewy glass-skin sheen */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sand/20 via-champagne/15 to-transparent mix-blend-soft-light" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-champagne/10 via-transparent to-sand/15 mix-blend-screen opacity-50" />
      </div>

      {/* Primary Badges */}
      <div className="pointer-events-none absolute top-5 left-5 z-10">
        <span className="rounded-full border border-ivory/25 bg-ink/75 px-4 py-1.5 text-[0.65rem] font-medium tracking-[0.25em] text-ivory/90 uppercase backdrop-blur-md shadow-md">
          Avant
        </span>
      </div>
      <div className="pointer-events-none absolute top-5 right-5 z-10">
        <span className="rounded-full border border-sand/40 bg-ink/75 px-4 py-1.5 text-[0.65rem] font-medium tracking-[0.25em] text-sand uppercase backdrop-blur-md shadow-md shadow-sand/10">
          Après
        </span>
      </div>

      {/* Contextual Clinical State Badges */}
      {beforeCondition && (
        <div
          className="pointer-events-none absolute bottom-5 left-5 z-10 transition-opacity duration-300"
          style={{ opacity: position > 15 ? 1 : 0 }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ivory/20 bg-ink/80 px-3.5 py-1.5 text-[0.65rem] font-medium tracking-wide text-ivory/75 backdrop-blur-md shadow-md">
            <span className="h-1.5 w-1.5 rounded-full bg-ivory/40" />
            {beforeCondition}
          </span>
        </div>
      )}

      {afterCondition && (
        <div
          className="pointer-events-none absolute bottom-5 right-5 z-10 transition-opacity duration-300"
          style={{ opacity: position < 85 ? 1 : 0 }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sand/40 bg-ink/80 px-3.5 py-1.5 text-[0.65rem] font-medium tracking-wide text-sand backdrop-blur-md shadow-md shadow-sand/10">
            <span className="h-1.5 w-1.5 rounded-full bg-sand animate-pulse" />
            {afterCondition}
          </span>
        </div>
      )}

      {/* Divider Bar & Floating Handle */}
      <div
        className="pointer-events-none absolute inset-y-0 w-[2px] bg-gradient-to-b from-transparent via-sand to-transparent shadow-[0_0_14px_rgba(217,167,155,0.8)]"
        style={{ left: `${position}%` }}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label={`Comparer avant et après : ${label}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)} % de l’image avant affichée`}
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute top-1/2 left-1/2 flex h-13 w-13 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-sand/90 bg-ink/90 text-sand shadow-[0_0_20px_rgba(217,167,155,0.45)] backdrop-blur-xl transition-transform duration-200 hover:scale-110 focus-visible:scale-110 active:scale-95 cursor-ew-resize"
        >
          <MoveHorizontal aria-hidden size={18} strokeWidth={1.8} />
        </div>
      </div>
    </div>
  )
}

