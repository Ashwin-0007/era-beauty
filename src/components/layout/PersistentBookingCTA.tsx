import { motion } from 'motion/react'
import { CalendarDays } from 'lucide-react'
import { useBooking } from '../../context/BookingContext'
import { luxeEase } from '../../lib/motion'

/**
 * Mobile/tablet-only fixed booking bar. On desktop the header button fills
 * this role. The page reserves matching bottom padding so nothing is hidden.
 */
export function PersistentBookingCTA() {
  const { openBooking } = useBooking()

  return (
    <motion.div
      initial={{ y: '110%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, ease: luxeEase, delay: 1.2 }}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-ivory/90 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md md:hidden"
    >
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={() => openBooking()}
        className="flex h-[3.25rem] w-full items-center justify-center gap-3 rounded-full bg-ink text-[0.72rem] font-normal tracking-[0.22em] text-ivory uppercase transition-colors active:bg-oxblood"
      >
        <CalendarDays aria-hidden size={16} strokeWidth={1.4} />
        Book an Appointment
      </motion.button>
    </motion.div>
  )
}
