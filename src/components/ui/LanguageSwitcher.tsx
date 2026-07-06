import { useEffect, useRef, useState } from 'react'
import { LANGUAGES, useI18n } from '@/i18n'

/** Globo minimalista para el disparador del selector. */
function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.8 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.8-3.8-9S9.5 5.5 12 3Z" />
    </svg>
  )
}

/**
 * Selector de idioma. La autodetección elige el inicial; aquí el visitante
 * puede cambiarlo a mano. Botón con globo + código, y menú con los 3 idiomas.
 */
export function LanguageSwitcher() {
  const { lang, setLang } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Cerrar al hacer clic fuera o al presionar Escape
  useEffect(() => {
    if (!open) return
    const onPointer = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Cambiar idioma · Change language · 言語を変更"
        className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-fog-300 transition-colors duration-200 hover:text-snow"
      >
        <GlobeIcon />
        <span className="text-xs font-semibold uppercase">{lang}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Idioma"
          className="absolute right-0 z-10 mt-2 w-36 overflow-hidden rounded-xl border border-snow/10 bg-night-800/95 p-1 shadow-2xl backdrop-blur-xl"
        >
          {LANGUAGES.map((option) => (
            <li key={option.code}>
              <button
                type="button"
                role="option"
                aria-selected={option.code === lang}
                onClick={() => {
                  setLang(option.code)
                  setOpen(false)
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors duration-150 ${
                  option.code === lang
                    ? 'bg-volt-500/15 text-snow'
                    : 'text-fog-300 hover:bg-snow/5 hover:text-snow'
                }`}
              >
                {option.label}
                {option.code === lang && (
                  <span aria-hidden className="text-volt-300">
                    ✓
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
