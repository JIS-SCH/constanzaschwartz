import { getLegacyProject } from '@/src/data/projects'
import { LegacyProject } from './LegacyProject'
import type { ProjectMeta } from '../types'
import { cldImg } from '@/src/utils/cloudinary'

const entry = getLegacyProject('mas-alla-del-infinito')

export const meta: ProjectMeta = {
  slug: entry.slug,
  title: entry.title,
  date: entry.date,
  category: entry.category,
  image: cldImg('CONSTANZASCHWARTZ-projects-masalladelinfinito-portada-desktop_ko9vtv'),
}

export const gallery = entry.gallery

export function Component() {
  return <LegacyProject config={entry.parallaxConfig!} />
}
