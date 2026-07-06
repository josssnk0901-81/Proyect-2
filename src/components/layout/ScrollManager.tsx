import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { createReveal } from '@/lib/reveal'

gsap.registerPlugin(ScrollTrigger)

/**
 * Sistema de scroll del sitio:
 * - Lenis para smooth scroll, sincronizado con el ticker de GSAP
 *   (la integración recomendada por ambas librerías).
 * - Reveal genérico: todo elemento con [data-reveal] entra con
 *   fade + desplazamiento cada vez que aparece en el viewport, en
 *   ambas direcciones (ver createReveal).
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
      gsap.utils
        .toArray<HTMLElement>('[data-reveal]')
        .forEach((element) => createReveal(element))
    })

    return () => {
      ctx.revert()
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return null
}
