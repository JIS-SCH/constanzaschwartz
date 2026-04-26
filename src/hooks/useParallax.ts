'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface UseParallaxOptions {
  speed?: number
  direction?: 'y' | 'x' | 'both'
  multiplier?: number
}

export function useParallax(
  elementRef: React.RefObject<HTMLElement | null>,
  options: UseParallaxOptions = {}
) {
  const {
    speed = 1,
    direction = 'y',
    multiplier = 300,
  } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element || speed === 0) return

    const range = speed * multiplier

    const st = ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        // self.progress goes from 0 to 1
        // (self.progress * 2 - 1) goes from -1 to 1
        // This makes the element move from -range to +range relative to its container
        // As the page scrolls down (container moves up), the element moves down relative to the container
        // This creates the illusion that the element is "behind" the page (moving slower)
        const offset = (self.progress * 2 - 1) * range
        const xVal = direction === 'x' || direction === 'both' ? offset : 0
        const yVal = direction === 'y' || direction === 'both' ? offset : 0
        gsap.set(element, { x: xVal, y: yVal })
      },
    })

    return () => {
      st.kill()
    }
  }, [speed, direction, multiplier, elementRef])
}
