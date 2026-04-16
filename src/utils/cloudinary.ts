const CLOUD = 'dapjholek'
const BASE_IMG = `https://res.cloudinary.com/${CLOUD}/image/upload`
const BASE_VID = `https://res.cloudinary.com/${CLOUD}/video/upload`

export function cldImg(publicId: string, transforms = ''): string {
  const auto = 'f_auto,q_auto'
  const t = transforms ? `${auto},${transforms}` : auto
  return `${BASE_IMG}/${t}/${publicId}`
}

export function cldVideo(publicId: string): string {
  return `${BASE_VID}/f_auto,q_auto/${publicId}`
}
