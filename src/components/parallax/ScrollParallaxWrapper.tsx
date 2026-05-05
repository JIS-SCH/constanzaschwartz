'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'
import { PARALLAX } from '@/src/motion/tokens'
import { isMobile, prefersReducedMotion } from '@/src/utils/detect'
import { getLenis } from '@/src/scroll/lenis'

interface ScrollParallaxWrapperProps {
  children: ReactNode
  /** Extra CSS class forwarded to the wrapper div */
  className?: string
}

/**
 * Wraps non-hero project content and applies a uniform scroll-parallax
 * transform to the wrapper itself.  Because the transform lives on the
 * container (not on each individual layer), every child keeps its designed
 * position — the 220 px gaps, absolute offsets, collage layouts, etc.
 * all stay intact.
 *
 * Usage — in each project, wrap everything *after* the hero section:
 *
 *   <ParallaxSection id="hero"> … </ParallaxSection>
 *   <ScrollParallaxWrapper>
 *     <ParallaxSection id="collage-1"> … </ParallaxSection>
 *     <ParallaxSection id="collage-2"> … </ParallaxSection>
 *     …
 *   </ScrollParallaxWrapper>
 */
export function ScrollParallaxWrapper({ children, className }: ScrollParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    setDisabled(isMobile() || prefersReducedMotion())
  }, [])

  useEffect(() => {
    if (disabled) return
    const target = ref.current
    if (!target) return

    const lenis = getLenis()
    const readScroll = () => (lenis ? lenis.scroll : window.scrollY)

    const computeOffset = () => {
      const scrollY = readScroll()
      const scrollMax = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      )
      const distanceFromEnd = Math.max(0, scrollMax - scrollY)
      const dampening = Math.min(1, distanceFromEnd / PARALLAX.uniform.ramp)
      return -scrollY * PARALLAX.uniform.factor * dampening
    }

    let targetOffset = computeOffset()
    let currentOffset = targetOffset
    let rafId = 0
    let animating = false

    const tick = () => {
      const diff = targetOffset - currentOffset
      if (Math.abs(diff) < 0.05) {
        currentOffset = targetOffset
        target.style.transform = `translate3d(0, ${currentOffset}px, 0)`
        animating = false
        rafId = 0
        return
      }
      currentOffset += diff * PARALLAX.uniform.lerp
      target.style.transform = `translate3d(0, ${currentOffset}px, 0)`
      rafId = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      targetOffset = computeOffset()
      if (!animating) {
        animating = true
        rafId = requestAnimationFrame(tick)
      }
    }

    // Set initial position
    target.style.transform = `translate3d(0, ${currentOffset}px, 0)`

    if (lenis) {
      lenis.on('scroll', onScroll)
    } else {
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (lenis) lenis.off('scroll', onScroll)
      else window.removeEventListener('scroll', onScroll)
      target.style.transform = ''
    }
  }, [disabled])

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  )
}
