import { getLegacyProject } from '@/src/data/projects'
import { LegacyProject } from './LegacyProject'
import type { ProjectMeta } from '../types'

const entry = getLegacyProject('eco-al-infinito')

export const meta: ProjectMeta = {
  slug: entry.slug,
  title: entry.title,
  date: entry.date,
  category: entry.category,
  image: entry.image,
}

export const gallery = entry.gallery

export function Component() {
  return <LegacyProject config={entry.parallaxConfig!} />
}
