import { ArrowUp, Facebook, Instagram } from 'lucide-react'
import { contact, type SocialLink } from '../../data/contact'
import { navItems, type SectionId } from '../../data/navigation'
import { site } from '../../data/site'
import { LogoMark } from './LogoMark'

const socialIcons: Record<SocialLink['label'], typeof Instagram> = {
  Instagram,
  Facebook,
}

interface FooterProps {
  onNavigate: (id: SectionId) => void
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer data-surface="dark" className="bg-ink text-ivory">
      <div className="container-x pt-20 pb-10 sm:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-end gap-6 sm:gap-8">
              <LogoMark accentClassName="text-champagne" className="h-[5.2rem] w-auto shrink-0 sm:h-[7.4rem]" />
              <p className="display text-[5.5rem] leading-[0.8] tracking-[0.12em] sm:text-[8rem]">ERA</p>
            </div>
            <p className="eyebrow mt-4 text-champagne">Beauty Institute</p>
            <p className="mt-8 max-w-sm text-ivory/60">
              A calm, considered space for skin, face and body care. Placeholder brand statement, to be replaced with ERA
              Beauty's own words.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <p className="eyebrow text-ivory/40">Explore</p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-1">
              {navItems.map((nav) => (
                <li key={nav.id}>
                  <a
                    href={nav.href}
                    onClick={(event) => {
                      event.preventDefault()
                      onNavigate(nav.id)
                    }}
                    className="text-ivory/75 transition-colors hover:text-champagne"
                  >
                    {nav.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="eyebrow text-ivory/40">Visit &amp; contact</p>
            <address className="mt-6 space-y-1 not-italic text-ivory/75">
              {contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <div className="mt-5 space-y-1">
              <a href={contact.phoneHref} className="block text-ivory/75 transition-colors hover:text-champagne">
                {contact.phoneDisplay}
              </a>
              <a href={`mailto:${contact.email}`} className="block text-ivory/75 transition-colors hover:text-champagne">
                {contact.email}
              </a>
            </div>
            <ul className="mt-8 flex gap-3">
              {contact.socials.map((social) => {
                const Icon = socialIcons[social.label]
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      aria-label={`${social.label} (placeholder link)`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:border-champagne hover:text-champagne"
                    >
                      <Icon size={17} strokeWidth={1.3} />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col-reverse gap-6 border-t border-ivory/10 pt-8 text-xs text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved. Imagery and details shown are placeholders.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="group flex items-center gap-3 self-start uppercase tracking-[0.22em] transition-colors hover:text-ivory sm:self-auto"
          >
            Back to top
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 transition-transform duration-500 group-hover:-translate-y-1">
              <ArrowUp size={15} strokeWidth={1.3} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
