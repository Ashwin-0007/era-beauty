import { AnimatePresence, motion } from 'motion/react'
import { AlertCircle, ArrowDown, ArrowRight, Clock, Play, Sparkles, Tag } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { BeforeAfterSlider } from '../components/sections/BeforeAfterSlider'
import { BenefitIcons } from '../components/sections/BenefitIcons'
import { TestimonialCards } from '../components/sections/TestimonialCards'
import { AccordionItem } from '../components/ui/Accordion'
import { BookButton } from '../components/ui/BookButton'
import { ButtonLink } from '../components/ui/ButtonLink'
import { CtaBand } from '../components/ui/CtaBand'
import { PageHero } from '../components/ui/PageHero'
import { Photo } from '../components/ui/Photo'
import { Reveal } from '../components/ui/Reveal'
import { SectionTitle } from '../components/ui/SectionTitle'
import { findCategory, type Category, type Treatment } from '../data/catalog'
import { faqForCategory } from '../data/faq'
import { usePageMeta } from '../hooks/usePageMeta'
import { luxeEase } from '../lib/motion'
import { NotFoundPage } from './NotFoundPage'

const PACKS = 'packs'

function TreatmentRow({ treatment, category }: { treatment: Treatment; category: Category }) {
  const meta = [
    { icon: Clock, label: 'Durée', value: treatment.duration },
    { icon: Sparkles, label: category.resultLabel, value: treatment.result },
    { icon: Tag, label: 'Tarif', value: treatment.price },
  ]
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: luxeEase }}
      id={treatment.id}
      className="grid gap-6 border-b border-ink/10 py-8 md:grid-cols-12 lg:gap-8"
    >
      <Photo src={treatment.image} alt={treatment.name} className="aspect-[4/3] rounded-xl md:col-span-4" curtainClassName="bg-ivory">
        {treatment.videoUrl && (
          <a
            href={treatment.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Voir la vidéo : ${treatment.name}`}
            className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-full bg-ivory/90 text-oxblood shadow-luxe"
          >
            <Play size={16} fill="currentColor" />
          </a>
        )}
      </Photo>
      <div className="md:col-span-5">
        <h3 className="title-caps text-2xl text-ink">{treatment.name}</h3>
        <p className="eyebrow mt-2 text-[0.6rem] leading-relaxed tracking-[0.16em] text-mocha">{treatment.subtitle}</p>
        <p className="mt-4 text-sm leading-relaxed text-ink/70">{treatment.description}</p>
        <dl className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
          {meta.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-2.5">
              <Icon aria-hidden size={17} strokeWidth={1.3} className="text-oxblood" />
              <div>
                <dt className="text-[0.56rem] tracking-[0.18em] text-ink/50 uppercase">{label}</dt>
                <dd className="text-sm text-ink">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
        <BookButton treatmentId={treatment.id} label="Réserver ce soin" size="sm" className="mt-6" />
      </div>
      <div className="grid grid-cols-2 gap-2 md:col-span-3">
        <BeforeAfterSlider
          before={treatment.before ?? treatment.gallery[0]}
          after={treatment.after ?? treatment.gallery[0]}
          label={treatment.name}
          aspect="aspect-[2/1]"
          compact
          className="col-span-2"
        />
        {treatment.gallery.slice(1, 3).map((src) => (
          <img key={src} src={src} alt="" loading="lazy" className="photo-warm aspect-square w-full rounded-lg object-cover" />
        ))}
      </div>
    </motion.article>
  )
}

export function ServiceDetailPage() {
  const { slug } = useParams()
  return <CategoryDetail key={slug} slug={slug} />
}

function CategoryDetail({ slug }: { slug?: string }) {
  const category = findCategory(slug)
  const [tab, setTab] = useState('all')
  const [openFaq, setOpenFaq] = useState(0)
  usePageMeta(category?.name ?? 'Page introuvable', category?.heroDescription)

  if (!category) return <NotFoundPage />
  const faq = faqForCategory(category.slug)
  const tabs = [
    { id: 'all', label: 'Tous' },
    ...category.treatments.map((treatment) => ({ id: treatment.id, label: treatment.name })),
    ...(category.packs ? [{ id: PACKS, label: 'Packs' }] : []),
  ]
  const visible = tab === 'all' ? category.treatments : category.treatments.filter((treatment) => treatment.id === tab)
  const showPacks = category.packs && (tab === 'all' || tab === PACKS)

  return (
    <>
      <PageHero
        eyebrow="Nos prestations"
        title={category.name}
        subtitle={category.tagline}
        text={category.heroDescription}
        image={category.heroImage}
        imageAlt={category.name}
        gallery={[category.heroImage, ...category.treatments.slice(0, 2).map((treatment) => treatment.image)]}
        breadcrumb={[{ label: 'Accueil', to: '/' }, { label: 'Nos prestations', to: '/prestations' }, { label: category.name }]}
        aside={
          category.videoUrl && (
            <a href={category.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-left">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory/90 text-oxblood">
                <Play size={16} fill="currentColor" />
              </span>
              <span className="text-[0.62rem] tracking-[0.2em] uppercase">
                Découvrir notre univers <br />
                en vidéo
              </span>
            </a>
          )
        }
      >
        <ButtonLink to="#soins" size="sm" icon={<ArrowDown size={13} />}>
          Nos prestations
        </ButtonLink>
      </PageHero>

      <div className="border-b border-ink/10 bg-cream/50">
        <BenefitIcons items={category.benefits} size="md" className="container-x py-8" />
      </div>

      <section id="soins" data-anchor className="container-x py-14 lg:py-20">
        <SectionTitle title="Nos prestations" />
        <div role="tablist" aria-label="Filtrer les prestations" className="mt-6 flex gap-2 overflow-x-auto border-b border-ink/10 pb-3">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              onClick={() => setTab(item.id)}
              className={`shrink-0 rounded-md px-4 py-2 text-[0.6rem] tracking-[0.16em] uppercase transition-colors ${
                tab === item.id ? 'bg-oxblood text-ivory' : 'text-ink/70 hover:bg-cream hover:text-oxblood'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {visible.map((treatment) => (
            <TreatmentRow key={treatment.id} treatment={treatment} category={category} />
          ))}
        </AnimatePresence>

        {showPacks && category.packs && (
          <Reveal className="mt-10 grid gap-6 rounded-2xl bg-cream/70 p-7 md:grid-cols-12 md:p-9">
            <div className="md:col-span-5">
              <h3 className="title-caps text-2xl text-ink">Packs {category.shortName.toLowerCase()}</h3>
              <p className="eyebrow mt-2 text-[0.6rem] tracking-[0.16em] text-mocha">Des combinaisons pour un résultat complet</p>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">{category.packs.intro}</p>
            </div>
            <ul className="divide-y divide-ink/10 md:col-span-7">
              {category.packs.items.map((pack) => (
                <li key={pack.name} className="flex items-center justify-between gap-4 py-3.5">
                  <span>
                    <span className="block text-sm text-ink">{pack.name}</span>
                    <span className="text-xs text-ink/50">{pack.detail}</span>
                  </span>
                  <span className="font-display text-xl whitespace-nowrap text-oxblood">{pack.price}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </section>

      <section className="bg-cream/50 py-14 lg:py-20">
        <div className="container-x">
          <SectionTitle eyebrow="Déroulement" title="Votre séance, étape par étape" />
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {category.steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl bg-ivory p-6">
                <span className="font-display text-3xl text-oxblood">{String(index + 1).padStart(2, '0')}</span>
                <p className="title-caps mt-3 text-lg text-ink">{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-x grid gap-10 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <SectionTitle eyebrow="À savoir" title="Précautions" as="h2" />
          <ul className="mt-6 space-y-3">
            {category.precautions.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/75">
                <AlertCircle aria-hidden size={16} className="mt-0.5 shrink-0 text-oxblood" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionTitle eyebrow="Après votre soin" title="Conseils d’entretien" as="h2" />
          <ul className="mt-6 space-y-3">
            {category.aftercare.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/75">
                <Sparkles aria-hidden size={16} className="mt-0.5 shrink-0 text-oxblood" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {faq && (
        <section className="container-x pb-14 lg:pb-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionTitle eyebrow="FAQ" title={`Questions fréquentes`} subtitle={category.shortName} />
              <ButtonLink to={`/faq#${faq.id}`} variant="outline" size="sm" className="mt-6" icon={<ArrowRight size={13} />}>
                Toute la FAQ
              </ButtonLink>
            </div>
            <div className="lg:col-span-8">
              {faq.items.map((item, index) => (
                <AccordionItem key={item.question} title={item.question} open={openFaq === index} onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}>
                  <p className="text-sm leading-relaxed text-ink/70">{item.answer}</p>
                </AccordionItem>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-cream/50 py-14 lg:py-20">
        <div className="container-x">
          <SectionTitle eyebrow="Témoignages" title="Elles nous font confiance" className="mb-10" />
          <TestimonialCards />
        </div>
      </section>

      <CtaBand
        image={category.image}
        title="Envie de vous faire plaisir ?"
        text={`Réservez dès maintenant votre prestation ${category.shortName.toLowerCase()} et laissez-vous guider par nos expertes.`}
        action={<BookButton />}
      />
    </>
  )
}
