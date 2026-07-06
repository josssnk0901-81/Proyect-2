import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useI18n } from '@/i18n'

export function About() {
  const { t } = useI18n()

  return (
    <section id="sobre-mi" className="scroll-mt-28 py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <SectionHeader kicker={t.about.kicker} title={t.about.title} />
          <p data-reveal className="mt-6 leading-relaxed text-fog-400">
            {t.about.p1}
          </p>
          <p data-reveal className="mt-4 leading-relaxed text-fog-400">
            {t.about.p2}
          </p>
        </div>

        <ul className="flex flex-col gap-4 lg:justify-center">
          {t.about.principles.map((principle) => (
            <li key={principle.title} data-reveal className="glass rounded-2xl p-6">
              <h3 className="font-display font-semibold">{principle.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fog-400">
                {principle.text}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
