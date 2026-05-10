const R2_BASE = 'https://pub-c45392de4794447390623deb4dca4edd.r2.dev/cswebsite'

export const R2 = {
  base: R2_BASE,
  
  url(path: string) {
    // Encode spaces and special chars, keep slashes
    const encoded = path
      .split('/')
      .map(segment => encodeURIComponent(segment))
      .join('/')
    
    return `${R2_BASE}/${encoded}`
  },
  
  // Helper for project assets
  project(projectName: string, category: string, filename: string) {
    return this.url(`PROJECTS/${projectName}/${category}/${filename}`)
  }
} as const

// Quick aliases
export const r2Url = R2.url
export const getR2 = R2.url