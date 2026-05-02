import { cldImg, cldVideo } from '@/src/utils/cloudinary'

export const ASSETS = {
  hero: cldImg('CONSTANZASCHWARTZ-projects-Mutek-portada-desktop_sr4dif', 'f_gif'),
  img1: cldImg('CONSTANZASCHWARTZ-projects-Mutek-1_tbng2q'),
  img2: cldImg('CONSTANZASCHWARTZ-projects-Mutek-2_naofe2'),
  vid1: cldVideo('CONSTANZASCHWARTZ-projects-Mutek2025_jcasoz.mp4'),
  img3: cldImg('CONSTANZASCHWARTZ-projects-Mutek-3_t3pob2'),
  img4: cldImg('CONSTANZASCHWARTZ-projects-Mutek-4_cjuptq'),
  img5: cldImg('CONSTANZASCHWARTZ-projects-Mutek-5_rexjkw'),
  img6: cldImg('CONSTANZASCHWARTZ-projects-Mutek-6_hgt6ya'),
  img7: cldImg('CONSTANZASCHWARTZ-projects-Mutek-7_ufgrqq'),
  img8: cldImg('CONSTANZASCHWARTZ-projects-Mutek-8_tsrlib'),
  img9: cldImg('CONSTANZASCHWARTZ-projects-Mutek-9_n22xew'),
  img10: cldImg('CONSTANZASCHWARTZ-projects-Mutek-10_lpuzsp'),
  img11: cldImg('CONSTANZASCHWARTZ-projects-Mutek-11_xoxvfd'),
  img12: cldImg('CONSTANZASCHWARTZ-projects-Mutek-11_xoxvfd'),
  // carousel
  carousel1: cldImg('CONSTANZASCHWARTZ-projects-Mutek-carrousel-1_shofak'),
  carousel2: cldImg('CONSTANZASCHWARTZ-projects-Mutek-carrousel-2_jfhxqr'),
  carousel3: cldImg('CONSTANZASCHWARTZ-projects-Mutek-carrousel-3_w80buf'),
  carousel4: cldImg('CONSTANZASCHWARTZ-projects-Mutek-carrousel-4_oh0zip'),
  carousel5: cldImg('CONSTANZASCHWARTZ-projects-Mutek-carrousel-5_lgjktm'),
  carousel6: cldImg('CONSTANZASCHWARTZ-projects-Mutek-carrousel-6_jwoms7'),
  carousel7: cldImg('CONSTANZASCHWARTZ-projects-Mutek-carrousel-7_hbk9rm'),
  heroMobile: '/CONSTANZASCHWARTZ-projects-mutek-portada-mobile.gif',
} as const