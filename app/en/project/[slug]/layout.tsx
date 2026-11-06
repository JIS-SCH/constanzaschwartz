import { localizedMetadata } from '@/src/i18n/metadata'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return localizedMetadata(slug, `/project/${slug}`)
}

export default function EnglishProjectLayout({ children }: { children: React.ReactNode }) {
  return children
}
