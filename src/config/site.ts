/**
 * Datos globales del sitio. Cambiar aquí actualiza toda la landing.
 */
export const site = {
  name: 'José Gutiérrez',
  title: 'José Gutiérrez — Ingeniería digital con sello propio',
  description:
    'Desarrollo web, automatización y experiencias interactivas a la medida. Ingeniería digital con sello propio.',
  contact: {
    // Número local: 961 704 8494 — el enlace usa formato internacional (+52 México)
    whatsapp: '961 704 8494',
    whatsappUrl: 'https://wa.me/529617048494',
    email: 'josssnk0901@gmail.com',
    instagramHandle: '@josss_9110',
    instagramUrl: 'https://www.instagram.com/josss_9110/',
  },
  // URL del evento de Calendly — la sección Reserva la embebe automáticamente.
  // Si algún día se deja vacía (''), la sección vuelve al CTA de WhatsApp.
  calendlyUrl: 'https://calendly.com/josssnk0901/30min',
} as const

export type SectionId =
  | 'inicio'
  | 'sobre-mi'
  | 'servicios'
  | 'portafolio'
  | 'proceso'
  | 'tecnologias'
  | 'testimonios'
  | 'reserva'
  | 'contacto'
