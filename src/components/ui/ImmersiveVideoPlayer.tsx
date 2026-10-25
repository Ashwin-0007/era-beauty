import { useInView, useReducedMotion } from 'motion/react'
import { Maximize2, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { VideoPlayerConfig } from '../../types/ui'

export type ImmersiveVideoPlayerProps = VideoPlayerConfig

export function ImmersiveVideoPlayer({
  videoUrl,
  posterUrl,
  title,
  eyebrow = 'Expérience visuelle',
  badgeText = 'Immersion vidéo',
  aspectRatio = 'aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9]',
  className = '',
  autoPlay = true,
  loop = true,
}: ImmersiveVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()
  const inView = useInView(containerRef, { amount: 0.25 })

  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (inView && isPlaying) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [inView, isPlaying])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play().catch(() => {})
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const toggleFullscreen = () => {
    const container = containerRef.current
    if (!container) return

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      className={`group relative overflow-hidden rounded-3xl border border-ink/10 bg-espresso shadow-luxe-lg ${className}`}
    >
      <div className={`relative w-full ${aspectRatio}`}>
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl}
          autoPlay={autoPlay && !reduce}
          muted={isMuted}
          loop={loop}
          playsInline
          className="h-full w-full object-cover"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/40 transition-opacity duration-500"
        />

        {badgeText && (
          <div className="absolute top-4 left-4 z-10 sm:top-6 sm:left-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-ivory/20 bg-ink/70 px-4 py-1.5 text-[0.62rem] font-medium tracking-[0.25em] text-ivory uppercase backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-champagne animate-pulse" />
              {badgeText}
            </span>
          </div>
        )}

        <div className="absolute bottom-4 left-4 z-10 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-md">
            {eyebrow && <p className="eyebrow text-champagne/90">{eyebrow}</p>}
            {title && (
              <h3 className="display mt-1 text-2xl text-ivory sm:text-3xl lg:text-4xl">
                {title}
              </h3>
            )}
          </div>

          <div
            className={`flex items-center gap-2 transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-90 sm:opacity-0 group-hover:opacity-100'
            }`}
          >
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Mettre en pause' : 'Lire la vidéo'}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 bg-ink/80 text-ivory shadow-md backdrop-blur-md transition-all hover:scale-105 hover:border-champagne hover:text-champagne active:scale-95"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="translate-x-0.5" />}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 bg-ink/80 text-ivory shadow-md backdrop-blur-md transition-all hover:scale-105 hover:border-champagne hover:text-champagne active:scale-95"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label="Plein écran"
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-ivory/25 bg-ink/80 text-ivory shadow-md backdrop-blur-md transition-all hover:scale-105 hover:border-champagne hover:text-champagne active:scale-95 sm:flex"
            >
              <Maximize2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
