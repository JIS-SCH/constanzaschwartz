export interface Project {
  date: string
  title: string
  image: string | null
  category?: string
}

export const projects: Project[] = [
  { date: 'JUL 2020', title: 'change-host', image: null },
  { date: 'MAY 2021', title: 'Vaccine Slots Discord Bot', image: null },
  { date: 'AUG 2024', title: 'Chat bot', image: null },
  { date: 'OCT 2024', title: 'Word Game', image: null },
  { date: 'MAR 2025', title: 'DJ Gig', image: null },
]
