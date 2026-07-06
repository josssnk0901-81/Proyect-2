import { useRef } from 'react'
import type { MouseEvent } from 'react'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useI18n } from '@/i18n'

/** Tarjeta glass con luz que sigue al cursor (solo se nota en desktop). */
function ServiceCard({
  index,
  title,
  text,
}: {
  index: number
  title: string
  text: string
}) {
  const ref = useRef<HTMLLIElement>(null)

  function handleMouseMove(event: MouseEvent<HTMLLIElement>) {
    const card = ref.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
    card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
  }

  return (
    <li
      ref={ref}
      data-reveal
      onMouseMove={handleMouseMove}
      className="group glass relative overflow-hidden rounded-2xl p-7"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(340px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgb(47 102 255 / 0.14), transparent 65%)',
        }}
      />
      <div className="relative">
        <span className="font-display text-sm text-volt-400">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="mt-3 font-display text-lg font-semibold">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-fog-400">{text}</p>
      </div>
    </li>
  )
}

export function Services() {
  const { t } = useI18n()

  return (
    <section id="servicios" className="scroll-mt-28 py-20 sm:py-24">
      <Container>
        <SectionHeader
          kicker={t.services.kicker}
          title={t.services.title}
          lead={t.services.lead}
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {t.services.items.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
