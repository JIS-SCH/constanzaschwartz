# CLAUDE.md — Web Experience Tunnel
## Constanza Schwartz · duque.studio

This file is the source of truth for all agents working on this project.
Read it fully before writing any code.

---

## Project Overview

Immersive scroll-based web experience where the user travels through a 3D nature tunnel and arrives at the artist's portfolio home page. The tunnel is the entry point — not a section of the site, but the entire intro experience.

**Reference:** https://mohitvirli.github.io  
**Figma:** https://www.figma.com/design/Qw9dq9yQxFm76yTLPbC79o/CONSTANZA-SCHWARTZ

---

## Stack

| Layer | Tool | Notes |
|---|---|---|
| 3D / WebGL | Three.js | Core renderer. Flat planes along Z axis to simulate tunnel depth |
| Scroll | Lenis | Smooth scroll driver. Feeds scroll progress to GSAP |
| Animation | GSAP + @gsap/react + ScrollTrigger + Flip | Controls all parallax, transitions, timeline scrubbing and layout animations |
| Asset delivery | Cloudinary | All PNGs and video served from there. Never serve raw local assets in production |
| Hosting | Netlify | Auto-deploy from GitHub. Static build |
| Repo | GitHub | Under client account. Client owns the repo |

---

## Project Structure

```
/
├── CLAUDE.md               ← you are here
├── index.html
├── app/
│   ├── layout.tsx          ← root layout with providers
│   ├── page.tsx            ← main page
│   └── project/[slug]/     ← dynamic project pages
├── src/
│   ├── components/
│   │   ├── GsapProvider.tsx       ← GSAP context provider
│   │   ├── layout/               ← persistent UI (nav, cursor, transitions)
│   │   │   ├── Navbar.tsx
│   │   │   ├── NavMenu.tsx
│   │   │   ├── NavController.tsx
│   │   │   ├── Cursor.tsx
│   │   │   ├── TransitionOverlay.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   └── index.ts
│   │   ├── home/                  ← home page components
│   │   │   ├── HomeGrid.tsx       ← 3D project gallery
│   │   │   ├── IntroScreen.tsx
│   │   │   ├── ComingSoon.tsx
│   │   │   └── index.ts
│   │   ├── tunnel/                ← tunnel experience components
│   │   │   ├── TunnelCanvas.tsx
│   │   │   ├── TunnelVideo.tsx
│   │   │   └── index.ts
│   │   ├── parallax/              ← parallax system components
│   │   │   ├── ParallaxSection.tsx
│   │   │   ├── ParallaxLayer.tsx
│   │   │   ├── ParallaxGallery.tsx
│   │   │   ├── ProjectPage.tsx
│   │   │   ├── sections/
│   │   │   │   ├── OffsetLayout.tsx
│   │   │   │   └── OverlayComposition.tsx
│   │   │   └── index.ts
│   │   ├── media/                 ← media components
│   │   │   ├── VideoPlayer.tsx
│   │   │   └── index.ts
│   │   └── icons/                 ← SVG icon components
│   │       ├── CloseIcon.tsx
│   │       ├── WaveformIcon.tsx
│   │       └── index.ts
│   ├── contexts/
│   │   ├── ParallaxContext.tsx    ← scroll progress state provider
│   │   ├── AudioContext.tsx        ← audio state provider
│   │   └── TransitionContext.tsx   ← page transition state
│   ├── hooks/
│   │   ├── useScrollProgress.ts    ← connects ScrollTrigger to ParallaxContext
│   │   ├── useParallax.ts          ← calculates offset based on scroll + speed
│   │   ├── useGsapIntro.ts         ← intro screen animations
│   │   ├── useGsapProject.ts       ← project page animations
│   │   └── useGsapCursor.ts        ← cursor animations
│   ├── tunnel/                     ← Three.js tunnel system (.ts files)
│   │   ├── scene.ts                ← Three.js scene setup
│   │   ├── layers.ts               ← parallax layer construction
│   │   ├── materials.ts            ← shader materials
│   │   └── transition.ts           ← blackout effect
│   ├── scroll/
│   │   ├── lenis.ts                ← Lenis instance
│   │   └── scrub.ts                ← Lenis → ScrollTrigger bridge
│   ├── data/
│   │   └── projects.ts             ← project data with parallaxConfig
│   ├── types/
│   │   ├── app.ts                  ← app-wide types
│   │   └── parallax.ts             ← parallax system types
│   └── utils/
│       ├── cloudinary.ts            ← URL builder for Cloudinary
│       ├── resize.ts               ← responsive handler
│       └── detect.ts                ← mobile / reduced motion detection
├── assets/
│   └── placeholder/                ← temp mockup assets only
└── public/
    └── project5/                    ← sample project assets
```

---

## Core Concepts

### How the tunnel works

The tunnel is NOT a 3D modeled tube. It is a series of flat planes (Three.js PlaneGeometry) placed at different Z positions. As the scroll progresses, the camera moves forward along the Z axis. Each layer moves at a different speed — that creates the parallax depth illusion.

```
Z far ←————————————————————→ Z near (camera)
[bg]   [mid-bg]   [elements]   [fg]   [fog]
 slow    medium     medium+     fast   fastest
```

### Layer depth convention

| Layer name | Z position | Parallax speed | Asset |
|---|---|---|---|
| background | -600 | 0.1 | Deep forest / sky |
| mid-background | -400 | 0.3 | Trees, branches far |
| elements | -200 | 0.6 | Branches, shapes close |
| foreground | -80 | 0.85 | Vegetation, textures |
| fog | -20 | 1.0 | Mist overlay |

These values are starting points. Adjust in `layers.js` until depth feels right.

### Scroll to Z movement

Lenis normalized progress (0 to 1) drives the camera Z position via GSAP ScrollTrigger scrub. Total camera travel distance is defined in `scene.js` as `TUNNEL_DEPTH`. All layer positions scale relative to that constant.

```js
// scrub.js pattern
gsap.to(camera.position, {
  z: TUNNEL_DEPTH,
  ease: "none",
  scrollTrigger: {
    trigger: "#tunnel-container",
    start: "top top",
    end: "bottom bottom",
    scrub: 1.5
  }
});
```

### End transition

At scroll progress ~0.9, a full-screen blackout plane (Three.js PlaneGeometry filling viewport) fades in and then fades out revealing the portfolio home section below the canvas. The canvas then gets `pointer-events: none` and the portfolio takes over.

---

## Portfolio Project Parallax System

Each project in the portfolio can have custom parallax sections with multiple layers (images, videos, text) that move at different speeds as the user scrolls.

### Architecture

```
Scroll Progress (0 → 1)
        ↓
  [ParallaxProvider] — Context that provides scroll progress global
        ↓
  [ProjectPage] — Renders sections based on parallaxConfig
        ↓
  [ParallaxSection] — Section wrapper (100vh+ per section)
        ↓
  [ParallaxLayer] — Individual layer with parallax effect
```

### Project Configuration

Each project in `src/data/projects.ts` can include a `parallaxConfig`. Types are centralized in `src/types/parallax.ts`:

```typescript
// src/types/parallax.ts
export interface ParallaxConfig {
  sections: Section[]
}

export interface Section {
  id: string
  minHeight?: string        // '100vh', '150vh', etc.
  height?: string
  type?: 'standard' | 'offset' | 'fullwidth-video' | 'overlay'
  layers: Layer[]
}

export interface Layer {
  type: 'image' | 'video' | 'text' | 'marquee' | 'credits'
  src?: string              // path or URL
  content?: string          // for text layers
  speed: number             // 0.5 = slow, 1.0 = normal, 1.5 = fast
  direction?: 'y' | 'x' | 'both'
  objectFit?: 'cover' | 'contain' | 'fill'
  autoPlay?: boolean        // for video
  loop?: boolean            // for video
  muted?: boolean           // for video
  alt?: string              // for images
  position?: {              // CSS-like positioning
    top?: string
    left?: string
    width?: string
    height?: string
    zIndex?: number
  }
}
```

### Example: project5

```typescript
{
  slug: 'project5',
  parallaxConfig: {
    sections: [
      {
        id: 'hero',
        minHeight: '100vh',
        layers: [
          { type: 'image', src: '/image5.jpg', speed: 0.3 },           // slow bg
          { type: 'image', src: '/project5/Group 458.png', speed: 0.8 }, // faster fg
        ]
      }
    ]
  }
}
```

### Speed Guidelines

| Speed | Use case |
|-------|----------|
| 0.3 - 0.5 | Background layers, large hero images |
| 0.7 - 1.0 | Mid-ground elements |
| 1.2 - 1.5 | Foreground elements, text overlays |

### Implementation Files

| File | Purpose |
|------|---------|
| `src/contexts/ParallaxContext.tsx` | Global scroll progress state |
| `src/hooks/useScrollProgress.ts` | Hook to sync ScrollTrigger with context |
| `src/hooks/useParallax.ts` | Core hook for individual layer parallax |
| `src/components/ParallaxSection.tsx` | Section wrapper component |
| `src/components/ParallaxLayer.tsx` | Image/video/text layer component |
| `src/components/ProjectPage.tsx` | Page component that renders parallax config |

---

## Rules for all agents

**Never do this:**
- Do not use `OrbitControls` or any camera control library. Camera is scroll-driven only.
- Do not serve assets directly from `/assets` in production. All assets go through Cloudinary.
- Do not use `innerHTML` or DOM manipulation inside the Three.js render loop.
- Do not add libraries not in the stack above without flagging it first.
- Do not use CSS transforms for the parallax. Everything is Three.js world space.
- Do not hardcode pixel values for responsive layout. Use `window.innerWidth / window.innerHeight` and the resize handler.

**Always do this:**
- Check `detect.js` for mobile before setting quality levels. Mobile gets lower pixel ratio and simpler fog.
- Respect `prefers-reduced-motion`. If true, skip scroll animation and show static tunnel frame.
- All Cloudinary URLs go through `cloudinary.js` utility, never hardcoded strings.
- Camera aspect ratio updates on every resize via `resize.js`.
- Lenis must be destroyed and re-initialized on route change if a router is added later.

---

## Performance targets

| Metric | Target |
|---|---|
| Mobile load (3G) | Under 3 seconds |
| Desktop FPS | 60fps stable |
| Mobile FPS | 30fps minimum |
| Largest asset | Under 800KB per layer (use Cloudinary auto format + quality) |
| Total page weight | Under 4MB including all layers |

---

## Cloudinary usage

All production assets are served from Cloudinary with auto format and quality:

```js
// utils/cloudinary.js
const CLOUD_NAME = 'YOUR_CLOUD_NAME'; // replace on setup

export function assetUrl(publicId, transforms = '') {
  const base = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
  const auto = 'f_auto,q_auto';
  const t = transforms ? `${auto},${transforms}` : auto;
  return `${base}/${t}/${publicId}`;
}

// Usage
assetUrl('tunnel/background')         // → auto format, auto quality
assetUrl('tunnel/foreground', 'w_2000') // → + width cap
```

Asset naming convention in Cloudinary:
```
tunnel/background
tunnel/mid-background
tunnel/elements
tunnel/foreground
tunnel/fog
```

---

## Current status

- [ ] Scene setup (camera, renderer, basic loop)
- [ ] Lenis init and ScrollTrigger bridge
- [ ] Layer system with placeholder textures
- [ ] Parallax motion on scroll
- [ ] End-of-tunnel blackout transition
- [ ] Mobile optimization pass
- [ ] Cloudinary integration (pending client assets)
- [ ] Final client assets integration
- [ ] Performance audit
- [ ] Netlify deploy

---

## Assets

During mockup phase use royalty-free nature/forest images as placeholders. Recommended sources:

- https://unsplash.com/s/photos/forest-dark (search: "dark forest", "forest fog", "branches")
- https://www.pexels.com/search/forest%20fog/

Export as PNG with transparency where possible. Resize to max 2000px wide before uploading to Cloudinary.

Final assets will be delivered by the design team as layered PNGs separated by depth plane.

---

## Contact

Developer: Facundo Newing · duque.studio  
hello@duque.studio · +598 99 933 880 · GMT-3