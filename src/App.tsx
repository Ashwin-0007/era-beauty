import { MotionConfig } from 'motion/react'
import { useCallback, useState } from 'react'
import { AppointmentModal } from './components/booking/AppointmentModal'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { PersistentBookingCTA } from './components/layout/PersistentBookingCTA'
import { SideNavigation } from './components/layout/SideNavigation'
import { AboutSection } from './components/sections/AboutSection'
import { ClosingCTA } from './components/sections/ClosingCTA'
import { ContactSection } from './components/sections/ContactSection'
import { FAQSection } from './components/sections/FAQSection'
import { HeroSection } from './components/sections/HeroSection'
import { PricingSection } from './components/sections/PricingSection'
import { ResultsSection } from './components/sections/ResultsSection'
import { ServicesSection } from './components/sections/ServicesSection'
import { BookingProvider, useBooking } from './context/BookingContext'
import { navItems, type SectionId } from './data/navigation'
import { useActiveSection } from './hooks/useActiveSection'
import { scrollToSection } from './lib/navigation'

const sectionIds = navItems.map((item) => item.id)

function Site() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { openBooking } = useBooking()
  const activeId = useActiveSection(sectionIds)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // Close first so the scroll lock is released, then scroll on the next frame.
  const navigate = useCallback((id: SectionId) => {
    setMenuOpen(false)
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(id)))
  }, [])

  const bookFromMenu = useCallback(() => {
    setMenuOpen(false)
    openBooking()
  }, [openBooking])

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] bg-ink px-4 py-3 text-ivory focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Header menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((open) => !open)} />
      <SideNavigation open={menuOpen} activeId={activeId} onClose={closeMenu} onNavigate={navigate} onBook={bookFromMenu} />

      {/* Bottom padding on mobile reserves room for the fixed booking bar. */}
      <div className="pb-[calc(4.75rem+env(safe-area-inset-bottom))] md:pb-0">
        <main id="main">
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <PricingSection />
          <ResultsSection />
          <ContactSection />
          <FAQSection />
          <ClosingCTA />
        </main>
        <Footer onNavigate={navigate} />
      </div>

      <PersistentBookingCTA />
      <AppointmentModal />
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BookingProvider>
        <Site />
      </BookingProvider>
    </MotionConfig>
  )
}
