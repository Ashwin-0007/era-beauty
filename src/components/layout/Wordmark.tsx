interface WordmarkProps {
  className?: string
  size?: 'sm' | 'lg'
}

/** Typographic placeholder wordmark — swap for the official logo when supplied. */
export function Wordmark({ className = '', size = 'sm' }: WordmarkProps) {
  const large = size === 'lg'
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span className={`font-display font-normal tracking-[0.42em] ${large ? 'text-5xl pl-[0.42em]' : 'text-2xl pl-[0.42em] sm:text-[1.7rem]'}`}>
        ERA
      </span>
      <span className={`font-sans font-normal uppercase tracking-[0.5em] ${large ? 'mt-3 text-xs pl-[0.5em]' : 'mt-1 text-[0.5rem] pl-[0.5em]'}`}>
        Beauty
      </span>
    </span>
  )
}
