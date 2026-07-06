import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useI18n } from '@/i18n'
import type { Translation } from '@/i18n/translations'

type Project = Translation['portfolio']['projects'][number]

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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useI18n()
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
                  [t.portfolio.retoLabel, project.reto],
                  [t.portfolio.solucionLabel, project.solucion],
                  [t.portfolio.resultadoLabel, project.resultado],
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
          {open ? t.portfolio.closeCase : t.portfolio.seeCase}
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
  const { t } = useI18n()

  return (
    <section id="portafolio" className="scroll-mt-28 py-20 sm:py-24">
      <Container>
        <SectionHeader
          kicker={t.portfolio.kicker}
          title={t.portfolio.title}
          lead={t.portfolio.lead}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:gap-5">
          {t.portfolio.projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
