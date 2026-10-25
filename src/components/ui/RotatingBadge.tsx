import { Sparkle } from 'lucide-react'

interface RotatingBadgeProps {
  text: string
  className?: string
}

// Badge circulaire au texte tournant (accueil, FAQ).
export function RotatingBadge({ text, className = '' }: RotatingBadgeProps) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 120 120" aria-hidden className="h-full w-full animate-[spin_26s_linear_infinite]">
        <defs>
          <path id={`badge-${text.length}`} d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text className="fill-current font-display text-[11.5px] uppercase">
          <textPath href={`#badge-${text.length}`} textLength="286" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <Sparkle aria-hidden size={18} strokeWidth={1.2} className="absolute inset-0 m-auto" />
    </div>
  )
}
