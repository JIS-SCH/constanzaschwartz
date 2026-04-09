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
  const overlayRef = useRef<HTMLDivElement>(null)
  const stRef = useRef<ScrollTrigger | undefined>(undefined)
  const completedRef = useRef(false)
  const [isReady, setIsReady] = useState(false)

  const killST = useCallback(() => {
    if (!stRef.current) return
    stRef.current.kill()
    stRef.current = undefined
  }, [])

  const doComplete = useCallback(() => {
    killST()

    const container = containerRef.current
    if (container) {
      container.style.display = 'none'
    }

    window.scrollTo(0, 0)
    onComplete()
  }, [killST, onComplete])

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    const overlay = overlayRef.current
    if (!video || !container || !overlay) return

    const canFastSeek = typeof (video as HTMLVideoElement & { fastSeek?: (t: number) => void }).fastSeek === 'function'

    const setupAnimation = () => {
      const duration = video.duration
      const scrollDist = Math.round(duration * 180)

      const seekProxy = { t: 0 }

      const tl = gsap.timeline({ paused: true })

      // Drive video time via fastSeek (Firefox/Safari) or currentTime (Chrome).
      // Using a proxy + onUpdate avoids GSAP's default property setter overhead.
      tl.to(seekProxy, {
        t: duration,
        duration,
        ease: 'none',
        onUpdate() {
          if (canFastSeek) {
            (video as HTMLVideoElement & { fastSeek: (t: number) => void }).fastSeek(seekProxy.t)
          } else {
            video.currentTime = seekProxy.t
          }
        },
      }, 0)

      // Fade to black starting at 80% of the timeline → fully black at 100%
      tl.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: duration * 0.2, ease: 'power2.in' },
        duration * 0.8
      )

      stRef.current = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: `+=${scrollDist}`,
        pin: true,
        anticipatePin: 1,
        scrub: 0.5,
        animation: tl,
        onUpdate: (self) => {
          if (self.progress >= 0.97 && !completedRef.current) {
            completedRef.current = true
            gsap.to(overlay, {
              opacity: 1,
              duration: 0.2,
              ease: 'none',
              onComplete: doComplete,
            })
          }
        },
      })

      setIsReady(true)
    }

    // canplaythrough = buffer is full, not just first frame ready.
    // Avoids seeking stalls on the first scroll interaction.
    if (video.readyState >= 4) {
      setupAnimation()
    } else {
      video.addEventListener('canplaythrough', setupAnimation, { once: true })
    }

    return () => {
      video.removeEventListener('canplaythrough', setupAnimation)
      killST()
    }
  }, [doComplete, killST])

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
        <source src="/tunel/tunel-optimized.mp4" type="video/mp4" />
      </video>

      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: 0 }}
      />

      {!isReady && (
        <div className="absolute inset-0 bg-black" />
      )}
    </div>
  )
}
