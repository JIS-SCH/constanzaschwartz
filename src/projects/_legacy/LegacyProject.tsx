'use client'

import { ProjectPage } from '@/src/components/parallax/ProjectPage'
import type { ParallaxConfig } from '@/src/types/parallax'

interface LegacyProjectProps {
  config: ParallaxConfig
}

export function LegacyProject({ config }: LegacyProjectProps) {
  return <ProjectPage parallaxConfig={config} />
}
