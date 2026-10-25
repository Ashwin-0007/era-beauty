import {
  Award,
  Clock,
  Droplets,
  Eye,
  Gem,
  HeartHandshake,
  Leaf,
  ShieldCheck,
  Smile,
  Sparkles,
  Sun,
  SunMedium,
  Timer,
  UserRound,
  Wand2,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { images } from './images'

export interface Benefit {
  icon: LucideIcon
  label: string
}

export interface Treatment {
  id: string
  name: string
  subtitle: string
  description: string
  duration: string
  result: string
  price: string
  image: string
  gallery: string[]
  // Paire de photos réelles avant / après pour le comparateur (sinon : première photo de la galerie).
  before?: string
  after?: string
  videoUrl?: string
}

export interface Pack {
  name: string
  detail: string
  price: string
}

export interface Category {
  slug: string
  // Passer à false pour masquer entièrement la catégorie du site public.
  enabled: boolean
  name: string
  shortName: string
  menuLabel: string
  discoverLabel: string
  overviewEyebrow: string
  overviewTitle: string
  tagline: string
  description: string
  heroDescription: string
  image: string
  heroImage: string
  videoUrl?: string
  overviewBenefits: Benefit[]
  benefits: Benefit[]
  resultLabel: string
  treatments: Treatment[]
  packs?: { intro: string; items: Pack[] }
  steps: { title: string; text: string }[]
  precautions: string[]
  aftercare: string[]
}

export const categories: Category[] = [
  {
    slug: 'epilation-laser',
    enabled: true,
    name: 'Épilation laser diode',
    shortName: 'Épilation laser',
    menuLabel: 'Épilation laser',
    discoverLabel: 'Découvrir l’épilation laser',
    overviewEyebrow: 'Notre prestation phare',
    overviewTitle: 'Épilation laser diode',
    tagline: 'Une peau lisse et durablement plus belle',
    description:
      'Une technologie de pointe pour une épilation définitive, adaptée à tous types de peau. Des résultats visibles dès les premières séances, dans un cadre sécurisé et confortable.',
    heroDescription:
      'Notre laser diode de dernière génération offre une épilation durable, rapide et confortable, pour les femmes comme pour les hommes, sur toutes les zones du corps.',
    image: images.laserLeg,
    heroImage: images.laserLeg,
    overviewBenefits: [
      { icon: Award, label: 'Résultats durables' },
      { icon: UserRound, label: 'Tous types de peaux' },
      { icon: Timer, label: 'Séances rapides et confortables' },
    ],
    benefits: [
      { icon: Zap, label: 'Une technologie de dernière génération' },
      { icon: UserRound, label: 'Adaptée à tous les phototypes' },
      { icon: Timer, label: 'Des séances rapides' },
      { icon: Award, label: 'Des résultats durables' },
      { icon: HeartHandshake, label: 'Un suivi personnalisé' },
    ],
    resultLabel: 'Séances',
    treatments: [
      {
        id: 'laser-visage',
        name: 'Zones visage',
        subtitle: 'Lèvre supérieure, menton, joues, cou',
        description:
          'Une épilation précise des petites zones du visage, pour une peau nette et douce au quotidien, sans irritation ni repousse visible.',
        duration: '15 min',
        result: '6 à 8',
        price: 'dès 35 €',
        image: images.laserFace,
        gallery: [images.laserFace, images.facialSkin, images.portraitSkin],
      },
      {
        id: 'laser-aisselles',
        name: 'Aisselles',
        subtitle: 'Une zone traitée en quelques minutes',
        description:
          'La zone idéale pour commencer : des séances express, une sensation de fraîcheur et la fin du rasage quotidien.',
        duration: '10 min',
        result: '6 à 8',
        price: 'dès 45 €',
        image: images.laserArm,
        gallery: [images.laserArm, images.laserLeg, images.uvBody],
      },
      {
        id: 'laser-maillot',
        name: 'Maillot',
        subtitle: 'Classique, échancré ou intégral',
        description:
          'Une épilation sur-mesure du maillot, réalisée avec douceur et discrétion par nos praticiennes formées.',
        duration: '20 min',
        result: '6 à 8',
        price: 'dès 60 €',
        image: images.uvBody,
        gallery: [images.uvBody, images.laserLeg, images.laserArm],
      },
      {
        id: 'laser-jambes',
        name: 'Jambes',
        subtitle: 'Demi-jambes ou jambes complètes',
        description:
          'Des jambes lisses en toute saison grâce à une technologie rapide qui couvre de grandes surfaces en un minimum de temps.',
        duration: '45 min',
        result: '6 à 8',
        price: 'dès 120 €',
        image: images.laserLeg,
        gallery: [images.laserLeg, images.uvBody, images.laserArm],
      },
      {
        id: 'laser-homme',
        name: 'Zones homme',
        subtitle: 'Dos, torse, épaules, contour de barbe',
        description:
          'Des protocoles adaptés à la pilosité masculine, pour une peau nette et un entretien simplifié.',
        duration: '30 min',
        result: '8 à 10',
        price: 'dès 60 €',
        image: images.laserArm,
        gallery: [images.laserArm, images.laserFace, images.laserLeg],
      },
    ],
    packs: {
      intro: 'Des forfaits avantageux pour traiter plusieurs zones au cours d’une même séance.',
      items: [
        { name: 'Aisselles + maillot classique', detail: 'Forfait 6 séances', price: '480 €' },
        { name: 'Jambes complètes + aisselles + maillot', detail: 'Forfait 6 séances', price: '1 190 €' },
        { name: 'Visage complet', detail: 'Forfait 6 séances', price: '320 €' },
      ],
    },
    steps: [
      { title: 'Consultation', text: 'Une première consultation obligatoire pour analyser votre peau, votre pilosité et définir votre protocole.' },
      { title: 'Préparation', text: 'Rasage de la zone 24h avant la séance, sans exposition au soleil dans les 2 semaines précédentes.' },
      { title: 'Séance', text: 'Le laser diode cible le follicule pileux. Une sensation de chaleur légère, rapidement apaisée.' },
      { title: 'Suivi', text: 'Les séances sont espacées de 4 à 8 semaines selon la zone, avec un suivi des résultats à chaque visite.' },
    ],
    precautions: [
      'Pas d’exposition au soleil ni d’autobronzant 2 semaines avant et après la séance.',
      'Ne pas épiler à la cire ou à la pince entre les séances (rasage uniquement).',
      'Signalez tout traitement photosensibilisant ou toute grossesse en cours.',
    ],
    aftercare: [
      'Appliquez une crème apaisante sur la zone traitée.',
      'Protégez la peau avec un écran SPF 50 pendant toute la durée du traitement.',
      'Évitez hammam, sauna et sport intensif dans les 24 heures.',
    ],
  },
  {
    slug: 'beaute-du-regard',
    enabled: true,
    name: 'Beauté du regard',
    shortName: 'Beauté du regard',
    menuLabel: 'Beauté du regard',
    discoverLabel: 'Découvrir la beauté du regard',
    overviewEyebrow: 'Révélez votre regard',
    overviewTitle: 'Beauté du regard',
    tagline: 'Un regard plus intense, naturellement',
    description:
      'Des prestations sur-mesure pour sublimer vos cils et sourcils : rehaussement, brow lift, teinture, soins nourrissants et plus encore.',
    heroDescription:
      'Des prestations sur-mesure pour sublimer vos cils et sourcils, avec des résultats naturels et élégants, adaptés à votre regard et à votre style.',
    image: images.eyeLashes,
    heroImage: images.eyeLashes,
    overviewBenefits: [
      { icon: Eye, label: 'Un regard sublimé' },
      { icon: Sparkles, label: 'Des résultats naturels' },
      { icon: HeartHandshake, label: 'Des soins adaptés à vos besoins' },
    ],
    benefits: [
      { icon: Eye, label: 'Un regard sublimé naturellement' },
      { icon: Wand2, label: 'Des techniques expertes' },
      { icon: Droplets, label: 'Des produits de qualité' },
      { icon: Sparkles, label: 'Des résultats sur-mesure' },
      { icon: UserRound, label: 'Un accompagnement personnalisé' },
    ],
    resultLabel: 'Résultat',
    treatments: [
      {
        id: 'rehaussement-de-cils',
        name: 'Rehaussement de cils',
        subtitle: 'Des cils naturellement plus longs et courbés',
        description:
          'Le rehaussement de cils permet de recourber vos cils naturels de façon durable, pour un regard plus ouvert et lumineux, sans extensions. Cette technique sublime la beauté de votre regard tout en restant naturelle.',
        duration: '45 min',
        result: '6 à 8 semaines',
        price: '70 €',
        image: images.eyeLashes,
        gallery: [images.eyeClosed, images.lashTreatment, images.lashTech],
      },
      {
        id: 'korean-lash-lift',
        name: 'Korean Lash Lift',
        subtitle: 'Un effet courbé et allongé, inspiré des techniques coréennes',
        description:
          'Le Korean Lash Lift est une version avancée du rehaussement de cils. Il offre une courbure plus marquée et un effet allongé dès la racine, idéal pour un rendu sophistiqué et durable.',
        duration: '1h',
        result: '8 à 10 semaines',
        price: '80 €',
        image: images.eyeClosed,
        gallery: [images.eyeLashes, images.lashTech, images.lashBrowCare],
      },
      {
        id: 'brow-lift',
        name: 'Brow Lift',
        subtitle: 'Des sourcils disciplinés et structurés',
        description:
          'Le Brow Lift permet de restructurer et discipliner vos sourcils pour un effet plus fourni et harmonieux. Cette technique fixe les poils dans la direction souhaitée pour un résultat naturel et élégant.',
        duration: '45 min',
        result: '6 à 8 semaines',
        price: '70 €',
        image: images.browTweezers,
        gallery: [images.eyeBrow, images.browCare, images.browPortrait],
      },
      {
        id: 'bleach-brow',
        name: 'Bleach Brow',
        subtitle: 'Des sourcils plus lumineux',
        description:
          'Le Bleach Brow éclaircit naturellement vos sourcils pour un rendu plus doux et harmonieux. Il permet d’adoucir le regard et de créer un effet plus tendance, idéal pour un maquillage léger ou naturel.',
        duration: '30 min',
        result: '4 à 6 semaines',
        price: '40 €',
        image: images.browPortrait,
        gallery: [images.eyeBrow, images.browTweezers, images.browCare],
      },
      {
        id: 'teinture-cils-sourcils',
        name: 'Teinture cils et sourcils',
        subtitle: 'Un regard intense au naturel',
        description:
          'La teinture permet d’intensifier la couleur de vos cils et/ou sourcils pour un effet plus marqué, sans maquillage. Idéal pour un regard défini et un résultat naturel.',
        duration: '30 min',
        result: '3 à 4 semaines',
        price: '30 €',
        image: images.lashBrowCare,
        gallery: [images.eyeLashes, images.eyeBrow, images.lashTreatment],
      },
    ],
    packs: {
      intro: 'Découvrez nos packs exclusifs pour sublimer votre regard avec plusieurs prestations combinées, à un tarif avantageux.',
      items: [
        { name: 'Rehaussement de cils + Teinture', detail: '1h', price: '85 €' },
        { name: 'Brow Lift + Teinture', detail: '1h', price: '85 €' },
        { name: 'Pack complet (Rehaussement + Brow Lift + Teinture)', detail: '1h45', price: '140 €' },
      ],
    },
    steps: [
      { title: 'Diagnostic', text: 'Analyse de vos cils et sourcils pour choisir la courbure, la forme et la teinte adaptées.' },
      { title: 'Préparation', text: 'Nettoyage et protection de la zone pour une prestation précise et confortable.' },
      { title: 'Prestation', text: 'Application des produits professionnels, dans un temps de pose maîtrisé.' },
      { title: 'Finitions', text: 'Soin nourrissant à la kératine et conseils personnalisés pour prolonger le résultat.' },
    ],
    precautions: [
      'Venez sans maquillage des yeux ni lentilles de contact.',
      'Prestation déconseillée en cas d’irritation ou d’infection oculaire.',
      'Un test d’allergie peut être réalisé 48h avant la première teinture.',
    ],
    aftercare: [
      'Ne mouillez pas vos cils ni vos sourcils pendant 24h.',
      'Évitez le mascara waterproof et le démaquillant huileux 48h.',
      'Appliquez un sérum nourrissant pour cils et sourcils au quotidien.',
    ],
  },
  {
    slug: 'soins-visage-head-spa',
    enabled: true,
    name: 'Soins visage & Head Spa',
    shortName: 'Soins visage & Head Spa',
    menuLabel: 'Soins visage & Head Spa',
    discoverLabel: 'Découvrir les soins visage & Head Spa',
    overviewEyebrow: 'Soins visage & Head Spa',
    overviewTitle: 'Bien-être et expertise',
    tagline: 'Des soins professionnels pour une peau éclatante',
    description:
      'Des protocoles experts pour répondre aux besoins spécifiques de votre peau, associés à l’expérience unique du Head Spa pour une détente profonde et un cuir chevelu revitalisé.',
    heroDescription:
      'Des soins visage sur-mesure et un rituel Head Spa d’inspiration japonaise, pour une peau éclatante et un moment de relaxation profonde.',
    image: images.headSpa,
    heroImage: images.headSpa,
    overviewBenefits: [
      { icon: Sparkles, label: 'Une peau plus saine et éclatante' },
      { icon: Leaf, label: 'Une relaxation profonde' },
      { icon: HeartHandshake, label: 'Des protocoles sur mesure' },
    ],
    benefits: [
      { icon: Sparkles, label: 'Une peau éclatante' },
      { icon: Leaf, label: 'Une relaxation profonde' },
      { icon: Droplets, label: 'Des produits professionnels' },
      { icon: Wand2, label: 'Des protocoles sur mesure' },
      { icon: UserRound, label: 'Un accompagnement personnalisé' },
    ],
    resultLabel: 'Résultat',
    treatments: [
      {
        id: 'soin-visage-signature',
        name: 'Soin visage signature',
        subtitle: 'Nettoyage, exfoliation, masque et massage',
        description:
          'Notre soin complet, adapté à votre peau du jour : il purifie, hydrate et redonne éclat et confort, dans un moment de pure détente.',
        duration: '1h',
        result: 'Éclat immédiat',
        price: '90 €',
        image: images.facialMask,
        gallery: [images.facialCream, images.facialSkin, images.facialMassage],
      },
      {
        id: 'soin-hydratant-intense',
        name: 'Soin hydratant intense',
        subtitle: 'Pour les peaux sèches ou déshydratées',
        description:
          'Une hydratation en profondeur grâce à des actifs repulpants et un masque nourrissant, pour une peau souple et lumineuse.',
        duration: '1h15',
        result: 'Peau repulpée',
        price: '110 €',
        image: images.facialCream,
        gallery: [images.facialSkin, images.facialMask, images.portraitSkin],
      },
      {
        id: 'head-spa',
        name: 'Head Spa',
        subtitle: 'Rituel du cuir chevelu d’inspiration japonaise',
        description:
          'Diagnostic du cuir chevelu, nettoyage profond, massage relaxant et soin capillaire : un rituel complet pour apaiser l’esprit et revitaliser la chevelure.',
        duration: '1h',
        result: 'Détente profonde',
        price: '85 €',
        image: images.headSpa,
        gallery: [images.headSpa, images.facialMassage, images.instituteTable],
      },
      {
        id: 'head-spa-visage',
        name: 'Head Spa & soin visage',
        subtitle: 'L’expérience bien-être complète',
        description:
          'L’association du rituel Head Spa et de notre soin visage signature, pour une parenthèse de bien-être de la tête aux épaules.',
        duration: '1h30',
        result: 'Éclat & relaxation',
        price: '140 €',
        image: images.facialMassage,
        gallery: [images.headSpa, images.facialMask, images.facialCream],
      },
    ],
    steps: [
      { title: 'Diagnostic', text: 'Analyse de votre peau ou de votre cuir chevelu pour adapter le protocole.' },
      { title: 'Purification', text: 'Nettoyage en profondeur et exfoliation douce.' },
      { title: 'Soin', text: 'Application des actifs ciblés, masque et massage relaxant.' },
      { title: 'Conseils', text: 'Recommandations personnalisées pour prolonger les bienfaits à la maison.' },
    ],
    precautions: [
      'Signalez toute allergie ou traitement dermatologique en cours.',
      'Évitez les gommages et peelings dans les 48h précédant le soin.',
    ],
    aftercare: [
      'Hydratez votre peau matin et soir.',
      'Évitez le maquillage dans les heures qui suivent le soin.',
      'Appliquez une protection solaire au quotidien.',
    ],
  },
  {
    slug: 'blanchiment-strass-dentaires',
    enabled: true,
    name: 'Blanchiment & strass dentaires',
    shortName: 'Blanchiment & strass dentaires',
    menuLabel: 'Blanchiment & strass',
    discoverLabel: 'Découvrir le blanchiment & les strass',
    overviewEyebrow: 'Sourire éclatant',
    overviewTitle: 'Blanchiment & strass dentaires',
    tagline: 'Un sourire plus blanc, plus unique',
    description:
      'Des prestations sûres et efficaces pour illuminer votre sourire, avec la possibilité de personnaliser votre style grâce aux strass dentaires.',
    heroDescription:
      'Un blanchiment esthétique doux et sécurisé, et des strass dentaires pour un sourire lumineux qui vous ressemble.',
    image: images.smile,
    heroImage: images.smile,
    overviewBenefits: [
      { icon: Smile, label: 'Des résultats visibles' },
      { icon: ShieldCheck, label: 'Sécurité et confort' },
      { icon: Gem, label: 'Un style personnalisé' },
    ],
    benefits: [
      { icon: Smile, label: 'Un sourire éclatant' },
      { icon: ShieldCheck, label: 'Des produits conformes' },
      { icon: Timer, label: 'Une séance rapide' },
      { icon: Gem, label: 'Un style personnalisé' },
      { icon: HeartHandshake, label: 'Un accompagnement attentif' },
    ],
    resultLabel: 'Résultat',
    treatments: [
      {
        id: 'blanchiment-dentaire',
        name: 'Blanchiment dentaire',
        subtitle: 'Un sourire visiblement plus blanc',
        description:
          'Un blanchiment esthétique par lumière LED et gel conforme à la réglementation, pour éclaircir votre sourire en une séance, sans douleur.',
        duration: '1h',
        result: 'Jusqu’à 6 mois',
        price: '89 €',
        image: images.smile,
        gallery: [images.smileProfile, images.smileLaugh, images.smile],
      },
      {
        id: 'strass-dentaire',
        name: 'Strass dentaire',
        subtitle: 'Une touche brillante et unique',
        description:
          'La pose d’un strass sur l’émail, sans perçage ni altération de la dent, pour personnaliser votre sourire en toute sécurité.',
        duration: '20 min',
        result: 'Plusieurs mois',
        price: '30 €',
        image: images.smileProfile,
        gallery: [images.smile, images.smileLaugh, images.smileProfile],
      },
      {
        id: 'blanchiment-strass',
        name: 'Blanchiment + strass',
        subtitle: 'L’éclat complet',
        description: 'Une séance de blanchiment suivie de la pose d’un strass, pour un sourire lumineux et singulier.',
        duration: '1h20',
        result: 'Jusqu’à 6 mois',
        price: '109 €',
        image: images.smileLaugh,
        gallery: [images.smile, images.smileProfile, images.smileLaugh],
      },
    ],
    steps: [
      { title: 'Évaluation', text: 'Vérification de la teinte de départ et de l’absence de contre-indications.' },
      { title: 'Préparation', text: 'Protection des gencives et application du gel blanchissant.' },
      { title: 'Activation', text: 'Séance sous lumière LED, confortable et sans douleur.' },
      { title: 'Résultat', text: 'Comparaison de la teinte et conseils pour préserver l’éclat.' },
    ],
    precautions: [
      'Prestation réservée aux personnes majeures.',
      'Déconseillée en cas de caries, de sensibilité dentaire importante ou de grossesse.',
    ],
    aftercare: [
      'Évitez café, thé, vin rouge et tabac pendant 48h.',
      'Utilisez un dentifrice doux et non abrasif.',
    ],
  },
  {
    slug: 'cabine-uv',
    enabled: true,
    name: 'Cabine UV',
    shortName: 'Cabine UV',
    menuLabel: 'Cabine UV',
    discoverLabel: 'Découvrir la cabine UV',
    overviewEyebrow: 'Cabine UV',
    overviewTitle: 'Un teint lumineux toute l’année',
    tagline: 'Un bronzage naturel et maîtrisé',
    description:
      'Profitez d’une cabine UV dernière génération pour un bronzage uniforme, naturel et lumineux, en toute sécurité.',
    heroDescription: 'Une cabine UV de dernière génération, des séances encadrées et un bronzage progressif, uniforme et naturel.',
    image: images.uvGlow,
    heroImage: images.uvGlow,
    overviewBenefits: [
      { icon: Sun, label: 'Un teint naturel' },
      { icon: ShieldCheck, label: 'Des séances sécurisées' },
      { icon: SunMedium, label: 'Un résultat progressif' },
    ],
    benefits: [
      { icon: Sun, label: 'Un teint naturel' },
      { icon: ShieldCheck, label: 'Des séances encadrées' },
      { icon: Clock, label: 'Des séances courtes' },
      { icon: SunMedium, label: 'Un résultat progressif' },
      { icon: HeartHandshake, label: 'Des conseils personnalisés' },
    ],
    resultLabel: 'Résultat',
    treatments: [
      {
        id: 'uv-seance',
        name: 'Séance UV',
        subtitle: 'Une séance à l’unité',
        description: 'Une séance encadrée, dont la durée est adaptée à votre phototype, pour un hâle lumineux et uniforme.',
        duration: '10 min',
        result: 'Progressif',
        price: '12 €',
        image: images.uvGlow,
        gallery: [images.uvBody, images.uvGlow, images.portrait],
      },
      {
        id: 'uv-carte-5',
        name: 'Carte 5 séances',
        subtitle: 'Pour entretenir votre bronzage',
        description: 'Une carte valable 3 mois pour un teint lumineux en toute saison.',
        duration: '5 × 10 min',
        result: 'Progressif',
        price: '55 €',
        image: images.uvBody,
        gallery: [images.uvGlow, images.uvBody, images.portrait],
      },
      {
        id: 'uv-carte-10',
        name: 'Carte 10 séances',
        subtitle: 'Le meilleur tarif',
        description: 'Une carte valable 6 mois, idéale pour préparer l’été ou entretenir votre hâle.',
        duration: '10 × 10 min',
        result: 'Progressif',
        price: '100 €',
        image: images.uvGlow,
        gallery: [images.uvBody, images.uvGlow, images.portrait],
      },
    ],
    steps: [
      { title: 'Phototype', text: 'Détermination de votre phototype et de la durée adaptée lors de la première visite.' },
      { title: 'Préparation', text: 'Peau propre et sans parfum, lunettes de protection fournies.' },
      { title: 'Séance', text: 'Une séance courte dans une cabine désinfectée après chaque passage.' },
      { title: 'Espacement', text: 'Un délai minimum de 48h entre deux séances.' },
    ],
    precautions: [
      'Interdit aux personnes de moins de 18 ans.',
      'Déconseillé aux peaux de phototype I et en cas de traitement photosensibilisant.',
      'Port des lunettes de protection obligatoire.',
    ],
    aftercare: [
      'Hydratez votre peau après chaque séance.',
      'Respectez un délai de 48h entre deux séances.',
    ],
  },
]

export const activeCategories = categories.filter((category) => category.enabled)

export const findCategory = (slug: string | undefined) => activeCategories.find((category) => category.slug === slug)

export const allTreatments = activeCategories.flatMap((category) =>
  category.treatments.map((treatment) => ({ ...treatment, category })),
)

export const findTreatment = (id: string) => allTreatments.find((treatment) => treatment.id === id)

export const categoryPath = (slug: string) => `/prestations/${slug}`
