import type { Metadata } from 'next'
import { ContactPage } from '@/src/components/contact/ContactPage'

export const metadata: Metadata = {
  title: 'Contact — Constanza Schwartz',
  description: 'Get in touch with Constanza Schwartz',
}

export default function ContactRoute() {
  return <ContactPage />
}
