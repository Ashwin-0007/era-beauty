import { useEffect, useRef } from 'react'

// Halo lumineux discret qui suit la souris.
// Uniquement sur ordinateur (pointeur précis) et si l'utilisateur n'a pas réduit les animations.
export function CursorEffects() {
  const glow = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)')
    if (!media.matches) return

    let targetX = -300
    let targetY = -300
    let glowX = targetX
    let glowY = targetY
    let raf = 0

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      document.documentElement.classList.add('has-cursor')
    }
    const onLeave = () => document.documentElement.classList.remove('has-cursor')

    const loop = () => {
      glowX += (targetX - glowX) * 0.06
      glowY += (targetY - glowY) * 0.06
      if (glow.current) glow.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.documentElement.classList.remove('has-cursor')
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div aria-hidden className="cursor-layer pointer-events-none fixed inset-0 z-[80] overflow-hidden">
      <div ref={glow} className="cursor-glow" />
    </div>
  )
}
