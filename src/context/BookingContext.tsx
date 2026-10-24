import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

interface BookingContextValue {
  isOpen: boolean
  /** Service preselected when the modal was opened from a specific treatment. */
  serviceId: string
  openBooking: (serviceId?: string) => void
  closeBooking: () => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [serviceId, setServiceId] = useState('')

  const openBooking = useCallback((id = '') => {
    setServiceId(id)
    setIsOpen(true)
  }, [])
  const closeBooking = useCallback(() => setIsOpen(false), [])

  const value = useMemo(
    () => ({ isOpen, serviceId, openBooking, closeBooking }),
    [isOpen, serviceId, openBooking, closeBooking],
  )
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) throw new Error('useBooking must be used inside <BookingProvider>')
  return context
}
