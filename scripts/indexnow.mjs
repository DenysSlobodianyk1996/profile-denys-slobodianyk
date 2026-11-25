// Submits every sitemap URL to IndexNow (api.indexnow.org), which shares it with Bing,
// Yandex and the other participating engines. Google does not take part.
//
// The site lives on a sub-path of a host we do not own, so the key file can only sit
// under that sub-path. IndexNow accepts this when the request names the file in
// `keyLocation`, and then only for URLs under the same folder, which all sitemap URLs are.
//
// URLs come from dist/sitemap.xml (generated from SEO_PATHS in src/static/seo.ts) and the
// key from the <key>.txt file that public/ copies into dist/, so both match what was deployed.
//
// A failed submission prints a GitHub Actions warning and exits 0: it must never fail a deploy.
//
// Usage: node scripts/indexnow.mjs [--dry-run] [distDir]
//   --dry-run  print the request instead of sending it

import { readdir, readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ENDPOINT = 'https://api.indexnow.org/indexnow'
const KEY_FILE_PATTERN = /^([0-9a-f]{8,128})\.txt$/i
const REQUEST_TIMEOUT = 30_000

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const distDir = resolve(args.find(arg => !arg.startsWith('--'))
  ?? resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist'))

async function readUrls () {
  const sitemap = await readFile(resolve(distDir, 'sitemap.xml'), 'utf8')
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => loc.replaceAll('&amp;', '&'))
  if (urls.length === 0) {
    throw new Error('sitemap.xml lists no URLs')
  }
  return urls
}

// The key file is the one <hex>.txt whose content is its own name.
async function readKey () {
  const keys = []
  for (const name of await readdir(distDir)) {
    const key = name.match(KEY_FILE_PATTERN)?.[1]
    if (key && (await readFile(resolve(distDir, name), 'utf8')).trim() === key) {
      keys.push(key)
    }
  }
  if (keys.length !== 1) {
    throw new Error(`expected one IndexNow key file in ${distDir}, found ${keys.length}`)
  }
  return keys[0]
}

async function buildPayload () {
  const [urls, key] = await Promise.all([readUrls(), readKey()])
  // The shortest sitemap URL is the site root; the key file sits next to it.
  const siteRoot = urls.reduce((shortest, url) => (url.length < shortest.length ? url : shortest))
  const outside = urls.filter(url => !url.startsWith(siteRoot))
  if (outside.length > 0) {
    throw new Error(`URLs outside the key's folder ${siteRoot}: ${outside.join(', ')}`)
  }
  return {
    host: new URL(siteRoot).host,
    key,
    keyLocation: new URL(`${key}.txt`, siteRoot).href,
    urlList: urls,
  }
}

async function submit (payload) {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT),
  })
  // 200 = accepted, 202 = accepted and the key is still being validated.
  if (response.status !== 200 && response.status !== 202) {
    const body = (await response.text()).slice(0, 500)
    throw new Error(`HTTP ${response.status} ${response.statusText}${body ? `: ${body}` : ''}`)
  }
  return response.status
}

try {
  const payload = await buildPayload()
  if (dryRun) {
    console.log(`dry run, would POST to ${ENDPOINT}:`)
    console.log(JSON.stringify(payload, null, 2))
  } else {
    const status = await submit(payload)
    console.log(`IndexNow: HTTP ${status}, submitted ${payload.urlList.length} URLs`)
    for (const url of payload.urlList) {
      console.log(`  ${url}`)
    }
  }
} catch (error) {
  console.log(`::warning title=IndexNow::IndexNow submission failed: ${error instanceof Error ? error.message : error}`)
}
