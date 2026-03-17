export interface Project {
  date: string
  title: string
  slug: string
  image: string
  category?: string
}

export const projects: Project[] = [
  { date: 'JUL 2020', title: 'change-host', slug: 'change-host', image: '/image1.jpg' },
  { date: 'MAY 2021', title: 'Vaccine Slots Discord Bot', slug: 'vaccine-slots', image: '/image2.jpg' },
  { date: 'AUG 2024', title: 'Chat bot', slug: 'chat-bot', image: '/image3.png' },
  { date: 'OCT 2024', title: 'Word Game', slug: 'word-game', image: '/image4.jpg' },
  { date: 'MAR 2025', title: 'DJ Gig', slug: 'dj-gig', image: '/image5.jpg' },
]
