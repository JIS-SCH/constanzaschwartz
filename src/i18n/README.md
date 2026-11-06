# ES / EN content

Spanish retains its existing URLs. English uses `/en`, `/en/profile`,
`/en/contact`, and `/en/project/[slug]`. Both versions share the same components.
The route-group layouts set the document language on the server. Changing
language intentionally loads the matching document; internal project navigation
retains the existing animated transitions and current language.

Language links use an optional native cross-document crossfade (240 ms). The
header has a shared view-transition name so it stays visually in place. The head
script skips native transitions for navigation unrelated to a language change.
Incoming language pages expose navigation controls before hydration to avoid a
header blink; this does not expose controls early in a fresh home intro.
There is no waiting overlay, video, canvas capture, GSAP callback or navigation
timer. The original intro tunnel is not modified.

Browsers without cross-document View Transitions use ordinary document navigation.
Reduced-motion users also get a direct change. JavaScript or storage failures do
not prevent the link from working. When sessionStorage is available, a small,
validated handoff preserves the route and reading position. Restoration stops
after user interaction or 1.5 seconds. Stale handoffs are discarded, and no images
are stored. The old tunnel-transition key is cleared for existing local sessions.

## Approved Copy

Source: `Downloads/v2.0/TEXTOS Y TRADUCCIONES/Traducciones Proyectos - INGLES.docx`.
The `approved.N` keys refer to the zero-based non-empty paragraph in that source,
as first imported. These are stable identifiers; do not renumber existing keys
when the source document changes. English text is used verbatim. Additional
keys split approved paragraphs for the original layout or contain supplied
credit roles and project names.

`TranslatedText` renders a fragment, preserving the existing DOM structure and
animation targets. Missing keys retain the original Spanish text. `t` provides
the same behavior for strings used in layers, marquees and credits.

## Still Pending From Client

- Profile: event descriptions for the 2021-2026 timeline.
- Eco al infinito: English credit roles and caption.
- Mas alla del infinito: remaining credits beyond the first four supplied roles.
- English replacements for images/video containing Spanish text (including OG
  images where applicable). Media has not been edited or retranslated.
- Approved English search/social descriptions. English pages currently omit
  descriptions rather than reuse Spanish descriptions or invent editorial copy.

The Bunker 01 photos in v2.0 are new project material, not part of this language
implementation. The original Spanish content, tunnel, videos and galleries are
unchanged.

## Checks

Build with `npm run build`; the static output must include both sets of routes.
Then run `npm run test:i18n` to check paths, copy keys and exported metadata.
Check ES/EN switching on Profile and all five projects, navigation from the menu,
project opening/closing, HTML `lang`, canonicals and hreflang. Review mobile
paragraph wrapping and the fixed desktop layouts after adding any pending copy.
