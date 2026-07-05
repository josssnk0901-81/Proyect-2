import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

/**
 * Sistema de scroll del sitio:
 * - Lenis para smooth scroll, sincronizado con el ticker de GSAP
 *   (la integración recomendada por ambas librerías).
 * - Reveal genérico: todo elemento con [data-reveal] entra con
 *   fade + desplazamiento cada vez que aparece en el viewport, en
 *   ambas direcciones — al salir de pantalla se oculta y queda listo
 *   para volver a animar, bajando o subiendo.
 * Si el usuario prefiere movimiento reducido, no se activa nada.
 */
export function ScrollManager() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      autoRaf: false,
      // Intercepta los enlaces #ancla (respeta el scroll-margin de cada sección)
      anchors: true,
    })
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 28,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            // entrar (↓) · salir por arriba · entrar de vuelta (↑) · salir por abajo
            // restart/reverse en las cuatro → el ciclo se repite en ambas direcciones
            toggleActions: 'restart reverse restart reverse',
          },
        })
      })
    })

    return () => {
      ctx.revert()
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return null
}
