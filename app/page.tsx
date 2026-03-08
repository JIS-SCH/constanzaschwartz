'use client'

import { useState } from 'react'
import type { AppPhase } from '@/src/types/app'
import { IntroScreen } from '@/src/components/IntroScreen'
import { HomeGrid } from '@/src/components/HomeGrid'
import { Navbar } from '@/src/components/Navbar'
import { projects } from '@/src/data/projects'

export default function Home() {
  const [phase, setPhase] = useState<AppPhase>('intro')
  const [activeProject, setActiveProject] = useState<number | null>(null)

  return (
    <div id="app-root">
      <Navbar />

      {/* HomeGrid mounts early so textures preload during intro.
          It stays behind the intro overlay (z-index 10 vs 20)
          and fades in when intro dispatches 'intro:showCards'. */}
      <HomeGrid
        projects={projects}
        onProjectClick={(i) => {
          setActiveProject(i)
          setPhase('project')
        }}
      />

      {phase === 'intro' && (
        <IntroScreen onComplete={() => setPhase('home')} />
      )}
    </div>
  )
}
