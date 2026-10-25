import { useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

const QUERY = '(max-width: 767px), (pointer: coarse)'

// Vrai si les effets de défilement coûteux (parallaxe) doivent être désactivés :
// animations réduites demandées, ou téléphone, pour garder un défilement parfaitement fluide.
export function useLiteMotion() {
  const reduce = useReducedMotion()
  const [small, setSmall] = useState(() => typeof window !== 'undefined' && window.matchMedia(QUERY).matches)

  useEffect(() => {
    const media = window.matchMedia(QUERY)
    const update = () => setSmall(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return Boolean(reduce) || small
}
