import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createReveal } from '@/lib/reveal'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useI18n } from '@/i18n'

gsap.registerPlugin(ScrollTrigger)

export function Process() {
  const scope = useRef<HTMLElement>(null)
  const { t } = useI18n()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // La línea de progreso se dibuja conforme avanza el scroll
      gsap.from('[data-process-line]', {
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-process-list]',
          start: 'top 75%',
          end: 'bottom 70%',
          scrub: true,
        },
      })

      // Cada paso aparece al entrar y vuelve a animar al reaparecer (mismo
      // comportamiento que el reveal general, sin quedar oculto a la vista)
      gsap.utils
        .toArray<HTMLElement>('[data-process-step]')
        .forEach((step) => createReveal(step, { y: 24, duration: 0.7 }))
    }, scope)

    return () => ctx.revert()
  }, [])

  return (
    <section id="proceso" ref={scope} className="scroll-mt-28 py-20 sm:py-24">
      <Container>
        <SectionHeader
          kicker={t.process.kicker}
          title={t.process.title}
          lead={t.process.lead}
        />
        <div data-process-list className="relative mt-12">
          {/* Riel de fondo y línea de progreso */}
          <div className="absolute top-2 bottom-2 left-[5px] w-0.5 bg-snow/10" />
          <div
            data-process-line
            className="absolute top-2 bottom-2 left-[5px] w-0.5 bg-volt-500"
          />
          <ol className="flex flex-col gap-10 pl-7">
            {t.process.steps.map((step, index) => (
              <li key={step.title} data-process-step className="relative">
                <span
                  aria-hidden
                  className="absolute top-1 -left-7 size-3 rounded-full border-2 border-volt-500 bg-night-950"
                />
                <p className="text-xs font-medium tracking-[0.2em] text-volt-400 uppercase">
                  {t.process.stepLabel} {index + 1}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-fog-400">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
