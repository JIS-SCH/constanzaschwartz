'use client'

import { useEffect } from 'react'
import type { RefObject } from 'react'
import { getLenis } from '@/src/scroll/lenis'
import { prefersReducedMotion, isMobile } from '@/src/utils/detect'

const LERP = 0.08

export function useParallaxNative(
  targetRef: RefObject<HTMLElement | null>,
  _containerRef: RefObject<HTMLElement | null>,
  speed = 0.3,
) {
  useEffect(() => {
    const target = targetRef.current
    if (!target || speed === 0 || isMobile() || prefersReducedMotion()) return

    // Reference position uses the parent (section) which never moves
    const reference = target.parentElement ?? target
    const factor = 1 - speed
    let targetOffset = 0
    let currentOffset = 0
    let rafId = 0
    let animating = false

    const computeTarget = () => {
      const rect = reference.getBoundingClientRect()
      const vH = window.innerHeight
      const elementCenter = rect.top + rect.height / 2
      const raw = (vH / 2 - elementCenter) * factor
      const max = rect.height * 0.08
      return Math.max(-max, Math.min(max, raw))
    }

    const tick = () => {
      const diff = targetOffset - currentOffset
      if (Math.abs(diff) < 0.05) {
        currentOffset = targetOffset
        target.style.transform = `translate3d(0, ${targetOffset}px, 0) scale(1.08)`
        animating = false
        return
      }
      currentOffset += diff * LERP
      target.style.transform = `translate3d(0, ${currentOffset}px, 0) scale(1.08)`
      rafId = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      targetOffset = computeTarget()
      if (!animating) {
        animating = true
        rafId = requestAnimationFrame(tick)
      }
    }

    const lenis = getLenis()
    if (lenis) {
      lenis.on('scroll', onScroll)
    } else {
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    targetOffset = computeTarget()
    currentOffset = targetOffset
    target.style.transform = `translate3d(0, ${currentOffset}px, 0) scale(1.08)`

    return () => {
      cancelAnimationFrame(rafId)
      if (lenis) {
        lenis.off('scroll', onScroll)
      } else {
        window.removeEventListener('scroll', onScroll)
      }
      target.style.transform = ''
    }
  }, [targetRef, speed])
}
