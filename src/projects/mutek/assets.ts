import { projectR2 } from '@/src/utils/assets'
import { cldImg, cldGif, cldVideo } from '@/src/utils/cloudinary'

// Partial migration: img1 + carousels are on R2 (verified present). img2-11, the
// animated GIF hero and the mp4 are NOT in R2 yet, so they stay on Cloudinary.
// When those are uploaded, switch each cldImg/cldGif/cldVideo line to r2.* .
const r2 = projectR2({
  folder: 'MUTEK',
  stem: 'CONSTANZASCHWARTZ-projects-Mutek',
})

export const ASSETS = {
  hero: cldGif('CONSTANZASCHWARTZ-projects-Mutek-portada-desktop_sr4dif'), // GIF — Cloudinary
  img1: r2.img(1), // R2
  img2: cldImg('CONSTANZASCHWARTZ-projects-Mutek-2_naofe2'), // not in R2 yet
  vid1: cldVideo('CONSTANZASCHWARTZ-projects-Mutek2025_jcasoz.mp4'), // video — Cloudinary
  img3: cldImg('CONSTANZASCHWARTZ-projects-Mutek-3_t3pob2'),
  img4: cldImg('CONSTANZASCHWARTZ-projects-Mutek-4_cjuptq'),
  img5: cldImg('CONSTANZASCHWARTZ-projects-Mutek-5_rexjkw'),
  img6: cldImg('CONSTANZASCHWARTZ-projects-Mutek-6_hgt6ya'),
  img7: cldImg('CONSTANZASCHWARTZ-projects-Mutek-7_ufgrqq'),
  img8: cldImg('CONSTANZASCHWARTZ-projects-Mutek-8_tsrlib'),
  img9: cldImg('CONSTANZASCHWARTZ-projects-Mutek-9_n22xew'),
  img10: cldImg('CONSTANZASCHWARTZ-projects-Mutek-10_lpuzsp'),
  img11: cldImg('CONSTANZASCHWARTZ-projects-Mutek-11_xoxvfd'),
  img12: cldImg('CONSTANZASCHWARTZ-projects-Mutek-11_xoxvfd'), // reuses img11, as in the original
  // carousel → R2
  carousel1: r2.carousel(1),
  carousel2: r2.carousel(2),
  carousel3: r2.carousel(3),
  carousel4: r2.carousel(4),
  carousel5: r2.carousel(5),
  carousel6: r2.carousel(6),
  carousel7: r2.carousel(7),
  heroMobile: '/CONSTANZASCHWARTZ-projects-mutek-portada-mobile.gif', // local /public
} as const
