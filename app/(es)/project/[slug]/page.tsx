import { projectList } from '@/src/projects/registry'
import { ProjectView } from './ProjectView'

// Pre-render one HTML page per project at build time (required for `output: 'export'`).
export function generateStaticParams() {
  return projectList.map((project) => ({ slug: project.slug }))
}

// Unknown slugs are not pre-rendered and should 404 instead of being generated on demand.
export const dynamicParams = false

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <ProjectView slug={slug} />
}
