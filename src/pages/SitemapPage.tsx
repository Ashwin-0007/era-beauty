import { Link } from 'react-router-dom'
import { Breadcrumb } from '../components/ui/Breadcrumb'
import { legalLinks, navItems } from '../data/navigation'
import { usePageMeta } from '../hooks/usePageMeta'

export function SitemapPage() {
  usePageMeta('Plan du site')
  const legal = legalLinks.filter((link) => link.to.startsWith('/'))

  return (
    <article className="container-x max-w-4xl pt-32 pb-20">
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Plan du site' }]} className="flex" />
      <h1 className="title-caps mt-8 text-4xl text-ink sm:text-5xl">Plan du site</h1>
      <div className="mt-10 grid gap-10 sm:grid-cols-2">
        {navItems.map((item) => (
          <section key={item.to}>
            <h2 className="title-caps text-xl">
              <Link to={item.to} className="text-ink hover:text-oxblood">
                {item.label}
              </Link>
            </h2>
            {item.children && (
              <ul className="mt-3 space-y-2">
                {item.children.map((child) => (
                  <li key={child.to}>
                    <Link to={child.to} className="text-sm text-ink/70 hover:text-oxblood">
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
        <section>
          <h2 className="title-caps text-xl text-ink">Informations légales</h2>
          <ul className="mt-3 space-y-2">
            {legal.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-ink/70 hover:text-oxblood">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  )
}
