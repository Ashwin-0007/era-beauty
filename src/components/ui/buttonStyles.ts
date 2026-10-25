import type { ButtonSize, ButtonVariant } from '../../types/ui'

export type Variant = ButtonVariant
export type Size = ButtonSize
export type { ButtonSize, ButtonVariant }

const variants: Record<ButtonVariant, string> = {
  primary: 'shimmer-hover bg-oxblood text-ivory hover:bg-bordeaux-deep hover:shadow-[0_12px_28px_-8px_rgba(107,15,26,0.55)]',
  outline: 'border border-oxblood/60 text-oxblood bg-transparent hover:bg-oxblood hover:text-ivory',
  light: 'bg-ivory text-oxblood border border-ivory hover:bg-transparent hover:text-ivory',
  ghost: 'border border-ivory/50 text-ivory backdrop-blur-sm hover:bg-ivory hover:text-oxblood',
  rose: 'bg-oxblood text-ivory hover:bg-bordeaux-deep',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-5 text-[0.62rem]',
  md: 'h-11 px-7 text-[0.66rem]',
  lg: 'h-13 px-9 text-[0.7rem]',
}

export const buttonClass = (variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra = '') =>
  `group relative inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full font-sans font-normal uppercase tracking-[0.2em] transition-all duration-500 ease-[var(--ease-luxe)] ${variants[variant]} ${sizes[size]} ${extra}`
