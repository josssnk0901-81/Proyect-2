import { createContext, useContext } from 'react'
import { translations, type Translation } from './translations'

export type Lang = 'es' | 'en' | 'ja'

/** Idiomas soportados, en el orden que se muestra el selector. */
export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
]

/** Idioma de respaldo si el del dispositivo no es ninguno de los soportados. */
export const FALLBACK: Lang = 'en'
export const isLang = (v: string): v is Lang =>
  v === 'es' || v === 'en' || v === 'ja'

/**
 * Idioma inicial, SIN persistencia por decisión de diseño: cada visita
 * autodetecta el idioma del dispositivo. Un cambio manual solo dura la
 * sesión; al volver a abrir la página, se vuelve a detectar.
 * 1. Idioma del dispositivo (navigator.languages).
 * 2. Respaldo (inglés).
 * Es una SPA sin SSR, así que `navigator` existe en el primer render.
 */
export function detectLang(): Lang {
  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language]
  for (const entry of candidates) {
    const base = entry.toLowerCase().split('-')[0]
    if (isLang(base)) return base
  }
  return FALLBACK
}

export type I18nValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Translation
}

export const I18nContext = createContext<I18nValue | null>(null)

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n debe usarse dentro de <I18nProvider>')
  return ctx
}

export { translations }
