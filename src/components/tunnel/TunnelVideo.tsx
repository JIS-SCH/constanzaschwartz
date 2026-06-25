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

const isCriOS = () => /CriOS/i.test(navigator.userAgent)
const isSafari = () =>
  /^((?!chrome|android|crios|fxios|edgios).)*safari/i.test(navigator.userAgent)

export function TunnelVideo({ onComplete }: TunnelVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const spacerRef    = useRef<HTMLDivElement>(null)
  const videoRef     = useRef<HTMLVideoElement>(null)
  const logoRef      = useRef<HTMLDivElement>(null)
  const scrollRef    = useRef<HTMLDivElement>(null)
  const overlayRef   = useRef<HTMLDivElement>(null)
  const stRef        = useRef<ScrollTrigger | undefined>(undefined)
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
    const spacer    = spacerRef.current
    if (container) container.style.display = 'none'
    if (spacer)    spacer.style.display = 'none'
    window.scrollTo(0, 0)
    onComplete()
  }, [killST, onComplete])

  useEffect(() => {
    const video     = videoRef.current
    const container = containerRef.current
    const spacer    = spacerRef.current
    const overlay   = overlayRef.current
    const logo      = logoRef.current
    if (!video || !container || !spacer || !overlay || !logo) return

    video.src = isMobile()
      ? '/Tunel_Interestellar_Vert_A_mobile_opt.mp4'
      : '/tunel/final/tunnel_1080p_g1_30fps.mp4'

    if (isSafari()) {
      video.play().then(() => video.pause()).catch(() => {})
    }

    video.load()

    // Normalize only on mobile Safari. Chrome iOS can get stuck when
    // normalizeScroll intercepts the address-bar scroll gesture during intro.
    const normalizer = isMobile() && isSafari() ? ScrollTrigger.normalizeScroll(true) : undefined

    // Lock container + video to the LARGEST stable viewport size.
    // Using window.innerWidth/Height in pixels avoids iOS Safari quirks
    // with vh/dvh/lvh on <video> + object-fit, and prevents jump on URL bar animation.
    let lockedW = 0
    let lockedH = 0
    let videoPx = 0
    const updateLayout = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      // Only grow — never shrink — so URL bar collapse/expand doesn't cause reflow.
      if (w > lockedW) lockedW = w
      if (h > lockedH) lockedH = h
      container.style.width  = lockedW + 'px'
      container.style.height = lockedH + 'px'
      // Scale video to fully cover container (max of width/height ratios)
      const vw = video.videoWidth  || 540
      const vh = video.videoHeight || 960
      const scale = Math.max(lockedW / vw, lockedH / vh)
      const sW = vw * scale
      const sH = vh * scale
      video.style.width  = sW + 'px'
      video.style.height = sH + 'px'
      video.style.left   = ((lockedW - sW) / 2) + 'px'
      video.style.top    = ((lockedH - sH) / 2) + 'px'
      // The container is fixed, so it consumes no scroll. The spacer must reserve
      // the scrub distance (videoPx) PLUS one viewport — this replicates what
      // ScrollTrigger's pin-spacer did before the pin was removed. Without the
      // extra viewport, max scroll caps at videoPx - lockedH and progress never
      // reaches the 0.97 completion threshold.
      if (videoPx > 0) spacer.style.height = (videoPx + lockedH) + 'px'
    }
    updateLayout()
    window.addEventListener('resize', updateLayout)
    window.addEventListener('orientationchange', updateLayout)

    const setupAnimation = () => {
      const pxPerSec = isMobile() ? PX_PER_SEC_MOBILE : PX_PER_SEC_DESKTOP
      const duration = video.duration
      videoPx = Math.round(duration * pxPerSec)

      // Now that videoPx + videoWidth/Height are known, re-run layout so the
      // video is pixel-perfect and the spacer reserves the full scroll height.
      updateLayout()

      const logoStartPx    = (isMobile() ? 1 : 1) * pxPerSec
      const logoDurationPx = ((isMobile() ? 4 : 5) - 1) * pxPerSec

      const seekProxy = { t: 0 }
      const tl = gsap.timeline({ paused: true })

      tl.fromTo(video, { opacity: 0 }, { opacity: 1, duration: 60, ease: 'power1.out' }, 0)

      const scroll = scrollRef.current
      if (scroll) {
        tl.fromTo(scroll, { opacity: 1 }, { opacity: 0, duration: 60, ease: 'power1.in' }, 0)
      }

      tl.fromTo(
        logo,
        { scale: 1, opacity: 1 },
        { scale: 0.03, opacity: 0, duration: logoDurationPx, ease: 'power2.in' },
        logoStartPx
      )

      const safari = isSafari()
      const chromeIOS = isCriOS()
      const LERP_FACTOR    = safari ? 0.08 : 0.15
      const SEEK_THRESHOLD = safari ? 0.05 : 0.03
      let currentVideoTime = 0
      let targetVideoTime  = 0
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

      tl.to(seekProxy, {
        t: duration,
        duration: videoPx,
        ease: 'none',
        onUpdate() { targetVideoTime = seekProxy.t },
      }, 0)

      tl.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: videoPx * 0.08, ease: 'power2.in' },
        videoPx * 0.92
      )

      // Trigger on the spacer — no pin needed, container is already fixed
      const completeIntro = () => {
        if (completedRef.current) return
        completedRef.current = true
        gsap.to(overlay, {
          opacity: 1,
          duration: 0.2,
          ease: 'none',
          onComplete: () => {
            normalizer?.kill()
            doComplete()
          },
        })
      }

      stRef.current = ScrollTrigger.create({
        trigger: spacer,
        start: 'top top',
        end: `+=${videoPx}`,
        scrub: safari ? 1 : 1.5,
        animation: tl,
        onUpdate: (self) => {
          const nearScrollEnd = window.scrollY >= videoPx * (chromeIOS ? 0.88 : 0.95)
          if (self.progress >= 0.97 || nearScrollEnd) {
            completeIntro()
          }
        },
        onLeave: completeIntro,
      })

      setIsReady(true)

      return () => {
        cancelAnimationFrame(rafId)
        video.removeEventListener('loadedmetadata', setupAnimation)
        killST()
      }
    }

    let setupCalled = false

    const handleLoadedMetadata = () => {
      setupCalled = true
      clearTimeout(skipTimeout)
      setupAnimation()
    }

    // Fallback: if video metadata never loads (Chrome private, slow connection), skip the tunnel
    const skipTimeout = setTimeout(() => {
      if (!setupCalled && !completedRef.current) {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata)
        normalizer?.kill()
        doComplete()
      }
    }, 6000)

    video.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true })

    return () => {
      clearTimeout(skipTimeout)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      window.removeEventListener('resize', updateLayout)
      window.removeEventListener('orientationchange', updateLayout)
      normalizer?.kill()
      killST()
    }
  }, [doComplete, killST])

  return (
    <>
      {/* Scroll spacer — creates scrollable height, never visible */}
      <div ref={spacerRef} />

      {/* Fixed fullscreen container — JS sets width/height in px to lock against URL bar animation */}
      <div
        ref={containerRef}
        className="overflow-hidden"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 50,
          background: '#000',
        }}
      >
        <video
          ref={videoRef}
          className="absolute"
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
              style={{ width: 'clamp(140px, 53vw, 220px)', display: 'block' }}
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
    </>
  )
}
