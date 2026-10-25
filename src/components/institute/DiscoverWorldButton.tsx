import { Compass } from 'lucide-react'
import { SmoothScrollButton } from '../ui/SmoothScrollButton'
import type { DiscoverWorldButtonProps } from './types'

export function DiscoverWorldButton({
  className = '',
  size = 'md',
  variant = 'outline',
  label = 'Découvrir notre univers',
}: DiscoverWorldButtonProps) {
  return (
    <SmoothScrollButton
      targetId="lieu"
      targetPath="/institut"
      variant={variant}
      size={size}
      icon={<Compass size={14} className="transition-transform duration-500 group-hover:rotate-45" />}
      className={className}
    >
      {label}
    </SmoothScrollButton>
  )
}
