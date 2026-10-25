import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '../components/ui/ButtonLink'
import { images } from '../data/images'
import { usePageMeta } from '../hooks/usePageMeta'

export function NotFoundPage() {
  usePageMeta('Page introuvable')

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-cream px-6 pt-20 text-center">
      <img src={images.instituteLounge} alt="" className="photo-warm absolute inset-0 h-full w-full object-cover opacity-15" />
      <div className="relative">
        <p className="font-display text-[7rem] leading-none font-light text-oxblood sm:text-[9rem]">404</p>
        <h1 className="title-caps mt-2 text-3xl text-ink">Oups !</h1>
        <p className="mx-auto mt-4 max-w-sm leading-relaxed text-ink/70">La page que vous recherchez n’existe pas ou a été déplacée.</p>
        <ButtonLink to="/" className="mt-8" icon={<ArrowRight size={13} />}>
          Retour à l’accueil
        </ButtonLink>
      </div>
    </section>
  )
}
