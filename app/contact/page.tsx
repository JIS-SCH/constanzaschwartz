import type { Metadata } from 'next'
import { ContactPage } from '@/src/components/contact/ContactPage'

import { PAGE_SEO, BASE_URL } from '@/src/data/seo'
import { JsonLd } from '@/src/components/layout/JsonLd'

const seo = PAGE_SEO.contact

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
  openGraph: {
    type: 'website',
    title: seo.title,
    description: seo.description,
    url: `${BASE_URL}/contact`,
    images: [
      {
        url: `${BASE_URL}${seo.ogImage}`,
        width: 1200,
        height: 630,
        alt: seo.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    images: [`${BASE_URL}${seo.ogImage}`],
  },
}

export default function ContactRoute() {
  return (
    <>
      <JsonLd data={seo} url={`${BASE_URL}/contact`} />
      <ContactPage />
    </>
  )
}

