import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * NOTA: los dos primeros casos están basados en proyectos reales;
 * el tercero es esta misma landing. Al cerrar nuevos trabajos,
 * agregar aquí el caso con la misma estructura.
 */
const projects = [
  {
    tag: 'Hospitalidad · NFC',
    title: 'Cabaña Serendipia — Guía digital para huéspedes',
    description:
      'Una guía premium que los huéspedes de un Airbnb abren acercando su teléfono a una tarjeta NFC dentro de la cabaña: wifi con un toque, guía de la casa, clima en tiempo real y recomendaciones locales en mapa. Sin descargar nada.',
    stack: ['Next.js', 'Tailwind CSS', 'Leaflet', 'NFC'],
    caseStudy: {
      reto: 'La anfitriona respondía las mismas preguntas con cada huésped — la clave del wifi, cómo funciona la casa, qué visitar cerca — y los manuales impresos nadie los lee.',
      solucion:
        'Guía web a la medida que se abre al instante con un toque NFC: secciones claras, clave de wifi que se copia con un botón, clima del lugar en vivo y recomendaciones con mapa interactivo.',
      resultado:
        'Los huéspedes encuentran todo solos y la anfitriona dejó de repetir respuestas. La guía se actualiza en minutos, sin reimprimir nada — y quedó lista para sumar más alojamientos.',
    },
  },
  {
    tag: 'Automatización · Construcción',
    title: 'Constructora Santa Elena — Cotizaciones y facturas en orden',
    description:
      'Sistema que centraliza las solicitudes de cotización, genera cada cotización con folio y seguimiento, y controla el estado de las facturas por obra y por cliente — con recordatorios automáticos antes de cada vencimiento.',
    stack: ['n8n', 'Airtable', 'WhatsApp'],
    caseStudy: {
      reto: 'Las cotizaciones se armaban a mano en Excel y las facturas se perseguían por WhatsApp: cada obra tenía sus números en un archivo distinto y nada aparecía cuando se necesitaba.',
      solucion:
        'Flujo con n8n + Airtable: las solicitudes entran a un tablero único, cada cotización sale con folio y estatus, y las facturas avisan solas cuándo vencen. Todo consultable por obra, cliente y periodo.',
      resultado:
        'La administración dejó de vivir en archivos sueltos: cotizaciones listas en minutos, facturas con estado claro y cero cobros olvidados.',
    },
  },
  {
    tag: 'Web · 3D',
    title: 'La tarjeta que estás viendo',
    description:
      'Mi propia tarjeta de presentación NFC: acercas el teléfono y se abre esta landing — 3D en el navegador, scroll cinematográfico y carga ligera. No tienes que imaginar el resultado: estás dentro de él.',
    stack: ['React', 'Three.js', 'GSAP', 'Lenis'],
    caseStudy: {
      reto: 'Una tarjeta de papel se tira o se pierde. Necesitaba una presentación que demostrara en cinco segundos, y en el teléfono de quien la recibe, lo que puedo construir.',
      solucion:
        'Landing con tarjeta 3D interactiva, animaciones de scroll y peso mínimo: el 3D se descarga aparte para que la página abra rápido hasta en un celular de gama media.',
      resultado:
        'Cada persona que recibe la tarjeta ve un producto real funcionando. Esta página es su propia prueba.',
    },
  },
]

/** Mockup de navegador dibujado con CSS — sin imágenes que pesen. */
function BrowserMockup({ variant }: { variant: number }) {
  return (
    <div className="relative flex h-44 items-end justify-center overflow-hidden bg-gradient-to-br from-volt-600/25 via-night-800 to-night-900 px-8 pt-8 sm:h-52">
      <div className="w-full max-w-sm rounded-t-xl border border-snow/10 bg-night-900/90 shadow-2xl transition-transform duration-500 group-hover:-translate-y-1.5">
        <div className="flex gap-1.5 border-b border-snow/5 px-3.5 py-2.5">
          <span className="size-2 rounded-full bg-snow/15" />
          <span className="size-2 rounded-full bg-snow/15" />
          <span className="size-2 rounded-full bg-volt-500/60" />
        </div>
        <div className="space-y-2 p-4">
          {variant === 0 && (
            <>
              <div className="h-2.5 w-2/3 rounded bg-snow/20" />
              <div className="h-2 w-1/2 rounded bg-snow/10" />
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="h-10 rounded-lg bg-volt-500/25" />
                <div className="h-10 rounded-lg bg-snow/8" />
                <div className="h-10 rounded-lg bg-snow/8" />
              </div>
            </>
          )}
          {variant === 1 && (
            <>
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-full bg-volt-500/30" />
                <div className="h-2.5 flex-1 rounded bg-snow/15" />
              </div>
              <div className="h-2 w-3/4 rounded bg-snow/10" />
              <div className="h-2 w-2/3 rounded bg-snow/10" />
              <div className="mt-2 h-7 w-28 rounded-md bg-volt-500/30" />
            </>
          )}
          {variant === 2 && (
            <>
              <div className="mx-auto h-14 w-24 rounded-lg bg-gradient-to-br from-volt-500/40 to-volt-600/20" />
              <div className="mx-auto h-2.5 w-1/2 rounded bg-snow/20" />
              <div className="mx-auto h-2 w-2/3 rounded bg-snow/10" />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number]
  index: number
}) {
  const [open, setOpen] = useState(false)
  const detailId = `caso-${index}`

  return (
    <article
      data-reveal
      className="group glass overflow-hidden rounded-3xl transition-shadow duration-300 hover:shadow-glow"
    >
      <BrowserMockup variant={index} />
      <div className="p-7 sm:p-8">
        <p className="text-xs font-medium tracking-[0.2em] text-volt-400 uppercase">
          {project.tag}
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-balance sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-fog-400 sm:text-base">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-snow/10 px-3 py-1 text-xs text-fog-300"
            >
              {tech}
            </li>
          ))}
        </ul>

        {/* Caso de éxito expandible */}
        <div
          id={detailId}
          className={`grid transition-[grid-template-rows] duration-500 ease-out ${
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <dl className="mt-6 space-y-4 border-t border-snow/10 pt-6">
              {(
                [
                  ['El reto', project.caseStudy.reto],
                  ['La solución', project.caseStudy.solucion],
                  ['El resultado', project.caseStudy.resultado],
                ] as const
              ).map(([label, text]) => (
                <div key={label}>
                  <dt className="text-xs font-medium tracking-[0.15em] text-volt-300 uppercase">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-fog-400">
                    {text}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={detailId}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-volt-300 transition-colors duration-200 hover:text-volt-400"
        >
          {open ? 'Cerrar el caso' : 'Ver el caso completo'}
          <span
            aria-hidden
            className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          >
            ↓
          </span>
        </button>
      </div>
    </article>
  )
}

export function Portfolio() {
  return (
    <section id="portafolio" className="scroll-mt-28 py-20 sm:py-24">
      <Container>
        <SectionHeader
          kicker="Portafolio"
          title="Proyectos que ya están funcionando"
          lead="No colecciono maquetas: estos son productos en uso, con problemas reales detrás. Toca cualquiera para ver el caso completo."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:gap-5">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
