'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { useAudio } from '@/src/contexts/AudioContext'

interface VideoPlayerProps {
  id: string
  src: string
  autoPlay?: boolean
  loop?: boolean
  className?: string
  style?: React.CSSProperties
  subtitle?: string
  objectFit?: 'cover' | 'contain'
}

const ICON_SIZE = 22
const HIDE_DELAY_MS = 2500

const iconStyle: React.CSSProperties = {
  width: ICON_SIZE,
  height: ICON_SIZE,
  display: 'block',
  filter: 'invert(1)',
  pointerEvents: 'none',
}

const btnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 6,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export function VideoPlayer({
  id,
  src,
  autoPlay = true,
  loop = true,
  className,
  style,
  subtitle,
  objectFit = 'cover',
}: VideoPlayerProps) {
  const videoRef      = useRef<HTMLVideoElement>(null)
  const containerRef  = useRef<HTMLDivElement>(null)
  const hideTimerRef  = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const { isMuted, activeVideoId, toggleMute, setActiveVideo } = useAudio()

  const [isPlaying,       setIsPlaying]       = useState(false)
  const [controlsVisible, setControlsVisible] = useState(false)
  const [isFullscreen,    setIsFullscreen]     = useState(false)

  const isVideoMuted = isMuted || activeVideoId !== id

  // IntersectionObserver: autoplay/pause based on visibility
  useEffect(() => {
    const video = videoRef.current
    if (!video || !autoPlay) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => setIsPlaying(true)).catch(() => {})
        } else {
          video.pause()
          setIsPlaying(false)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [autoPlay])

  // Sync mute state with global audio context
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = isVideoMuted
  }, [isVideoMuted])

  // Fullscreen change detection
  useEffect(() => {
    const handleChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handleChange)
    return () => document.removeEventListener('fullscreenchange', handleChange)
  }, [])

  const scheduleHide = useCallback(() => {
    clearTimeout(hideTimerRef.current)
    hideTimerRef.current = setTimeout(() => setControlsVisible(false), HIDE_DELAY_MS)
  }, [])

  const revealControls = useCallback(() => {
    setControlsVisible(true)
    scheduleHide()
  }, [scheduleHide])

  const togglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      video.pause()
      setIsPlaying(false)
    }
    revealControls()
  }, [revealControls])

  const handleMute = useCallback(() => {
    if (isVideoMuted) {
      setActiveVideo(id)
      if (isMuted) toggleMute()
    } else {
      toggleMute()
    }
    revealControls()
  }, [isVideoMuted, isMuted, id, setActiveVideo, toggleMute, revealControls])

  const handleFullscreen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    const container = containerRef.current
    if (!container) return
    if (!document.fullscreenElement) {
      container.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
    revealControls()
  }, [revealControls])

  const handleContainerClick = useCallback(() => {
    togglePlay()
  }, [togglePlay])

  const handleMouseEnter = useCallback(() => {
    clearTimeout(hideTimerRef.current)
    setControlsVisible(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    scheduleHide()
  }, [scheduleHide])

  const handleMouseMove = useCallback(() => {
    setControlsVisible(true)
    scheduleHide()
  }, [scheduleHide])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        cursor: isFullscreen && !controlsVisible ? 'none' : 'pointer',
        ...style,
      }}
      onClick={handleContainerClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={revealControls}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit,
          display: 'block',
        }}
      />

      {subtitle && (
        <span
          style={{
            position: 'absolute',
            bottom: '48px',
            left: '16px',
            color: '#FFDF00',
            fontFamily: 'HelveticaLTStd, "Helvetica Neue", sans-serif',
            fontSize: '14px',
            fontWeight: 300,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            pointerEvents: 'none',
          }}
        >
          {subtitle}
        </span>
      )}

      {/* Custom controls bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '24px 8px 8px',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.55))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          opacity: controlsVisible ? 1 : 0,
          transition: 'opacity 0.25s ease',
          pointerEvents: controlsVisible ? 'auto' : 'none',
          zIndex: 10,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button style={btnStyle} onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
          <img
            src={isPlaying ? '/svgs/pause-1006-svgrepo-com.svg' : '/svgs/play-svgrepo-com.svg'}
            alt=""
            style={iconStyle}
          />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button style={btnStyle} onClick={handleMute} aria-label={isVideoMuted ? 'Unmute' : 'Mute'}>
            <img
              src={isVideoMuted ? '/svgs/volume-svgrepo-com_off.svg' : '/svgs/volume-svgrepo-com_on.svg'}
              alt=""
              style={iconStyle}
            />
          </button>
          <button style={btnStyle} onClick={handleFullscreen} aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
            <img
              src="/svgs/fullscreen-alt-svgrepo-com.svg"
              alt=""
              style={iconStyle}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
