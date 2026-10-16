'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { isMobile } from '@/src/utils/detect'
import { createTunnelDiagnostics } from './tunnelDiagnostics'


interface TunnelVideoProps {
  onComplete: () => void
}

const PX_PER_SEC_DESKTOP = 300
const PX_PER_SEC_MOBILE  = 180

const isSafari = () =>
  /^((?!chrome|android|crios|fxios|edgios).)*safari/i.test(navigator.userAgent)

export function TunnelVideo({ onComplete }: TunnelVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const spacerRef    = useRef<HTMLDivElement>(null)
  const videoRef     = useRef<HTMLVideoElement>(null)
  const logoRef      = useRef<HTMLDivElement>(null)
  const scrollRef    = useRef<HTMLDivElement>(null)
  const overlayRef   = useRef<HTMLDivElement>(null)
  const completedRef = useRef(false)
  const [isReady, setIsReady] = useState(false)

  const doComplete = useCallback(() => {
    const container = containerRef.current
    const spacer    = spacerRef.current
    if (container) container.style.display = 'none'
    if (spacer)    spacer.style.display = 'none'
    window.scrollTo(0, 0)
    onComplete()
  }, [onComplete])

  useEffect(() => {
    const video     = videoRef.current
    const container = containerRef.current
    const spacer    = spacerRef.current
    const overlay   = overlayRef.current
    const logo      = logoRef.current
    if (!video || !container || !spacer || !overlay || !logo) return
    const diagnostics = createTunnelDiagnostics(video)
    completedRef.current = false
    let cleanupAnimation: (() => void) | undefined
    let startAnimation: (() => void) | undefined
    let requestedStart = false
    let finishTimer: ReturnType<typeof setTimeout> | undefined
    let finishTween: gsap.core.Tween | undefined
    let delivered = false
    const deliverHome = () => {
      if (delivered) return
      delivered = true
      clearTimeout(finishTimer)
      doComplete()
    }
    const completeIntro = () => {
      if (completedRef.current) return
      completedRef.current = true
      clearTimeout(finishTimer)
      cleanupAnimation?.()
      video.pause()
      if (diagnostics) diagnostics.state.phase = 'completed'
      diagnostics?.record('intro-complete')
      finishTween = gsap.to(overlay, { opacity: 1, duration: 0.2, onComplete: deliverHome })
      // The Home remains reachable even if the animation ticker stops.
      finishTimer = setTimeout(deliverHome, 500)
    }
    const requestStart = () => {
      if (requestedStart || completedRef.current) return
      requestedStart = true
      diagnostics?.record('intro-gesture')
      startAnimation?.()
    }
    let touchY = 0
    const onTouchStart = (event: TouchEvent) => { touchY = event.touches[0]?.clientY ?? 0 }
    const onTouchMove = (event: TouchEvent) => {
      if (touchY - (event.touches[0]?.clientY ?? touchY) > 12) requestStart()
    }
    const onWheel = (event: WheelEvent) => { if (event.deltaY > 4) requestStart() }
    const onKey = (event: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' ', 'End'].includes(event.key)) requestStart()
    }
    const onScroll = () => { if (window.scrollY > 12) requestStart() }
    const onVideoError = () => { diagnostics?.record('video-error-exit'); completeIntro() }
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    video.addEventListener('error', onVideoError)

    video.src = isMobile()
      ? '/Tunel_Interestellar_Vert_A_mobile_opt.mp4'
      : '/tunel/final/tunnel_1080p_g1_30fps.mp4'


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
      // Reserve a small native scroll range for keyboard and scroll gestures.
      spacer.style.height = (lockedH + 32) + 'px'
    }
    updateLayout()
    window.addEventListener('resize', updateLayout)
    window.addEventListener('orientationchange', updateLayout)

    const setupAnimation = () => {
      const pxPerSec = isMobile() ? PX_PER_SEC_MOBILE : PX_PER_SEC_DESKTOP
      const duration = video.duration
      if (!Number.isFinite(duration) || duration <= 0) return
      videoPx = Math.round(duration * pxPerSec)

      // Recalculate the video dimensions after metadata is available.
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
      const LERP_FACTOR    = safari ? 0.08 : 0.15
      const SEEK_THRESHOLD = safari ? 0.05 : 0.03
      let currentVideoTime = 0
      let targetVideoTime  = 0
      let rafId: number
      let previousFrame = performance.now()

      const lerpLoop = () => {
        if (completedRef.current) return
        const now = performance.now()
        const delta = Math.min((now - previousFrame) / 1000, 0.1)
        previousFrame = now
        if (diagnostics) {
          diagnostics.state.rafAt = performance.now()
          diagnostics.state.rafCount++
          diagnostics.state.target = targetVideoTime
        }
        if (Math.abs(targetVideoTime - video.currentTime) > SEEK_THRESHOLD &&
            video.readyState >= 2 && !video.seeking) {
          // Advance from the media's real position only when it accepts a seek.
          const alpha = 1 - Math.pow(1 - LERP_FACTOR, delta * 60)
          currentVideoTime = video.currentTime + (targetVideoTime - video.currentTime) * alpha
          currentVideoTime = Math.max(0, Math.min(duration - 0.001, currentVideoTime))
          if (diagnostics) diagnostics.state.internal = currentVideoTime
          try {
            if (diagnostics) diagnostics.state.requested = currentVideoTime
            video.currentTime = currentVideoTime
          } catch (error) {
            diagnostics?.record('seek-rejected', String(error))
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

      tl.eventCallback('onComplete', completeIntro)
      startAnimation = () => {
        if (completedRef.current) return
        if (diagnostics) diagnostics.state.phase = 'playing'
        tl.timeScale(pxPerSec).play()
        finishTimer = setTimeout(() => {
          diagnostics?.record('transition-timeout')
          completeIntro()
        }, (duration + 4) * 1000)
      }

      if (diagnostics) {
        diagnostics.state.phase = 'waiting-for-gesture'
        diagnostics.setProgressReader(() => ({
          scrollProgress: requestedStart ? 1 : 0,
          timelineProgress: tl.progress(),
        }))
      }

      setIsReady(true)
      if (requestedStart) startAnimation()

      return () => {
        cancelAnimationFrame(rafId)
        tl.kill()
      }
    }

    let setupCalled = false

    const handleLoadedMetadata = () => {
      if (setupCalled || !Number.isFinite(video.duration) || video.duration <= 0) return
      setupCalled = true
      clearTimeout(skipTimeout)
      cleanupAnimation = setupAnimation()
    }

    // Fallback: if video metadata never loads (Chrome private, slow connection), skip the tunnel
    const skipTimeout = setTimeout(() => {
      if (!setupCalled && !completedRef.current) {
        diagnostics?.record('metadata-timeout')
        video.removeEventListener('loadedmetadata', handleLoadedMetadata)
        completeIntro()
      }
    }, 6000)

    video.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true })
    video.load()

    return () => {
      diagnostics?.dispose()
      cleanupAnimation?.()
      video.pause()
      clearTimeout(finishTimer)
      finishTween?.kill()
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
      video.removeEventListener('error', onVideoError)
      clearTimeout(skipTimeout)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      window.removeEventListener('resize', updateLayout)
      window.removeEventListener('orientationchange', updateLayout)
    }
  }, [doComplete])

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
