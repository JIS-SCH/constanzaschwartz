'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { isMobile } from '@/src/utils/detect'

gsap.registerPlugin(ScrollTrigger)

interface TunnelVideoProps {
  onComplete: () => void
}

const LOGO_FADE_START_S = 1    // video second at which logo starts fading
const LOGO_FADE_END_S   = 4    // video second at which logo is fully gone
const PX_PER_SEC        = 180  // scroll pixels per second of video

export function TunnelVideo({ onComplete }: TunnelVideoProps) {
  const containerRef  = useRef<HTMLDivElement>(null)
  const videoRef      = useRef<HTMLVideoElement>(null)
  const logoRef       = useRef<HTMLDivElement>(null)
  const scrollRef     = useRef<HTMLDivElement>(null)
  const overlayRef    = useRef<HTMLDivElement>(null)
  const stRef         = useRef<ScrollTrigger | undefined>(undefined)
  const completedRef  = useRef(false)
  const [isReady, setIsReady] = useState(false)

  const killST = useCallback(() => {
    if (!stRef.current) return
    stRef.current.kill()
    stRef.current = undefined
  }, [])

  const doComplete = useCallback(() => {
    killST()
    const container = containerRef.current
    if (container) container.style.display = 'none'
    window.scrollTo(0, 0)
    onComplete()
  }, [killST, onComplete])

  useEffect(() => {
    const video     = videoRef.current
    const container = containerRef.current
    const overlay   = overlayRef.current
    const logo      = logoRef.current
    if (!video || !container || !overlay || !logo) return

    video.src = isMobile()
      ? '/Tunel_Interestellar_Vert_A.mp4'
      : '/home/Tunel_Interestellar_A.mp4'
    video.load()

    const canFastSeek =
      typeof (video as HTMLVideoElement & { fastSeek?: (t: number) => void }).fastSeek === 'function'

    const setupAnimation = () => {
      const duration = video.duration
      const videoPx  = Math.round(duration * PX_PER_SEC)

      const logoStartPx    = LOGO_FADE_START_S * PX_PER_SEC
      const logoDurationPx = (LOGO_FADE_END_S - LOGO_FADE_START_S) * PX_PER_SEC

      const seekProxy = { t: 0 }
      const tl = gsap.timeline({ paused: true })

      // Video fades in immediately on first scroll
      tl.fromTo(
        video,
        { opacity: 0 },
        { opacity: 1, duration: 60, ease: 'power1.out' },
        0
      )

      // Scroll indicator disappears as soon as scroll begins
      const scroll = scrollRef.current
      if (scroll) {
        tl.fromTo(
          scroll,
          { opacity: 1 },
          { opacity: 0, duration: 60, ease: 'power1.in' },
          0
        )
      }

      // Logo fades from video t=1s to t=4s
      tl.fromTo(
        logo,
        { scale: 1, opacity: 1 },
        { scale: 0.03, opacity: 0, duration: logoDurationPx, ease: 'power2.in' },
        logoStartPx
      )

      // Scrub video through its entire duration
      tl.to(
        seekProxy,
        {
          t: duration,
          duration: videoPx,
          ease: 'none',
          onUpdate() {
            if (canFastSeek) {
              (video as HTMLVideoElement & { fastSeek: (t: number) => void }).fastSeek(seekProxy.t)
            } else {
              video.currentTime = seekProxy.t
            }
          },
        },
        0
      )

      // Black overlay fades in near the end of the video
      tl.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: videoPx * 0.15, ease: 'power2.in' },
        videoPx * 0.85
      )

      stRef.current = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: `+=${videoPx}`,
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

    video.addEventListener('loadedmetadata', setupAnimation, { once: true })

    return () => {
      video.removeEventListener('loadedmetadata', setupAnimation)
      killST()
    }
  }, [doComplete, killST])

  return (
    // h-[100dvh]: dynamic viewport height — excludes mobile browser chrome
    // (address bar, navigation bar). Fixes the classic 100vh bug on iOS/Android.
    <div
      ref={containerRef}
      className="relative w-full bg-black overflow-hidden"
      style={{ height: '100dvh' }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0 }}
        preload="auto"
        muted
        playsInline
      />

      {/* Logo wrapper fills the screen — transformOrigin center = screen center.
          Logo sits at top: 37% (Figma: 331px / ~900px, optical offset above center).
          Scaling the full-screen div makes the logo recede toward the vanishing point. */}
      <div
        ref={logoRef}
        className="absolute inset-0"
        style={{ transformOrigin: 'center center' }}
      >
        <div
          className="absolute w-full flex justify-center"
          style={{ top: '37%' }}
        >
          <img
            src="/home/CONSTANZA-SCHWARTZ_imagotipo_white.svg"
            alt="Constanza Schwartz"
            style={{
              width: 'clamp(140px, 53vw, 220px)',
              display: 'block',
            }}
            draggable={false}
          />
        </div>
      </div>

      {/* Scroll indicator — bottom: 90px + safe-area-inset for iPhone home indicator */}
      <div
        ref={scrollRef}
        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2"
        style={{ bottom: 'calc(90px + env(safe-area-inset-bottom, 0px))' }}
      >
        <img
          src="/home/CONSTANZA-SCHWARTZ_HOME_scrollarrows.svg"
          alt=""
          style={{ width: '10px' }}
          draggable={false}
        />
        <span
          style={{
            fontSize: '14px',
            fontWeight: 200,
            letterSpacing: '0.2em',
            color: 'white',
            textTransform: 'uppercase',
          }}
        >
          scroll
        </span>
      </div>

      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: 0 }}
      />

      {!isReady && <div className="absolute inset-0 bg-black" />}
    </div>
  )
}
