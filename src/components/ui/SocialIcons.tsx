import { Instagram, Youtube } from 'lucide-react'
import { contact, type SocialLink } from '../../data/site'

function TikTok({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden>
      <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 3c.4 2.6 2.2 4.4 5 4.6" />
    </svg>
  )
}

const icons: Record<SocialLink['label'], (props: { size?: number }) => JSX.Element> = {
  Instagram: ({ size }) => <Instagram size={size} strokeWidth={1.5} />,
  TikTok,
  YouTube: ({ size }) => <Youtube size={size} strokeWidth={1.5} />,
}

interface SocialIconsProps {
  className?: string
  linkClassName?: string
  size?: number
}

export function SocialIcons({ className = '', linkClassName = '', size = 18 }: SocialIconsProps) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {contact.socials.map((social) => {
        const Icon = icons[social.label]
        return (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`ERA Beauty sur ${social.label}`}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors ${linkClassName}`}
            >
              <Icon size={size} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
