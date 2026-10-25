export type Variant = 'primary' | 'outline' | 'light' | 'ghost' | 'rose'
export type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-ivory hover:bg-oxblood hover:shadow-[0_12px_28px_-6px_rgba(183,110,121,0.45)]',
  outline: 'border border-ink/20 text-ink bg-transparent hover:border-oxblood hover:bg-oxblood hover:text-ivory hover:shadow-[0_12px_28px_-6px_rgba(183,110,121,0.35)]',
  light: 'bg-cream text-ink font-medium border border-sand/50 shadow-luxe hover:bg-oxblood hover:border-oxblood hover:text-ivory hover:shadow-[0_12px_28px_-6px_rgba(183,110,121,0.45)]',
  ghost: 'border border-ivory/35 text-ivory backdrop-blur-sm hover:border-oxblood hover:bg-oxblood hover:text-ivory',
  rose: 'bg-oxblood text-ivory hover:bg-ink hover:shadow-[0_12px_28px_-6px_rgba(51,38,42,0.4)]',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[0.66rem]',
  md: 'h-11 px-6 text-[0.7rem]',
  lg: 'h-14 px-8 text-[0.72rem]',
}
export const buttonClass = (variant: Variant = 'primary', size: Size = 'md', extra = '') =>
  `group relative inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full font-sans font-normal uppercase tracking-[0.22em] transition-all duration-500 ease-[var(--ease-luxe)] ${variants[variant]} ${sizes[size]} ${extra}`

