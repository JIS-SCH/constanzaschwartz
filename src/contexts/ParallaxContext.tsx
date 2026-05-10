'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface ParallaxContextValue {
  scrollProgress: number
  setScrollProgress: (progress: number) => void
}

const ParallaxContext = createContext<ParallaxContextValue | null>(null)

interface ParallaxProviderProps {
  children: ReactNode
}

export function ParallaxProvider({ children }: ParallaxProviderProps) {
  const [scrollProgress, setScrollProgressState] = useState(0)

  const setScrollProgress = useCallback((progress: number) => {
    setScrollProgressState(Math.max(0, Math.min(1, progress)))
  }, [])

  return (
    <ParallaxContext.Provider value={{ scrollProgress, setScrollProgress }}>
      {children}
    </ParallaxContext.Provider>
  )
}

export function useParallaxContext() {
  const context = useContext(ParallaxContext)
  if (!context) {
    throw new Error('useParallaxContext must be used within ParallaxProvider')
  }
  return context
}
