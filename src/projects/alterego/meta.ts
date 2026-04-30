import type { ProjectMeta } from '../types'
import { cldImg } from '@/src/utils/cloudinary'
import { ALT } from './assets'

export const meta: ProjectMeta = {
  slug: 'silvestre-y-la-naranja-alterego',
  title: 'ALTEREGO . SILVESTRE Y LA NARANJA',
  date: '2025',
  category: 'Dirección de Arte y Efectos Lumínicos',
  image: cldImg(ALT.portada),
  mobileImage: cldImg(ALT.portadaMobile),
}
