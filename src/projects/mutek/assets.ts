import { getAsset, getImage, getGif, getVideo } from '@/src/utils/assetUrl'

export const ASSETS = {
  hero: getGif('CONSTANZASCHWARTZ-projects-Mutek-portada-desktop_sr4dif'),
  img1: getImage('CONSTANZASCHWARTZ-projects-Mutek-1_tbng2q'),
  img2: getImage('CONSTANZASCHWARTZ-projects-Mutek-2_naofe2'),
  vid1: getVideo('CONSTANZASCHWARTZ-projects-Mutek2025_jcasoz.mp4'),
  img3: getImage('CONSTANZASCHWARTZ-projects-Mutek-3_t3pob2'),
  img4: getImage('CONSTANZASCHWARTZ-projects-Mutek-4_cjuptq'),
  img5: getImage('CONSTANZASCHWARTZ-projects-Mutek-5_rexjkw'),
  img6: getImage('CONSTANZASCHWARTZ-projects-Mutek-6_hgt6ya'),
  img7: getImage('CONSTANZASCHWARTZ-projects-Mutek-7_ufgrqq'),
  img8: getImage('CONSTANZASCHWARTZ-projects-Mutek-8_tsrlib'),
  img9: getImage('CONSTANZASCHWARTZ-projects-Mutek-9_n22xew'),
  img10: getImage('CONSTANZASCHWARTZ-projects-Mutek-10_lpuzsp'),
  img11: getImage('CONSTANZASCHWARTZ-projects-Mutek-11_xoxvfd'),
  // carousel
  carousel1: getImage('CONSTANZASCHWARTZ-projects-Mutek-carrousel-1_shofak', 'h_330,c_scale'),
  carousel2: getImage('CONSTANZASCHWARTZ-projects-Mutek-carrousel-2_jfhxqr', 'h_330,c_scale'),
  carousel3: getImage('CONSTANZASCHWARTZ-projects-Mutek-carrousel-3_w80buf', 'h_330,c_scale'),
  carousel4: getImage('CONSTANZASCHWARTZ-projects-Mutek-carrousel-4_oh0zip', 'h_330,c_scale'),
  carousel5: getImage('CONSTANZASCHWARTZ-projects-Mutek-carrousel-5_lgjktm', 'h_330,c_scale'),
  carousel6: getImage('CONSTANZASCHWARTZ-projects-Mutek-carrousel-6_jwoms7', 'h_330,c_scale'),
  carousel7: getImage('CONSTANZASCHWARTZ-projects-Mutek-carrousel-7_hbk9rm', 'h_330,c_scale'),
  heroMobile: '/CONSTANZASCHWARTZ-projects-mutek-portada-mobile.gif',
} as const