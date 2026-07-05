import { site } from '@/config/site'

/** target="_blank" solo para enlaces web — en mailto deja una pestaña en blanco. */
export const externalProps = (href: string) =>
  href.startsWith('http')
    ? ({ target: '_blank', rel: 'noopener noreferrer' } as const)
    : {}

/**
 * Enlace de correo según el dispositivo:
 * - Móvil/táctil → mailto: abre la app de correo nativa (Gmail, Mail…).
 * - Escritorio → Gmail web con destinatario y asunto listos, porque el
 *   mailto en desktop falla en silencio si no hay cliente configurado.
 * Cuando exista correo con dominio propio, basta actualizar
 * site.contact.email — este comportamiento no cambia.
 */
export function emailHref(subject = '') {
  const desktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  if (desktop) {
    const params = new URLSearchParams({ view: 'cm', fs: '1', to: site.contact.email })
    if (subject) params.set('su', subject)
    return `https://mail.google.com/mail/?${params.toString()}`
  }
  return subject
    ? `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${site.contact.email}`
}
