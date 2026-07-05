import { site } from '@/config/site'
import { emailHref, externalProps } from '@/lib/links'
import { Container } from '@/components/ui/Container'

/**
 * CTA principal del sitio. Con `site.calendlyUrl` se embebe el calendario
 * (tematizado con los colores del sitio); sin URL, la reserva se coordina
 * por WhatsApp.
 */
export function Booking() {
  const whatsappBooking = `${site.contact.whatsappUrl}?text=${encodeURIComponent(
    'Hola José, me gustaría agendar una reunión para platicarte mi proyecto.',
  )}`

  // Parámetros de embed de Calendly: colores del sitio (hex sin #)
  const calendlyEmbed = site.calendlyUrl
    ? `${site.calendlyUrl}?hide_gdpr_banner=1&background_color=0f121c&text_color=f4f6fb&primary_color=2f66ff`
    : ''

  return (
    <section id="reserva" className="scroll-mt-28 py-20 sm:py-24">
      <Container>
        <div
          data-reveal
          className="glass relative overflow-hidden rounded-3xl p-8 text-center sm:p-14"
        >
          {/* Resplandor decorativo */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-volt-500/20 blur-[90px]"
          />

          <p className="text-xs font-medium tracking-[0.25em] text-volt-400 uppercase">
            Reserva
          </p>
          <h2 className="mx-auto mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            ¿Listo para empezar tu proyecto?
          </h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-fog-400">
            Agenda una llamada sin compromiso. Me cuentas tu idea, te digo qué
            haría yo y te doy un presupuesto claro.
          </p>

          {site.calendlyUrl ? (
            <>
              <iframe
                src={calendlyEmbed}
                title="Agenda una reunión — Calendly"
                loading="lazy"
                className="mt-8 h-[700px] w-full rounded-2xl border-0 bg-night-800"
              />
              <p className="mt-4 text-xs text-fog-500">
                ¿Prefieres WhatsApp?{' '}
                <a
                  href={whatsappBooking}
                  {...externalProps(whatsappBooking)}
                  className="text-volt-300 transition-colors duration-200 hover:text-volt-400"
                >
                  Escríbeme directo
                </a>
                .
              </p>
            </>
          ) : (
            <>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href={whatsappBooking}
                  {...externalProps(whatsappBooking)}
                  className="rounded-xl bg-volt-600 px-7 py-3.5 text-sm font-medium text-snow shadow-glow transition-colors duration-200 hover:bg-volt-500"
                >
                  Agendar por WhatsApp
                </a>
                <a
                  href={emailHref('Quiero agendar una reunión')}
                  {...externalProps(emailHref('Quiero agendar una reunión'))}
                  className="glass rounded-xl px-7 py-3.5 text-sm font-medium text-fog-300 transition-colors duration-200 hover:text-snow"
                >
                  O escríbeme un correo
                </a>
              </div>
              <p className="mt-5 text-xs text-fog-500">
                Normalmente respondo el mismo día.
              </p>
            </>
          )}
        </div>
      </Container>
    </section>
  )
}
