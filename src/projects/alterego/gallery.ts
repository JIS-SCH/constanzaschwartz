import type { GalleryImage } from '@/src/types/parallax'
import { ALT } from './assets'

export const gallery: GalleryImage[] = [
  { src: '/image5.jpg',              alt: 'Alterego — hero',           position: 'center', size: 'lg' },
  { src: ALT[1],   alt: 'Alterego — cone of light',  position: 'left',   size: 'md' },
  { src: ALT[3],   alt: 'Alterego — woman in light', position: 'right',  size: 'sm' },
  { src: ALT[10],   alt: 'Alterego — neon faces',     position: 'center', size: 'lg' },
  { src: ALT[15],   alt: 'Alterego — B&W film strip', position: 'left',   size: 'md' },
]
