import { MotionConfig } from 'motion/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { BookingProvider } from './context/BookingContext'
import { ContactPage } from './pages/ContactPage'
import { FaqPage } from './pages/FaqPage'
import { HomePage } from './pages/HomePage'
import { InstitutePage } from './pages/InstitutePage'
import { LegalPage } from './pages/LegalPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PricingPage } from './pages/PricingPage'
import { ResultsPage } from './pages/ResultsPage'
import { ServiceDetailPage } from './pages/ServiceDetailPage'
import { ServicesPage } from './pages/ServicesPage'
import { SitemapPage } from './pages/SitemapPage'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <BookingProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="institut" element={<InstitutePage />} />
              <Route path="prestations" element={<ServicesPage />} />
              <Route path="prestations/:slug" element={<ServiceDetailPage />} />
              <Route path="tarifs" element={<PricingPage />} />
              <Route path="resultats" element={<ResultsPage />} />
              <Route path="faq" element={<FaqPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="mentions-legales" element={<LegalPage kind="mentions" />} />
              <Route path="politique-de-confidentialite" element={<LegalPage kind="confidentialite" />} />
              <Route path="plan-du-site" element={<SitemapPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BookingProvider>
      </BrowserRouter>
    </MotionConfig>
  )
}
