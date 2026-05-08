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
      // Smoother mouse follow
      const onMouseMove = (e: MouseEvent) => {
        gsap.to(el, {
          x: e.clientX,
          y: e.clientY,
          xPercent: -50,
          yPercent: -50,
          duration: 0.15,
          ease: 'power2.out',
        })
      }

      const onMouseEnter = () => {
        gsap.to(el, { 
          scale: 4, 
          duration: 0.4, 
          ease: 'power3.out',
          backgroundColor: '#fff' 
        })
        el.style.mixBlendMode = 'difference'
      }

      const onMouseLeave = () => {
        gsap.to(el, { 
          scale: 1, 
          duration: 0.4, 
          ease: 'power3.out',
          backgroundColor: '#fff'
        })
        el.style.mixBlendMode = ''
      }

      const bindElements = () => {
        const targets = document.querySelectorAll('a, button, [role="button"], .project-card, canvas')
        targets.forEach((target) => {
          if (!(target as HTMLElement).dataset.cursorBound) {
            target.addEventListener('mouseenter', onMouseEnter)
            target.addEventListener('mouseleave', onMouseLeave)
            ;(target as HTMLElement).dataset.cursorBound = '1'
          }
        })
      }

      window.addEventListener('mousemove', onMouseMove)
      bindElements()

      const observer = new MutationObserver(bindElements)
      observer.observe(document.body, { childList: true, subtree: true })

      return () => {
        window.removeEventListener('mousemove', onMouseMove)
        observer.disconnect()
      }
    })

    return () => ctx.revert()
  }, [cursorRef])
}
