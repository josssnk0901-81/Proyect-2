import { site } from '@/config/site'
import { emailHref, externalProps } from '@/lib/links'
import { Container } from '@/components/ui/Container'

export function Footer() {
  const contactLinks = [
    { label: 'WhatsApp', href: site.contact.whatsappUrl },
    { label: 'Correo', href: emailHref() },
    { label: 'Instagram', href: site.contact.instagramUrl },
  ]

  return (
    <footer className="border-t border-snow/5 py-10">
      <Container className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-fog-500">
          © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
        </p>
        <ul className="flex gap-6 text-sm text-fog-300">
          {contactLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...externalProps(link.href)}
                className="transition-colors duration-200 hover:text-volt-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  )
}
