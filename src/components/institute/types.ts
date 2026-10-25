import type { ButtonSize, ButtonVariant } from '../../types/ui'

export type SpaceCategory = 'all' | 'care' | 'wellness' | 'reception'

export interface SpaceCategoryOption {
  id: SpaceCategory
  label: string
}

export interface InstituteSpace {
  id: string
  name: string
  category: Exclude<SpaceCategory, 'all'>
  categoryLabel: string
  tagline: string
  description: string
  image: string
  highlights: string[]
}

export interface InstituteShowcaseVideo {
  url: string
  poster?: string
  title?: string
  eyebrow?: string
  badge?: string
}

export interface DiscoverWorldButtonProps {
  className?: string
  size?: ButtonSize
  variant?: ButtonVariant
  label?: string
}

export interface SpacesGalleryProps {
  spaces?: InstituteSpace[]
}

export interface SpaceLightboxModalProps {
  space: InstituteSpace | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export interface TheSpaceSectionProps {
  id?: string
  className?: string
}
