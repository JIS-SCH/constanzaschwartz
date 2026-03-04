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
| Animation | GSAP + ScrollTrigger | Controls all parallax, transitions and timeline scrubbing |
| Asset delivery | Cloudinary | All PNGs and video served from there. Never serve raw local assets in production |
| Hosting | Netlify | Auto-deploy from GitHub. Static build |
| Repo | GitHub | Under client account. Client owns the repo |

---

## Project Structure

```
/
├── CLAUDE.md               ← you are here
├── index.html
├── src/
│   ├── main.js             ← entry point, initializes everything
│   ├── tunnel/
│   │   ├── scene.js        ← Three.js scene setup (camera, renderer, lights)
│   │   ├── layers.js       ← parallax layer construction and Z positioning
│   │   ├── materials.js    ← shader materials and texture loading
│   │   └── transition.js   ← blackout / end-of-tunnel effect
│   ├── scroll/
│   │   ├── lenis.js        ← Lenis instance and config
│   │   └── scrub.js        ← connects Lenis progress to GSAP ScrollTrigger
│   ├── animations/
│   │   └── timeline.js     ← main GSAP timeline, all scroll-driven motion
│   └── utils/
│       ├── cloudinary.js   ← URL builder for Cloudinary assets
│       ├── resize.js       ← responsive handler (camera, renderer, canvas)
│       └── detect.js       ← mobile detection, reduced motion check
├── assets/
│   └── placeholder/        ← temp mockup assets only, replaced by client PNGs
└── public/
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