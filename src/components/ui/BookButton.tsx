import { ArrowRight } from 'lucide-react'
import { useBooking } from '../../context/BookingContext'
import { Button } from './Button'
import type { Size, Variant } from './buttonStyles'

interface BookButtonProps {
  treatmentId?: string
  label?: string
  variant?: Variant
  size?: Size
  className?: string
}

export function BookButton({ treatmentId, label = 'Prendre rendez-vous', variant = 'primary', size = 'md', className = '' }: BookButtonProps) {
  const { openBooking } = useBooking()
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => openBooking(treatmentId)}
      icon={<ArrowRight size={14} strokeWidth={1.5} />}
    >
      {label}
    </Button>
  )
}
