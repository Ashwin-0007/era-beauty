export interface FaqItem {
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  {
    question: 'Comment prendre rendez-vous ?',
    answer:
      'Utilisez n’importe quel bouton « Prendre rendez-vous » de ce site pour envoyer une demande avec le soin et la date de votre choix. Notre conciergerie vous confirmera directement la disponibilité.',
  },
  {
    question: 'Que dois-je faire avant ma première visite ?',
    answer:
      'Arrivez une dizaine de minutes en avance afin que nous puissions réaliser une courte consultation. Merci de nous signaler à l’avance toute allergie, tout traitement médical ou soin récent.',
  },
  {
    question: 'Quel soin convient à ma peau ?',
    answer:
      'En cas de doute, commencez par une consultation ou par notre soin visage signature. Votre praticienne analysera votre peau et vous recommandera un programme personnalisé.',
  },
  {
    question: 'Quelle est votre politique d’annulation ?',
    answer:
      'Nous vous prions de nous prévenir au moins 24 heures à l’avance pour tout report ou annulation, afin de pouvoir proposer le salon privé à d’autres clientes en attente.',
  },
  {
    question: 'Proposez-vous des cartes cadeaux ?',
    answer:
      'Des cartes cadeaux sur mesure et des formules d’adhésion à l’atelier privé sont disponibles auprès de notre conciergerie.',
  },
  {
    question: 'Vos soins sont-ils adaptés pendant la grossesse ?',
    answer:
      'Certains soins sont personnalisés ou délicatement adaptés pendant la grossesse. Merci de le mentionner lors de votre réservation afin que nos spécialistes puissent vous conseiller en toute sécurité.',
  },
]
