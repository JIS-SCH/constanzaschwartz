'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { isMobile } from '@/src/utils/detect'

gsap.registerPlugin(ScrollTrigger)

interface TunnelVideoProps {
  onComplete: () => void
}

const PX_PER_SEC_DESKTOP = 300
const PX_PER_SEC_MOBILE  = 180

// Safari detection
const isSafari = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

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
      : '/tunel/final/tunnel_1080p_g1_30fps.mp4'

    // Safari "wake up" decoder trick
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      video.play().then(() => {
        video.pause()
      }).catch(() => {})
    }

    video.load()

    const setupAnimation = () => {
      const pxPerSec = isMobile() ? PX_PER_SEC_MOBILE : PX_PER_SEC_DESKTOP
      const duration = video.duration
      const videoPx  = Math.round(duration * pxPerSec)

      const logoStartS = isMobile() ? 1 : 1
      const logoEndS   = isMobile() ? 4 : 5

      const logoStartPx    = logoStartS * pxPerSec
      const logoDurationPx = (logoEndS - logoStartS) * pxPerSec

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

      // Scrub video through its entire duration - LERP SMOOTHING
      let currentVideoTime = 0
      let targetVideoTime = 0
      const safari = isSafari()
      const LERP_FACTOR = safari ? 0.08 : 0.15 // Safari needs slower lerp
      const SEEK_THRESHOLD = safari ? 0.05 : 0.03 // Safari needs larger threshold
      let rafId: number

      const lerpLoop = () => {
        if (Math.abs(targetVideoTime - currentVideoTime) > SEEK_THRESHOLD) {
          currentVideoTime += (targetVideoTime - currentVideoTime) * LERP_FACTOR

          if (video.readyState >= 2 && !video.seeking) {
            if (typeof video.fastSeek === 'function') {
              video.fastSeek(currentVideoTime)
            } else {
              video.currentTime = currentVideoTime
            }
          }
        }
        rafId = requestAnimationFrame(lerpLoop)
      }
      lerpLoop()

      tl.to(
        seekProxy,
        {
          t: duration,
          duration: videoPx,
          ease: 'none',
          onUpdate() {
            targetVideoTime = seekProxy.t
          },
        },
        0
      )

      // Black overlay fades in near the end of the video - moved later to show seconds 6-7
      tl.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: videoPx * 0.08, ease: 'power2.in' },
        videoPx * 0.92
      )

      stRef.current = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: `+=${videoPx}`,
        pin: true,
        anticipatePin: 1,
        scrub: safari ? 1 : 1.5, // More smoothing for Safari
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

      return () => {
        cancelAnimationFrame(rafId)
        video.removeEventListener('loadedmetadata', setupAnimation)
        killST()
      }
    }

    video.addEventListener('loadedmetadata', setupAnimation, { once: true })

    return () => {
      video.removeEventListener('loadedmetadata', setupAnimation)
      killST()
    }
  }, [doComplete, killST])

  return (
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
