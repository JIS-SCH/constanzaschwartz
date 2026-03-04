export function isMobile(): boolean {
  return window.innerWidth < 768;
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
