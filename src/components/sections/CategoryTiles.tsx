import { Link } from 'react-router-dom'

export interface Tile {
  key: string
  label: string
  image: string
  to: string
  badge?: string
}

interface CategoryTilesProps {
  tiles: Tile[]
  activeKey?: string
  className?: string
}

// Rangée de vignettes photo menant vers une catégorie (pages Prestations et Tarifs).
export function CategoryTiles({ tiles, activeKey, className = '' }: CategoryTilesProps) {
  return (
    <ul
      className={`-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:overflow-visible sm:px-0 ${className}`}
      style={{ gridTemplateColumns: `repeat(${tiles.length}, minmax(0, 1fr))` }}
    >
      {tiles.map((tile) => {
        const active = tile.key === activeKey
        return (
          <li key={tile.key} className="w-36 shrink-0 snap-start sm:w-auto">
            <Link to={tile.to} className="group block">
              <div className={`relative aspect-[4/3] overflow-hidden rounded-lg ${active ? 'ring-2 ring-oxblood ring-offset-2 ring-offset-ivory' : ''}`}>
                <img src={tile.image} alt="" loading="lazy" className="photo-warm h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                {active && <div aria-hidden className="absolute inset-0 bg-oxblood/35" />}
              </div>
              <p className={`mt-2.5 text-[0.62rem] leading-snug tracking-[0.16em] uppercase transition-colors group-hover:text-oxblood ${active ? 'text-oxblood' : 'text-ink/80'}`}>
                {tile.label}
                {tile.badge && <span className="ml-1 text-oxblood">{tile.badge}</span>}
              </p>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
