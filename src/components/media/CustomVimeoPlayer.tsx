'use client'

import React, { useState, useRef, useEffect } from 'react'

interface CustomVimeoPlayerProps {
  videoUrl: string
  title?: string
  inline?: boolean
}

export const CustomVimeoPlayer = ({ videoUrl, title, inline = false }: CustomVimeoPlayerProps) => {
  const [isPlaying,       setIsPlaying]       = useState(false)
  const [progress,        setProgress]        = useState(0)
  const [duration,        setDuration]        = useState(0)
  const [currentTime,     setCurrentTime]     = useState(0)
  const [volume,          setVolumeState]     = useState(1)
  const [controlsVisible, setControlsVisible] = useState(true)
  const [isFullscreen,    setIsFullscreen]    = useState(false)
  const [timelineHovered, setTimelineHovered] = useState(false)
  const iframeRef    = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef    = useRef<any>(null)
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  useEffect(() => {
    // Check if script is already loaded
    if (!document.querySelector('script[src="https://player.vimeo.com/api/player.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://player.vimeo.com/api/player.js'
      script.async = true
      document.body.appendChild(script)

      script.onload = initPlayer
    } else {
      // If script is already there, check if Vimeo is available
      if ((window as any).Vimeo) {
        initPlayer()
      } else {
        // Wait for it to be available
        const checkVimeo = setInterval(() => {
          if ((window as any).Vimeo) {
            clearInterval(checkVimeo)
            initPlayer()
          }
        }, 100)
      }
    }

    function initPlayer() {
      if (iframeRef.current && (window as any).Vimeo) {
        const player = new (window as any).Vimeo.Player(iframeRef.current)
        playerRef.current = player

        player.on('play', () => setIsPlaying(true))
        player.on('pause', () => setIsPlaying(false))
        player.on('volumechange', (data: any) => {
          setVolumeState(data.volume)
        })
        player.on('timeupdate', (data: any) => {
          setProgress(data.percent * 100)
          setCurrentTime(data.seconds)
        })
        player.getDuration().then((d: number) => setDuration(d)).catch(() => {})
      }
    }

    return () => {
      // Don't remove script as it might be used by other instances
    }
  }, [videoUrl])

  const formatTime = (s: number): string => {
    const m = Math.floor(s / 60)
    const sec = String(Math.floor(s % 60)).padStart(2, '0')
    return `${m}:${sec}`
  }

  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    playerRef.current.getDuration().then((dur: number) => {
      playerRef.current.setCurrentTime(dur * ratio)
    })
    revealControls()
  }

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
      <iframe
        ref={iframeRef}
        src={vimeoUrl}
        style={{ ...iframeStyles, border: 'none' }}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        title={title}
      ></iframe>

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
          padding: '32px 4px 0',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
          display: 'flex',
          flexDirection: 'column',
          opacity: controlsVisible || !isPlaying ? 1 : 0,
          transition: 'opacity 0.25s ease',
          pointerEvents: controlsVisible || !isPlaying ? 'auto' : 'none',
          zIndex: 20,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Timeline row */}
        <div
          style={{ padding: '6px 8px', cursor: 'pointer', position: 'relative' }}
          onClick={handleSeekClick}
          onMouseEnter={() => setTimelineHovered(true)}
          onMouseLeave={() => setTimelineHovered(false)}
        >
          <div style={{
            position: 'relative',
            width: '100%',
            height: timelineHovered ? 6 : 4,
            background: 'rgba(255,255,255,0.25)',
            borderRadius: 3,
            transition: 'height 0.15s ease',
          }}>
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${progress}%`,
              background: '#fff',
              borderRadius: 3,
            }} />
            {timelineHovered && progress > 0 && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: `${progress}%`,
                transform: 'translate(-50%, -50%)',
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#fff',
                pointerEvents: 'none',
              }} />
            )}
          </div>
        </div>

        {/* Buttons row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px 4px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={togglePlay}
              style={{ background: 'none', border: 'none', padding: 11, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              <img src={isPlaying ? '/svgs/pause-1006-svgrepo-com.svg' : '/svgs/play-svgrepo-com.svg'} alt="" style={{ width: 22, height: 22, display: 'block', pointerEvents: 'none' }} />
            </button>
            {duration > 0 && (
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, fontFamily: 'monospace', marginLeft: 2, pointerEvents: 'none' }}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={toggleMute}
              style={{ background: 'none', border: 'none', padding: 11, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              aria-label={volume === 0 ? 'Unmute' : 'Mute'}
            >
              <img src={volume === 0 ? '/svgs/volume-svgrepo-com_off.svg' : '/svgs/volume-svgrepo-com_on.svg'} alt="" style={{ width: 22, height: 22, display: 'block', pointerEvents: 'none' }} />
            </button>
            <button
              onClick={toggleFullscreen}
              style={{ background: 'none', border: 'none', padding: 11, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              <img src="/svgs/fullscreen-alt-svgrepo-com.svg" alt="" style={{ width: 22, height: 22, display: 'block', pointerEvents: 'none' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
