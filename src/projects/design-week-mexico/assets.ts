import { cldImg } from '@/src/utils/cloudinary'

export const ASSETS = {
  hero: cldImg('CONSTANZASCHWARTZ-projects-designweekmexico-portada-desktop_qknikc'),
  heroMobile: cldImg('CONSTANZASCHWARTZ-projects-designweekmexico-portada-mobile_nihlin'),
  img1:  cldImg('CONSTANZASCHWARTZ-projects-designweekmexico-1_oz4q7c'),
  img2:  cldImg('CONSTANZASCHWARTZ-projects-designweekmexico-2_hz1uqh'),
  img3:  cldImg('CONSTANZASCHWARTZ-projects-designweekmexico-3_ibejr9'),
  img4:  cldImg('CONSTANZASCHWARTZ-projects-designweekmexico-4_ofjjqm'),
  img5:  cldImg('CONSTANZASCHWARTZ-projects-designweekmexico-5_jhgcuu'),
  img6:  cldImg('CONSTANZASCHWARTZ-projects-designweekmexico-6_vfymve'),
  img7:  cldImg('CONSTANZASCHWARTZ-projects-designweekmexico-7_sk1ary'),
  img8:  cldImg('CONSTANZASCHWARTZ-projects-designweekmexico-8_v6zbxn'),
  img9:  cldImg('CONSTANZASCHWARTZ-projects-designweekmexico-9_zihziy'),
  img10: cldImg('CONSTANZASCHWARTZ-projects-designweekmexico-10_tg63jq'),
  carousel1: cldImg('CONSTANZASCHWARTZ-projects-designweekmexico-carrousel-1_m5cdjj', 'h_330,c_scale'),
  carousel2: cldImg('CONSTANZASCHWARTZ-projects-designweekmexico-carrousel-2_nsoiwl', 'h_330,c_scale'),
  carousel3: cldImg('CONSTANZASCHWARTZ-projects-designweekmexico-carrousel-3_ygydv8', 'h_330,c_scale'),
  carousel4: cldImg('CONSTANZASCHWARTZ-projects-designweekmexico-carrousel-4_ebu1pg', 'h_330,c_scale'),
  carousel5: cldImg('CONSTANZASCHWARTZ-projects-designweekmexico-carrousel-5_qud4z9', 'h_330,c_scale'),
  carousel6: cldImg('CONSTANZASCHWARTZ-projects-designweekmexico-carrousel-6_wgxnjt', 'h_330,c_scale'),
} as const