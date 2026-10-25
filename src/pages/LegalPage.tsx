import { Breadcrumb } from '../components/ui/Breadcrumb'
import { contact } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

// Textes à compléter avec les informations légales réelles de l'institut.
const pages = {
  mentions: {
    title: 'Mentions légales',
    sections: [
      {
        heading: 'Éditeur du site',
        text: `ERA Beauty — ${contact.street}, ${contact.city}. Téléphone : ${contact.phoneDisplay}. E-mail : ${contact.email}. Forme juridique, capital, SIRET et numéro de TVA : à compléter.`,
      },
      { heading: 'Directeur de la publication', text: 'Nom du responsable légal : à compléter.' },
      { heading: 'Hébergement', text: 'Nom, adresse et téléphone de l’hébergeur du site : à compléter.' },
      {
        heading: 'Propriété intellectuelle',
        text: 'L’ensemble des contenus de ce site (textes, images, logos) est protégé par le droit de la propriété intellectuelle. Toute reproduction sans autorisation est interdite.',
      },
    ],
  },
  confidentialite: {
    title: 'Politique de confidentialité',
    sections: [
      {
        heading: 'Données collectées',
        text: 'Nous collectons uniquement les données que vous nous transmettez via nos formulaires (nom, e-mail, téléphone, message) et, avec votre accord, des données de mesure d’audience.',
      },
      {
        heading: 'Finalités',
        text: 'Vos données sont utilisées pour répondre à vos demandes, gérer vos rendez-vous et, si vous l’avez accepté, vous envoyer notre newsletter.',
      },
      { heading: 'Durée de conservation', text: 'Les données sont conservées pendant 3 ans à compter du dernier contact, puis supprimées.' },
      {
        heading: 'Vos droits',
        text: `Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’effacement et d’opposition. Pour l’exercer, écrivez-nous à ${contact.email}.`,
      },
      {
        heading: 'Cookies',
        text: 'Les cookies non essentiels ne sont déposés qu’avec votre consentement. Vous pouvez modifier vos choix à tout moment via le lien « Gestion des cookies » en bas de page.',
      },
    ],
  },
}

export function LegalPage({ kind }: { kind: keyof typeof pages }) {
  const page = pages[kind]
  usePageMeta(page.title)

  return (
    <article className="container-x max-w-3xl pt-32 pb-20">
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: page.title }]} className="flex" />
      <h1 className="title-caps mt-8 text-4xl text-ink sm:text-5xl">{page.title}</h1>
      <div className="mt-10 space-y-8">
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="title-caps text-xl text-ink">{section.heading}</h2>
            <p className="mt-3 leading-relaxed text-ink/70">{section.text}</p>
          </section>
        ))}
      </div>
    </article>
  )
}
