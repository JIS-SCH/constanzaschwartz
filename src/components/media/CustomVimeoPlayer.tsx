'use client'

import React, { useState, useRef, useEffect } from 'react'

interface CustomVimeoPlayerProps {
  videoUrl: string
  title?: string
  inline?: boolean
  visible?: boolean
}

export const CustomVimeoPlayer = ({ videoUrl, title, inline = false, visible = true }: CustomVimeoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolumeState] = useState(1)
  const [isHovered, setIsHovered] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [controlsVisible, setControlsVisible] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isTimelineHovered, setIsTimelineHovered] = useState(false)

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  useEffect(() => {
    if (!visible || isReady) return

    const initPlayer = () => {
      if (iframeRef.current && (window as any).Vimeo) {
        const player = new (window as any).Vimeo.Player(iframeRef.current)
        playerRef.current = player
        setIsReady(true)

        player.on('play', () => setIsPlaying(true))
        player.on('pause', () => setIsPlaying(false))
        player.on('volumechange', (data: any) => {
          setVolumeState(data.volume)
        })
        player.on('timeupdate', (data: any) => {
          setProgress(data.percent * 100)
          setCurrentTime(data.seconds)
          setDuration(data.duration)
        })
      }
    }

    if (!document.querySelector('script[src="https://player.vimeo.com/api/player.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://player.vimeo.com/api/player.js'
      script.async = true
      document.body.appendChild(script)

      script.onload = initPlayer
    } else if ((window as any).Vimeo) {
      initPlayer()
    } else {
      const checkVimeo = setInterval(() => {
        if ((window as any).Vimeo) {
          clearInterval(checkVimeo)
          initPlayer()
        }
      }, 100)
    }

    return () => {}
  }, [videoUrl, visible])

  const scheduleHide = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    hideTimerRef.current = setTimeout(() => {
      setControlsVisible(false)
    }, 2500)
  }

  const revealControls = () => {
    setControlsVisible(true)
    scheduleHide()
  }

  const togglePlay = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation()
    revealControls()
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pause()
      } else {
        playerRef.current.play()
      }
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const timeline = e.currentTarget
    if (!playerRef.current || !timeline) return

    const rect = timeline.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(1, x / rect.width))
    
    playerRef.current.getDuration().then((duration: number) => {
      playerRef.current.setCurrentTime(duration * percentage)
    })
    setProgress(percentage * 100)
    revealControls()
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value)
    setVolumeState(val)
    if (playerRef.current) {
      playerRef.current.setVolume(val)
    }
  }

  const toggleMute = () => {
    const newVolume = volume > 0 ? 0 : 1
    setVolumeState(newVolume)
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume)
    }
  }

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation()
    const container = containerRef.current
    if (container) {
      if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
          container.requestFullscreen()
        } else if ((container as any).webkitRequestFullscreen) {
          (container as any).webkitRequestFullscreen()
        }
      } else {
        document.exitFullscreen()
      }
    }
    revealControls()
  }

  const iframeStyles: React.CSSProperties = inline ? {
    width: '100%',
    height: '100%',
    pointerEvents: 'none'
  } : {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none'
  }

  const vimeoUrl = videoUrl.includes('?') ? `${videoUrl}&controls=0` : `${videoUrl}?controls=0`

  return (
    <div 
      ref={containerRef}
      className={`custom-vimeo-player ${inline ? 'inline-mode' : ''}`}
      onMouseEnter={() => revealControls()}
      onMouseLeave={() => setControlsVisible(false)}
      onMouseMove={() => revealControls()}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#000',
        overflow: 'hidden'
      }}
    >
      {visible && (
        <iframe
          ref={iframeRef}
          src={vimeoUrl}
          style={iframeStyles}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          title={title}
        />
      )}

      {/* Interaction Overlay */}
      <div 
        onClick={togglePlay}
        onTouchStart={revealControls}
        style={{ position: 'absolute', inset: 0, zIndex: 5, cursor: 'pointer' }} 
      />

      {/* Central Play Button */}
      {!isPlaying && (
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            pointerEvents: 'none',
            opacity: 1
          }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <path d="M48 32L22 47V17L48 32Z" fill="white" />
          </svg>
        </div>
      )}

      {/* Bottom Controls Bar */}
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
          opacity: controlsVisible || !isPlaying ? 1 : 0,
          transition: 'opacity 0.25s ease',
          pointerEvents: controlsVisible || !isPlaying ? 'auto' : 'none',
          zIndex: 20,
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
            position: 'relative'
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
                width: `${progress}%`,
                background: '#FFF',
                borderRadius: 3,
                transition: 'width 0.1s linear'
              }}
            />
          </div>
          {/* Scrubber handle */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: `calc(${progress}% + 4px)`,
              width: isTimelineHovered ? 12 : 0,
              height: 12,
              background: '#FFF',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 10px rgba(0,0,0,0.5)',
              transition: 'all 0.2s ease',
              opacity: isTimelineHovered ? 1 : 0,
              pointerEvents: 'none',
              zIndex: 30
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Play/Pause toggle */}
            <button 
              onClick={togglePlay} 
              style={{ background: 'none', border: 'none', padding: 6, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              <img
                src={isPlaying ? '/svgs/pause-1006-svgrepo-com.svg' : '/svgs/play-svgrepo-com.svg'}
                alt=""
                style={{ width: 22, height: 22, display: 'block', pointerEvents: 'none' }}
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
            {/* Volume toggle */}
            <button 
              onClick={toggleMute} 
              style={{ background: 'none', border: 'none', padding: 6, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              aria-label={volume === 0 ? 'Unmute' : 'Mute'}
            >
              <img
                src={volume === 0 ? '/svgs/volume-svgrepo-com_off.svg' : '/svgs/volume-svgrepo-com_on.svg'}
                alt=""
                style={{ width: 22, height: 22, display: 'block', pointerEvents: 'none' }}
              />
            </button>

            {/* Fullscreen icon */}
            <button 
              onClick={toggleFullscreen} 
              style={{ background: 'none', border: 'none', padding: 6, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              <img
                src="/svgs/fullscreen-alt-svgrepo-com.svg"
                alt=""
                style={{ width: 22, height: 22, display: 'block', pointerEvents: 'none' }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
