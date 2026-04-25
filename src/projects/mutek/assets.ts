import { cldImg } from '@/src/utils/cloudinary'

export const ASSETS = {
  hero: cldImg('CONSTANZASCHWARTZ-projects-Mutek-portada-desktop_sr4dif'),
  img1: cldImg('CONSTANZASCHWARTZ-projects-Mutek-1_tbng2q'),
  img2: cldImg('CONSTANZASCHWARTZ-projects-Mutek-2_naofe2'),
  img3: cldImg('CONSTANZASCHWARTZ-projects-Mutek-3_t3pob2'),
  img4: cldImg('CONSTANZASCHWARTZ-projects-Mutek-4_cjuptq'),
  img5: cldImg('CONSTANZASCHWARTZ-projects-Mutek-5_rexjkw'),
  img6: cldImg('CONSTANZASCHWARTZ-projects-Mutek-6_hgt6ya'),
  img7: cldImg('CONSTANZASCHWARTZ-projects-Mutek-7_ufgrqq'),
  img8: cldImg('CONSTANZASCHWARTZ-projects-Mutek-8_tsrlib'),
  // Mutek-9 no existe en Cloudinary — usamos Mutek-1 (DSC_3417 portrait) como fallback para DSC_3347
  img9: cldImg('CONSTANZASCHWARTZ-projects-Mutek-1_tbng2q'),
  img10: cldImg('CONSTANZASCHWARTZ-projects-Mutek-10_lpuzsp'),
  img11: cldImg('CONSTANZASCHWARTZ-projects-Mutek-11_xoxvfd'),
  // Mutek-12 no existe en Cloudinary — usamos Mutek-11 como fallback
  img12: cldImg('CONSTANZASCHWARTZ-projects-Mutek-11_xoxvfd'),
} as const