import type { ProjectMeta, ProjectModule } from './types'

import * as alterego from './alterego'
import * as designWeek from './design-week-mexico'
import * as eco from './eco-al-infinito'
import * as masAlla from './mas-alla-del-infinito'
import * as mutek from './mutek'

const ORDERED: ProjectModule[] = [
  alterego,
  mutek,
  eco,
  masAlla,
  designWeek,
]

export const projectRegistry: Record<string, ProjectModule> = Object.fromEntries(
  ORDERED.map((m) => [m.meta.slug, m])
)

export const projectList: ProjectMeta[] = ORDERED.map((m) => m.meta)
