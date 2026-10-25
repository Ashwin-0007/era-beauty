export interface AppointmentRequest {
  name: string
  phone: string
  serviceId: string
  date: string
  timeOfDay: 'morning' | 'afternoon' | 'evening' | ''
  notes: string
}

export type AppointmentErrors = Partial<Record<keyof AppointmentRequest, string>>

export interface SubmitResult {
  ok: boolean
  mode: 'demo' | 'live'
}

export const emptyRequest: AppointmentRequest = {
  name: '',
  phone: '',
  serviceId: '',
  date: '',
  timeOfDay: '',
  notes: '',
}

export const todayIso = () => {
  const now = new Date()
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
  return now.toISOString().slice(0, 10)
}

export function validateAppointment(values: AppointmentRequest): AppointmentErrors {
  const errors: AppointmentErrors = {}
  if (values.name.trim().length < 2) errors.name = 'Please enter your full name.'
  const digits = values.phone.replace(/\D/g, '')
  if (digits.length < 7 || digits.length > 15) errors.phone = 'Please enter a valid phone number.'
  if (!values.serviceId) errors.serviceId = 'Please choose a treatment.'
  if (!values.date) errors.date = 'Please choose a preferred date.'
  else if (values.date < todayIso()) errors.date = 'Please choose a date from today onwards.'
  return errors
}

export async function submitAppointmentRequest(values: AppointmentRequest): Promise<SubmitResult> {
  void values
  await new Promise((resolve) => setTimeout(resolve, 900))
  return { ok: true, mode: 'demo' }
}
