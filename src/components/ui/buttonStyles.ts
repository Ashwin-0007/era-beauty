export type Variant = 'primary' | 'outline' | 'light' | 'ghost'
export type Size = 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-ivory hover:bg-oxblood',
  outline: 'border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-ivory',
  light: 'bg-ivory text-ink hover:bg-champagne',
  ghost: 'border border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory hover:text-ink',
}

const sizes: Record<Size, string> = {
  md: 'h-11 px-6 text-[0.7rem]',
  lg: 'h-14 px-8 text-[0.72rem]',
}
export const buttonClass = (variant: Variant = 'primary', size: Size = 'md', extra = '') =>
  `group relative inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full font-sans font-normal uppercase tracking-[0.22em] transition-colors duration-500 ease-[var(--ease-luxe)] ${variants[variant]} ${sizes[size]} ${extra}`

