'use client'

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

interface AudioState {
  isMuted: boolean
  activeVideoId: string | null
  toggleMute: () => void
  setActiveVideo: (id: string | null) => void
}

const AudioContext = createContext<AudioState | null>(null)

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(true)
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      if (!prev) setActiveVideoId(null)
      return !prev
    })
  }, [])

  const setActiveVideo = useCallback((id: string | null) => {
    setActiveVideoId(id)
  }, [])

  return (
    <AudioContext.Provider value={{ isMuted, activeVideoId, toggleMute, setActiveVideo }}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio(): AudioState {
  const ctx = useContext(AudioContext)
  if (!ctx) throw new Error('useAudio must be used within AudioProvider')
  return ctx
}
