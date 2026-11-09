// Prerenders every public route of the built site into static HTML, so crawlers that do
// not run JavaScript get the page text and the per-route <head>.
//
// It serves dist/ with `vite preview`, opens each route in headless Chromium, waits for
// the page data to load and writes the rendered DOM to dist/<route>/index.html.
// The Vue app mounts with createApp() (no hydration), so in the browser it simply
// replaces the prerendered markup.
//
// Routes come from dist/sitemap.xml, which build/seo-plugin.ts generates from SEO_ROUTES
// (src/static/seo.ts). Reading the build output keeps this script plain JavaScript and
// keeps a single list of routes.
//
// Run after `vite build`: node scripts/prerender.mjs

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { preview } from 'vite'

const ROOT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST_DIR = resolve(ROOT_DIR, 'dist')
const NAVIGATION_TIMEOUT = 30_000
// Rendered text below this length means the page data never arrived.
const MIN_CONTENT_LENGTH = 100

async function readRoutePaths () {
  const sitemap = await readFile(resolve(DIST_DIR, 'sitemap.xml'), 'utf8')
  const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => new URL(loc).pathname)
  if (paths.length === 0) {
    throw new Error('dist/sitemap.xml lists no routes')
  }
  return paths
}

// "/profile-denys-slobodianyk/skills/" -> "dist/skills/index.html"
function outputFile (basePath, routePath) {
  const relative = routePath.slice(basePath.length).replace(/^\/+|\/+$/g, '')
  return resolve(DIST_DIR, relative, 'index.html')
}

async function renderRoute (browser, origin, routePath) {
  const page = await browser.newPage()
  const problems = []

  page.on('console', message => {
    if (message.type() === 'error') {
      problems.push(`console error: ${message.text()}`)
    }
  })
  page.on('pageerror', error => problems.push(`page error: ${error.message}`))
  // Only failures of our own files matter. Chromium aborts some requests on its own
  // (net::ERR_ABORTED), and a third-party hiccup should not block the deploy.
  const isOwnUrl = url => url.startsWith(origin)
  page.on('requestfailed', request => {
    const errorText = request.failure()?.errorText
    if (isOwnUrl(request.url()) && errorText !== 'net::ERR_ABORTED') {
      problems.push(`request failed: ${request.url()} (${errorText})`)
    }
  })

  let dataResponses = 0
  page.on('response', response => {
    if (response.status() >= 400 && isOwnUrl(response.url())) {
      problems.push(`HTTP ${response.status()}: ${response.url()}`)
    } else if (/\/data\/[^/]+\.json$/.test(new URL(response.url()).pathname)) {
      // vite preview answers a missing file with the SPA shell and a 200.
      if (response.headers()['content-type']?.includes('json')) {
        dataResponses++
      } else {
        problems.push(`not JSON: ${response.url()}`)
      }
    }
  })

  try {
    const response = await page.goto(`${origin}${routePath}`, { waitUntil: 'networkidle', timeout: NAVIGATION_TIMEOUT })
    if (!response?.ok()) {
      problems.push(`HTTP ${response?.status()} for the page itself`)
    }

    // Each page fetches its JSON in onMounted; networkidle has already waited for those
    // requests, so this confirms they happened and the page rendered their content.
    await page.waitForFunction(
      minLength => (document.querySelector('.v-main')?.textContent?.trim().length ?? 0) >= minLength,
      MIN_CONTENT_LENGTH,
      { timeout: NAVIGATION_TIMEOUT },
    )
    if (dataResponses === 0) {
      problems.push('no /data/*.json response was received')
    }

    if (problems.length > 0) {
      throw new Error(problems.join('\n  '))
    }

    // Vuetify teleports tooltips into a <body> level container. The booting app reuses
    // that container and adds its own tooltips, so captured ones would linger as hidden
    // duplicates.
    await page.evaluate(() => document.querySelector('body > .v-overlay-container')?.remove())

    return `${await page.content()}\n`
  } catch (error) {
    // A timeout alone says little; the problems collected so far usually explain it.
    const details = [error.message, ...problems.filter(problem => !error.message.includes(problem))]
    throw new Error(details.join('\n  '), { cause: error })
  } finally {
    await page.close()
  }
}

async function main () {
  const routePaths = await readRoutePaths()
  const server = await preview({ root: ROOT_DIR, logLevel: 'warn', preview: { port: 0, open: false } })
  const browser = await chromium.launch()

  try {
    const { port } = server.httpServer.address()
    const origin = `http://localhost:${port}`
    const basePath = server.config.base.replace(/\/?$/, '/')

    // Render everything before writing anything: the preview server falls back to
    // dist/index.html, which must stay the plain SPA shell until the last route is done.
    const pages = []
    for (const routePath of routePaths) {
      if (!routePath.startsWith(basePath)) {
        throw new Error(`Route ${routePath} is outside the base path ${basePath}`)
      }
      try {
        pages.push({ file: outputFile(basePath, routePath), html: await renderRoute(browser, origin, routePath) })
        console.log(`prerendered ${routePath}`)
      } catch (error) {
        throw new Error(`Failed to prerender ${routePath}:\n  ${error.message}`, { cause: error })
      }
    }

    for (const { file, html } of pages) {
      await mkdir(dirname(file), { recursive: true })
      await writeFile(file, html)
    }
  } finally {
    await browser.close()
    await server.close()
  }
}

try {
  await main()
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
}
