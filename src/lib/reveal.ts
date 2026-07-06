import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type RevealOptions = { y?: number; duration?: number }

/**
 * Reveal reutilizable con bucle en ambas direcciones.
 *
 * Clave: la zona activa cubre TODO el rango en que el elemento está en
 * pantalla (`top bottom` → `bottom top`). Así la animación se dispara en
 * cuanto asoma por cualquier borde y solo se reinicia (oculto) cuando sale
 * por completo del viewport — nunca queda invisible mientras está a la vista.
 * Repite la animación cada vez que reaparece, subiendo o bajando.
 *
 * Debe llamarse dentro de un gsap.context() para que se limpie al desmontar.
 */
export function createReveal(
  element: Element,
  { y = 28, duration = 0.8 }: RevealOptions = {},
) {
  gsap.set(element, { opacity: 0, y })

  const show = () =>
    gsap.to(element, { opacity: 1, y: 0, duration, ease: 'power2.out', overwrite: true })
  const hide = () => gsap.set(element, { opacity: 0, y })

  const trigger = ScrollTrigger.create({
    trigger: element,
    start: 'top bottom',
    end: 'bottom top',
    onEnter: show,
    onEnterBack: show,
    onLeave: hide,
    onLeaveBack: hide,
  })

  // Si ya está en pantalla al cargar, mostrarlo sin esperar un cruce de scroll
  if (trigger.isActive) show()

  return trigger
}
