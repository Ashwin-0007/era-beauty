import { motion } from 'motion/react'
import { ArrowRight, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AccordionItem } from '../components/ui/Accordion'
import { Breadcrumb } from '../components/ui/Breadcrumb'
import { ButtonLink } from '../components/ui/ButtonLink'
import { RotatingBadge } from '../components/ui/RotatingBadge'
import { findCategory } from '../data/catalog'
import { faqCategories } from '../data/faq'
import { images } from '../data/images'
import { usePageMeta } from '../hooks/usePageMeta'
import { luxeEase } from '../lib/motion'

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

// Catégories visibles : celles qui ont des questions et dont la prestation est active.
const visibleCategories = faqCategories.filter((faq) => faq.items.length > 0 && (!faq.categorySlug || findCategory(faq.categorySlug)))

export function FaqPage() {
  usePageMeta('FAQ', 'Toutes les réponses à vos questions sur les prestations, les rendez-vous et le déroulement de votre expérience chez ERA Beauty.')
  const { hash } = useLocation()
  const activeTile = hash.slice(1) || visibleCategories[0]?.id
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(() => new Set(visibleCategories.map((faq) => `${faq.id}-0`)))
  const toggle = (key: string) =>
    setOpen((current) => {
      const next = new Set(current)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return visibleCategories
    return visibleCategories
      .map((faq) => ({ ...faq, items: faq.items.filter((item) => normalize(`${item.question} ${item.answer}`).includes(q)) }))
      .filter((faq) => faq.items.length > 0)
  }, [query])

  return (
    <>
      <section className="relative overflow-hidden bg-ivory pt-[4.5rem]">
        <div className="relative grid lg:grid-cols-12">
          <div className="relative order-2 px-5 py-12 sm:px-8 lg:order-1 lg:col-span-6 lg:py-16 lg:pl-[max(3rem,calc((100vw-1360px)/2+3rem))]">
            <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'FAQ' }]} className="mb-8 hidden lg:flex" />
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: luxeEase }}>
              <p className="eyebrow text-mocha">FAQ</p>
              <h1 className="title-caps mt-4 text-[2.5rem] text-ink sm:text-5xl xl:text-[3.4rem]">
                Une question ? <br />
                Nous avons <br />
                la réponse.
              </h1>
              <p className="mt-5 max-w-md leading-relaxed text-ink/70">
                Retrouvez ici les réponses aux questions les plus fréquentes sur nos prestations, nos rendez-vous et le bon déroulement de votre
                expérience chez ERA Beauty.
              </p>
              <div className="relative mt-7 max-w-md">
                <label htmlFor="faq-search" className="sr-only">
                  Rechercher une question
                </label>
                <Search aria-hidden size={16} className="absolute top-1/2 left-5 -translate-y-1/2 text-ink/50" />
                <input
                  id="faq-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Rechercher une question…"
                  className="w-full rounded-full border border-ink/15 bg-ivory py-3.5 pr-5 pl-12 text-sm shadow-luxe placeholder:text-ink/45 focus:border-oxblood focus:outline-none"
                />
              </div>
            </motion.div>
          </div>
          <div className="relative order-1 min-h-[16rem] lg:order-2 lg:col-span-6">
            <img src={images.portrait} alt="" className="photo-warm absolute inset-0 h-full w-full object-cover" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ivory via-transparent to-transparent max-lg:hidden" />
            <div className="absolute right-8 bottom-8 max-lg:hidden">
              <RotatingBadge text="Vos questions · Nos réponses ·" className="h-28 w-28 text-ivory" />
            </div>
          </div>
        </div>
      </section>

      <div className="container-x py-10">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {visibleCategories.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <Link
                to={`#${id}`}
                className={`flex h-full flex-col items-center justify-center gap-3 rounded-xl px-3 py-5 text-center text-[0.58rem] leading-snug tracking-[0.16em] uppercase transition-colors ${
                  id === activeTile ? 'bg-oxblood text-ivory' : 'bg-cream/70 text-ink/75 hover:text-oxblood'
                }`}
              >
                <Icon aria-hidden size={22} strokeWidth={1.2} />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="container-x grid gap-12 pb-16 lg:grid-cols-12">
        <div className="space-y-14 lg:col-span-8">
          {filtered.length === 0 && (
            <p role="status" className="rounded-xl bg-cream/70 p-6 text-sm text-ink/70">
              Aucune question ne correspond à « {query} ». Essayez un autre mot-clé ou contactez-nous directement.
            </p>
          )}
          {filtered.map(({ id, label, icon: Icon, items }) => (
            <section key={id} id={id} data-anchor>
              <div className="flex items-center gap-4">
                <Icon aria-hidden size={22} strokeWidth={1.2} className="text-oxblood" />
                <h2 className="title-caps text-xl text-ink sm:text-2xl">{label}</h2>
                <span aria-hidden className="h-px flex-1 bg-ink/10" />
                <span className="text-xs text-ink/50">
                  {items.length} question{items.length > 1 ? 's' : ''}
                </span>
              </div>
              <div className="mt-4">
                {items.map((item, index) => {
                  const key = `${id}-${index}`
                  return (
                    <AccordionItem
                      key={item.question}
                      title={<span className="text-[0.95rem]">{item.question}</span>}
                      open={open.has(key) || Boolean(query.trim())}
                      onToggle={() => toggle(key)}
                      headerClassName="px-4"
                      className={open.has(key) ? 'rounded-t-lg bg-cream/60' : ''}
                    >
                      <p className="px-4 text-sm leading-relaxed text-ink/70">{item.answer}</p>
                    </AccordionItem>
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-28 overflow-hidden rounded-2xl bg-espresso text-ivory">
            <img src={images.facialMassage} alt="" loading="lazy" className="photo-warm h-44 w-full object-cover opacity-80" />
            <div className="p-7">
              <p className="title-caps text-2xl">Vous n’avez pas trouvé votre réponse ?</p>
              <p className="mt-3 text-sm leading-relaxed text-ivory/75">Notre équipe est à votre écoute pour répondre à toutes vos questions.</p>
              <ButtonLink to="/contact#formulaire" size="sm" className="mt-6" icon={<ArrowRight size={13} />}>
                Nous contacter
              </ButtonLink>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
