import { useEffect } from 'react'

// Shared counter so nested overlays (menu → booking modal) don't unlock early.
let lockCount = 0

/** Prevents background scrolling while `active`, compensating for the scrollbar width. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    const root = document.documentElement
    if (lockCount === 0) {
      const scrollbar = window.innerWidth - root.clientWidth
      root.style.overflow = 'hidden'
      root.style.paddingRight = scrollbar > 0 ? `${scrollbar}px` : ''
    }
    lockCount += 1
    return () => {
      lockCount -= 1
      if (lockCount === 0) {
        root.style.overflow = ''
        root.style.paddingRight = ''
      }
    }
  }, [active])
}
