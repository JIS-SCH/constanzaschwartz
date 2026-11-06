export const LANGUAGE_NAVIGATION_KEY = 'language-navigation'

export interface LanguageNavigation {
  from: string
  href: string
  createdAt: number
  scrollY: number
}

// Self-contained so the head script can use the same validator before hydration.
export function isLanguageNavigation(value: unknown, pathname: string, now = Date.now()): value is LanguageNavigation {
  if (!value || typeof value !== 'object') return false
  const item = value as Partial<LanguageNavigation>
  if (typeof item.from !== 'string' || typeof item.href !== 'string') return false
  const from = item.from.replace(/^\/en(?=\/|$)/, '') || '/'
  const to = item.href.replace(/^\/en(?=\/|$)/, '') || '/'
  return item.href === pathname && item.from !== item.href && from === to &&
    item.from.startsWith('/') && !item.from.startsWith('//') &&
    item.href.startsWith('/') && !item.href.startsWith('//') &&
    typeof item.createdAt === 'number' && Number.isFinite(item.createdAt) &&
    now >= item.createdAt && now - item.createdAt < 15000 &&
    typeof item.scrollY === 'number' && Number.isFinite(item.scrollY) && item.scrollY >= 0
}

// Navigation is always an ordinary link. This script only scopes the optional
// native crossfade and restores the reading position; it never hides the page.
export const LANGUAGE_TRANSITION_BOOTSTRAP = `
(function () {
  var key = ${JSON.stringify(LANGUAGE_NAVIGATION_KEY)};
  var validate = ${isLanguageNavigation.toString()};
  var incoming = null;
  var restoreUntil = Date.now() + 1500;
  var interacted = false;
  try {
    sessionStorage.removeItem('language-transition');
    var item = JSON.parse(sessionStorage.getItem(key) || 'null');
    sessionStorage.removeItem(key);
    if (validate(item, location.pathname)) {
      incoming = item;
      if ((location.pathname !== '/' && location.pathname !== '/en') || sessionStorage.getItem('introComplete')) {
        document.documentElement.dataset.languageNavigation = 'true';
      }
    }
  } catch (_) {}

  function restorePosition() {
    if (incoming && !interacted && Date.now() <= restoreUntil) {
      window.scrollTo(0, incoming.scrollY);
    }
  }
  function stopRestoring() { interacted = true; }
  window.addEventListener('wheel', stopRestoring, { passive: true, once: true });
  window.addEventListener('touchstart', stopRestoring, { passive: true, once: true });
  window.addEventListener('keydown', stopRestoring, { once: true });
  document.addEventListener('DOMContentLoaded', restorePosition, { once: true });
  window.addEventListener('load', restorePosition, { once: true });
  if (document.fonts) document.fonts.ready.then(restorePosition).catch(function () {});

  window.addEventListener('pageswap', function (event) {
    if (!event.viewTransition) return;
    try {
      var target = new URL(event.activation.entry.url);
      var pending = JSON.parse(sessionStorage.getItem(key) || 'null');
      if (target.origin !== location.origin || !validate(pending, target.pathname) || pending.from !== location.pathname) {
        event.viewTransition.skipTransition();
      }
    } catch (_) { event.viewTransition.skipTransition(); }
  });
  window.addEventListener('pagereveal', function (event) {
    restorePosition();
    if (event.viewTransition && !incoming) event.viewTransition.skipTransition();
  });
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) { incoming = null; interacted = true; }
  });
})();
`

export const LANGUAGE_TRANSITION_STYLES = `
@media (prefers-reduced-motion: no-preference) {
  @view-transition { navigation: auto; }
}
[data-site-navigation] { view-transition-name: site-navigation; }
html[data-language-navigation] [data-nav-logo],
html[data-language-navigation] [data-nav-left],
html[data-language-navigation] [data-nav-right] { opacity: 1 !important; }
::view-transition-group(root),
::view-transition-group(site-navigation) { animation: none; }
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 240ms;
  animation-timing-function: ease-in-out;
}
::view-transition-old(site-navigation) { animation: none; opacity: 0; }
::view-transition-new(site-navigation) { animation: none; opacity: 1; }
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) {
    animation: none !important;
  }
}
`
