import { AnimatePresence, motion } from 'motion/react'
import { AlertCircle, ArrowRight, Check, ChevronDown, Loader2 } from 'lucide-react'
import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { services } from '../../data/services'
import {
  emptyRequest,
  submitAppointmentRequest,
  todayIso,
  validateAppointment,
  type AppointmentErrors,
  type AppointmentRequest,
} from '../../lib/booking'
import { Button } from '../ui/Button'
import { luxeEase } from '../../lib/motion'

type Status = 'idle' | 'submitting' | 'success' | 'error'

interface FieldProps {
  id: keyof AppointmentRequest
  label: string
  error?: string
  optional?: boolean
  children: ReactNode
}

function Field({ id, label, error, optional, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={`booking-${id}`} className="eyebrow flex justify-between text-mocha">
        {label}
        {optional && <span className="tracking-[0.1em] normal-case text-ink/40">Optional</span>}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`booking-${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 flex items-center gap-1.5 overflow-hidden text-sm text-oxblood"
          >
            <AlertCircle aria-hidden size={14} strokeWidth={1.5} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function SelectWrap({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown aria-hidden size={16} strokeWidth={1.3} className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2 text-ink/60" />
    </div>
  )
}

interface BookingFormProps {
  initialServiceId?: string
  onDone: () => void
}

export function BookingForm({ initialServiceId = '', onDone }: BookingFormProps) {
  const [values, setValues] = useState<AppointmentRequest>({ ...emptyRequest, serviceId: initialServiceId })
  const [errors, setErrors] = useState<AppointmentErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const update = (field: keyof AppointmentRequest) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [field]: event.target.value }
    setValues(next)
    if (submitted) setErrors(validateAppointment(next))
  }

  const describedBy = (field: keyof AppointmentRequest) => (errors[field] ? `booking-${field}-error` : undefined)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitted(true)
    const found = validateAppointment(values)
    setErrors(found)
    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#booking-${firstInvalid}`)?.focus()
      return
    }
    setStatus('submitting')
    try {
      const result = await submitAppointmentRequest(values)
      setStatus(result.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    const service = services.find((s) => s.id === values.serviceId)
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: luxeEase }}
        className="py-6"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-ivory">
          <Check size={24} strokeWidth={1.4} />
        </span>
        <p className="display mt-6 text-3xl">Thank you, {values.name.trim().split(' ')[0]}.</p>
        <p className="mt-3 text-ink/70">
          Your request for <strong className="font-normal text-ink">{service?.title ?? 'a treatment'}</strong> on{' '}
          <strong className="font-normal text-ink">{new Date(`${values.date}T00:00`).toLocaleDateString(undefined, { dateStyle: 'long' })}</strong>{' '}
          has been prepared.
        </p>
        <p className="mt-5 border-l-2 border-oxblood/60 bg-cream/70 px-4 py-3 text-sm text-ink/75">
          Our concierge will review your preferred date and contact you within 2 business hours to finalize your suite reservation.
        </p>
        <Button className="mt-8" onClick={onDone}>
          Close
        </Button>
      </motion.div>
    )
  }

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="space-y-7 pt-4">
      <p id="booking-description" className="text-ink/65">
        Share a few details and we will confirm availability with you.
      </p>

      {status === 'error' && (
        <p role="alert" className="flex items-start gap-3 border-l-2 border-oxblood bg-oxblood/5 px-4 py-3 text-sm text-oxblood">
          <AlertCircle aria-hidden size={16} strokeWidth={1.5} className="mt-0.5 shrink-0" />
          Something went wrong while preparing your request. Please try again.
        </p>
      )}
      {submitted && Object.keys(errors).length > 0 && (
        <p role="alert" className="sr-only">
          Please correct {Object.keys(errors).length} highlighted field(s).
        </p>
      )}

      <Field id="name" label="Full name" error={errors.name}>
        <input
          id="booking-name"
          className="field"
          autoComplete="name"
          value={values.name}
          onChange={update('name')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describedBy('name')}
          placeholder="Your name"
        />
      </Field>

      <Field id="phone" label="Phone number" error={errors.phone}>
        <input
          id="booking-phone"
          type="tel"
          inputMode="tel"
          className="field"
          autoComplete="tel"
          value={values.phone}
          onChange={update('phone')}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={describedBy('phone')}
          placeholder="+33 1 42 68 55 00"
        />
      </Field>

      <Field id="serviceId" label="Preferred treatment" error={errors.serviceId}>
        <SelectWrap>
        <select
          id="booking-serviceId"
          className="field appearance-none pr-8"
          value={values.serviceId}
          onChange={update('serviceId')}
          aria-invalid={Boolean(errors.serviceId)}
          aria-describedby={describedBy('serviceId')}
        >
          <option value="">Select a treatment</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.title}
            </option>
          ))}
          <option value="consultation">Not sure yet — consultation</option>
        </select></SelectWrap>
      </Field>

      <div className="grid gap-7 sm:grid-cols-2 sm:gap-6">
        <Field id="date" label="Preferred date" error={errors.date}>
          <input
            id="booking-date"
            type="date"
            min={todayIso()}
            className="field"
            value={values.date}
            onChange={update('date')}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={describedBy('date')}
          />
        </Field>
        <Field id="timeOfDay" label="Time of day" optional>
          <SelectWrap>
          <select id="booking-timeOfDay" className="field appearance-none pr-8" value={values.timeOfDay} onChange={update('timeOfDay')}>
            <option value="">No preference</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select></SelectWrap>
        </Field>
      </div>

      <Field id="notes" label="Notes" optional>
        <textarea
          id="booking-notes"
          rows={2}
          className="field resize-none"
          value={values.notes}
          onChange={update('notes')}
          placeholder="Skin concerns, allergies, questions…"
        />
      </Field>

      <Button
        type="submit"
        size="lg"
        disabled={status === 'submitting'}
        className="w-full disabled:cursor-wait disabled:opacity-70"
        icon={status === 'submitting' ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={15} strokeWidth={1.4} />}
      >
        {status === 'submitting' ? 'Preparing request' : 'Request Appointment'}
      </Button>
      <p className="text-center text-xs text-ink/45">Your inquiry is treated with strict confidentiality. Concierge will confirm your suite.</p>
    </form>
  )
}
