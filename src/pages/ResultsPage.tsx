import { ArrowRight, ChevronLeft, ChevronRight, Play, Quote } from 'lucide-react'
import { useRef, useState } from 'react'
import { BeforeAfterSlider } from '../components/sections/BeforeAfterSlider'
import { TestimonialCards } from '../components/sections/TestimonialCards'
import { BookButton } from '../components/ui/BookButton'
import { ButtonLink } from '../components/ui/ButtonLink'
import { CtaBand } from '../components/ui/CtaBand'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { SectionTitle } from '../components/ui/SectionTitle'
import { categoryPath } from '../data/catalog'
import { images } from '../data/images'
import { featuredResults, otherResults, resultFilters, resultQuote, type ResultCase } from '../data/results'
import { usePageMeta } from '../hooks/usePageMeta'

function QuoteCard({ text, author }: { text: string; author: string }) {
  return (
    <figure className="rounded-2xl bg-cream/70 p-6">
      <Quote aria-hidden size={22} className="text-oxblood" />
      <blockquote className="mt-3 font-display text-xl leading-snug text-ink italic">{text}</blockquote>
      <figcaption className="mt-4 text-xs tracking-[0.14em] text-ink/55 uppercase">— {author}</figcaption>
    </figure>
  )
}

function VideoThumb({ video }: { video: NonNullable<ResultCase['video']> }) {
  const content = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
        <img src={video.image} alt="" loading="lazy" className="photo-warm h-full w-full object-cover" />
        {video.url && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory/90 text-oxblood shadow-luxe">
              <Play size={16} fill="currentColor" />
            </span>
          </span>
        )}
      </div>
      <p className="mt-2 text-[0.6rem] tracking-[0.18em] text-ink/70 uppercase">{video.url ? 'Résultat en vidéo' : 'En images'}</p>
      <p className="text-xs text-ink/55">{video.label}</p>
    </>
  )
  return video.url ? (
    <a href={video.url} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : (
    <div>{content}</div>
  )
}

function FeaturedResult({ result, index }: { result: ResultCase; index: number }) {
  const hasAside = Boolean(result.quote || result.video)
  const text = (
    <div className={hasAside ? 'lg:col-span-4' : 'lg:col-span-4 lg:order-2'}>
      <SectionTitle number={String(index + 1).padStart(2, '0')} title={result.title} as="h3" />
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/70">{result.description}</p>
      <ButtonLink to={categoryPath(result.categorySlug)} variant="outline" size="sm" className="mt-6" icon={<ArrowRight size={13} />}>
        Voir la prestation
      </ButtonLink>
    </div>
  )
  return (
    <Reveal className="grid items-center gap-8 border-b border-ink/10 py-12 lg:grid-cols-12">
      {text}
      <div className={hasAside ? 'lg:col-span-5' : 'lg:col-span-5 lg:order-3'}>
        <BeforeAfterSlider before={result.before} after={result.after} label={result.title} />
      </div>
      {hasAside ? (
        <div className="space-y-5 lg:col-span-3">
          {result.quote && <QuoteCard text={result.quote} author="Cliente ERA Beauty" />}
          {result.video && <VideoThumb video={result.video} />}
        </div>
      ) : (
        <img src={result.after} alt="" loading="lazy" className="photo-warm aspect-[4/3] w-full rounded-xl object-cover max-lg:hidden lg:order-1 lg:col-span-3" />
      )}
    </Reveal>
  )
}

function OtherResults({ items, number }: { items: ResultCase[]; number: string }) {
  const track = useRef<HTMLDivElement>(null)
  const scroll = (direction: number) => track.current?.scrollBy({ left: direction * track.current.clientWidth * 0.8, behavior: 'smooth' })
  return (
    <div className="py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <SectionTitle number={number} title="Autres résultats" />
          <p className="mt-3 text-sm text-ink/65">D’autres transformations réalisées dans notre institut.</p>
        </div>
        <div className="flex gap-2 lg:hidden">
          <button type="button" aria-label="Résultats précédents" onClick={() => scroll(-1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink hover:border-oxblood hover:text-oxblood">
            <ChevronLeft size={16} />
          </button>
          <button type="button" aria-label="Résultats suivants" onClick={() => scroll(1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink hover:border-oxblood hover:text-oxblood">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div ref={track} className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
        {items.map((result) => (
          <div key={result.id} className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-auto">
            {result.video ? (
              <VideoThumb video={{ ...result.video, label: result.title }} />
            ) : (
              <>
                <BeforeAfterSlider before={result.before} after={result.after} label={result.title} compact />
                <p className="mt-3 text-[0.6rem] tracking-[0.18em] text-ink/70 uppercase">{result.title}</p>
              </>
            )}
          </div>
        ))}
        <div className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-auto">
          <QuoteCard text={resultQuote.text} author={resultQuote.author} />
        </div>
      </div>
    </div>
  )
}

export function ResultsPage() {
  usePageMeta('Nos résultats', 'Avant / après, avis clients et témoignages : découvrez les résultats réalisés à l’institut ERA Beauty.')
  const [filter, setFilter] = useState<(typeof resultFilters)[number]>('Tous')
  const matches = (result: ResultCase) => filter === 'Tous' || result.filter === filter
  const featured = featuredResults.filter(matches)
  const others = otherResults.filter(matches).slice(0, 3)

  return (
    <>
      <PageHero
        eyebrow="Nos résultats"
        title={
          <>
            Le résultat, <br />
            dans chaque détail.
          </>
        }
        text="Découvrez les transformations réalisées dans notre institut. Des résultats naturels, élégants et adaptés à chaque beauté."
        image={images.eyeLashes}
        breadcrumb={[{ label: 'Accueil', to: '/' }, { label: 'Résultats' }]}
        aside={<p className="title-caps text-lg leading-tight">Des résultats naturels et harmonieux</p>}
      >
        <BookButton />
      </PageHero>

      <section id="avant-apres" data-anchor className="container-x py-12 lg:py-16">
        <div role="tablist" aria-label="Filtrer les résultats" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {resultFilters.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              onClick={() => setFilter(item)}
              className={`rounded-md py-3 text-[0.6rem] tracking-[0.18em] uppercase transition-colors ${
                filter === item ? 'bg-oxblood text-ivory' : 'bg-cream text-ink/70 hover:text-oxblood'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {featured.map((result, index) => (
          <FeaturedResult key={result.id} result={result} index={index} />
        ))}

        {others.length > 0 && <OtherResults items={others} number={String(featured.length + 1).padStart(2, '0')} />}
      </section>

      <section id="avis" data-anchor className="bg-cream/50 py-14 lg:py-20">
        <div className="container-x">
          <SectionTitle eyebrow="Avis clients" title="Elles nous font confiance" className="mb-10" />
          <TestimonialCards />
        </div>
      </section>

      <section id="temoignages" data-anchor className="container-x grid gap-8 py-14 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <SectionTitle eyebrow="Témoignages" title="Leurs mots, notre plus belle récompense" />
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:col-span-8">
          <QuoteCard text={resultQuote.text} author={resultQuote.author} />
          {featuredResults
            .filter((result) => result.quote)
            .map((result) => (
              <QuoteCard key={result.id} text={result.quote ?? ''} author="Cliente ERA Beauty" />
            ))}
        </div>
      </section>

      <CtaBand
        image={images.facialSkin}
        title="Envie de voir votre propre résultat ?"
        text="Prenez rendez-vous pour découvrir nos prestations et révéler votre beauté naturelle."
        action={<BookButton />}
      />
    </>
  )
}
