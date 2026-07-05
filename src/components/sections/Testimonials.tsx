import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * NOTA: testimonios de ejemplo, coherentes con los proyectos del portafolio.
 * Reemplazar por reseñas reales conforme lleguen. Carrusel manual —
 * sin autoplay agresivo, como pide el brief.
 */
const testimonials = [
  {
    quote:
      'Dejé de contestar las mismas preguntas con cada huésped. Ahora acercan el teléfono a la tarjeta y tienen todo: el wifi, cómo funciona la casa, qué visitar. Se ve carísimo y lo armó en unos días.',
    name: 'Mónica Sanz',
    role: 'Anfitriona · Cabaña Serendipia, Chiapas',
  },
  {
    quote:
      'Lo que más me gustó es que trato directo con él, sin vueltas. Me explicó qué convenía y qué no, cumplió los tiempos que dijo, y el resultado se siente de otro nivel.',
    name: 'Constructora Santa Elena',
    role: 'Automatización de cotizaciones y facturas',
  },
  {
    quote:
      'Quería una página que no pareciera plantilla y eso fue justo lo que entregó: moderna, rapidísima en el celular y con las citas conectadas a WhatsApp. Mis pacientes llegan diciendo que se ve muy profesional.',
    name: 'Dra. Paola Rivas',
    role: 'Clínica dental · Sitio web y citas',
  },
]

export function Testimonials() {
  const [active, setActive] = useState(0)
  const current = testimonials[active]

  return (
    <section id="testimonios" className="scroll-mt-28 py-20 sm:py-24">
      <Container>
        <SectionHeader
          kicker="Testimonios"
          title="Lo que dicen quienes ya trabajaron conmigo"
        />

        <div data-reveal className="mt-10">
          {/* aria-live anuncia el cambio de cita a lectores de pantalla;
              la key remonta el contenido y dispara el fade de entrada */}
          <figure aria-live="polite" className="glass rounded-3xl p-8 sm:p-12">
            <span
              aria-hidden
              className="font-display text-6xl leading-none text-volt-500/40"
            >
              &ldquo;
            </span>
            <div key={active} className="animate-[fade-in_0.4s_ease-out]">
              <blockquote className="-mt-6 text-lg leading-relaxed text-fog-300 text-balance sm:text-xl">
                {current.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="grid size-11 place-items-center rounded-full bg-volt-500/15 font-display font-semibold text-volt-300">
                  {current.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-medium text-snow">{current.name}</span>
                  <span className="block text-sm text-fog-500">{current.role}</span>
                </span>
              </figcaption>
            </div>
          </figure>

          {/* Controles — puntos, sin autoplay */}
          <div className="mt-6 flex justify-center gap-2.5">
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Ver testimonio ${index + 1}`}
                aria-current={index === active}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === active
                    ? 'w-7 bg-volt-500'
                    : 'w-2 bg-snow/20 hover:bg-snow/40'
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
