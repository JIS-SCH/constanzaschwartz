import type { ProjectMeta, ProjectModule } from './types'

import * as alterego from './alterego'
import * as designWeek from './design-week-mexico'
import * as eco from './eco-al-infinito'
import * as masAlla from './mas-alla-del-infinito'
import * as mutek from './mutek'

// The project index modules are 'use client'. When server code (e.g.
// generateStaticParams) imports them, non-component re-exports like `meta` come
// back as undefined across the client/server boundary. So pull `meta` straight
// from the plain (server-safe) meta.ts files for slugs/listing, and keep the
// client modules only for their Component/gallery (consumed in client context).
import { meta as alteregoMeta } from './alterego/meta'
import { meta as designWeekMeta } from './design-week-mexico/meta'
import { meta as ecoMeta } from './eco-al-infinito/meta'
import { meta as masAllaMeta } from './mas-alla-del-infinito/meta'
import { meta as mutekMeta } from './mutek/meta'

interface Entry {
  mod: ProjectModule
  meta: ProjectMeta
}

const ORDERED: Entry[] = [
  { mod: alterego, meta: alteregoMeta },
  { mod: mutek, meta: mutekMeta },
  { mod: eco, meta: ecoMeta },
  { mod: masAlla, meta: masAllaMeta },
  { mod: designWeek, meta: designWeekMeta },
]

export const projectRegistry: Record<string, ProjectModule> = Object.fromEntries(
  ORDERED.map((e) => [e.meta.slug, e.mod])
)

export const projectList: ProjectMeta[] = ORDERED.map((e) => e.meta)
