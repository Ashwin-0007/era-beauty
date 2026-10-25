import { useEffect, useRef } from 'react'

const INTERACTIVE = 'a, button, [role="slider"], [role="tab"], input, select, textarea, label'

// Halo lumineux qui suit la souris + anneau de curseur qui s'agrandit sur les éléments cliquables.
// Uniquement sur ordinateur (pointeur précis) et si l'utilisateur n'a pas réduit les animations.
export function CursorEffects() {
  const glow = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)')
    if (!media.matches) return

    let targetX = -300
    let targetY = -300
    let ringX = targetX
    let ringY = targetY
    let glowX = targetX
    let glowY = targetY
    let raf = 0

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      const hovering = (event.target as Element | null)?.closest?.(INTERACTIVE)
      ring.current?.classList.toggle('cursor-ring--active', Boolean(hovering))
      document.documentElement.classList.add('has-cursor')
    }
    const onLeave = () => document.documentElement.classList.remove('has-cursor')
    const onDown = () => ring.current?.classList.add('cursor-ring--press')
    const onUp = () => ring.current?.classList.remove('cursor-ring--press')

    const loop = () => {
      ringX += (targetX - ringX) * 0.2
      ringY += (targetY - ringY) * 0.2
      glowX += (targetX - glowX) * 0.06
      glowY += (targetY - glowY) * 0.06
      if (dot.current) dot.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`
      if (ring.current) ring.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      if (glow.current) glow.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.documentElement.classList.remove('has-cursor')
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div aria-hidden className="cursor-layer pointer-events-none fixed inset-0 z-[80] overflow-hidden">
      <div ref={glow} className="cursor-glow" />
      <div ref={ring} className="cursor-ring" />
      <div ref={dot} className="cursor-dot" />
    </div>
  )
}
