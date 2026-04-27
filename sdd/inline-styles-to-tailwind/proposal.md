# Proposal: Inline Styles to Tailwind Migration

## Intent

Migrate ALL inline styles to Tailwind CSS utility classes while maintaining exact visual output. This addresses significant technical debt from ~494 `style={{...}}` instances scattered across the project pages. Goal is cleaner JSX, centralized design tokens, and improved maintainability.

## Scope

### In Scope
- Create custom Tailwind utilities for color, typography, spacing tokens
- Create reusable component classes in globals.css for complex patterns
- Migrate inline styles in: eco-al-infinito, alterego, mutek, design-week-mexico, mas-alla-del-infinito, ProfilePage, ContactPage
- Keep `dangerouslySetInnerHTML` for keyframes only
- Remove `TEXT_BLOCK_STYLE` and `TITLE_STYLE` constants from shared.ts

### Out of Scope
- Modifying layout, spacing values, or any visual behavior
- Migrating GSAP-driven dynamic values (current exceptions)
- Changes to ParallaxSection/ParallaxLayer component internals

## Capabilities

### New Capabilities
- `tailwind-design-tokens`: Custom Tailwind theme with obsidian colors, fixed dimensions (CH=330px, GAP=220px), and typography utilities
- `reusable-component-classes`: CSS classes for text-block, title-3, marquee-track, marquee-item patterns

### Modified Capabilities
- None — pure refactoring preserves existing behavior

## Approach

1. **Extend tailwind.config** with custom colors, spacing, typography utilities
2. **Create globals.css classes** for complex patterns (text-block, title styles, vimeo-container)
3. **Migrate per file** — start with shared.ts constants, then project pages
4. **Pattern mapping**:
   - `#0F0F0F` → `bg-obsidian` (custom utility)
   - `#fff` text → `text-white`
   - `width: '100%'` → `w-full`
   - `position: 'relative'` → `relative`
   - `overflow: 'hidden'` → `overflow-hidden`
   - Fixed heights: `h-[330px]`, `h-[220px]`, etc.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `tailwind.config.ts` | Modified | Custom theme extension |
| `app/globals.css` | Modified | New component classes |
| `src/projects/shared.ts` | Modified | Remove TEXT_BLOCK_STYLE, TITLE_STYLE |
| `src/projects/eco-al-infinito/index.tsx` | Modified | ~150 inline styles removed |
| `src/projects/alterego/index.tsx` | Modified | ~80 inline styles removed |
| `src/projects/mutek/index.tsx` | Modified | ~60 inline styles removed |
| `src/projects/design-week-mexico/index.tsx` | Modified | ~50 inline styles removed |
| `src/projects/mas-alla-del-infinito/index.tsx` | Modified | ~40 inline styles removed |
| `src/components/profile/ProfilePage.tsx` | Modified | ~30 inline styles removed |
| `src/components/contact/ContactPage.tsx` | Modified | ~20 inline styles removed |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Visual regression | Medium | Pixel-perfect mapping, manual QA per page |
| Missed edge cases | Medium | Grep for remaining `style={{` after migration |
| Class conflicts | Low | Use explicit Tailwind classes, avoid arbitrary values where possible |
| Responsive breakpoints | Low | Use existing CSS media queries, don't duplicate in Tailwind |

## Rollback Plan

```bash
git stash  # Save migrated changes
git stash pop  # Restore if issues found
```
Alternatively, revert specific files from git history. No database or deployment dependencies.

## Dependencies

- Tailwind CSS v4 (`@import "tailwindcss"` in globals.css)
- No external dependencies

## Success Criteria

- [ ] Zero `style={{` occurrences in migrated files (except GSAP dynamic values)
- [ ] All CSS custom properties (`--h1-size`, `--p-size`) preserved via globals.css
- [ ] Visual QA passes on all project pages (desktop + mobile)
- [ ] No changes to layout, spacing, or typography values
- [ ] Keyframe animations remain in `dangerouslySetInnerHTML` blocks