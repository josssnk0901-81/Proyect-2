import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container } from '@/components/ui/Container'

gsap.registerPlugin(ScrollTrigger)

// three.js se descarga aparte, sin bloquear la carga inicial
const HeroScene = lazy(() => import('@/components/three/HeroScene'))

export function Hero() {
  const scope = useRef<HTMLElement>(null)

  // La escena 3D se monta en tiempo idle: el texto y los CTAs pintan
  // primero, y three.js no compite con la carga inicial de la página
  const [showScene, setShowScene] = useState(false)
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => setShowScene(true), { timeout: 2000 })
      return () => cancelIdleCallback(id)
    }
    const timer = setTimeout(() => setShowScene(true), 350)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Entrada escalonada al cargar
      gsap.from('[data-hero-item]', {
        y: 34,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
      })
      // Al hacer scroll, el hero se desvanece con un parallax suave
      gsap.to('[data-hero-content]', {
        y: -70,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: scope.current,
          start: 'top top',
          end: 'bottom 30%',
          scrub: true,
        },
      })
    }, scope)

    return () => ctx.revert()
  }, [])

  return (
    <section id="inicio" ref={scope} className="relative flex min-h-svh items-center">
      <Container
        data-hero-content
        className="grid items-center gap-12 pt-32 pb-20 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="min-w-0">
          <p
            data-hero-item
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-fog-300"
          >
            <span className="size-1.5 animate-pulse rounded-full bg-volt-400" />
            Disponible para nuevos proyectos
          </p>

          <h1
            data-hero-item
            className="mt-6 max-w-2xl font-display text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            Ingeniería digital con{' '}
            <span className="bg-gradient-to-r from-volt-300 to-volt-500 bg-clip-text text-transparent">
              sello propio
            </span>
          </h1>

          <p data-hero-item className="mt-6 max-w-xl text-base text-fog-400 sm:text-lg">
            Desarrollo web, automatización y experiencias interactivas a la
            medida — rápidas, modernas y cuidadas hasta el último detalle.
          </p>

          <div data-hero-item className="mt-9 flex flex-wrap gap-4">
            <a
              href="#reserva"
              className="rounded-xl bg-volt-600 px-6 py-3 text-sm font-medium text-snow shadow-glow transition-colors duration-200 hover:bg-volt-500"
            >
              Reservar una reunión
            </a>
            <a
              href="#portafolio"
              className="glass rounded-xl px-6 py-3 text-sm font-medium text-fog-300 transition-colors duration-200 hover:text-snow"
            >
              Ver portafolio
            </a>
          </div>
        </div>

        {/* Tarjeta NFC 3D flotante */}
        <div
          data-hero-item
          className="h-72 w-full min-w-0 overflow-hidden sm:h-80 lg:h-auto lg:aspect-square"
        >
          {showScene && (
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          )}
        </div>
      </Container>
    </section>
  )
}
