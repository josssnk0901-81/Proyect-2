import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  I18nContext,
  detectLang,
  translations,
  type I18nValue,
  type Lang,
} from './context'

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  // Refleja el idioma en <html lang>, el título de la pestaña y la meta descripción
  useEffect(() => {
    document.documentElement.lang = lang
    document.title = translations[lang].meta.title
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', translations[lang].meta.description)
  }, [lang])

  // Sin persistencia: el cambio manual solo vive en la sesión actual.
  const setLang = useCallback((next: Lang) => setLangState(next), [])

  const value = useMemo<I18nValue>(
    () => ({ lang, setLang, t: translations[lang] }),
    [lang, setLang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
