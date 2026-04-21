import type { Metadata } from 'next'
import { ProfilePage } from '@/src/components/profile/ProfilePage'

export const metadata: Metadata = {
  title: 'Profile — Constanza Schwartz',
  description: 'Artist biography and timeline',
}

export default function ProfileRoute() {
  return <ProfilePage />
}
