'use client'

import React, { useState, useRef, useEffect } from 'react'

interface CustomVimeoPlayerProps {
  videoUrl: string
  title?: string
  inline?: boolean
}

export const CustomVimeoPlayer = ({ videoUrl, title, inline = false }: CustomVimeoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolumeState] = useState(1)
  const [isHovered, setIsHovered] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [controlsVisible, setControlsVisible] = useState(true)

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
        })
      }
    }

    return () => {
      // Don't remove script as it might be used by other instances
    }
  }, [videoUrl])

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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value)
    if (playerRef.current) {
      playerRef.current.getDuration().then((duration: number) => {
        playerRef.current.setCurrentTime(duration * (val / 100))
      })
    }
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
      <iframe
        ref={iframeRef}
        src={vimeoUrl}
        style={iframeStyles}
        frameBorder="0"
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
          height: '100px',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
          display: 'flex',
          alignItems: 'center',
          padding: '0 40px',
          gap: '24px',
          zIndex: 20,
          opacity: controlsVisible || !isPlaying ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: controlsVisible || !isPlaying ? 'auto' : 'none'
        }}
      >
        {/* Play/Pause toggle */}
        <div onClick={togglePlay} style={{ cursor: 'pointer', width: '24px', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          {isPlaying ? (
            <svg width="16" height="20" viewBox="0 0 16 20" fill="white">
              <rect x="0" y="0" width="5" height="20" />
              <rect x="11" y="0" width="5" height="20" />
            </svg>
          ) : (
            <svg width="18" height="20" viewBox="0 0 20 20" fill="white">
              <path d="M20 10L0 20V0L20 10Z" />
            </svg>
          )}
        </div>

        {/* Progress line */}
        <div style={{ flex: 1, position: 'relative', height: '4px', display: 'flex', alignItems: 'center' }}>
          {/* Background line */}
          <div style={{ position: 'absolute', inset: 0, height: '2px', background: 'rgba(255,255,255,0.25)' }} />
          {/* Active progress line */}
          <div style={{ position: 'absolute', left: 0, top: 0, height: '2px', background: 'white', width: `${progress}%` }} />
          {/* Handle/Circle */}
          <div 
            style={{ 
              position: 'absolute', 
              left: `${progress}%`, 
              width: '10px', 
              height: '10px', 
              background: 'white', 
              borderRadius: '50%',
              transform: 'translateX(-50%)',
              boxShadow: '0 0 8px rgba(0,0,0,0.5)'
            }} 
          />
          {/* Hidden range input for seeking */}
          <input 
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={handleSeek}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '30px',
              opacity: 0,
              cursor: 'pointer',
              zIndex: 2
            }}
          />
        </div>

        {/* Volume selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div onClick={toggleMute} style={{ cursor: 'pointer', width: '20px', display: 'flex', alignItems: 'center' }}>
            {volume === 0 ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </div>
          <div style={{ width: '60px', height: '2px', position: 'relative', display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, height: '1px', background: 'rgba(255,255,255,0.15)' }} />
            <div style={{ position: 'absolute', left: 0, top: 0, height: '1px', background: 'white', width: `${volume * 100}%` }} />
            <input 
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '20px',
                opacity: 0,
                cursor: 'pointer',
                zIndex: 2
              }}
            />
          </div>
        </div>

        {/* Fullscreen icon */}
        <div onClick={toggleFullscreen} style={{ cursor: 'pointer', width: '20px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M15 3h6v6M9 21H3v-6M21 15v6h-6M3 9V3h6" />
          </svg>
        </div>
      </div>
    </div>
  )
}
