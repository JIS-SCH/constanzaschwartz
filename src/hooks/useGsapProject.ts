'use client'

import { useRef, useCallback } from 'react'
import gsap from 'gsap'
import { DURATION, EASE, STAGGER } from '@/src/motion/tokens'

interface ProjectAnimationAPI {
  open: (rect: DOMRect, index: number) => void
  close: () => void
}

export function useGsapProject(): ProjectAnimationAPI {
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const ctxRef = useRef<gsap.Context | null>(null)
  const savedRect = useRef<DOMRect | null>(null)

  const cleanup = useCallback(() => {
    if (ctxRef.current) {
      ctxRef.current.revert()
      ctxRef.current = null
    }
    if (overlayRef.current) {
      overlayRef.current.remove()
      overlayRef.current = null
    }
    cardRef.current = null
    contentRef.current = null
    closeBtnRef.current = null
    savedRect.current = null
  }, [])

  const open = useCallback(
    (rect: DOMRect, index: number) => {
      cleanup()
      savedRect.current = rect

      // Create overlay
      const overlay = document.createElement('div')
      overlay.style.cssText =
        'position:fixed;inset:0;z-index:100;background:#000;opacity:0;pointer-events:auto;'
      overlayRef.current = overlay

      // Create expanding card
      const card = document.createElement('div')
      card.style.cssText = `
        position:fixed;
        left:${rect.left}px;
        top:${rect.top}px;
        width:${rect.width}px;
        height:${rect.height}px;
        background:#1a1a1a;
        z-index:101;
        overflow:hidden;
        border-radius:2px;
      `
      cardRef.current = card

      // Content container (title words + close button)
      const content = document.createElement('div')
      content.style.cssText =
        'position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;padding:40px;'
      contentRef.current = content

      // Title words
      const title = `Project ${index + 1}`
      const words = title.split(' ')
      const titleContainer = document.createElement('div')
      titleContainer.style.cssText =
        'display:flex;gap:12px;flex-wrap:wrap;justify-content:center;'
      words.forEach((word) => {
        const span = document.createElement('span')
        span.textContent = word
        span.style.cssText =
          'font-family:serif;font-size:48px;color:#fff;opacity:0;display:inline-block;'
        span.classList.add('project-title-word')
        titleContainer.appendChild(span)
      })
      content.appendChild(titleContainer)

      // Close button
      const closeBtn = document.createElement('button')
      closeBtn.textContent = '\u00D7'
      closeBtn.style.cssText =
        'position:absolute;top:24px;right:24px;background:none;border:none;color:#fff;font-size:32px;cursor:pointer;opacity:0;padding:8px;line-height:1;'
      closeBtnRef.current = closeBtn
      closeBtn.addEventListener('click', close)
      content.appendChild(closeBtn)

      card.appendChild(content)
      document.body.appendChild(overlay)
      document.body.appendChild(card)

      // Animate
      const ctx = gsap.context(() => {
        const tl = gsap.timeline()

        // Overlay fade in
        tl.to(overlay, {
          opacity: 0.95,
          duration: DURATION.md,
          ease: EASE.out,
        })

        // Card expand to viewport
        tl.to(
          card,
          {
            left: 0,
            top: 0,
            width: '100vw',
            height: '100vh',
            borderRadius: 0,
            duration: DURATION.lg,
            ease: EASE.sharp,
          },
          '<'
        )

        // Content fade in after card expansion
        tl.to(content, { opacity: 1, duration: DURATION.sm })

        // Title words stagger
        tl.fromTo(
          '.project-title-word',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: STAGGER.md, duration: DURATION.sm, ease: EASE.out },
          '-=0.1'
        )

        // Close button
        tl.to(closeBtn, { opacity: 1, duration: DURATION.sm }, '-=0.2')
      })

      ctxRef.current = ctx
    },
    [cleanup]
  )

  const close = useCallback(() => {
    const overlay = overlayRef.current
    const card = cardRef.current
    const content = contentRef.current
    const rect = savedRect.current
    if (!overlay || !card || !rect) return

    if (ctxRef.current) {
      ctxRef.current.revert()
      ctxRef.current = null
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: cleanup,
      })

      // Fade out content
      if (content) {
        tl.to(content, { opacity: 0, duration: DURATION.xs })
      }

      // Reverse card to saved rect
      tl.to(card, {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        borderRadius: 2,
        duration: DURATION.lg,
        ease: EASE.sharp,
      })

      // Fade out overlay
      tl.to(overlay, { opacity: 0, duration: DURATION.sm }, '-=0.4')
    })

    ctxRef.current = ctx
  }, [cleanup])

  return { open, close }
}
