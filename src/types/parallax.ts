// ─── Parallax System Types ─────────────────────────────────────────────────────

export interface CreditEntry {
  role: string
  name: string
}

export type ParallaxEffect = 'inner' | 'bg' | 'viewport' | 'float'

export interface Layer {
  type: 'image' | 'video' | 'text' | 'marquee' | 'credits'
  src?: string
  content?: string
  speed: number
  effect?: ParallaxEffect
  direction?: 'y' | 'x' | 'both'
  multiplier?: number
  objectFit?: 'cover' | 'contain' | 'fill'
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  alt?: string
  className?: string
  isHero?: boolean
  subtitle?: string
  credits?: CreditEntry[]
  groupId?: string
  position?: {
    top?: string
    left?: string
    right?: string
    bottom?: string
    width?: string
    height?: string
    zIndex?: number
    objectFit?: 'cover' | 'contain' | 'fill'
  }
}

export interface Section {
  id: string
  height?: string
  minHeight?: string
  type?: 'standard' | 'offset' | 'fullwidth-video' | 'overlay' | 'carousel'
  variant?: 'default' | 'inverted'
  backgroundColor?: string
  layers: Layer[]
}

export interface ParallaxConfig {
  sections: Section[]
}

export interface GalleryImage {
  src: string
  alt: string
  position: 'left' | 'center' | 'right'
  size: 'sm' | 'md' | 'lg'
}
