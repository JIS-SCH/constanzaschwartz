'use client'

import { useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { projects } from '@/src/data/projects'
import { useTransition } from '@/src/context/TransitionContext'

export default function ProjectPage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const { state, reveal } = useTransition()
  const imageRef = useRef<HTMLDivElement>(null)

  const project = projects.find((p) => p.slug === params.slug)

  // Trigger reveal once mounted, painted, and overlay is expanded
  useEffect(() => {
    if (state.phase === 'expanded') {
      // Double rAF ensures the browser has actually painted the page
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => reveal())
      })
      return () => cancelAnimationFrame(id)
    }
  }, [state.phase, reveal])

  if (!project) {
    return (
      <div style={{ padding: '80px 24px', color: '#fff' }}>
        <p>Project not found.</p>
        <button onClick={() => router.push('/')} style={{ color: '#999', marginTop: 16 }}>
          Back
        </button>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>
      <div
        ref={imageRef}
        data-project-image
        style={{
          width: 'calc(100% - 160px)',
          maxWidth: '1200px',
          aspectRatio: '16 / 9',
          margin: '140px auto 0',
          backgroundImage: `url(${project.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </div>
  )
}
