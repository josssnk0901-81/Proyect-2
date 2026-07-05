import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    title: 'Contacto',
    text: 'Me escribes por WhatsApp o agendas una llamada. Me cuentas tu idea y te digo, sin rodeos, si puedo ayudarte y cómo.',
  },
  {
    title: 'Planeación',
    text: 'Definimos juntos alcance, tiempos y precio. Todo por escrito desde el inicio, para que no haya sorpresas después.',
  },
  {
    title: 'Desarrollo',
    text: 'Construyo tu proyecto mostrándote avances reales que puedes abrir en tu teléfono — no maquetas — y ajustamos sobre la marcha.',
  },
  {
    title: 'Entrega',
    text: 'Publicamos juntos, probamos en dispositivos reales y te explico cómo usar y administrar lo que ahora es tuyo.',
  },
  {
    title: 'Soporte',
    text: 'No desaparezco al entregar: sigo al pendiente para dudas, ajustes y mejoras cuando las necesites.',
  },
]

export function Process() {
  const scope = useRef<HTMLElement>(null)

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

      // Cada paso aparece al llegar a su posición
      gsap.utils.toArray<HTMLElement>('[data-process-step]').forEach((step) => {
        gsap.from(step, {
          y: 24,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
            toggleActions: 'restart reverse restart reverse',
          },
        })
      })
    }, scope)

    return () => ctx.revert()
  }, [])

  return (
    <section id="proceso" ref={scope} className="scroll-mt-28 py-20 sm:py-24">
      <Container>
        <SectionHeader
          kicker="Proceso"
          title="De la idea a la entrega"
          lead="Sin misterio: así es trabajar conmigo, del primer mensaje al soporte después del lanzamiento."
        />
        <div data-process-list className="relative mt-12">
          {/* Riel de fondo y línea de progreso */}
          <div className="absolute top-2 bottom-2 left-[5px] w-0.5 bg-snow/10" />
          <div
            data-process-line
            className="absolute top-2 bottom-2 left-[5px] w-0.5 bg-volt-500"
          />
          <ol className="flex flex-col gap-10 pl-7">
            {steps.map((step, index) => (
              <li key={step.title} data-process-step className="relative">
                <span
                  aria-hidden
                  className="absolute top-1 -left-7 size-3 rounded-full border-2 border-volt-500 bg-night-950"
                />
                <p className="text-xs font-medium tracking-[0.2em] text-volt-400 uppercase">
                  Paso {index + 1}
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
