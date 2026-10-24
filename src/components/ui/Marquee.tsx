interface MarqueeProps {
  items: string[]
  className?: string
}

/** Endless, CSS-only ticker (paused on hover, static under reduced motion). */
export function Marquee({ items, className = '' }: MarqueeProps) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="display px-6 text-2xl italic sm:px-10 sm:text-3xl">{item}</span>
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-current opacity-40" />
        </li>
      ))}
    </ul>
  )

  return (
    <div className={`group flex overflow-hidden ${className}`}>
      <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
