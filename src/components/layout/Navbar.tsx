import { useEffect, useState } from 'react'
// LazyMotion + m en vez de motion: solo carga las funciones de animación
// DOM que el menú necesita — recorta varios kB del bundle inicial
import { AnimatePresence, LazyMotion, domAnimation, m } from 'motion/react'
import { navLinks, site } from '@/config/site'

export function Navbar() {
  const [open, setOpen] = useState(false)

  // Con el menú abierto: bloquea el scroll del fondo y marca el contenido
  // como inert (el foco del teclado y los lectores se quedan en el menú)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const regions = document.querySelectorAll('main, footer')
    regions.forEach((el) => el.toggleAttribute('inert', open))
    return () => {
      document.body.style.overflow = ''
      regions.forEach((el) => el.removeAttribute('inert'))
    }
  }, [open])

  // Si la ventana crece a escritorio con el menú abierto, ciérralo —
  // evita dejar el fondo bloqueado con un menú que ya no se ve
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    const close = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false)
    }
    desktop.addEventListener('change', close)
    return () => desktop.removeEventListener('change', close)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Navegación principal"
        className="glass mx-auto mt-4 flex w-[calc(100%-2rem)] max-w-6xl items-center justify-between rounded-2xl px-5 py-3"
      >
        <a
          href="#inicio"
          onClick={() => setOpen(false)}
          className="font-display text-base font-semibold tracking-tight whitespace-nowrap sm:text-lg"
        >
          {site.name}
          <span className="text-volt-400">.</span>
        </a>

        <ul className="hidden items-center gap-7 text-sm text-fog-300 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="transition-colors duration-200 hover:text-snow"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* En pantallas mínimas el CTA vive dentro del menú móvil */}
          <a
            href="#reserva"
            onClick={() => setOpen(false)}
            className="hidden rounded-xl bg-volt-600 px-4 py-2 text-sm font-medium text-snow transition-colors duration-200 hover:bg-volt-500 min-[400px]:inline-flex"
          >
            Reservar
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className="grid size-9 place-items-center rounded-lg lg:hidden"
          >
            <span
              className={`absolute h-px w-5 bg-snow transition-transform duration-300 ${
                open ? 'rotate-45' : '-translate-y-[3px]'
              }`}
            />
            <span
              className={`absolute h-px w-5 bg-snow transition-transform duration-300 ${
                open ? '-rotate-45' : 'translate-y-[3px]'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Menú móvil a pantalla completa; queda debajo del navbar (z) para
          que el botón de cierre siga visible */}
      <LazyMotion features={domAnimation} strict>
        <AnimatePresence>
          {open && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 -z-10 h-svh bg-night-950/90 backdrop-blur-2xl lg:hidden"
            >
              <m.ul
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="flex h-full flex-col justify-center gap-6 px-8"
              >
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl font-semibold tracking-tight text-fog-300 transition-colors duration-200 hover:text-snow"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-4">
                <a
                  href="#reserva"
                  onClick={() => setOpen(false)}
                  className="inline-flex rounded-xl bg-volt-600 px-6 py-3 font-medium text-snow transition-colors duration-200 hover:bg-volt-500"
                >
                  Reservar una reunión
                </a>
              </li>
              </m.ul>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </header>
  )
}
