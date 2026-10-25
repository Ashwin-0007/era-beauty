import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AppointmentModal } from '../booking/AppointmentModal'
import { CursorEffects } from '../ui/CursorEffects'
import { FilmGrainOverlay } from '../ui/FilmGrainOverlay'
import { ScrollProgress } from '../ui/ScrollProgress'
import { CookieBanner } from './CookieBanner'
import { Footer } from './Footer'
import { Header, MobileBookingButton } from './Header'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }
    // La cible peut n'exister qu'après le rendu de la page : on réessaie quelques images.
    let frames = 0
    let raf = 0
    const id = decodeURIComponent(hash.slice(1))
    const tryScroll = () => {
      const target = document.getElementById(id)
      if (target) {
        const headerOffset = window.innerWidth >= 1024 ? 112 : 96
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        })
      } else if (frames++ < 30) {
        raf = requestAnimationFrame(tryScroll)
      }
    }
    raf = requestAnimationFrame(tryScroll)
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash])

  return null
}

export function Layout() {
  return (
    <>
      <ScrollManager />
      <ScrollProgress />
      <FilmGrainOverlay />
      <CursorEffects />
      <a href="#main" className="sr-only z-[70] bg-ink px-4 py-3 text-ivory focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Aller au contenu
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <MobileBookingButton />
      <CookieBanner />
      <AppointmentModal />
    </>
  )
}
