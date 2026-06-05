import { projectR2 } from '@/src/utils/assets'

// Images migrated to R2 (folder uses '_' as the stem separator). Width transforms
// that the call sites used (w_2000 … w_400) are dropped — R2 serves a single
// full-size WebP per image. TODO: add responsive variants to avoid shipping
// large originals to small slots (mobile thumbs).
const r2 = projectR2({
  folder: 'SILVESTRE Y LA NARANJA _ALTEREGO',
  stem: 'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego',
  sep: '_',
})

export const ALT = {
  // images → R2
  portada: '/portadas/alterego-desktop.webp',
  portadaMobile: '/portadas/alterego-mobile.webp',
  1: r2.img(1),
  2: r2.img(2),
  3: r2.img(3),
  4: r2.img(4),
  5: r2.img(5),
  6: r2.img(6),
  7: r2.img(7),
  8: r2.img(8),
  9: r2.img(9),
  10: r2.img(10),
  11: r2.img(11),
  12: r2.img(12),
  13: r2.img(13),
  14: r2.img(14),
  15: r2.img(15),
  16: r2.img(16),
  17: r2.img(17),
  // videos → still on Cloudinary (passed through cldVideo at the call site);
  // not uploaded to R2 yet.
  v1: 'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_1_nksue5',
  v2: 'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_2_xn8am8',
  v3: 'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_3_tjwnjv',
  v4: 'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_4_vswfsd',
  v5: 'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_5_rhs2kx',
  v6: 'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_6_uqdkef',
  v7: 'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_7_rdclow',
} as const
