import { ArrowRight, Gem, HeartHandshake, Leaf, ShieldCheck } from 'lucide-react'
import { DiscoverWorldButton } from '../components/institute/DiscoverWorldButton'
import { TheSpaceSection } from '../components/institute/TheSpaceSection'
import { BookButton } from '../components/ui/BookButton'
import { ButtonLink } from '../components/ui/ButtonLink'
import { CtaBand } from '../components/ui/CtaBand'
import { PageHero } from '../components/ui/PageHero'
import { Photo } from '../components/ui/Photo'
import { Reveal } from '../components/ui/Reveal'
import { SectionTitle } from '../components/ui/SectionTitle'
import { images } from '../data/images'
import { usePageMeta } from '../hooks/usePageMeta'

const team = [
  { role: 'Fondatrice & experte laser', text: 'Formée aux dernières technologies d’épilation, elle a imaginé ERA Beauty comme un lieu d’exception.', image: images.laserFace },
  { role: 'Spécialiste du regard', text: 'Rehaussement de cils, brow lift et teintures : un œil précis pour un résultat naturel.', image: images.lashBrowCare },
  { role: 'Praticienne soins visage', text: 'Diagnostic de peau, soins sur-mesure et rituels Head Spa d’inspiration japonaise.', image: images.facialMassage },
]

const values = [
  { icon: Gem, title: 'Exigence', text: 'Des technologies performantes et des produits professionnels sélectionnés avec soin.' },
  { icon: HeartHandshake, title: 'Écoute', text: 'Chaque prestation commence par un échange pour comprendre vos besoins et vos attentes.' },
  { icon: ShieldCheck, title: 'Sécurité', text: 'Des protocoles rigoureux, une hygiène irréprochable et des praticiennes formées.' },
  { icon: Leaf, title: 'Bien-être', text: 'Un cadre apaisant, pensé pour que chaque visite soit un moment pour vous.' },
]

export function InstitutePage() {
  usePageMeta('L’institut', 'Découvrez l’institut ERA Beauty à Saint-Cloud : notre histoire, notre équipe, nos valeurs et notre lieu.')

  return (
    <>
      <PageHero
        eyebrow="L’institut"
        title={
          <>
            Bien plus qu’un <br />
            institut, une <br />
            expérience.
          </>
        }
        text="Un lieu dédié à la beauté, au bien-être et à la technologie, où chaque détail est pensé pour vous."
        image={images.instituteHero}
        breadcrumb={[{ label: 'Accueil', to: '/' }, { label: 'L’institut' }]}
      >
        <BookButton />
        <DiscoverWorldButton />
      </PageHero>

      <section id="presentation" data-anchor className="container-x grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <Reveal>
          <SectionTitle number="01" eyebrow="Présentation" title="Une adresse dédiée à votre beauté" />
          <p className="mt-6 leading-relaxed text-ink/70">
            ERA Beauty est né d’une conviction : la beauté se révèle lorsque l’on se sent bien. Notre institut réunit des technologies de dernière
            génération et un savoir-faire attentif pour vous proposer des prestations d’exception, de l’épilation laser diode à la beauté du regard.
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            Chaque rendez-vous commence par l’écoute. Nous prenons le temps de comprendre vos attentes pour vous proposer un accompagnement
            personnalisé, avec des résultats naturels et durables.
          </p>
          <ButtonLink to="/prestations" variant="outline" className="mt-8" icon={<ArrowRight size={13} />}>
            Nos prestations
          </ButtonLink>
        </Reveal>
        <Reveal delay={0.1}>
          <Photo src={images.instituteRoom} alt="Cabine de soin ERA Beauty" className="aspect-[4/5] rounded-[28px]" curtainClassName="bg-ivory" />
        </Reveal>
      </section>

      <section id="equipe" data-anchor className="bg-cream/50 py-16 lg:py-24">
        <div className="container-x">
          <SectionTitle number="02" eyebrow="Notre équipe" title="Des expertes à votre écoute" />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {team.map((member, index) => (
              <li key={member.role}>
                <Reveal delay={index * 0.08} className="overflow-hidden rounded-2xl bg-ivory">
                  <img src={member.image} alt="" loading="lazy" className="photo-warm aspect-[4/3] w-full object-cover" />
                  <div className="p-6">
                    <p className="title-caps text-xl text-ink">{member.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">{member.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="valeurs" data-anchor className="container-x py-16 lg:py-24">
        <SectionTitle number="03" eyebrow="Nos valeurs" title="Ce qui nous guide au quotidien" />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }, index) => (
            <li key={title}>
              <Reveal delay={index * 0.06} className="h-full rounded-2xl border border-ink/10 p-7">
                <Icon aria-hidden size={26} strokeWidth={1.2} className="text-oxblood" />
                <p className="title-caps mt-5 text-xl text-ink">{title}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <TheSpaceSection id="lieu" />

      <CtaBand
        image={images.instituteHero}
        title="Venez découvrir l’institut"
        text="Nous serons ravies de vous accueillir et de vous accompagner dans votre parcours beauté."
        action={<BookButton />}
      />
    </>
  )
}
