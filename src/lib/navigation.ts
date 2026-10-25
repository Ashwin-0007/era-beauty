import type { SectionId } from '../data/navigation'

export function scrollToSection(id: SectionId) {
  const target = document.getElementById(id)
  if (!target) return
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', id === 'home' ? window.location.pathname : `#${id}`)
}
