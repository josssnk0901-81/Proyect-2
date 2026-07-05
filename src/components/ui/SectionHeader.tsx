type SectionHeaderProps = {
  kicker: string
  title: string
  lead?: string
}

/** Encabezado estándar de sección: kicker + título + entrada opcional. */
export function SectionHeader({ kicker, title, lead }: SectionHeaderProps) {
  return (
    <div data-reveal className="max-w-2xl">
      <p className="text-xs font-medium tracking-[0.25em] text-volt-400 uppercase">
        {kicker}
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {lead && <p className="mt-4 leading-relaxed text-fog-400">{lead}</p>}
    </div>
  )
}
