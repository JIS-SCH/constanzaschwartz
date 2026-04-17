import type { ComponentType } from 'react'
import type { GalleryImage } from '@/src/types/parallax'

export interface ProjectMeta {
  slug: string
  title: string
  date: string
  category?: string
  image: string
}

export interface ProjectModule {
  meta: ProjectMeta
  Component: ComponentType
  gallery?: GalleryImage[]
}
