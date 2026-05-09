'use client'

import { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { useTransition } from '@/src/contexts/TransitionContext'
import { DURATION, EASE } from '@/src/motion/tokens'

export function TransitionOverlay() {
  const { state, setExpanded, setDone, setClosed, reset } = useTransition()
  const router = useRouter()
  const imageRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const ctxRef = useRef<gsap.Context | null>(null)

  // ── Phase: expanding → animate card rect to fullscreen ──────────────────

  // ── Phase: expanding → animate card rect to hero-like position ────────────────
  useEffect(() => {
    if (state.phase !== 'expanding') return
    const el = imageRef.current
    const overlay = overlayRef.current
    if (!el || !overlay || !state.originRect || !state.imageSrc) return

    ctxRef.current?.revert()

    const { left, top, width, height } = state.originRect

    gsap.set(overlay, { visibility: 'visible', opacity: 1 })

    if (el instanceof HTMLImageElement) {
      el.src = state.imageSrc
    }

    gsap.set(el, {
      left,
      top,
      width,
      height,
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      borderRadius: '2px',
      visibility: 'visible',
      opacity: 1,
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
      WebkitTransformStyle: 'preserve-3d',
    })

    const ctx = gsap.context(() => {
      // Direct Navigation: We don't animate to fullscreen anymore.
      // We jump straight to the navigation and let the 'revealing' phase handle the direct morph.
      router.push(`/project/${state.slug}`)
      setExpanded()
    })

    ctxRef.current = ctx
  }, [state.phase, state.originRect, state.imageSrc, state.slug, router, setExpanded])

  // ── Phase: revealing → morph to project image position, then fade ───────
  useEffect(() => {
    if (state.phase !== 'revealing') return
    const el = imageRef.current
    const overlay = overlayRef.current
    if (!el || !overlay) return

    // We DON'T revert here because we want to maintain the fullscreen state 
    // reached in the 'expanding' phase for a continuous morph.

    const target = document.querySelector<HTMLElement>('[data-project-image]')

    const cleanup = () => {
      gsap.set(overlay, { visibility: 'hidden', background: '#0F0F0F', opacity: 1 })
      gsap.set(el, {
        visibility: 'hidden',
        left: '',
        top: '',
        width: '',
        height: '',
        opacity: 1,
        backgroundImage: '',
        filter: 'none'
      })
      setDone()
    }

    const targetRect = target ? target.getBoundingClientRect() : null
    const hasRealTarget = targetRect && targetRect.width > 0 && targetRect.height > 0

    const ctx = gsap.context(() => {
      if (hasRealTarget && targetRect && state.originRect) {


        const scaleX = state.originRect.width / targetRect.width
        const scaleY = state.originRect.height / targetRect.height
        const x = state.originRect.left - targetRect.left
        const y = state.originRect.top - targetRect.top

        gsap.set(el, {
          left: targetRect.left,
          top: targetRect.top,
          width: targetRect.width,
          height: targetRect.height,
          x,
          y,
          scaleX,
          scaleY,
          borderRadius: '2px',
          transformOrigin: '0 0',
        })

        const tl = gsap.timeline()

        // 1. Morph directly to target using scale and translate (GPU)
        tl.to(el, {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          borderRadius: '0px',
          duration: DURATION.lg,
          ease: 'power2.inOut',
          filter: 'url(#liquid-morph)',
        }, 0)

        // 2. Liquid effect during movement
        const disp = document.querySelector('#liquid-morph feDisplacementMap')
        if (disp) {
          gsap.timeline()
            .to(disp, {
              attr: { scale: 15 }, // Reduced from 20 for Safari stability
              duration: DURATION.lg * 0.4,
              ease: 'power1.out',
            })
            .to(disp, {
              attr: { scale: 0 },
              duration: DURATION.lg * 0.6,
              ease: 'power2.inOut',
              onComplete: () => {
                gsap.set(el, { filter: 'none' })
              }
            })
        }

        tl.to(overlay, {
          opacity: 0,
          duration: DURATION.sm,
          ease: EASE.out,
          delay: DURATION.lg * 0.1,
          onComplete: cleanup,
        })
      } else {
        gsap.to(overlay, {
          opacity: 0,
          duration: DURATION.md,
          ease: EASE.out,
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
    gsap.set(overlay, { visibility: 'visible', opacity: 0, background: '#0F0F0F' })

    const ctx = gsap.context(() => {
      gsap.to(overlay, {
        opacity: 1,
        duration: DURATION.md,
        ease: EASE.inOut,
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
        duration: DURATION.md,
        delay: 0.15,
        ease: EASE.out,
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
    <>
      {/* Liquid morph filter definition */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none', visibility: 'hidden' }}>
        <filter id="liquid-morph" x="-50%" y="-50%" width="200%" height="200%" filterUnits="userSpaceOnUse" colorInterpolationFilters="linearRGB">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.005"
            numOctaves="1"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="4" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          pointerEvents: isActive ? 'auto' : 'none',
          visibility: 'hidden',
          background: '#0F0F0F',
          isolation: 'isolate',
          contain: 'strict',
        }}
      >
        <img
          ref={imageRef as any}
          alt=""
          decoding="async"
          style={{
            position: 'fixed',
            visibility: 'hidden',
            objectFit: 'cover',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
            filter: 'none',
            transform: 'translate3d(0,0,0)',
            willChange: 'width, height, left, top, filter',
            WebkitFilter: 'drop-shadow(0 0 0 transparent)', // WebKit composition hack
          }}
        />
      </div>
    </>
  )
}
