export type Locale = 'es' | 'en'

export function localePath(path: string, locale: Locale): string {
  const base = path.replace(/^\/en(?=\/|$)/, '') || '/'
  return locale === 'en' ? `/en${base === '/' ? '' : base}` : base
}

export function pathLocale(path: string): Locale {
  return /^\/en(?:\/|$)/.test(path) ? 'en' : 'es'
}
