import type { Metadata } from 'next'
import { BASE_URL, PAGE_SEO, PROJECT_SEO } from '@/src/data/seo'

// Editorial descriptions remain pending approval; do not invent English copy.
export function localizedMetadata(key: string, path: string): Metadata {
  const data = PAGE_SEO[key] ?? PROJECT_SEO[key]
  const canonical = `/en${path === '/' ? '' : path}`
  const title = key === 'home' || key === 'profile' ? 'Constanza Schwartz' :
    key === 'contact' ? 'Contact | Constanza Schwartz' :
    key === 'mas-alla-del-infinito' ? 'Beyond Infinity | Constanza Schwartz' :
    key === 'eco-al-infinito' ? 'Echo to Infinity | Constanza Schwartz' : data.title
  return {
    metadataBase: new URL(BASE_URL),
    title,
    description: null,
    alternates: {
      canonical,
      languages: { es: path, en: canonical, 'x-default': path },
    },
    openGraph: {
      title, description: '', url: canonical, locale: 'en_US', alternateLocale: 'es_AR',
      images: [{ url: data.ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description: '', images: [data.ogImage] },
  }
}
