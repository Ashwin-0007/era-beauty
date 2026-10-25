import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Minus, Plus, Search } from 'lucide-react'
import { useId, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Breadcrumb } from '../components/ui/Breadcrumb'
import { ButtonLink } from '../components/ui/ButtonLink'
import { Reveal } from '../components/ui/Reveal'
import { RotatingBadge } from '../components/ui/RotatingBadge'
import { findCategory } from '../data/catalog'
import { faqCategories, type FaqItem } from '../data/faq'
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

// Question en carte : fond rosé et titre bordeaux lorsqu'elle est ouverte.
function Question({ item, open, onToggle }: { item: FaqItem; open: boolean; onToggle: () => void }) {
  const id = useId()
  return (
    <div className={`overflow-hidden rounded-md border transition-colors duration-300 ${open ? 'border-oxblood/10 bg-cream' : 'border-ink/10 bg-ivory hover:border-oxblood/30'}`}>
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className={`flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left text-[0.92rem] transition-colors ${open ? 'text-oxblood' : 'text-ink hover:text-oxblood'}`}
        >
          {item.question}
          <span aria-hidden className="shrink-0 text-oxblood">
            {open ? <Minus size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-a`}
            role="region"
            aria-labelledby={`${id}-q`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: luxeEase }}
          >
            <p className="px-5 pb-4 text-sm leading-relaxed text-ink/70">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

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
        <img src={images.uvGlow} alt="" className="photo-warm absolute inset-0 h-full w-full object-cover object-[70%_center] lg:object-right" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/85 to-ivory/10 lg:from-ivory lg:from-30% lg:via-ivory/60 lg:via-50% lg:to-transparent lg:to-75%" />
        <div className="container-x relative py-12 lg:py-16">
          <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'FAQ' }]} className="mb-8 hidden lg:flex" />
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: luxeEase }} className="max-w-[34rem]">
            <p className="eyebrow text-mocha">FAQ</p>
            <h1 className="title-caps mt-4 text-[2.4rem] text-ink sm:text-5xl xl:text-[3.6rem]">
              Une question ? <br />
              Nous avons <br />
              la réponse.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/75 sm:text-base">
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
                className="w-full rounded-full border border-ink/10 bg-ivory py-3.5 pr-5 pl-12 text-sm shadow-luxe placeholder:text-ink/45 focus:border-oxblood focus:outline-none"
              />
            </div>
          </motion.div>
        </div>
        <div className="absolute right-[12%] bottom-10 hidden lg:block">
          <RotatingBadge text="Vos questions · Nos réponses ·" className="h-28 w-28 text-ivory" />
        </div>
      </section>

      <div className="container-x py-8">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {visibleCategories.map(({ id, label, icon: Icon }) => {
            const active = id === activeTile
            return (
              <li key={id}>
                <Link
                  to={`#${id}`}
                  className={`flex h-full flex-col items-center justify-center gap-2.5 rounded-lg border px-3 py-4 text-center text-[0.58rem] leading-snug tracking-[0.14em] uppercase transition-all duration-300 ${
                    active
                      ? 'border-oxblood bg-oxblood text-ivory shadow-[0_10px_24px_-10px_rgba(110,10,40,0.6)]'
                      : 'border-ink/10 bg-ivory text-ink/80 hover:-translate-y-0.5 hover:border-oxblood/40'
                  }`}
                >
                  <Icon aria-hidden size={22} strokeWidth={1.2} className={active ? 'text-ivory' : 'text-oxblood'} />
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="container-x space-y-12 pb-14">
        {filtered.length === 0 && (
          <p role="status" className="rounded-lg border border-ink/10 bg-cream p-6 text-sm text-ink/70">
            Aucune question ne correspond à « {query} ». Essayez un autre mot-clé ou contactez-nous directement.
          </p>
        )}
        {filtered.map(({ id, label, icon: Icon, items }) => (
          <section key={id} id={id} data-anchor>
            <div className="flex items-center gap-4">
              <Icon aria-hidden size={24} strokeWidth={1.2} className="shrink-0 text-oxblood" />
              <h2 className="title-caps text-xl text-ink sm:text-2xl">{label}</h2>
              <span aria-hidden className="h-px flex-1 bg-ink/10" />
              <span className="text-xs whitespace-nowrap text-ink/50">
                {items.length} question{items.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className="mt-5 space-y-2">
              {items.map((item, index) => {
                const key = `${id}-${index}`
                return <Question key={item.question} item={item} open={open.has(key) || Boolean(query.trim())} onToggle={() => toggle(key)} />
              })}
            </div>
          </section>
        ))}
      </div>

      <section className="container-x pb-16 lg:pb-20">
        <Reveal className="relative overflow-hidden rounded-2xl bg-espresso text-ivory">
          <img src={images.facialMassage} alt="" loading="lazy" className="photo-warm absolute inset-0 h-full w-full object-cover md:left-1/3 md:w-2/3" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/75 to-espresso/20 md:bg-gradient-to-r md:from-espresso md:via-espresso/85 md:to-transparent" />
          <div className="relative px-7 py-12 md:max-w-lg md:px-12 md:py-14">
            <h2 className="title-caps text-2xl leading-tight sm:text-3xl">
              Vous n’avez pas <br />
              trouvé votre réponse ?
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ivory/80">Notre équipe est à votre écoute pour répondre à toutes vos questions.</p>
            <ButtonLink to="/contact#formulaire" size="sm" className="mt-6" icon={<ArrowRight size={13} />}>
              Nous contacter
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  )
}
