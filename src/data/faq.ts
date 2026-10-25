import { CalendarHeart, Eye, Gem, Leaf, Sun, Zap, type LucideIcon } from 'lucide-react'

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqCategory {
  id: string
  label: string
  icon: LucideIcon
  // Slug de la catégorie de prestations liée : la FAQ s'affiche aussi sur sa page.
  categorySlug?: string
  items: FaqItem[]
}

export const faqCategories: FaqCategory[] = [
  {
    id: 'questions-generales',
    label: 'Questions générales',
    icon: CalendarHeart,
    items: [
      {
        question: 'Comment prendre rendez-vous ?',
        answer:
          'Vous pouvez prendre rendez-vous directement sur notre site en cliquant sur le bouton « Prendre rendez-vous ». Vous serez redirigée vers notre plateforme de réservation, où vous pourrez choisir la prestation, la date et l’horaire qui vous conviennent.',
      },
      {
        question: 'Puis-je modifier ou annuler mon rendez-vous ?',
        answer:
          'Oui, toute modification ou annulation est possible jusqu’à 24h avant votre rendez-vous, depuis votre confirmation de réservation ou en nous contactant par téléphone.',
      },
      {
        question: 'Que se passe-t-il en cas de retard ?',
        answer:
          'Nous vous accueillons avec plaisir dans la limite de 10 minutes de retard. Au-delà, la prestation pourra être écourtée ou reportée afin de respecter les rendez-vous suivants.',
      },
      {
        question: 'Quels sont les moyens de paiement acceptés ?',
        answer: 'Nous acceptons les cartes bancaires, les espèces et les paiements sans contact. Les forfaits peuvent être réglés en plusieurs fois.',
      },
      {
        question: 'Est-il possible de venir accompagnée ?',
        answer:
          'Afin de préserver le calme et la confidentialité de nos cabines, nous vous recommandons de venir seule. Un espace d’attente est disponible pour votre accompagnant.',
      },
      {
        question: 'À partir de quel âge peut-on venir ?',
        answer:
          'Nos prestations sont accessibles dès 16 ans avec une autorisation parentale, à l’exception de la cabine UV et du blanchiment dentaire, réservés aux personnes majeures.',
      },
    ],
  },
  {
    id: 'epilation-laser',
    label: 'Épilation laser',
    icon: Zap,
    categorySlug: 'epilation-laser',
    items: [
      {
        question: 'Comment bien se préparer pour une séance de laser ?',
        answer:
          'Il est conseillé de venir avec une peau propre et rasée (24h avant la séance). Évitez l’exposition au soleil et l’application d’autobronzant dans les 2 semaines précédant votre rendez-vous. Toutes les consignes détaillées vous seront envoyées après la réservation et adaptées à votre situation.',
      },
      {
        question: 'Combien de séances sont nécessaires ?',
        answer: 'En moyenne, 6 à 8 séances sont nécessaires selon la zone, votre pilosité et votre phototype, espacées de 4 à 8 semaines.',
      },
      {
        question: 'Est-ce que l’épilation laser est douloureuse ?',
        answer: 'Notre laser diode est équipé d’un système de refroidissement : la sensation est comparable à un léger picotement chaud, bien toléré.',
      },
      {
        question: 'Quelles zones peuvent être traitées ?',
        answer: 'Toutes les zones du visage et du corps peuvent être traitées, à l’exception du contour des yeux.',
      },
      {
        question: 'Y a-t-il des contre-indications ?',
        answer:
          'La grossesse, certains traitements photosensibilisants et les lésions cutanées sur la zone sont des contre-indications. La consultation préalable permet de les vérifier.',
      },
    ],
  },
  {
    id: 'beaute-du-regard',
    label: 'Beauté du regard',
    icon: Eye,
    categorySlug: 'beaute-du-regard',
    items: [
      {
        question: 'Combien de temps dure un rehaussement de cils ?',
        answer: 'Le résultat tient en moyenne 6 à 8 semaines, au rythme du renouvellement naturel de vos cils.',
      },
      {
        question: 'Le rehaussement abîme-t-il les cils ?',
        answer: 'Non, nous utilisons des produits professionnels doux et terminons chaque prestation par un soin nourrissant à la kératine.',
      },
      {
        question: 'Puis-je me maquiller après la prestation ?',
        answer: 'Nous vous conseillons d’attendre 24h avant d’appliquer du mascara ou de mouiller vos cils et sourcils.',
      },
    ],
  },
  {
    id: 'soins-visage-head-spa',
    label: 'Soins visage & Head Spa',
    icon: Leaf,
    categorySlug: 'soins-visage-head-spa',
    items: [
      {
        question: 'Quel soin visage choisir ?',
        answer: 'En cas de doute, commencez par notre soin signature : votre praticienne analysera votre peau et vous orientera vers le protocole adapté.',
      },
      {
        question: 'Qu’est-ce que le Head Spa ?',
        answer: 'Un rituel d’inspiration japonaise qui associe diagnostic, nettoyage profond et massage du cuir chevelu, pour une détente intense.',
      },
    ],
  },
  {
    id: 'blanchiment-strass-dentaires',
    label: 'Blanchiment & strass dentaires',
    icon: Gem,
    categorySlug: 'blanchiment-strass-dentaires',
    items: [
      {
        question: 'Le blanchiment est-il sans danger ?',
        answer: 'Oui, nous utilisons des produits conformes à la réglementation européenne en vigueur, sans altération de l’émail.',
      },
      {
        question: 'Le strass abîme-t-il la dent ?',
        answer: 'Non, le strass est collé sur l’émail sans perçage et peut être retiré à tout moment par un professionnel.',
      },
    ],
  },
  {
    id: 'cabine-uv',
    label: 'Cabine UV',
    icon: Sun,
    categorySlug: 'cabine-uv',
    items: [
      {
        question: 'Combien de séances par semaine ?',
        answer: 'Nous recommandons un maximum de 2 séances par semaine, espacées d’au moins 48h.',
      },
      {
        question: 'Faut-il apporter des lunettes ?',
        answer: 'Non, des lunettes de protection sont fournies et leur port est obligatoire.',
      },
    ],
  },
]

export const faqForCategory = (slug: string) => faqCategories.find((faq) => faq.categorySlug === slug)
