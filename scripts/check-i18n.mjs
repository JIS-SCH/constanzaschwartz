import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { test } from 'node:test'
import { runInNewContext } from 'node:vm'
import ts from 'typescript'

const root = resolve(import.meta.dirname, '..')
const read = (path) => readFileSync(join(root, path), 'utf8')
const messages = JSON.parse(read('src/i18n/en.json'))
const compiled = ts.transpileModule(read('src/i18n/locale.ts'), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
}).outputText
const { localePath, pathLocale } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`)

const transitionCode = ts.transpileModule(read('src/i18n/languageTransition.ts'), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
}).outputText
const { isLanguageNavigation, LANGUAGE_TRANSITION_BOOTSTRAP, LANGUAGE_NAVIGATION_KEY } = await import(`data:text/javascript;base64,${Buffer.from(transitionCode).toString('base64')}`)

function bootstrapHandoff(item, blocked = false) {
  const values = new Map([[LANGUAGE_NAVIGATION_KEY, JSON.stringify(item)], ['language-transition', 'old']])
  const windowEvents = {}, documentEvents = {}, scrolls = []
  const dataset = {}
  const storage = {
    getItem(key) { if (blocked) throw Error('Storage blocked'); return values.get(key) ?? null },
    removeItem(key) { if (blocked) throw Error('Storage blocked'); values.delete(key) },
  }
  runInNewContext(LANGUAGE_TRANSITION_BOOTSTRAP, {
    sessionStorage: storage,
    location: { pathname: '/en/profile', origin: 'https://constanzaschwartz.com' },
    Date: { now: () => 2000 }, URL,
    document: {
      documentElement: { dataset },
      addEventListener(name, callback) { documentEvents[name] = callback },
    },
    window: {
      addEventListener(name, callback) { windowEvents[name] = callback },
      scrollTo(x, y) { scrolls.push([x, y]) },
    },
  })
  return { values, dataset, windowEvents, documentEvents, scrolls }
}

test('head script restores position without holding navigation or overriding user scroll', () => {
  const state = bootstrapHandoff({ from: '/profile', href: '/en/profile', createdAt: 1000, scrollY: 400 })
  assert.equal(state.dataset.languageNavigation, 'true')
  assert.equal(state.values.size, 0)
  state.documentEvents.DOMContentLoaded()
  assert.deepEqual(state.scrolls, [[0, 400]])
  state.windowEvents.touchstart()
  state.windowEvents.load()
  assert.equal(state.scrolls.length, 1)
  let skipped = false
  state.windowEvents.pagereveal({ viewTransition: { skipTransition() { skipped = true } } })
  assert.equal(skipped, false)
})

test('native animations are skipped for unrelated navigation and blocked storage', () => {
  for (const blocked of [false, true]) {
    const state = bootstrapHandoff(null, blocked)
    let skipped = 0
    const viewTransition = { skipTransition() { skipped++ } }
    state.windowEvents.pagereveal({ viewTransition })
    state.windowEvents.pageswap({ viewTransition, activation: { entry: { url: 'https://constanzaschwartz.com/contact' } } })
    assert.equal(skipped, 2)
    assert.equal(state.scrolls.length, 0)
    assert.deepEqual(state.dataset, {})
  }
})

test('transition handoffs expire and only restore valid state for the target page', () => {
  const valid = { from: '/profile', href: '/en/profile', createdAt: 1000, scrollY: 400 }
  assert(isLanguageNavigation(valid, '/en/profile', 2000))
  assert(!isLanguageNavigation(valid, '/profile', 2000))
  assert(!isLanguageNavigation(valid, '/en/profile', 17000))
  assert(!isLanguageNavigation(valid, '/en/profile', 900))
  for (const bad of [null, {}, { ...valid, scrollY: NaN }, { ...valid, scrollY: -10 },
    { ...valid, createdAt: NaN }, { ...valid, from: '/contact' },
    { ...valid, from: '/en/profile' }, { ...valid, href: '//example.com' }]) {
    assert(!isLanguageNavigation(bad, '/en/profile', 2000))
  }
})

test('language changes have no video, waiting overlay or intercepted navigation', () => {
  const selector = read('src/components/layout/LanguageSelector.tsx')
  const layout = read('src/components/SiteLayout.tsx')
  const transition = read('src/i18n/languageTransition.ts')
  assert(!selector.includes('dispatchEvent'))
  assert(!layout.includes('<LanguageTransition'))
  assert(!transition.includes('language-transition-overlay'))
  assert(!transition.includes('.mp4'))
  assert(transition.includes('240ms'))
  assert(transition.includes('prefers-reduced-motion'))
})

test('language paths preserve the current section and do not double-prefix', () => {
  for (const path of ['/', '/profile', '/contact', '/project/mutek']) {
    const en = path === '/' ? '/en' : `/en${path}`
    assert.equal(localePath(path, 'en'), en)
    assert.equal(localePath(en, 'en'), en)
    assert.equal(localePath(en, 'es'), path)
    assert.equal(pathLocale(path), 'es')
    assert.equal(pathLocale(en), 'en')
  }
  assert.equal(pathLocale('/enlightenment'), 'es')
  assert.equal(localePath('/enlightenment', 'en'), '/en/enlightenment')
})

function* files(directory) {
  for (const entry of readdirSync(join(root, directory), { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) yield* files(path)
    else if (entry.name.endsWith('.tsx')) yield path
  }
}

test('all explicit copy keys and supplied Alterego credit roles exist', () => {
  for (const path of files('src')) {
    const source = read(path)
    for (const match of source.matchAll(/(?:<TranslatedText id="|\bt\(')([^"']+)/g)) {
      assert.equal(typeof messages[match[1]], 'string', `${path}: ${match[1]}`)
    }
  }
  for (let i = 0; i < 19; i++) assert(messages[`alterego.credit.${i}`])
})

test('static export includes both languages with matching canonical and hreflang', () => {
  const paths = ['', '/profile', '/contact', ...[
    'mutek', 'eco-al-infinito', 'mas-alla-del-infinito',
    'design-week-mexico', 'silvestre-y-la-naranja-alterego',
  ].map(slug => `/project/${slug}`)]
  for (const path of paths) {
    for (const language of ['es', 'en']) {
      const route = localePath(path || '/', language)
      const file = route === '/' ? 'out/index.html' : `out${route}.html`
      const html = read(file)
      assert(html.includes(`<html lang="${language}"`), `${file}: document language`)
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)
      assert(canonical, `${file}: canonical`)
      assert.equal(new URL(canonical[1]).pathname, route)
      assert(html.includes('hrefLang="es"'), `${file}: Spanish alternate`)
      assert(html.includes('hrefLang="en"'), `${file}: English alternate`)
    }
  }
})
