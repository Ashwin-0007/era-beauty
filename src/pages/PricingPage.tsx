import { ArrowRight, CalendarCheck, FileText, Info, Tag } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CategoryTiles } from '../components/sections/CategoryTiles'
import { AccordionItem } from '../components/ui/Accordion'
import { BookButton } from '../components/ui/BookButton'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { SectionTitle } from '../components/ui/SectionTitle'
import { categoryPath, findCategory } from '../data/catalog'
import { images } from '../data/images'
import { pricingInfo, pricingSections, type PriceGroup, type PriceSection } from '../data/pricing'
import { usePageMeta } from '../hooks/usePageMeta'

const infoIcons = [Tag, CalendarCheck, FileText, Info]

// On n'affiche que les sections dont la catégorie est active (ou les packs transverses).
const sections = pricingSections.filter((section) => !section.categorySlug || findCategory(section.categorySlug))

function PriceTable({ group }: { group: PriceGroup }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-ink/10 text-left text-[0.58rem] tracking-[0.18em] text-ink/50 uppercase">
          <th scope="col" className="py-2 pr-3 font-normal">
            {group.columns.length === 2 && group.columns[0] === 'Séance' ? 'Zone' : 'Prestation'}
          </th>
          {group.columns.map((column) => (
            <th key={column} scope="col" className="py-2 pl-3 text-right font-normal whitespace-nowrap">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {group.rows.map((row) => (
          <tr key={row.label} className="border-b border-ink/5 last:border-0">
            <th scope="row" className="py-2.5 pr-3 text-left font-light text-ink">
              {row.label}
            </th>
            {row.values.map((value, index) => (
              <td key={index} className={`py-2.5 pl-3 text-right whitespace-nowrap ${index === row.values.length - 1 ? 'text-oxblood' : 'text-ink/70'}`}>
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function PriceBlock({ section, index }: { section: PriceSection; index: number }) {
  const [tab, setTab] = useState(0)
  const [open, setOpen] = useState(0)
  const groups = section.tabs[tab].groups
  const isLaser = section.id === 'epilation-laser'

  return (
    <section id={section.id} className="border-b border-ink/10 py-12 last:border-0 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-7">
          <SectionTitle number={String(index + 1).padStart(2, '0')} title={section.name} subtitle={section.subtitle} />
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/70">{section.description}</p>
          {section.note && <p className="mt-3 text-sm text-oxblood italic">{section.note}</p>}

          {section.tabs.length > 1 && (
            <div role="tablist" aria-label={`Tarifs ${section.name}`} className="mt-7 grid grid-cols-3 gap-2">
              {section.tabs.map((item, tabIndex) => (
                <button
                  key={item.label}
                  type="button"
                  role="tab"
                  aria-selected={tab === tabIndex}
                  onClick={() => {
                    setTab(tabIndex)
                    setOpen(0)
                  }}
                  className={`rounded-md py-2.5 text-[0.62rem] tracking-[0.18em] uppercase transition-colors ${
                    tab === tabIndex ? 'bg-oxblood text-ivory' : 'bg-cream text-ink/70 hover:text-oxblood'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          <div className="mt-5">
            {groups.map((group, groupIndex) => (
              <AccordionItem
                key={`${tab}-${group.title}`}
                title={<span className="text-[0.7rem] tracking-[0.18em] uppercase">{group.title}</span>}
                open={open === groupIndex}
                onToggle={() => setOpen(open === groupIndex ? -1 : groupIndex)}
              >
                <PriceTable group={group} />
              </AccordionItem>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <BookButton size="sm" />
            {section.categorySlug && (
              <Link to={categoryPath(section.categorySlug)} className="inline-flex items-center gap-2 text-[0.62rem] tracking-[0.18em] text-oxblood uppercase hover:underline">
                Voir la prestation <ArrowRight size={12} />
              </Link>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="space-y-5 lg:col-span-5">
          <img src={section.image} alt="" loading="lazy" className="photo-warm aspect-[4/3] w-full rounded-2xl object-cover" />
          {isLaser && (
            <div className="rounded-2xl border border-ink/10 bg-cream/60 p-6">
              <p className="eyebrow text-[0.62rem] text-ink">Informations importantes</p>
              <ul className="mt-4 space-y-3">
                {pricingInfo.map((item, infoIndex) => {
                  const Icon = infoIcons[infoIndex] ?? Info
                  return (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/75">
                      <Icon aria-hidden size={16} strokeWidth={1.4} className="mt-0.5 shrink-0 text-oxblood" />
                      {item}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}

export function PricingPage() {
  usePageMeta('Nos tarifs', 'Tarifs ERA Beauty : épilation laser diode (femmes & hommes, forfaits), beauté du regard, soins visage & Head Spa, blanchiment dentaire et cabine UV.')

  return (
    <>
      <PageHero
        eyebrow="Nos tarifs"
        title={
          <>
            Des prestations <br />
            d’exception
          </>
        }
        text="Une transparence totale pour vous permettre de choisir en toute confiance. Des tarifs clairs, adaptés à vos besoins et à nos différentes prestations."
        image={images.archShelves}
        breadcrumb={[{ label: 'Accueil', to: '/' }, { label: 'Tarifs' }]}
      />

      <div className="container-x pt-10">
        <CategoryTiles
          tiles={sections.map((section) => ({
            key: section.id,
            label: section.id === 'packs' ? 'Nos packs' : (findCategory(section.categorySlug)?.shortName ?? section.name),
            image: section.image,
            to: `#${section.id}`,
          }))}
        />
      </div>

      <div className="container-x">
        {sections.map((section, index) => (
          <PriceBlock key={section.id} section={section} index={index} />
        ))}
      </div>
    </>
  )
}
