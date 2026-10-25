import { useEffect, useState } from 'react'

export function AmbientLightFollower() {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)')
    if (!media.matches) return

    let currentX = -200
    let currentY = -200
    let targetX = -200
    let targetY = -200
    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      if (!visible) setVisible(true)
    }

    const onMouseLeave = () => setVisible(false)

    const loop = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      setPos({ x: Math.round(currentX), y: Math.round(currentY) })
      rafId = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-700 ease-out"
      style={{
        background: `radial-gradient(650px circle at ${pos.x}px ${pos.y}px, rgba(183, 110, 121, 0.045), rgba(217, 167, 155, 0.02) 40%, transparent 80%)`,
      }}
    />
  )
}
