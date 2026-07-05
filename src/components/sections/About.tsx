import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'

const principles = [
  {
    title: 'Trato directo',
    text: 'De principio a fin hablas con la persona que escribe el código. Las decisiones se toman rápido y nada se pierde en el camino.',
  },
  {
    title: 'Hecho a la medida',
    text: 'Cada proyecto empieza en una hoja en blanco. Las plantillas se notan — y tu negocio no se parece a ningún otro.',
  },
  {
    title: 'Claridad ante todo',
    text: 'Tiempos, costos y avances sobre la mesa desde el día uno. Siempre sabes en qué va tu proyecto.',
  },
]

export function About() {
  return (
    <section id="sobre-mi" className="scroll-mt-28 py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <SectionHeader kicker="Sobre mí" title="Hola, soy José." />
          <p data-reveal className="mt-6 leading-relaxed text-fog-400">
            Me dedico a construir cosas en internet: sitios que se sienten
            premium, automatizaciones que ahorran horas de trabajo repetitivo
            y experiencias interactivas que la gente recuerda. Soy de los que
            se quedan puliendo un detalle que quizá nadie note — porque ese
            detalle es la diferencia entre algo que funciona y algo que se
            siente bien.
          </p>
          <p data-reveal className="mt-4 leading-relaxed text-fog-400">
            Trabajas directamente conmigo, de la primera llamada a la entrega.
            Sin intermediarios, sin tecnicismos innecesarios y sin promesas
            infladas: me cuentas qué necesita tu negocio, te digo con
            honestidad qué haría yo — y lo construimos juntos.
          </p>
        </div>

        <ul className="flex flex-col gap-4 lg:justify-center">
          {principles.map((principle) => (
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
