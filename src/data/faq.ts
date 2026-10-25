export interface FaqItem {
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  {
    question: 'How do I book an appointment?',
    answer:
      'Use any "Book an Appointment" button on this site to send a request with your preferred treatment and date. Our concierge team will confirm availability with you directly.',
  },
  {
    question: 'What should I do before my first visit?',
    answer:
      'Arrive around ten minutes early so we can complete a short consultation. Please let us know about allergies, medications or recent treatments in advance.',
  },
  {
    question: 'Which treatment is right for my skin?',
    answer:
      'If you are unsure, start with a consultation or our signature facial. Your therapist will assess your skin and recommend a personalised plan.',
  },
  {
    question: 'What is your cancellation policy?',
    answer:
      'We kindly request at least 24 hours notice for any rescheduling or cancellations to allow us to offer the private suite to awaiting patrons.',
  },
  {
    question: 'Do you offer gift vouchers?',
    answer:
      'Bespoke gift certificates and private atelier membership packages are available through our concierge desk.',
  },
  {
    question: 'Are your treatments suitable during pregnancy?',
    answer:
      'Selected treatments are customized or gently adapted during pregnancy. Please mention it when reserving so our dermal specialists can advise safely.',
  },
]
