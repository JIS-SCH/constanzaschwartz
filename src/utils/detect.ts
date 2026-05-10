export function isMobile(): boolean {
  return typeof window !== 'undefined' && window.innerWidth < 768;
}

export function isSafari(): boolean {
  if (typeof navigator === 'undefined') return false
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
}

export function isWebKit(): boolean {
  if (typeof navigator === 'undefined') return false
  return /AppleWebKit/i.test(navigator.userAgent) && !/Chrome/i.test(navigator.userAgent)
}

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
