import { MediaLightbox } from '../ui/MediaLightbox'
import type { SpaceLightboxModalProps } from './types'

export function SpaceLightboxModal({ space, onClose, onPrev, onNext }: SpaceLightboxModalProps) {
  const item = space
    ? {
        id: space.id,
        image: space.image,
        title: space.name,
        eyebrow: space.categoryLabel,
        tagline: space.tagline,
        description: space.description,
        tags: space.highlights,
      }
    : null

  return (
    <MediaLightbox
      item={item}
      onClose={onClose}
      onPrev={onPrev}
      onNext={onNext}
    />
  )
}
