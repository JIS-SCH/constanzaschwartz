import { projectList } from '@/src/projects/registry'
import { ProjectView } from '@/app/(es)/project/[slug]/ProjectView'

export const dynamicParams = false

export function generateStaticParams() {
  return projectList.map(({ slug }) => ({ slug }))
}

export default async function EnglishProject({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <ProjectView slug={slug} />
}
