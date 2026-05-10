import type { GalleryImage } from '@/src/types/parallax'
import { ASSETS } from './assets'

export const gallery: GalleryImage[] = [
  { src: ASSETS.hero, alt: 'Ensayo de Espejismo — escultura', position: 'center', size: 'lg' },
  { src: ASSETS.img1, alt: 'Detalle — esculturas verticales', position: 'left', size: 'md' },
  { src: ASSETS.img2, alt: 'Esculturas — vista frontal', position: 'right', size: 'sm' },
  { src: ASSETS.img3, alt: 'Detalle escultura — vista inferior', position: 'center', size: 'lg' },
  { src: ASSETS.img4, alt: 'Escultura vertical — vista lateral', position: 'left', size: 'md' },
]
