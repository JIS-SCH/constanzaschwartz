import { getLegacyProject } from '@/src/data/projects'
import { LegacyProject } from './LegacyProject'
import type { ProjectMeta } from '../types'
import { cldImg } from '@/src/utils/cloudinary'

const entry = getLegacyProject('mutek')

export const meta: ProjectMeta = {
  slug: entry.slug,
  title: entry.title,
  date: entry.date,
  category: entry.category,
  image: cldImg('CONSTANZASCHWARTZ-projects-Mutek-portada-desktop_sr4dif'),
}

export const gallery = entry.gallery

export function Component() {
  return <LegacyProject config={entry.parallaxConfig!} />
}
