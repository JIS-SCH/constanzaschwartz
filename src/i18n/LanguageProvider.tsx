'use client'

import { createContext, useCallback, useContext, type ReactNode } from 'react'
import { localePath, type Locale } from './locale'
import messages from './en.json'

const LanguageContext = createContext<Locale>('es')
const english: Record<string, string> = messages

export function LanguageProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LanguageContext.Provider value={locale}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const locale = useContext(LanguageContext)
  const localizedPath = useCallback((path: string) => localePath(path, locale), [locale])
  const t = useCallback((key: string, fallback: string) => locale === 'en' ? english[key] ?? fallback : fallback, [locale])
  return {
    locale,
    localizedPath,
    t,
  }
}

// A fragment keeps the existing markup and animation targets unchanged.
export function TranslatedText({ id, children }: { id: string; children: ReactNode }) {
  const { locale } = useLanguage()
  return <>{locale === 'en' ? english[id] ?? children : children}</>
}
