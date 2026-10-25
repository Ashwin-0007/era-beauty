import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect } from 'react'
import { luxeEase } from '../../lib/motion'
import type { MediaLightboxItem } from '../../types/ui'

export type { MediaLightboxItem }

export interface MediaLightboxProps {
  item: MediaLightboxItem | null
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
  hasNav?: boolean
}

export function MediaLightbox({
  item,
  onClose,
  onPrev,
  onNext,
  hasNav = true,
}: MediaLightboxProps) {
  useEffect(() => {
    if (!item) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (hasNav && onPrev && e.key === 'ArrowLeft') onPrev()
      if (hasNav && onNext && e.key === 'ArrowRight') onNext()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [item, onClose, onPrev, onNext, hasNav])

  return (
    <AnimatePresence>
      {item && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/90 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: luxeEase }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-ivory/15 bg-ink text-ivory shadow-2xl"
          >
            <div className="absolute top-4 right-4 z-20">
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer la vue détaillée"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 bg-ink/80 text-ivory/80 transition-all hover:scale-105 hover:border-ivory hover:text-ivory"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative aspect-[16/10] w-full bg-espresso sm:aspect-[16/9]">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-black/20"
              />

              {hasNav && onPrev && (
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <button
                    type="button"
                    onClick={onPrev}
                    aria-label="Élément précédent"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 bg-ink/75 text-ivory transition-all hover:scale-110 hover:border-champagne hover:text-champagne"
                  >
                    <ChevronLeft size={20} />
                  </button>
                </div>
              )}

              {hasNav && onNext && (
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <button
                    type="button"
                    onClick={onNext}
                    aria-label="Élément suivant"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 bg-ink/75 text-ivory transition-all hover:scale-110 hover:border-champagne hover:text-champagne"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8">
              {(item.eyebrow || item.tagline) && (
                <div className="flex flex-wrap items-center gap-3">
                  {item.eyebrow && (
                    <span className="rounded-full border border-sand/30 bg-sand/10 px-3 py-1 text-[0.62rem] tracking-wider text-sand uppercase">
                      {item.eyebrow}
                    </span>
                  )}
                  {item.eyebrow && item.tagline && (
                    <span className="text-xs text-ivory/40">·</span>
                  )}
                  {item.tagline && (
                    <span className="text-xs italic text-champagne">{item.tagline}</span>
                  )}
                </div>
              )}

              <h4 className="display mt-2 text-2xl text-ivory sm:text-3xl">{item.title}</h4>
              {item.description && (
                <p className="mt-3 text-sm leading-relaxed text-ivory/70">{item.description}</p>
              )}

              {item.tags && item.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-ivory/10">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-ivory/10 bg-ivory/5 px-3 py-1 text-xs text-ivory/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
