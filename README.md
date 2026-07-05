# Landing NFC — José Gutiérrez

Landing personal que se abre al acercar el teléfono a una tarjeta NFC.
React + Vite + Tailwind 4, tarjeta 3D con React Three Fiber, scroll
cinematográfico con GSAP ScrollTrigger + Lenis, microinteracciones con Motion.

## Comandos

```bash
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción en /dist
npm run preview  # sirve el build para probarlo
```

## Dónde se edita cada cosa

| Contenido                        | Archivo                                        |
| -------------------------------- | ---------------------------------------------- |
| Nombre, contacto, Calendly       | `src/config/site.ts`                           |
| Colores, tipografías (tokens)    | `src/index.css` (bloque `@theme`)              |
| Textos del hero                  | `src/components/sections/Hero.tsx`             |
| Sobre mí y principios            | `src/components/sections/About.tsx`            |
| Servicios                        | `src/components/sections/Services.tsx`         |
| **Proyectos del portafolio**     | `src/components/sections/Portfolio.tsx`        |
| Pasos del proceso                | `src/components/sections/Process.tsx`          |
| Chips de tecnologías             | `src/components/sections/TechStack.tsx`        |
| **Testimonios**                  | `src/components/sections/Testimonials.tsx`     |
| Reserva (CTA / Calendly)         | `src/components/sections/Booking.tsx`          |
| Contacto y formulario            | `src/components/sections/Contact.tsx`          |
| Tarjeta 3D del hero              | `src/components/three/NfcCard.tsx`             |

> Portafolio y testimonios traen ejemplos marcados con `NOTA` en el código —
> reemplazarlos por casos y reseñas reales conforme lleguen.

## Activar Calendly

En `src/config/site.ts`, pegar la URL del evento en `calendlyUrl`
(p. ej. `https://calendly.com/usuario/30min`). La sección Reserva embebe el
calendario automáticamente; sin URL, ofrece agendar por WhatsApp.

## Al publicar

1. Agregar en `index.html` las etiquetas `og:url` y `og:image`
   (imagen 1200×630) con el dominio final.
2. Grabar la URL publicada en la tarjeta NFC.
