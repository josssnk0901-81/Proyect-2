import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'

const rowA = ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Three.js', 'GSAP', 'Motion', 'Vite']
const rowB = ['Node.js', 'n8n', 'Airtable', 'Docker', 'Git', 'Linux', 'APIs y webhooks']

/** Una pasada de chips; el track lleva dos (la segunda oculta a lectores). */
function ChipRow({ items, hidden = false }: { items: string[]; hidden?: boolean }) {
  return (
    <div aria-hidden={hidden || undefined} className="flex gap-4 pr-4">
      {items.map((item) => (
        <span
          key={item}
          className="glass flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm whitespace-nowrap text-fog-300"
        >
          <span className="size-1.5 rounded-full bg-volt-400" />
          {item}
        </span>
      ))}
    </div>
  )
}

/**
 * Fila infinita: dos copias idénticas y translateX(-50%) para el bucle.
 * Solo la primera copia es legible por lectores de pantalla — la segunda
 * es puro relleno visual del loop.
 */
function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div
        className={`flex w-max animate-[marquee_45s_linear_infinite] ${
          reverse ? '[animation-direction:reverse]' : ''
        }`}
      >
        <ChipRow items={items} />
        <ChipRow items={items} hidden />
      </div>
    </div>
  )
}

export function TechStack() {
  return (
    <section id="tecnologias" className="scroll-mt-28 py-20 sm:py-24">
      <Container>
        <SectionHeader
          kicker="Tecnologías"
          title="Con lo que trabajo"
          lead="Las mismas herramientas detrás de los productos que usas todos los días — elegidas por rendimiento, no por moda."
        />
      </Container>
      <div data-reveal className="mt-10 flex flex-col gap-4">
        <MarqueeRow items={rowA} />
        <MarqueeRow items={rowB} reverse />
      </div>
    </section>
  )
}
