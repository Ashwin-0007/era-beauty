import { useEffect } from 'react'
import { site } from '../data/site'

export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : `${site.name} — ${site.tagline}`
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}
