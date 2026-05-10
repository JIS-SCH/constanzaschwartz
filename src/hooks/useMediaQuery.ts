import { useState, useEffect } from 'react'

const BREAKPOINT = 1024

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINT - 1}px)`)
}

export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINT}px)`)
}