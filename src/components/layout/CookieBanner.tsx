import { AnimatePresence, motion } from 'motion/react'
import { Cookie } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { OPEN_COOKIES_EVENT } from '../../lib/cookies'
import { luxeEase } from '../../lib/motion'

const STORAGE_KEY = 'era-cookie-consent'

interface Consent {
  audience: boolean
  marketing: boolean
}

const readConsent = (): Consent | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Consent) : null
  } catch {
    return null
  }
}

const saveConsent = (consent: Consent) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
  } catch {
    // Stockage indisponible : le choix vaut pour la visite en cours.
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [customizing, setCustomizing] = useState(false)
  const [choice, setChoice] = useState<Consent>({ audience: false, marketing: false })

  useEffect(() => {
    if (!readConsent()) setVisible(true)
    const open = () => {
      setChoice(readConsent() ?? { audience: false, marketing: false })
      setCustomizing(true)
      setVisible(true)
    }
    window.addEventListener(OPEN_COOKIES_EVENT, open)
    return () => window.removeEventListener(OPEN_COOKIES_EVENT, open)
  }, [])

  const decide = (consent: Consent) => {
    saveConsent(consent)
    setVisible(false)
    setCustomizing(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Gestion des cookies"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.5, ease: luxeEase }}
          className="fixed inset-x-3 bottom-3 z-[58] mx-auto max-w-4xl rounded-2xl border border-ink/10 bg-ivory p-5 text-ink shadow-luxe-lg sm:inset-x-6 sm:bottom-6 sm:p-6"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <div className="flex flex-1 gap-4">
              <Cookie aria-hidden size={30} strokeWidth={1.2} className="mt-0.5 shrink-0 text-champagne" />
              <div>
                <p className="font-medium">Nous utilisons des cookies</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">
                  Nous utilisons des cookies pour améliorer votre expérience sur notre site, analyser notre audience et vous proposer des contenus adaptés.
                  Vous pouvez accepter, refuser ou personnaliser vos choix.{' '}
                  <Link to="/politique-de-confidentialite" className="underline hover:text-oxblood">
                    En savoir plus
                  </Link>
                </p>
              </div>
            </div>
            {!customizing && (
              <div className="flex shrink-0 flex-wrap gap-2">
                <button type="button" onClick={() => setCustomizing(true)} className="h-10 rounded-full px-4 text-[0.64rem] tracking-[0.16em] uppercase underline-offset-4 hover:underline">
                  Personnaliser
                </button>
                <button type="button" onClick={() => decide({ audience: false, marketing: false })} className="h-10 rounded-full border border-oxblood/50 px-5 text-[0.64rem] tracking-[0.16em] text-oxblood uppercase hover:bg-oxblood hover:text-ivory">
                  Tout refuser
                </button>
                <button type="button" onClick={() => decide({ audience: true, marketing: true })} className="h-10 rounded-full bg-oxblood px-5 text-[0.64rem] tracking-[0.16em] text-ivory uppercase hover:bg-bordeaux-deep">
                  Tout accepter
                </button>
              </div>
            )}
          </div>
          {customizing && (
            <div className="mt-5 border-t border-ink/10 pt-5">
              <ul className="space-y-3 text-sm">
                <li className="flex items-center justify-between gap-4">
                  <span>
                    <strong className="font-medium">Cookies nécessaires</strong> — indispensables au fonctionnement du site.
                  </span>
                  <span className="text-xs text-ink/50">Toujours actifs</span>
                </li>
                {(
                  [
                    ['audience', 'Mesure d’audience', 'statistiques anonymes de fréquentation.'],
                    ['marketing', 'Marketing', 'contenus et offres personnalisés.'],
                  ] as const
                ).map(([key, label, text]) => (
                  <li key={key}>
                    <label className="flex cursor-pointer items-center justify-between gap-4">
                      <span>
                        <strong className="font-medium">{label}</strong> — {text}
                      </span>
                      <input
                        type="checkbox"
                        checked={choice[key]}
                        onChange={(event) => setChoice({ ...choice, [key]: event.target.checked })}
                        className="h-4 w-4 accent-oxblood"
                      />
                    </label>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex justify-end gap-2">
                <button type="button" onClick={() => decide({ audience: false, marketing: false })} className="h-10 rounded-full border border-oxblood/50 px-5 text-[0.64rem] tracking-[0.16em] text-oxblood uppercase hover:bg-oxblood hover:text-ivory">
                  Tout refuser
                </button>
                <button type="button" onClick={() => decide(choice)} className="h-10 rounded-full bg-oxblood px-5 text-[0.64rem] tracking-[0.16em] text-ivory uppercase hover:bg-bordeaux-deep">
                  Enregistrer mes choix
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
