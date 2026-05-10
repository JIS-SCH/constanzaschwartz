# Project Skills & Conventions

## Project Standards

### UI Components
- Use `'use client'` for components using browser APIs or Three.js.
- Typed props for every component.
- Import GSAP at component level.
- No inline styles except for dynamic GSAP-driven values.
- Source of truth for projects in `src/data/projects.ts`.

### Layer z-index stack
- 9999: cursor (portal to body)
- 100: ProjectOverlay
- 50: Navbar
- 20: HomeGrid
- 10: IntroScreen
- 1: TunnelCanvas (Three.js)

### State Management
- Use React state in `app/page.tsx` to coordinate phases (`intro`, `tunnel`, `home`, `project`).
- Pass phase transitions as callbacks.

## Project Documents
- [CLAUDE.md](file:///Users/fduque/workspace/aalandev8/contanzaschwartz-portfolio/CLAUDE.md)
- [agents/animations.md](file:///Users/fduque/workspace/aalandev8/contanzaschwartz-portfolio/agents/anmations.md)
- [agents/deploy.md](file:///Users/fduque/workspace/aalandev8/contanzaschwartz-portfolio/agents/deploy.md)
- [agents/orchestator.md](file:///Users/fduque/workspace/aalandev8/contanzaschwartz-portfolio/agents/orchestator.md)
- [agents/parallax.md](file:///Users/fduque/workspace/aalandev8/contanzaschwartz-portfolio/agents/parallax.md)
- [agents/performance.md](file:///Users/fduque/workspace/aalandev8/contanzaschwartz-portfolio/agents/performance.md)
- [agents/tunnel.md](file:///Users/fduque/workspace/aalandev8/contanzaschwartz-portfolio/agents/tunnel.md)
- [agents/ui.md](file:///Users/fduque/workspace/aalandev8/contanzaschwartz-portfolio/agents/ui.md)
