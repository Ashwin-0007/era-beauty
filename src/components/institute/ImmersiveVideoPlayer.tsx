import { instituteShowcaseVideo } from '../../data/spaces'
import {
  ImmersiveVideoPlayer as BaseVideoPlayer,
  type ImmersiveVideoPlayerProps,
} from '../ui/ImmersiveVideoPlayer'

export function ImmersiveVideoPlayer({
  videoUrl = instituteShowcaseVideo.url,
  posterUrl = instituteShowcaseVideo.poster,
  title = instituteShowcaseVideo.title,
  eyebrow = instituteShowcaseVideo.eyebrow,
  badgeText = instituteShowcaseVideo.badge,
  className = '',
  ...rest
}: Partial<ImmersiveVideoPlayerProps>) {
  return (
    <BaseVideoPlayer
      videoUrl={videoUrl}
      posterUrl={posterUrl}
      title={title}
      eyebrow={eyebrow}
      badgeText={badgeText}
      className={className}
      {...rest}
    />
  )
}
