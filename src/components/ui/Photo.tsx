import { motion, type MotionValue } from 'motion/react'
import { useState, type ReactNode } from 'react'
import { luxeEase } from '../../lib/motion'

interface PhotoProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  reveal?: boolean
  parallaxY?: MotionValue<string>
  eager?: boolean
  curtainClassName?: string
  children?: ReactNode
}

export function Photo({
  src,
  alt,
  className = '',
  imgClassName = '',
  reveal = true,
  parallaxY,
  eager = false,
  curtainClassName = 'bg-cream',
  children,
}: PhotoProps) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-sand/60 ${className}`}>
      {failed ? (
        <div role="img" aria-label={alt} className="absolute inset-0 bg-gradient-to-br from-cream via-sand to-taupe/60">
          <span className="eyebrow absolute bottom-4 left-4 text-ink/50">ERA Beauty Atelier</span>
        </div>
      ) : (
        <motion.img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          style={parallaxY ? { y: parallaxY } : undefined}
          initial={reveal ? { scale: 1.18 } : false}
          whileInView={reveal ? { scale: 1 } : undefined}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1.8, ease: luxeEase }}
          className={`photo-warm absolute w-full object-cover ${parallaxY ? 'inset-x-0 -top-[10%] h-[120%]' : 'inset-0 h-full'} ${imgClassName}`}
        />
      )}
      {children}
      {reveal && (
        <motion.div
          aria-hidden
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1.2, ease: luxeEase }}
          className={`absolute inset-0 origin-top ${curtainClassName}`}
        />
      )}
    </div>
  )
}
