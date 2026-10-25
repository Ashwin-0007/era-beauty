import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { instituteSpaces, spaceCategories } from '../../data/spaces'
import { luxeEase } from '../../lib/motion'
import { FilterTabs } from '../ui/FilterTabs'
import { SpaceLightboxModal } from './SpaceLightboxModal'
import type { InstituteSpace, SpaceCategory, SpacesGalleryProps } from './types'

export function SpacesGallery({ spaces = instituteSpaces }: SpacesGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<SpaceCategory>('all')
  const [selectedSpaceIndex, setSelectedSpaceIndex] = useState<number | null>(null)

  const filteredSpaces =
    activeCategory === 'all'
      ? spaces
      : spaces.filter((space) => space.category === activeCategory)

  const openLightbox = (space: InstituteSpace) => {
    const index = spaces.findIndex((s) => s.id === space.id)
    if (index !== -1) setSelectedSpaceIndex(index)
  }

  const handleNext = () => {
    if (selectedSpaceIndex === null) return
    setSelectedSpaceIndex((selectedSpaceIndex + 1) % spaces.length)
  }

  const handlePrev = () => {
    if (selectedSpaceIndex === null) return
    setSelectedSpaceIndex((selectedSpaceIndex - 1 + spaces.length) % spaces.length)
  }

  return (
    <div className="mt-12 lg:mt-16">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-6">
        <div>
          <p className="eyebrow text-mocha">Visite guidée</p>
          <h3 className="display mt-1 text-2xl text-ink sm:text-3xl">Galerie des différents espaces</h3>
        </div>

        <FilterTabs<SpaceCategory>
          tabs={spaceCategories}
          activeTab={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredSpaces.map((space, index) => (
            <motion.div
              layout
              key={space.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, delay: index * 0.05, ease: luxeEase }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-ivory shadow-sm transition-all duration-500 hover:border-sand hover:shadow-luxe"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream">
                <img
                  src={space.image}
                  alt={space.name}
                  loading="lazy"
                  className="photo-warm h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                <span className="absolute top-3 left-3 rounded-full border border-ivory/30 bg-ink/70 px-3 py-1 text-[0.62rem] font-medium tracking-wider text-ivory uppercase backdrop-blur-md">
                  {space.categoryLabel}
                </span>

                <button
                  type="button"
                  onClick={() => openLightbox(space)}
                  aria-label={`Agrandir la photo de ${space.name}`}
                  className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/30 bg-ink/75 text-ivory opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 hover:scale-110 hover:border-champagne hover:text-champagne"
                >
                  <ArrowUpRight size={16} />
                </button>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <p className="eyebrow text-[0.65rem] text-mocha">{space.tagline}</p>
                  <h4 className="display mt-1.5 text-xl text-ink transition-colors group-hover:text-oxblood">
                    {space.name}
                  </h4>
                  <p className="mt-2.5 text-xs leading-relaxed text-ink/70 line-clamp-3">
                    {space.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-ink/8 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[0.68rem] text-ink/60">
                    <Sparkles size={12} className="text-champagne" />
                    {space.highlights[0]}
                  </span>

                  <button
                    type="button"
                    onClick={() => openLightbox(space)}
                    className="text-[0.68rem] font-medium tracking-wider text-oxblood uppercase hover:underline"
                  >
                    Détails
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <SpaceLightboxModal
        space={selectedSpaceIndex !== null ? spaces[selectedSpaceIndex] : null}
        onClose={() => setSelectedSpaceIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  )
}
