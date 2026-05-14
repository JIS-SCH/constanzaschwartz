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
  sm: 0.06,
  md: 0.08,
  lg: 0.12,
} as const

export const PARALLAX = {
  intensity: { desktop: 300, mobile: 80 },
  speed: {
    depthLow: 0.6,   // Fondo / Anclado
    depthMid: 1,   // Profundidad media
    depthHigh: 1.4,  // Frente / Flote máximo
    hero: 0,
    standard: 0.8,
  },
  uniform: {
    layoutFactor: 0.05, // Very subtle layout movement
    imageFactor: 0.18,  // Moderate image travel
    lerp: 0.035,        // Extra smooth tracking (was 0.05)
    ramp: 1400,
    scrub: 1.5,         // More GSAP smoothing for images
    mobileScrub: 2.0,   // Increased scrub for mobile for smoother parallax
  },
  gallery: { left: 40, center: 60, right: 80 },
} as const

export const CAROUSEL = {
  durationPerImage: 2.2, // Seconds per image slot
} as const

export const MARQUEE = {
  secondsPerChar: 0.68, // Base velocity: ~50s for 73 chars
  setRepeat: 4,
} as const

export const OVERLAY = {
  duration: 0.9,
  ease: 'power4.inOut',
} as const
