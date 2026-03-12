'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TunnelVideoProps {
  onComplete: () => void
}

export function TunnelVideo({ onComplete }: TunnelVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const completedRef = useRef(false)
  const [isReady, setIsReady] = useState(false)

  const handleComplete = useCallback(() => {
    if (completedRef.current) return
    completedRef.current = true

    const container = containerRef.current
    if (container) {
      const pinWrapper = container.parentElement?.classList.contains('pin-spacer')
        ? container.parentElement
        : container
      pinWrapper.style.display = 'none'
    }

    window.scrollTo(0, 0)
    onComplete()
  }, [onComplete])

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    let tl: gsap.core.Timeline | undefined

    const setupAnimation = () => {
      const duration = video.duration

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${duration * 150}px`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onLeave: handleComplete,
        },
      })

      tl.to(video, { currentTime: duration, duration, ease: 'none' }, 0)

      setIsReady(true)
    }

    if (video.readyState >= 2) {
      setupAnimation()
    } else {
      video.addEventListener('canplay', setupAnimation, { once: true })
    }

    return () => {
      video.removeEventListener('canplay', setupAnimation)
      tl?.scrollTrigger?.kill()
      tl?.kill()
    }
  }, [handleComplete])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        preload="auto"
        muted
        playsInline
      >
        <source src="/walk-optimized.mp4" type="video/mp4" />
        <source src="/walk.mp4" type="video/mp4" />
      </video>

      {!isReady && (
        <div className="absolute inset-0 bg-black animate-pulse" />
      )}
    </div>
  )
}
