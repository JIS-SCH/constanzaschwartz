import { ProfilePage } from '@/src/components/profile/ProfilePage'
import { localizedMetadata } from '@/src/i18n/metadata'

export const metadata = localizedMetadata('profile', '/profile')

export default function EnglishProfile() {
  return <ProfilePage />
}
