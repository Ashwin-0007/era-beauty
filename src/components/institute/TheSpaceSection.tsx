import { ArrowRight, MapPin } from 'lucide-react'
import { contact } from '../../data/site'
import { ButtonLink } from '../ui/ButtonLink'
import { Reveal } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'
import { ImmersiveVideoPlayer } from './ImmersiveVideoPlayer'
import { SpacesGallery } from './SpacesGallery'
import type { TheSpaceSectionProps } from './types'

export function TheSpaceSection({ id = 'lieu', className = '' }: TheSpaceSectionProps) {
  return (
    <section
      id={id}
      data-anchor
      className={`scroll-mt-24 bg-cream/45 py-16 sm:py-20 lg:scroll-mt-28 lg:py-28 ${className}`}
    >
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <SectionTitle
              number="04"
              eyebrow="Le lieu · The Space"
              title="Un cadre élégant, conçu comme un sanctuaire"
            />
            <p className="mt-6 text-base leading-relaxed text-ink/75 sm:text-lg">
              Lumières douces, matières naturelles et suites privatives : notre institut a été pensé
              comme une parenthèse de calme absolu au cœur de Saint-Cloud, alliant sérénité sensorielle et
              technologies esthétiques de pointe.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-ink/70">
              <MapPin size={15} className="text-oxblood shrink-0" />
              <span>
                {contact.street}, {contact.city}
              </span>
            </div>
            <ButtonLink
              to="/contact#localisation"
              variant="outline"
              size="sm"
              icon={<ArrowRight size={13} />}
            >
              Nous rendre visite
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-12 lg:mt-16">
          <ImmersiveVideoPlayer
            title="Bienvenue chez ERA Beauty Saint-Cloud"
          />
        </Reveal>

        <SpacesGallery />
      </div>
    </section>
  )
}
