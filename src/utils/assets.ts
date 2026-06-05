// R2 asset resolver.
//
// Media is being migrated from Cloudinary to Cloudflare R2 (bucket `cswebsite`,
// zero-egress public CDN). The Cloudinary helpers in ./cloudinary stay as the
// fallback for projects not yet migrated; converted projects build R2 URLs here.
//
// R2 layout (per project, WebP variants):
//   PROJECTS/<FOLDER>/IMGS/WEBp/[CARROUSEL|PORTADAS|]/<stem>-<name>.webp
// Folder names are human-authored (spaces, mixed case), so keys are
// URL-encoded per segment and each project declares its exact folder once.

// Public base. Defaults to the bucket's r2.dev URL (public, not a secret) and
// can be overridden — e.g. once a custom domain like cdn.constanzaschwartz.com
// is attached — via NEXT_PUBLIC_R2_BASE.
const R2_BASE =
  process.env.NEXT_PUBLIC_R2_BASE ??
  'https://pub-c45392de4794447390623deb4dca4edd.r2.dev'

/** Build a public R2 URL from an object key, encoding each path segment while
 *  preserving slashes (folders contain spaces and mixed case). */
export function r2Url(key: string): string {
  const path = key.split('/').map(encodeURIComponent).join('/')
  return `${R2_BASE}/${path}`
}

interface ProjectR2Config {
  /** Exact R2 folder name, e.g. 'DESIGN WEEK MEXICO' (spaces/case as stored). */
  folder: string
  /** Filename stem shared by the project's assets,
   *  e.g. 'CONSTANZASCHWARTZ-projects-designweekmexico'. */
  stem: string
  /** Separator between stem and name. Most projects use '-'; alterego uses '_'. */
  sep?: string
}

/** Returns helpers that resolve a single project's WebP assets in R2. */
export function projectR2({ folder, stem, sep = '-' }: ProjectR2Config) {
  const root = `PROJECTS/${folder}/IMGS/WEBp`
  const file = (sub: string, name: string) =>
    r2Url(`${root}/${sub ? `${sub}/` : ''}${stem}${sep}${name}.webp`)

  return {
    /** Body image: <stem><sep><n>.webp */
    img: (n: number) => file('', String(n)),
    /** Single-group carousel thumb: CARROUSEL/<stem>-carrousel-<n>.webp */
    carousel: (n: number) => file('CARROUSEL', `carrousel-${n}`),
    /** Grouped carousel thumb: 'CARROUSEL <g>'/<stem>-carrousel<g>-<n>.webp
     *  (projects with multiple carousels store each group in its own folder). */
    carouselGroup: (g: number, n: number) =>
      file(`CARROUSEL ${g}`, `carrousel${g}-${n}`),
    /** Cover image: PORTADAS/<stem><sep>portada<sep><kind>.webp */
    portada: (kind: 'desktop' | 'mobile') => file('PORTADAS', `portada${sep}${kind}`),
  }
}
