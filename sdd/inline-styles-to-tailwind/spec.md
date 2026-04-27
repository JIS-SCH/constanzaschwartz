# Delta Spec: Inline Styles to Tailwind Migration

## Purpose

Migrate all inline CSS `style={{...}}` declarations to Tailwind CSS utility classes while maintaining exact visual output. This addresses technical debt from ~494 `style={{...}}` instances.

## ADDED Requirements

### Requirement: Tailwind Theme Extensions

The system MUST extend the Tailwind theme with custom CSS variables in globals.css using Tailwind v4 `@theme` syntax to define design tokens that cannot be expressed as standard Tailwind classes.

```css
@theme {
  --color-obsidian: #0F0F0F;
  --color-off-white: #ededed;
  
  --font-helvetica: "Helvetica Neue LT Std", Helvetica Neue, Helvetica, Arial, sans-serif;
  --font-space: "Space Grotesk", sans-serif;
  
  --spacing-GAP: 220px;
  --spacing-CH: 330px;
  --spacing-TW: 32.4305%;
}
```

These custom properties enable arbitrary-value notation: `bg-[--color-obsidian]`, `h-[--spacing-CH]`.

#### Scenario: Using Custom Theme Values

- GIVEN a component needs background color `#0F0F0F`
- WHEN the migration applies `className="bg-[--color-obsidian]"`
- THEN the element renders with exact hex value `#0F0F0F`

---

### Requirement: CSS Component Classes

The system MUST preserve these as CSS classes (not Tailwind utilities) in globals.css for patterns too complex for Tailwind tokens.

#### Sub-Requirement: Typography Wrapper Classes

```css
.text-block {
  font-family: var(--font-space, "Space Grotesk", sans-serif);
  font-weight: 300;
  font-size: var(--p-size);
  line-height: var(--p-lh);
  letter-spacing: var(--p-ls);
  color: #fff;
}

.title-3 {
  font-family: var(--font-helvetica, "Helvetica Neue LT Std", "Helvetica Neue", Helvetica, Arial, sans-serif);
  font-weight: 100;
  color: #fff;
  text-transform: uppercase;
  line-height: 1;
}
```

#### Scenario: Text Block Usage

- GIVEN a paragraph element using `TEXT_BLOCK_STYLE` constant
- WHEN migration applies `className="text-block"` instead of inline style
- THEN the element uses font-family, font-weight, font-size, line-height, letter-spacing, and color from CSS class

#### Sub-Requirement: Layout Utility Classes

```css
.project-page-padding {
  padding-bottom: 40px;
}
@media (min-width: 769px) {
  .project-page-padding {
    padding-bottom: 110px;
  }
}
```

---

### Requirement: Inline Style to Tailwind Mapping

The system MUST implement a mapping table for common inline style patterns:

| Inline Style | Tailwind Equivalent | Notes |
|------------|------------------|-------|
| `backgroundColor: '#0F0F0F'` | `bg-[--color-obsidian]` | Custom theme required |
| `backgroundColor: '#0f0f0f'` | `bg-[--color-obsidian]` | Case insensitive |
| `background: '#0F0F0F'` | `bg-[--color-obsidian]` | Shorthand |
| `color: '#fff'` | `text-white` | |
| `color: '#FFF'` | `text-white` | |
| `color: '#ededed'` | `text-[--color-off-white]` | Custom theme |
| `background: '#000'` | `bg-black` | |
| `width: '100%'` | `w-full` | |
| `height: '100%'` | `h-full` | |
| `position: 'relative'` | `relative` | |
| `position: 'absolute'` | `absolute` | |
| `overflow: 'hidden'` | `overflow-hidden` | |
| `marginTop: '-80px'` | `-mt-20` | Negative margin |
| `marginTop: '40px'` | `mt-10` | |
| `marginTop: '80px'` | `mt-20` | |
| `padding: '110px 0 0'` | `pt-[110px]` | Arbitrary value |
| `padding: '40px 20px'` | `p-5 px-5` | |
| `width: '350px'` | `w-[350px]` | |
| `height: CH` (330px) | `h-[--spacing-CH]` | Custom theme |
| `gap: '220px'` | `gap-[--spacing-GAP]` | Custom theme |
| `gap: '2rem'` | `gap-8` | 2rem = 32px |
| `display: 'flex'` | `flex` | |
| `display: 'block'` | `block` | |
| `alignItems: 'center'` | `items-center` | |
| `justifyContent: 'center'` | `justify-center` | |
| `textTransform: 'uppercase'` | `uppercase` (custom class) | Typography token |
| `lineHeight: 1` | `leading-none` | |
| `lineHeight: 1.5` | `leading-6` | |

#### Scenario: Complex Inline Migration

- GIVEN an element with `style={{ width: '100%', position: 'relative', backgroundColor: '#0F0F0F', marginTop: '-80px' }}`
- WHEN migration applies className `w-full relative bg-[--color-obsidian] -mt-20`
- THEN the element renders identically to original

---

### Requirement: GSAP Dynamic Values Exclusion

The system MUST NOT migrate inline styles when values are assigned dynamically via GSAP or other JavaScript.

#### Scenario: GSAP-Driven Values

- GIVEN `style={{ opacity: scrollProgress.current }}` where value comes from GSAP animation
- WHEN migration detects JavaScript variable reference
- THEN that specific style remains inline (excluded from migration)

---

### Requirement: Keyframe Animations Exclusion

The system MUST preserve all `dangerouslySetInnerHTML` blocks containing `@keyframes` definitions.

#### Scenario: Keyframe Preservation

- GIVEN `<style dangerouslySetInnerHTML={{__html: '@keyframes eco-carousel-scroll {...}'}} />`
- WHEN migration processes the file
- THEN the keyframe block remains untouched (not migrated to Tailwind)

---

## REMOVED Requirements

### Requirement: shared.ts Constants

The system MUST remove these constants from `src/projects/shared.ts`:

- `TEXT_BLOCK_STYLE` - replaced by `.text-block` CSS class
- `TITLE_STYLE` - replaced by `.title-3` CSS class

#### Scenario: Constant Removal

- GIVEN a project imports `{ TEXT_BLOCK_STYLE, TITLE_STYLE }` from shared.ts
- WHEN migration completes
- THEN imports are removed and components use CSS classes instead

---

## MODIFIED Requirements

### Requirement: File Migration Scope

(Previously: Each file contained ~150-20 inline style objects; after migration, files contain 0 inline style objects except GSAP-driven values)

Each of the following files SHALL be migrated:

| File | Inline Styles | Migration Target |
|------|-------------|---------------|
| `src/projects/eco-al-infinito/index.tsx` | ~150 | Tailwind utilities |
| `src/projects/alterego/index.tsx` | ~80 | Tailwind utilities |
| `src/projects/mutek/index.tsx` | ~60 | Tailwind utilities |
| `src/projects/design-week-mexico/index.tsx` | ~50 | Tailwind utilities |
| `src/projects/mas-alla-del-infinito/index.tsx` | ~40 | Tailwind utilities |
| `src/components/profile/ProfilePage.tsx` | ~30 | Tailwind utilities |
| `src/components/contact/ContactPage.tsx` | ~20 | Tailwind utilities |
| `src/projects/shared.ts` | 2 constants | CSS classes |
| `app/globals.css` | New theme block | Tailwind @theme |

#### Scenario: Migration Verification

- GIVEN `grep -r 'style={{' src/projects/`
- WHEN after migration is complete
- THEN zero results (except GSAP dynamic value patterns)

---

## Exclusions from Migration

The following patterns SHALL NOT be migrated (too complex for Tailwind):

1. **CSS custom properties** - `style={{ minHeight: 'var(--h-hero)' }}` in design-week-mexico
2. **calc() expressions** - `style={{ minHeight: 'calc(80vh + 300px)' }}`
3. **Complex positioning** - `style={{ top: 'calc(246px + 678px)' }}`
4. **CSS-in-JS typography** - font-size via responsive CSS variables
5. **Dynamic string templates** - `style={{ minHeight: \`calc(80px + 80vh + 251px)\` }}`
6. **Keyframe animations** - all `@keyframes` definitions
7. **Responsive media queries** - inline responsive overrides

---

## Validation Criteria

### Success Conditions

- [ ] Zero `style={{` occurrences in migrated files (except GSAP dynamic values)
- [ ] All CSS custom properties (`--h1-size`, `--p-size`) preserved via globals.css
- [ ] Visual QA passes on all project pages (desktop + mobile)
- [ ] No changes to layout, spacing, or typography values
- [ ] Keyframe animations remain in `dangerouslySetInnerHTML` blocks
- [ ] `grep -r 'style={{' src/` shows only GSAP-related patterns

### Visual Regression Prevention

| Token Type | Value | Migration |
|-----------|-------|----------|
| GAP between content blocks | 220px | `gap-[--spacing-GAP]` |
| CH carousel height | 330px | `h-[--spacing-CH]` |
| TW text width | 32.4305% | `w-[--spacing-TW]` |
| Padding values | 110px, 80px, 40px, 20px | Direct mapping |
| Font families | Helvetica Neue LT Std, Space Grotesk | Preserved via CSS classes |
| Min-height values | CSS custom properties | NOT migrated |

---

## Migration Order

1. **Step 1**: Add `@theme` block to `app/globals.css`
2. **Step 2**: Add `.text-block` and `.title-3` classes to `app/globals.css`
3. **Step 3**: Update `app/globals.css` import to include Tailwind v4 theme
4. **Step 4**: Remove `TEXT_BLOCK_STYLE` and `TITLE_STYLE` from `src/projects/shared.ts`
5. **Step 5**: Migrate project pages (file by file, verify at each step):
   - eco-al-infinito
   - alterego
   - mutek
   - design-week-mexico
   - mas-alla-del-infinito
6. **Step 6**: Migrate components:
   - ProfilePage.tsx
   - ContactPage.tsx

---

## Rollback Plan

```bash
# Save migrated changes
git stash

# Restore if visual regression detected
git stash pop

# Revert specific files from git history
git checkout HEAD -- src/projects/eco-al-infinito/index.tsx
```