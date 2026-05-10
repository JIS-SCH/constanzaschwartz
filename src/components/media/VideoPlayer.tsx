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

const formatTime = (seconds: number) => {
  if (isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
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
  const [progress,        setProgress]        = useState(0)
  const [duration,        setDuration]        = useState(0)
  const [currentTime,     setCurrentTime]     = useState(0)
  const [isTimelineHovered, setIsTimelineHovered] = useState(false)

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

  // Progress tracking
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
        setCurrentTime(video.currentTime)
      }
    }

    const setVideoDuration = () => setDuration(video.duration)

    video.addEventListener('timeupdate', updateProgress)
    video.addEventListener('loadedmetadata', setVideoDuration)
    
    return () => {
      video.removeEventListener('timeupdate', updateProgress)
      video.removeEventListener('loadedmetadata', setVideoDuration)
    }
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

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const video = videoRef.current
    const timeline = e.currentTarget
    if (!video || !timeline) return

    const rect = timeline.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(1, x / rect.width))
    video.currentTime = percentage * video.duration
    setProgress(percentage * 100)
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
          background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          opacity: controlsVisible ? 1 : 0,
          transition: 'opacity 0.25s ease',
          pointerEvents: controlsVisible ? 'auto' : 'none',
          zIndex: 10,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Timeline */}
        <div
          onClick={handleSeek}
          onMouseEnter={() => setIsTimelineHovered(true)}
          onMouseLeave={() => setIsTimelineHovered(false)}
          style={{
            width: '100%',
            height: 20,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '0 4px',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '100%',
              height: isTimelineHovered ? 6 : 4,
              background: 'rgba(255,255,255,0.3)',
              position: 'relative',
              borderRadius: 3,
              transition: 'all 0.2s ease',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${isNaN(progress) ? 0 : progress}%`,
                background: '#FFF',
                borderRadius: 3,
                transition: 'width 0.1s linear'
              }}
            />
          </div>
          {/* Scrubber handle - floating above the track */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: `calc(${isNaN(progress) ? 0 : progress}% + 4px)`,
              width: isTimelineHovered ? 12 : 0,
              height: 12,
              background: '#FFF',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 10px rgba(0,0,0,0.5)',
              transition: 'all 0.2s ease',
              opacity: isTimelineHovered ? 1 : 0,
              pointerEvents: 'none',
              zIndex: 20
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button style={btnStyle} onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
              <img
                src={isPlaying ? '/svgs/pause-1006-svgrepo-com.svg' : '/svgs/play-svgrepo-com.svg'}
                alt=""
                style={iconStyle}
              />
            </button>
            <span style={{ 
              color: '#FFF', 
              fontSize: '11px', 
              fontFamily: 'monospace',
              opacity: 0.8,
              minWidth: 70
            }}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

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
    </div>
  )
}
