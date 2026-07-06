import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type RevealOptions = { y?: number; duration?: number }

type Entry = {
  element: Element
  show: () => void
  hide: () => void
  state: 'shown' | 'hidden'
}

/** Umbrales de la zona activa (deben coincidir con start/end del trigger). */
const ENTER_AT = 0.9 // el borde superior cruza el 90% del viewport
const registry = new Set<Entry>()

/**
 * Red de seguridad: tras CUALQUIER scroll (incluidos saltos instantáneos,
 * teclas Inicio/Fin o restauraciones del navegador), se re-evalúa cada
 * bloque midiendo su posición real en el DOM — independiente de cualquier
 * estado interno cacheado. Corrige cualquier desincronización.
 */
function reconcileAll() {
  const vh = window.innerHeight
  registry.forEach((entry) => {
    if (!entry.element.isConnected) {
      registry.delete(entry)
      return
    }
    const rect = entry.element.getBoundingClientRect()
    const shouldShow = rect.top < vh * ENTER_AT && rect.bottom > 0
    if (shouldShow && entry.state !== 'shown') entry.show()
    if (!shouldShow && entry.state !== 'hidden') entry.hide()
  })
}

let reconcilerReady = false
function initReconciler() {
  if (reconcilerReady) return
  reconcilerReady = true
  // Debounce sobre el evento nativo de scroll: cubre navegadores sin
  // 'scrollend' y corre solo cuando el usuario se detiene.
  let timer: ReturnType<typeof setTimeout>
  window.addEventListener(
    'scroll',
    () => {
      clearTimeout(timer)
      timer = setTimeout(reconcileAll, 200)
    },
    { passive: true },
  )
}

/**
 * Reveal con bucle en ambas direcciones.
 *
 * - MOSTRAR: cuando el borde superior cruza el 90% del viewport (bajando)
 *   o al asomar por arriba (subiendo) — la animación ocurre mientras el
 *   bloque ya se ve, perceptible también en teléfonos.
 * - OCULTAR: solo al salir (casi) por completo de la pantalla.
 * - onToggle da la respuesta inmediata; el reconciliador corrige cualquier
 *   estado que un salto brusco de scroll pudiera dejar mal.
 *
 * Debe llamarse dentro de un gsap.context() para limpiarse al desmontar.
 */
export function createReveal(
  element: Element,
  { y = 36, duration = 0.9 }: RevealOptions = {},
) {
  gsap.set(element, { opacity: 0, y, scale: 0.98 })

  const entry: Entry = {
    element,
    state: 'hidden',
    show: () => {
      entry.state = 'shown'
      gsap.to(element, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration,
        ease: 'power3.out',
        overwrite: true,
      })
    },
    hide: () => {
      entry.state = 'hidden'
      gsap.to(element, {
        opacity: 0,
        y,
        scale: 0.98,
        duration: 0.2,
        ease: 'power1.in',
        overwrite: true,
      })
    },
  }

  registry.add(entry)
  initReconciler()

  const trigger = ScrollTrigger.create({
    trigger: element,
    start: `top ${ENTER_AT * 100}%`,
    end: 'bottom top',
    onToggle: (self) => (self.isActive ? entry.show() : entry.hide()),
  })

  // Si ya está en pantalla al cargar, mostrarlo sin esperar un cruce de scroll
  if (trigger.isActive) entry.show()

  return trigger
}
