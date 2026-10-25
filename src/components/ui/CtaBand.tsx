import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface CtaBandProps {
  image: string
  title: string
  text: string
  action: ReactNode
}

// Bandeau d'appel à l'action en bas de page : image à gauche, message à droite.
export function CtaBand({ image, title, text, action }: CtaBandProps) {
  return (
    <section className="container-x py-16 lg:py-20">
      <Reveal className="relative overflow-hidden rounded-[28px] bg-cream">
        <div className="grid items-center md:grid-cols-2">
          <div className="relative h-56 md:h-full md:min-h-[15rem]">
            <img src={image} alt="" loading="lazy" className="photo-warm absolute inset-0 h-full w-full object-cover" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-transparent to-cream max-md:hidden" />
          </div>
          <div className="px-7 py-10 md:px-12">
            <h2 className="title-caps text-2xl text-ink sm:text-[1.9rem]">{title}</h2>
            <p className="mt-4 max-w-md leading-relaxed text-ink/70">{text}</p>
            <div className="mt-7">{action}</div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
