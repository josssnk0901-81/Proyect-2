import { useState } from 'react'
import type { FormEvent } from 'react'
import { site } from '@/config/site'
import { emailHref, externalProps } from '@/lib/links'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useI18n } from '@/i18n'

export function Contact() {
  const { t } = useI18n()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const channels = [
    {
      label: 'WhatsApp',
      value: site.contact.whatsapp,
      href: site.contact.whatsappUrl,
      hint: t.contact.whatsappHint,
    },
    {
      label: t.contact.emailLabel,
      value: site.contact.email,
      href: emailHref(t.messages.contactEmailSubject),
      hint: t.contact.emailHint,
    },
    {
      label: 'Instagram',
      value: site.contact.instagramHandle,
      href: site.contact.instagramUrl,
      hint: t.contact.instagramHint,
    },
  ]

  /** El formulario abre WhatsApp con el mensaje listo — sin backend ni spam. */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const greeting = t.messages.contactGreeting.replace('{name}', name.trim())
    const text = `${greeting} ${message.trim()}`
    window.open(
      `${site.contact.whatsappUrl}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  const inputStyles =
    'w-full rounded-xl border border-snow/10 bg-night-900/60 px-4 py-3 text-sm text-snow placeholder:text-fog-500 transition-colors duration-200 focus:border-volt-500 focus:outline-none'

  return (
    <section id="contacto" className="scroll-mt-28 py-20 sm:py-24">
      <Container>
        <SectionHeader
          kicker={t.contact.kicker}
          title={t.contact.title}
          lead={t.contact.lead}
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Canales directos */}
          <ul className="flex flex-col gap-4">
            {channels.map((channel) => (
              <li key={channel.label} data-reveal>
                <a
                  href={channel.href}
                  {...externalProps(channel.href)}
                  className="glass group flex items-center justify-between gap-4 rounded-2xl p-5 transition-colors duration-200 hover:border-volt-500/40"
                >
                  <span>
                    <span className="block text-sm font-medium text-snow">
                      {channel.label}
                    </span>
                    <span className="mt-0.5 block text-sm text-fog-400">
                      {channel.value}
                    </span>
                    <span className="mt-1 block text-xs text-fog-500">
                      {channel.hint}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="text-fog-500 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-volt-300"
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Formulario simple → abre WhatsApp con el mensaje armado */}
          <form data-reveal onSubmit={handleSubmit} className="glass rounded-3xl p-6 sm:p-8">
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-2 text-sm text-fog-300">
                {t.contact.nameLabel}
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={t.contact.namePlaceholder}
                  className={inputStyles}
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-fog-300">
                {t.contact.messageLabel}
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder={t.contact.messagePlaceholder}
                  className={`${inputStyles} resize-none`}
                />
              </label>
              <button
                type="submit"
                className="rounded-xl bg-volt-600 px-6 py-3.5 text-sm font-medium text-snow transition-colors duration-200 hover:bg-volt-500"
              >
                {t.contact.submit}
              </button>
              <p className="text-center text-xs text-fog-500">{t.contact.formNote}</p>
            </div>
          </form>
        </div>
      </Container>
    </section>
  )
}
