import SiteLayout from '@/src/components/SiteLayout'
export { metadata, viewport } from '@/src/components/SiteLayout'

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="es">{children}</SiteLayout>
}
