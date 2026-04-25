'use client'

import { useCallback, useState } from 'react'
import type { AppPhase } from '@/src/types/app'
import { TunnelVideo } from '@/src/components/tunnel/TunnelVideo'
import { HomeGrid } from '@/src/components/home/HomeGrid'
import { projectList } from '@/src/projects/registry'
import { useTransition } from '@/src/contexts/TransitionContext'
import type { OriginRect } from '@/src/contexts/TransitionContext'

function getInitialPhase(): AppPhase {
  if (typeof window !== 'undefined' && sessionStorage.getItem('introComplete')) {
    return 'home'
  }
  return 'tunnel'
}

export default function Home() {
  const [phase, setPhase] = useState<AppPhase>(getInitialPhase)
  const { start } = useTransition()

  const [tunnelStarted] = useState(() => phase === 'tunnel')

  const handleProjectClick = useCallback(
    (index: number, rect: OriginRect) => {
      const project = projectList[index]
      if (!project) return
      start({ slug: project.slug, imageSrc: project.image, rect })
    },
    [start]
  )

  const handleTunnelComplete = useCallback(() => {
    sessionStorage.setItem('introComplete', '1')
    window.__cardsReady = true
    window.dispatchEvent(new CustomEvent('intro:showCards'))
    window.dispatchEvent(new CustomEvent('intro:navControls'))
    window.dispatchEvent(new CustomEvent('intro:logoMoved'))
    setPhase('home')
  }, [])

  return (
    <div id="app-root">
      {/* Tunnel video — stays mounted once started (ScrollTrigger pin modifies DOM,
          unmounting causes React removeChild errors). It hides itself on complete. */}
      {tunnelStarted && (
        <TunnelVideo onComplete={handleTunnelComplete} />
      )}

      <HomeGrid
        projects={projectList}
        onProjectClick={handleProjectClick}
      />
    </div>
  )
}
