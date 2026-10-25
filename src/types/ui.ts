import type { ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'outline' | 'light' | 'ghost' | 'rose'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface BaseButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  className?: string
  children: ReactNode
}

export interface SmoothScrollProps {
  targetId: string
  targetPath?: string
}

export interface FilterTabItem<T extends string = string> {
  id: T
  label: string
  count?: number
}

export interface MediaLightboxItem {
  id?: string
  image: string
  title: string
  eyebrow?: string
  tagline?: string
  description?: string
  tags?: readonly string[] | string[]
}

export interface VideoPlayerConfig {
  videoUrl: string
  posterUrl?: string
  title?: string
  eyebrow?: string
  badgeText?: string
  aspectRatio?: string
  className?: string
  autoPlay?: boolean
  loop?: boolean
}
