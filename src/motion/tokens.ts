export const DURATION = {
  xs: 0.2,  // Micro-interactions
  sm: 0.35, // Quick reveals, button transitions
  md: 0.6,  // Standard transitions (overlay fades, content reveals)
  lg: 0.8,  // Page-level transitions
  xl: 1.0,  // Hero/architectural movements
} as const

export const EASE = {
  out: 'power2.out',   // Standard exit ease
  inOut: 'power2.inOut', // Symmetric transitions
  soft: 'power3.out',   // Content reveals, staggered text
  sharp: 'expo.inOut',   // Card expansions, modal morphs
  linear: 'none',         // Scrub animations
} as const

export const STAGGER = {
  sm: 0.06, // Fast menu close stagger
  md: 0.08, // Title word reveals
  lg: 0.12, // Menu item open stagger
} as const

export const PARALLAX = {
  intensity: { desktop: 350, mobile: 60 },
  speed: {
    subtle: 0.15, // Background textures
    normal: 0.3,  // Standard images
    strong: 0.5,  // Hero foreground elements
    hero: 0.8,  // Focal elements
  },
  gallery: { left: 40, center: 60, right: 80 },
} as const

export const MARQUEE = {
  durationPerImage: 2.2, // Carousel: seconds per image slot
  setRepeat: 4,          // Number of repeated sets for seamless loop
  speed: {
    slow: 30, // Ambient text tickers
    medium: 20, // Standard project marquees
    fast: 12, // High-energy marquees
  },
} as const
