import type { GalleryImage } from '@/src/types/parallax'
import { cldImg } from '@/src/utils/cloudinary'
import { ALT } from './assets'

export const gallery: GalleryImage[] = [
  { src: '/image5.jpg',              alt: 'Alterego — hero',           position: 'center', size: 'lg' },
  { src: cldImg(ALT[1],  'w_800'),   alt: 'Alterego — cone of light',  position: 'left',   size: 'md' },
  { src: cldImg(ALT[3],  'w_800'),   alt: 'Alterego — woman in light', position: 'right',  size: 'sm' },
  { src: cldImg(ALT[10], 'w_800'),   alt: 'Alterego — neon faces',     position: 'center', size: 'lg' },
  { src: cldImg(ALT[15], 'w_800'),   alt: 'Alterego — B&W film strip', position: 'left',   size: 'md' },
]
