export interface FaqItem {
  question: string
  answer: string
}

/** Sample questions — replace with ERA Beauty's own answers. */
export const faqs: FaqItem[] = [
  {
    question: 'How do I book an appointment?',
    answer:
      'Use any "Book an Appointment" button on this site to send a request with your preferred treatment and date. Our team will confirm availability with you directly.',
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
      'Placeholder policy: we kindly ask for at least 24 hours notice to reschedule or cancel. Final terms will be published here.',
  },
  {
    question: 'Do you offer gift vouchers?',
    answer: 'Placeholder answer: gift vouchers may be available for selected treatments. Contact us for details.',
  },
  {
    question: 'Are your treatments suitable during pregnancy?',
    answer:
      'Some treatments are adapted or avoided during pregnancy. Please mention it when booking so we can advise safely.',
  },
]
