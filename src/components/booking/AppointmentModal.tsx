import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { useRef } from 'react'
import { useBooking } from '../../context/BookingContext'
import { useDialog } from '../../hooks/useDialog'
import { luxeEase } from '../../lib/motion'
import { BookingForm } from './BookingForm'

export function AppointmentModal() {
  const { isOpen, serviceId, closeBooking } = useBooking()
  const dialogRef = useRef<HTMLDivElement>(null)
  useDialog(isOpen, closeBooking, dialogRef)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            aria-hidden
            onClick={closeBooking}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-ink/60 backdrop-blur-[3px]"
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            aria-describedby="booking-description"
            initial={{ y: '100%', opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.6, ease: luxeEase }}
            className="relative flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-[28px] bg-ivory shadow-2xl sm:max-h-[88vh] sm:max-w-[560px] sm:rounded-[4px]"
          >
            <div aria-hidden className="mx-auto mt-3 h-1 w-10 rounded-full bg-ink/15 sm:hidden" />
            <div className="flex items-start justify-between gap-6 px-6 pt-5 sm:px-10 sm:pt-9">
              <div>
                <p className="eyebrow text-mocha">Appointment request</p>
                <h2 id="booking-title" className="display mt-3 text-[2.2rem] leading-none sm:text-5xl">
                  Book your <em className="text-oxblood">visit</em>
                </h2>
              </div>
              <button
                type="button"
                onClick={closeBooking}
                aria-label="Close booking form"
                className="group -mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-ink/5"
              >
                <X size={22} strokeWidth={1.2} className="transition-transform duration-500 group-hover:rotate-90" />
              </button>
            </div>
            <div className="overflow-y-auto overscroll-contain px-6 pt-2 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:px-10 sm:pb-10">
              <BookingForm initialServiceId={serviceId} onDone={closeBooking} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
