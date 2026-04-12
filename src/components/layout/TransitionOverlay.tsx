'use client'

import { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { useTransition } from '@/src/contexts/TransitionContext'

export function TransitionOverlay() {
  const { state, setExpanded, setDone, setClosed, reset } = useTransition()
  const router = useRouter()
  const imageRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const ctxRef = useRef<gsap.Context | null>(null)

  // ── Phase: expanding → animate card rect to fullscreen ──────────────────
  useEffect(() => {
    if (state.phase !== 'expanding') return
    const el = imageRef.current
    const overlay = overlayRef.current
    if (!el || !overlay || !state.originRect || !state.imageSrc) return

    ctxRef.current?.revert()

    const { left, top, width, height } = state.originRect

    gsap.set(overlay, { visibility: 'visible', opacity: 1 })
    gsap.set(el, {
      left,
      top,
      width,
      height,
      borderRadius: '2px',
      visibility: 'visible',
      opacity: 1,
      yPercent: 0,
      backgroundImage: `url(${state.imageSrc})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    })

    const flipState = Flip.getState(el)

    gsap.set(el, {
      left: 0,
      top: 0,
      width: '100vw',
      height: '100vh',
      borderRadius: '0px',
    })

    const ctx = gsap.context(() => {
      Flip.from(flipState, {
        targets: el,
        duration: 0.7,
        ease: 'expo.inOut',
        onComplete: () => {
          router.push(`/project/${state.slug}`)
          setExpanded()
        },
      })
    })

    ctxRef.current = ctx
  }, [state.phase, state.originRect, state.imageSrc, state.slug, router, setExpanded])

  // ── Phase: revealing → morph to project image position, then fade ───────
  useEffect(() => {
    if (state.phase !== 'revealing') return
    const el = imageRef.current
    const overlay = overlayRef.current
    if (!el || !overlay) return

    ctxRef.current?.revert()

    const target = document.querySelector<HTMLElement>('[data-project-image]')

    const cleanup = () => {
      gsap.set(overlay, { visibility: 'hidden', background: '#000', opacity: 1 })
      gsap.set(el, { visibility: 'hidden', left: '', top: '', width: '', height: '', opacity: 1, backgroundImage: '' })
      setDone()
    }

    const ctx = gsap.context(() => {
      if (target) {
        const targetRect = target.getBoundingClientRect()
        const tl = gsap.timeline()

        tl.to(el, {
          left: targetRect.left,
          top: targetRect.top,
          width: targetRect.width,
          height: targetRect.height,
          duration: 0.8,
          ease: 'power3.inOut',
        }, 0)

        tl.to(overlay, {
          opacity: 0,
          duration: 0.35,
          ease: 'power2.out',
          onComplete: cleanup,
        })
      } else {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: cleanup,
        })
      }
    })

    ctxRef.current = ctx
  }, [state.phase, setDone])

  // ── Phase: closing → fade to black, then navigate home ──────────────────
  useEffect(() => {
    if (state.phase !== 'closing') return
    const overlay = overlayRef.current
    const el = imageRef.current
    if (!overlay) return

    ctxRef.current?.revert()

    // Hide the image element (not needed for back transition)
    if (el) gsap.set(el, { visibility: 'hidden' })

    // Fade in black overlay
    gsap.set(overlay, { visibility: 'visible', opacity: 0, background: '#000' })

    const ctx = gsap.context(() => {
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          router.push('/')
          setClosed()
        },
      })
    })

    ctxRef.current = ctx
  }, [state.phase, router, setClosed])

  // ── Phase: closed → home arrived, fade out black overlay ────────────────
  useEffect(() => {
    if (state.phase !== 'closed') return
    const overlay = overlayRef.current
    if (!overlay) return

    ctxRef.current?.revert()

    // Wait for home page to mount and paint
    const ctx = gsap.context(() => {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.6,
        delay: 0.15,
        ease: 'power2.out',
        onComplete: () => {
          gsap.set(overlay, { visibility: 'hidden', opacity: 1 })
          reset()
        },
      })
    })

    ctxRef.current = ctx
  }, [state.phase, reset])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      ctxRef.current?.revert()
    }
  }, [])

  const isActive = !['idle', 'done'].includes(state.phase)

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        pointerEvents: isActive ? 'auto' : 'none',
        visibility: 'hidden',
        background: '#000',
      }}
    >
      <div
        ref={imageRef}
        style={{
          position: 'fixed',
          visibility: 'hidden',
          willChange: 'transform, width, height, left, top, opacity',
        }}
      />
    </div>
  )
}
