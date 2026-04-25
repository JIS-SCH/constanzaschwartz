import type { CSSProperties } from 'react'

// Standard paragraph width on 1440px canvas: 466px = 32.4305%
export const TW = '32.4305%'

// Standard carousel height across all projects and breakpoints
export const CH = '330px'

// Standard distance between elements per Figma (used for staggered offsets)
export const GAP = '220px'

// Standard carousel item widths (narrow / wide) per Figma — components 5/6
export const CAROUSEL_W_NARROW = '221px'
export const CAROUSEL_W_WIDE = '496px'

// Hero top offset — distance from hero image to navbar (56px navbar + 60px gap = 116px total from viewport top)
export const HERO_TOP = '60px'

// Standard paragraph style — Space Grotesk Light 16px / 150% lh
export const TEXT_BLOCK_STYLE: CSSProperties = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 300,
  fontSize: '16px',
  lineHeight: 1.5,
  letterSpacing: 0,
  color: '#fff',
}
