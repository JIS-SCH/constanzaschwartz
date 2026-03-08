'use client'

import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { isMobile } from '@/src/utils/detect'

export function useGsapCursor(cursorRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (isMobile()) return

    const el = cursorRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const onMouseMove = (e: MouseEvent) => {
        gsap.to(el, {
          x: e.clientX - 4,
          y: e.clientY - 4,
          duration: 0.12,
          ease: 'power1.out',
        })
      }

      const onMouseEnter = () => {
        gsap.to(el, { scale: 3, duration: 0.3, ease: 'power2.out' })
        el.style.mixBlendMode = 'difference'
      }

      const onMouseLeave = () => {
        gsap.to(el, { scale: 1, duration: 0.3, ease: 'power2.out' })
        el.style.mixBlendMode = ''
      }

      window.addEventListener('mousemove', onMouseMove)
      document.querySelectorAll('[data-cursor-grow]').forEach((target) => {
        target.addEventListener('mouseenter', onMouseEnter)
        target.addEventListener('mouseleave', onMouseLeave)
      })

      // Observe DOM for dynamically added [data-cursor-grow] elements
      const observer = new MutationObserver(() => {
        document.querySelectorAll('[data-cursor-grow]').forEach((target) => {
          if (!(target as HTMLElement).dataset.cursorBound) {
            target.addEventListener('mouseenter', onMouseEnter)
            target.addEventListener('mouseleave', onMouseLeave)
            ;(target as HTMLElement).dataset.cursorBound = '1'
          }
        })
      })
      observer.observe(document.body, { childList: true, subtree: true })

      return () => {
        window.removeEventListener('mousemove', onMouseMove)
        document.querySelectorAll('[data-cursor-grow]').forEach((target) => {
          target.removeEventListener('mouseenter', onMouseEnter)
          target.removeEventListener('mouseleave', onMouseLeave)
        })
        observer.disconnect()
      }
    })

    return () => ctx.revert()
  }, [cursorRef])
}
