/**
 * Fondo global: gradientes radiales fijos con desenfoque.
 * Solo CSS — sin JS ni animaciones costosas, para no penalizar móviles.
 */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Luz principal detrás del hero */}
      <div className="absolute -top-48 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-volt-500/15 blur-[130px]" />
      {/* Luz secundaria a media página */}
      <div className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-volt-600/10 blur-[140px]" />
      {/* Luz tenue inferior izquierda */}
      <div className="absolute bottom-0 -left-40 h-[24rem] w-[24rem] rounded-full bg-volt-400/6 blur-[120px]" />
    </div>
  )
}
