import { cldImg, cldVideo, cldGif } from './cloudinary'
import { R2 } from './r2'

type Provider = 'cloudinary' | 'r2'

export type AssetOptions = {
  type?: 'image' | 'video' | 'gif'
  width?: number
  quality?: string
  fallback?: boolean
  transforms?: string
}

const provider: Provider = 
  (process.env.NEXT_PUBLIC_ASSET_PROVIDER as Provider) || 'cloudinary'

function getR2Url(pathOrId: string): string {
  // If R2 not configured, return empty to fall back to Cloudinary
  if (!R2.base) return ''
  
  // If it's already a full URL, return as-is  
  if (pathOrId.startsWith('http')) return pathOrId
  
  // Use the R2 helper
  return R2.url(pathOrId)
}

function getCloudinaryUrl(pathOrId: string, options: AssetOptions = {}) {
  if (pathOrId.startsWith('http')) return pathOrId

  const { type = 'image', width, quality = 'auto', transforms } = options

  if (type === 'video') return cldVideo(pathOrId)
  if (type === 'gif') return cldGif(pathOrId)

  const parts = ['f_auto', `q_${quality}`]
  if (width) parts.push(`w_${width}`)
  if (transforms) parts.push(transforms)

  return cldImg(pathOrId, parts.join(','))
}

export function getAsset(pathOrId: string, options: AssetOptions = {}) {
  const { fallback = false } = options

  // Primary: Cloudinary (con transforms y optimization)
  const cloudinaryUrl = getCloudinaryUrl(pathOrId, options)
  
  // Si fallback explícito o R2 forzado
  if (provider === 'r2' || fallback) {
    const r2Url = getR2Url(pathOrId)
    if (r2Url) return r2Url
  }

  return cloudinaryUrl
}

// Shortcuts matching cloudinary.ts API
export const getImage = (id: string, transforms = '') => 
  getAsset(id, { transforms: transforms || undefined })

export const getGif = (id: string) => 
  getAsset(id, { type: 'gif' })

export const getVideo = (id: string) => 
  getAsset(id, { type: 'video' })

// Provider status
export const isUsingR2 = () => provider === 'r2'
export const isUsingFallback = isUsingR2
export const getProvider = () => provider