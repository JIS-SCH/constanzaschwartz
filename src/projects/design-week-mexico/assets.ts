import { projectR2 } from '@/src/utils/assets'

// Migrated to Cloudflare R2. Folder/stem are declared once; paths are generated.
const r2 = projectR2({
  folder: 'DESIGN WEEK MEXICO',
  stem: 'CONSTANZASCHWARTZ-projects-designweekmexico',
})

export const ASSETS = {
  hero: '/portadas/design-week-mexico-desktop.webp',
  heroMobile: '/portadas/design-week-mexico-mobile.webp',
  img1: r2.img(1),
  img2: r2.img(2),
  img3: r2.img(3),
  img4: r2.img(4),
  img5: r2.img(5),
  img6: r2.img(6),
  img7: r2.img(7),
  img8: r2.img(8),
  img9: r2.img(9),
  img10: r2.img(10),
  carousel1: r2.carousel(1),
  carousel2: r2.carousel(2),
  carousel3: r2.carousel(3),
  carousel4: r2.carousel(4),
  carousel5: r2.carousel(5),
  carousel6: r2.carousel(6),
} as const
