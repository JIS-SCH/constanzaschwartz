import { projectR2 } from '@/src/utils/assets'
import { cldImg } from '@/src/utils/cloudinary'

// Migrated to Cloudflare R2, EXCEPT img6 and img12: those slots are animated GIFs
// (used as IMG_GIF1/IMG_GIF2 in index.tsx) and were not uploaded as WebP, so they
// stay on Cloudinary.
const r2 = projectR2({
  folder: 'MAS ALLA DEL INFINITO',
  stem: 'CONSTANZASCHWARTZ-projects-masalladelinfinito',
})

export const ASSETS = {
  // portadas
  hero: '/portadas/mas-alla-del-infinito-desktop.webp',
  heroMobile: '/portadas/mas-alla-del-infinito-mobile.webp',
  // imágenes
  img1: r2.img(1),
  img2: r2.img(2),
  img3: r2.img(3),
  img4: r2.img(4),
  img5: r2.img(5),
  img6: cldImg('CONSTANZASCHWARTZ-projects-masalladelinfinito-6_h9gjd7'), // animated GIF — Cloudinary
  img7: r2.img(7),
  img8: r2.img(8),
  img9: r2.img(9),
  img10: r2.img(10),
  img11: r2.img(11),
  img12: cldImg('CONSTANZASCHWARTZ-projects-masalladelinfinito-12_kazkok'), // animated GIF — Cloudinary
  img13: r2.img(13),
  img14: r2.img(14),
  img15: r2.img(15),
  img16: r2.img(16),
  img17: r2.img(17),
  img18: r2.img(18),
  img19: r2.img(19),
  img20: r2.img(20),
  img21: r2.img(21),
  img22: r2.img(22),
  img23: r2.img(23),
  img24: r2.img(24),
  // carousel 1 (group 1, vertical 442x662)
  carousel1: r2.carouselGroup(1, 1),
  carousel2: r2.carouselGroup(1, 2),
  carousel3: r2.carouselGroup(1, 3),
  carousel4: r2.carouselGroup(1, 4),
  carousel5: r2.carouselGroup(1, 5),
  carousel6: r2.carouselGroup(1, 6),
  carousel7: r2.carouselGroup(1, 7),
  carousel8: r2.carouselGroup(1, 8),
  carousel9: r2.carouselGroup(1, 9),
  carousel10: r2.carouselGroup(1, 10),
  // carousel 2 (group 2, horizontal 1176x662)
  carousel11: r2.carouselGroup(2, 1),
  carousel12: r2.carouselGroup(2, 2),
  carousel13: r2.carouselGroup(2, 3),
  carousel14: r2.carouselGroup(2, 4),
  carousel15: r2.carouselGroup(2, 5),
  carousel16: r2.carouselGroup(2, 6),
  carousel17: r2.carouselGroup(2, 7),
  carousel18: r2.carouselGroup(2, 8),
  carousel19: r2.carouselGroup(2, 9),
  carousel20: r2.carouselGroup(2, 10),
  carousel21: r2.carouselGroup(2, 11),
  carousel22: r2.carouselGroup(2, 12),
  carousel23: r2.carouselGroup(2, 13),
  carousel24: r2.carouselGroup(2, 14),
  carousel25: r2.carouselGroup(2, 15),
  carousel26: r2.carouselGroup(2, 16),
} as const
