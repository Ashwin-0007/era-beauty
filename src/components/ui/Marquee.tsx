interface MarqueeProps {
  items: string[]
  className?: string
}

// Bandeau défilant en continu ; se met en pause au survol.
export function Marquee({ items, className = '' }: MarqueeProps) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="title-caps px-6 text-xl whitespace-nowrap sm:px-10 sm:text-2xl">{item}</span>
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-current opacity-50" />
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
