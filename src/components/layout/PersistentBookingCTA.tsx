import { motion } from 'motion/react'
import { CalendarDays } from 'lucide-react'
import { useBooking } from '../../context/BookingContext'
import { luxeEase } from '../../lib/motion'

export function PersistentBookingCTA() {
  const { openBooking } = useBooking()

  return (
    <motion.div
      initial={{ y: '110%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, ease: luxeEase, delay: 1.2 }}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/8 bg-ivory/85 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-xl shadow-[0_-8px_25px_-5px_rgba(51,38,42,0.08)] md:hidden"
    >
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={() => openBooking()}
        className="flex h-[3.25rem] w-full items-center justify-center gap-3 rounded-full bg-ink text-[0.72rem] font-medium tracking-[0.22em] text-ivory uppercase transition-all duration-300 active:bg-oxblood shadow-luxe"
      >
        <CalendarDays aria-hidden size={16} strokeWidth={1.5} className="text-sand" />
        Book an Appointment
      </motion.button>
    </motion.div>
  )
}
