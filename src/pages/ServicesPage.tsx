import { ArrowDown, ArrowRight } from 'lucide-react'
import { BenefitIcons } from '../components/sections/BenefitIcons'
import { CategoryTiles } from '../components/sections/CategoryTiles'
import { ButtonLink } from '../components/ui/ButtonLink'
import { PageHero } from '../components/ui/PageHero'
import { Photo } from '../components/ui/Photo'
import { Reveal } from '../components/ui/Reveal'
import { SectionTitle } from '../components/ui/SectionTitle'
import { activeCategories, categoryPath } from '../data/catalog'
import { images } from '../data/images'
import { usePageMeta } from '../hooks/usePageMeta'

export function ServicesPage() {
  usePageMeta('Nos prestations', 'Épilation laser diode, beauté du regard, soins visage & Head Spa, blanchiment dentaire et cabine UV : découvrez l’expertise ERA Beauty.')

  return (
    <>
      <PageHero
        eyebrow="Nos prestations"
        title={
          <>
            L’expertise <br />
            ERA Beauty
          </>
        }
        subtitle="Des soins d’exception pour révéler votre beauté, avec une approche sur-mesure."
        image={images.instituteRoom}
        breadcrumb={[{ label: 'Accueil', to: '/' }, { label: 'Nos prestations' }]}
        aside={
          <>
            <p className="title-caps text-lg leading-tight">Une expertise globale pour prendre soin de vous</p>
            <p className="mt-2 text-xs leading-relaxed text-ivory/85">
              Chez ERA Beauty, chaque prestation est pensée pour sublimer votre beauté naturelle grâce à des technologies performantes et des protocoles
              sur-mesure.
            </p>
          </>
        }
      >
        <ButtonLink to="#liste" icon={<ArrowDown size={13} />}>
          Découvrir nos prestations
        </ButtonLink>
      </PageHero>

      <div className="container-x pt-10">
        <CategoryTiles
          tiles={activeCategories.map((category, index) => ({
            key: category.slug,
            label: category.shortName,
            image: category.image,
            to: `#${category.slug}`,
            badge: index === 0 ? 'N°1' : undefined,
          }))}
        />
      </div>

      <div id="liste" data-anchor className="container-x divide-y divide-ink/10 py-12 lg:py-16">
        {activeCategories.map((category, index) => (
          <section key={category.slug} id={category.slug} className="grid items-center gap-8 py-10 first:pt-0 md:grid-cols-12 lg:gap-12">
            <Reveal className="md:col-span-5">
              <Photo src={category.image} alt={category.name} className="aspect-[16/10] rounded-xl md:aspect-[4/3] md:rounded-none" curtainClassName="bg-ivory">
                <div aria-hidden className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-r from-transparent to-ivory max-md:hidden" />
              </Photo>
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-7">
              <SectionTitle number={String(index + 1).padStart(2, '0')} eyebrow={category.overviewEyebrow} title={category.overviewTitle} subtitle={category.tagline} />
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/70">{category.description}</p>
              <BenefitIcons items={category.overviewBenefits} className="mt-6 max-w-xl" />
              <ButtonLink to={categoryPath(category.slug)} size="sm" className="mt-7" icon={<ArrowRight size={13} />}>
                {category.discoverLabel}
              </ButtonLink>
            </Reveal>
          </section>
        ))}
      </div>
    </>
  )
}
