import SiteLayout from '@/src/components/SiteLayout'
import { metadata as sharedMetadata } from '@/src/components/SiteLayout'
import { localizedMetadata } from '@/src/i18n/metadata'
export { viewport } from '@/src/components/SiteLayout'

export const metadata = { ...sharedMetadata, ...localizedMetadata('home', '/') }

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="en">{children}</SiteLayout>
}
