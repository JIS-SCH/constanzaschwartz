'use client'

import { useCallback, useState } from 'react'
import type { AppPhase } from '@/src/types/app'
import { TunnelVideo } from '@/src/components/TunnelVideo'
import { IntroScreen } from '@/src/components/IntroScreen'
import { HomeGrid } from '@/src/components/HomeGrid'
import { Navbar } from '@/src/components/Navbar'
import { projects } from '@/src/data/projects'

export default function Home() {
  const [phase, setPhase] = useState<AppPhase>('tunnel')
  const [activeProject, setActiveProject] = useState<number | null>(null)

  const handleProjectClick = useCallback((i: number) => {
    setActiveProject(i)
    setPhase('project')
  }, [])

  const handleTunnelComplete = useCallback(() => {
    setPhase('intro')
  }, [])

  const handleIntroComplete = useCallback(() => {
    setPhase('home')
  }, [])

  return (
    <div id="app-root">
      {/* Tunnel video — always mounted, hides itself when done */}
      <TunnelVideo onComplete={handleTunnelComplete} />

      {/* Intro overlay — starts after tunnel completes */}
      {phase === 'intro' && (
        <IntroScreen onComplete={handleIntroComplete} />
      )}

      <Navbar />
      <HomeGrid
        projects={projects}
        onProjectClick={handleProjectClick}
      />
    </div>
  )
}
