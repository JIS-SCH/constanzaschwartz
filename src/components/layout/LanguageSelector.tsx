'use client'

import { usePathname } from 'next/navigation'
import { useLanguage } from '@/src/i18n/LanguageProvider'
import { localePath } from '@/src/i18n/locale'
import { LANGUAGE_NAVIGATION_KEY } from '@/src/i18n/languageTransition'

export function LanguageSelector() {
  const pathname = usePathname()
  const { locale } = useLanguage()

  return (
    <div className="language-selector" role="group" aria-label="Idioma / Language">
      {(['es', 'en'] as const).map((language, index) => (
        <span key={language}>
          {index > 0 && <span aria-hidden="true" className="language-divider">/</span>}
          <a
            href={localePath(pathname, language)}
            lang={language}
            hrefLang={language}
            aria-label={language === 'es' ? 'Español' : 'English'}
            aria-current={locale === language ? 'true' : undefined}
            onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
              if (locale === language) {
                event.preventDefault()
                return
              }
              try {
                sessionStorage.setItem(LANGUAGE_NAVIGATION_KEY, JSON.stringify({
                  from: pathname,
                  href: localePath(pathname, language),
                  createdAt: Date.now(),
                  scrollY: window.scrollY,
                }))
              } catch { /* The native link works without storage or animation. */ }
            }}
          >
            {language.toUpperCase()}
          </a>
        </span>
      ))}
    </div>
  )
}
