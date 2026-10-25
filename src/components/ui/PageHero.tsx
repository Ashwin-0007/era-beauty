import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { srcSet } from '../../data/images'
import { useLiteMotion } from '../../hooks/useLiteMotion'
import { luxeEase } from '../../lib/motion'
import { Breadcrumb, type Crumb } from './Breadcrumb'
import { MediaCycle } from './MediaCycle'

interface PageHeroProps {
  eyebrow: string
  title: ReactNode
  subtitle?: string
  text?: string
  image: string
  imageAlt?: string
  // Plusieurs photos : elles s'alternent en fondu enchaîné.
  gallery?: string[]
  aside?: ReactNode
  breadcrumb?: Crumb[]
  children?: ReactNode
}

// Bannière des pages intérieures : texte à gauche sur fond clair, image immersive à droite.
export function PageHero({ eyebrow, title, subtitle, text, image, imageAlt = '', gallery, aside, breadcrumb, children }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null)
  const lite = useLiteMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', lite ? '0%' : '12%'])

  return (
    <section ref={ref} className="relative overflow-hidden bg-ivory pt-[4.5rem]">
      <div className="relative grid min-h-[30rem] lg:min-h-[34rem] lg:grid-cols-12">
        <div className="relative order-2 flex flex-col justify-center px-5 py-12 sm:px-8 lg:order-1 lg:col-span-5 lg:py-16 lg:pr-4 lg:pl-[max(3rem,calc((100vw-1360px)/2+3rem))]">
          {breadcrumb && <Breadcrumb items={breadcrumb} className="mb-8 hidden lg:flex" />}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: luxeEase }}>
            <p className="eyebrow text-mocha">{eyebrow}</p>
            <h1 className="title-caps mt-4 text-[2.6rem] text-ink sm:text-5xl xl:text-[3.6rem]">{title}</h1>
            {subtitle && <p className="eyebrow mt-4 max-w-sm leading-relaxed tracking-[0.18em] text-ink/80">{subtitle}</p>}
            {text && <p className="mt-5 max-w-md leading-relaxed text-ink/70">{text}</p>}
            {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
          </motion.div>
        </div>
        <div className="relative order-1 min-h-[17rem] lg:order-2 lg:col-span-7">
          <motion.div style={{ y: imageY }} className="absolute inset-x-0 -top-[6%] h-[112%]">
            {gallery && gallery.length > 1 ? (
              <MediaCycle items={gallery.map((src) => ({ type: 'image' as const, src }))} />
            ) : (
              <motion.img
                src={image}
                srcSet={srcSet(image)}
                sizes="(min-width: 1024px) 60vw, 100vw"
                alt={imageAlt}
                initial={{ scale: 1.08, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.6, ease: luxeEase }}
                className="photo-warm absolute inset-0 h-full w-full object-cover"
              />
            )}
          </motion.div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/10 to-transparent max-lg:hidden" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent lg:hidden" />
          {aside && <div className="absolute right-6 bottom-6 max-w-[17rem] rounded-xl bg-espresso/60 p-4 text-right text-ivory backdrop-blur-sm max-lg:hidden">{aside}</div>}
        </div>
      </div>
    </section>
  )
}
