'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { projectRegistry } from '@/src/projects/registry'
import { useTransition } from '@/src/contexts/TransitionContext'
import { ParallaxGallery } from '@/src/components/parallax/ParallaxGallery'

export default function ProjectPage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const { state, reveal } = useTransition()

  const mod = projectRegistry[params.slug]

  useEffect(() => {
    if (state.phase === 'expanded') {
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => reveal())
      })
      return () => cancelAnimationFrame(id)
    }
  }, [state.phase, reveal])

  if (!mod) {
    return (
      <div style={{ padding: '80px 24px', color: '#fff' }}>
        <p>Project not found.</p>
        <button onClick={() => router.push('/')} style={{ color: '#999', marginTop: 16 }}>
          Back
        </button>
      </div>
    )
  }

  const { Component, gallery } = mod
  const isWideCreditsProject = ['eco-al-infinito', 'mas-alla-del-infinito', 'alterego'].includes(params.slug)

  return (
    <div
      className={'project-page-padding'}
      style={{ minHeight: '100vh', color: '#fff', paddingTop: isWideCreditsProject ? 0 : '80px', paddingBottom: isWideCreditsProject ? 0 : undefined }}
    >
      <Component />
      {gallery && <ParallaxGallery images={gallery} />}
    </div>
  )
}
