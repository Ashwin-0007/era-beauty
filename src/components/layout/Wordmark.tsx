import { LogoMark } from './LogoMark'

interface WordmarkProps {
  className?: string
  size?: 'sm' | 'lg'
  accentClassName?: string
}

export function Wordmark({ className = '', size = 'sm', accentClassName }: WordmarkProps) {
  const large = size === 'lg'
  return (
    <span className={`inline-flex items-center ${large ? 'gap-5' : 'gap-3'} ${className}`}>
      <LogoMark accentClassName={accentClassName} className={large ? 'h-20 w-auto' : 'h-9 w-auto sm:h-10'} />
      <span aria-hidden className={`w-px self-stretch bg-current opacity-25 ${large ? 'my-2' : 'my-1.5'}`} />
      <span className="inline-flex flex-col items-start leading-none">
        <span className={`font-display font-normal tracking-[0.42em] ${large ? 'text-5xl' : 'text-[1.4rem] sm:text-2xl'}`}>ERA</span>
        <span className={`font-sans font-normal uppercase tracking-[0.5em] ${large ? 'mt-3 text-xs' : 'mt-1.5 text-[0.5rem]'}`}>
          Beauty
        </span>
      </span>
    </span>
  )
}
