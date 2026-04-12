'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { projects } from '@/src/data/projects'
import { useTransition } from '@/src/contexts/TransitionContext'
import { ProjectPage as ParallaxProjectPage } from '@/src/components/parallax/ProjectPage'
import { ParallaxGallery } from '@/src/components/parallax/ParallaxGallery'

export default function ProjectPage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const { state, reveal } = useTransition()

  const project = projects.find((p) => p.slug === params.slug)

  useEffect(() => {
    if (state.phase === 'expanded') {
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
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      {project.parallaxConfig ? (
        <>
          <ParallaxProjectPage parallaxConfig={project.parallaxConfig} />
          {project.gallery && <ParallaxGallery images={project.gallery} />}
        </>
      ) : (
        <div
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
      )}
    </div>
  )
}
