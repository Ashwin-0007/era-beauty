interface LogoMarkProps {
  className?: string
  accentClassName?: string
}

export function LogoMark({ className = '', accentClassName = 'text-oxblood' }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 32 44" fill="none" aria-hidden className={className}>
      <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 43.4V16a12.5 12.5 0 0 1 25 0v27.4" />
        <path d="M1 43.4h30" />
        <path d="M11.5 19.5v18" />
        <path d="M11.5 19.5h9.5v2" />
        <path d="M11.5 28.5h6.5" />
        <path d="M11.5 37.5h10v-2" />
      </g>
      <path
        className={accentClassName}
        fill="currentColor"
        d="M23 6.6c.35 1.95 1.05 2.65 3 3-1.95.35-2.65 1.05-3 3-.35-1.95-1.05-2.65-3-3 1.95-.35 2.65-1.05 3-3Z"
      />
    </svg>
  )
}
