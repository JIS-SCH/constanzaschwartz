import type { Metadata } from 'next'
import { ProfilePage } from '@/src/components/profile/ProfilePage'

import { PAGE_SEO, BASE_URL } from '@/src/data/seo'
import { JsonLd } from '@/src/components/layout/JsonLd'

const seo = PAGE_SEO.profile

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: {
    canonical: '/profile',
  },
  openGraph: {
    type: 'website',
    title: seo.title,
    description: seo.description,
    url: '/profile',
    images: [
      {
        url: seo.ogImage,
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
    images: [seo.ogImage],
  },
}



export default function ProfileRoute() {
  return (
    <>
      <JsonLd data={seo} url={`${BASE_URL}/profile`} />
      <ProfilePage />
    </>
  )
}

