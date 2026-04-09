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
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { isMuted, activeVideoId, setActiveVideo } = useAudio()
  const [showControls, setShowControls] = useState(false)

  // IntersectionObserver: autoplay/pause based on visibility
  useEffect(() => {
    const video = videoRef.current
    if (!video || !autoPlay) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
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

    video.muted = isMuted || activeVideoId !== id
  }, [isMuted, activeVideoId, id])

  const handleClick = useCallback(() => {
    setActiveVideo(id)
    setShowControls(true)
  }, [id, setActiveVideo])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', ...style }}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        muted
        playsInline
        controls={showControls}
        onClick={handleClick}
        style={{
          width: '100%',
          height: '100%',
          objectFit,
          display: 'block',
          cursor: 'pointer',
        }}
      />
      {subtitle && (
        <span
          style={{
            position: 'absolute',
            bottom: '12px',
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
    </div>
  )
}
