import { ContactPage } from '@/src/components/contact/ContactPage'
import { localizedMetadata } from '@/src/i18n/metadata'

export const metadata = localizedMetadata('contact', '/contact')

export default function EnglishContact() {
  return <ContactPage />
}
