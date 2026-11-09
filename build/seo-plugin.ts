import type { HtmlTagDescriptor, Plugin } from 'vite'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  buildSeo,
  SEO_AUTHOR,
  SEO_CANONICAL_URL,
  SEO_IMAGE_URL,
  SEO_JOB_TITLE,
  SEO_PATHS,
  SEO_SITE_NAME,
  SEO_TITLE,
  type SeoModel,
  type SeoPersonalInfoData,
  seoRouteUrl,
  type SeoSkillsData,
} from '../src/static/seo'

const VIRTUAL_ID = 'virtual:seo'
const RESOLVED_VIRTUAL_ID = `\0${VIRTUAL_ID}`
const DATA_FILES = ['personal-info.json', 'skills.json']

// Skill groups that describe technical expertise. Soft skills, workflow tools and the
// rest of the scrum/AI lists are left out of knowsAbout on purpose.
const KNOWS_ABOUT_GROUPS = ['angular', 'react', 'vue', 'general_tech_skills']
const KNOWS_ABOUT_PREFIX = ['Angular', 'React', 'Vue.js', 'TypeScript']
const KNOWS_ABOUT_SUFFIX = ['Claude Code', 'Agile (Scrum, Kanban)']
// Generic phrases from skills.json that mean nothing to a search engine on their own.
const KNOWS_ABOUT_EXCLUDED = new Set(['Base syntax', 'Hooks', 'Functional / Class components', 'React with typescript', 'Flex/Grid'])

interface SeoData {
  skills: SeoSkillsData
  personalInfo: SeoPersonalInfoData
  seo: SeoModel
}

function readJson<T> (dataDir: string, fileName: string): T {
  return JSON.parse(readFileSync(resolve(dataDir, fileName), 'utf8')) as T
}

function loadSeoData (dataDir: string): SeoData {
  const skills = readJson<SeoSkillsData>(dataDir, 'skills.json')
  const personalInfo = readJson<SeoPersonalInfoData>(dataDir, 'personal-info.json')
  return { skills, personalInfo, seo: buildSeo(skills, personalInfo) }
}

function buildPerson ({ skills, personalInfo, seo }: SeoData): Record<string, unknown> {
  const findEntry = (title: string) => personalInfo.additionalDetails.find(entry => entry.title === title)

  const knowsAbout = [
    ...new Set([
      ...KNOWS_ABOUT_PREFIX,
      ...KNOWS_ABOUT_GROUPS.flatMap(group => skills[group]?.skills ?? []),
      ...KNOWS_ABOUT_SUFFIX,
    ]),
  ].filter(skill => !KNOWS_ABOUT_EXCLUDED.has(skill))
  const sameAs = ['LinkedIn', 'Github']
    .map(title => findEntry(title)?.href)
    .filter((href): href is string => !!href)
  const email = findEntry('Email')?.desciption

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': SEO_AUTHOR,
    'jobTitle': SEO_JOB_TITLE,
    'url': SEO_CANONICAL_URL,
    'image': SEO_IMAGE_URL,
    ...(email ? { email } : {}),
    ...(seo.address
      ? {
          address: {
            '@type': 'PostalAddress',
            'addressLocality': seo.address.locality,
            ...(seo.address.region ? { addressRegion: seo.address.region } : {}),
            'addressCountry': seo.address.country,
          },
        }
      : {}),
    sameAs,
    knowsAbout,
  }
}

function meta (attr: 'name' | 'property', key: string, content: string): HtmlTagDescriptor {
  return { tag: 'meta', attrs: { [attr]: key, content }, injectTo: 'head' }
}

function escapeHtml (value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

// No <lastmod>: a build date changes on every deploy, so Google would learn to ignore it.
function buildSitemap (): string {
  const urls = Object.values(SEO_PATHS).map(path => [
    '  <url>',
    `    <loc>${escapeHtml(seoRouteUrl(path))}</loc>`,
    '  </url>',
  ].join('\n'))

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')
}

function buildRobots (): string {
  return ['User-agent: *', 'Allow: /', '', `Sitemap: ${SEO_CANONICAL_URL}sitemap.xml`, ''].join('\n')
}

// Builds the SEO copy from public/data JSON once and uses it in three places:
// - bakes the head (meta, Open Graph, Twitter card, JSON-LD Person) into index.html,
//   so crawlers and link previewers that do not run JavaScript still see it;
// - serves it to the app as `virtual:seo` for the per-route runtime head;
// - on build, emits robots.txt and sitemap.xml.
export function seoPlugin (): Plugin {
  let dataDir = ''

  return {
    name: 'seo-head',
    configResolved (config) {
      dataDir = resolve(config.publicDir, 'data')
    },
    resolveId (id) {
      return id === VIRTUAL_ID ? RESOLVED_VIRTUAL_ID : undefined
    },
    load (id) {
      if (id !== RESOLVED_VIRTUAL_ID) {
        return undefined
      }
      for (const file of DATA_FILES) {
        this.addWatchFile(resolve(dataDir, file))
      }
      return `export default ${JSON.stringify(loadSeoData(dataDir).seo)}`
    },
    transformIndexHtml (html) {
      const data = loadSeoData(dataDir)
      const { description, keywords } = data.seo
      // Escape "<" so the JSON can never close the <script> element early.
      const jsonLd = JSON.stringify(buildPerson(data), null, 2).replaceAll('<', String.raw`\u003c`)

      const tags: HtmlTagDescriptor[] = [
        meta('name', 'description', description),
        meta('name', 'keywords', keywords),
        meta('name', 'author', SEO_AUTHOR),
        meta('name', 'robots', 'index,follow'),
        { tag: 'link', attrs: { rel: 'canonical', href: SEO_CANONICAL_URL }, injectTo: 'head' },

        meta('property', 'og:type', 'website'),
        meta('property', 'og:title', SEO_TITLE),
        meta('property', 'og:description', description),
        meta('property', 'og:url', SEO_CANONICAL_URL),
        meta('property', 'og:image', SEO_IMAGE_URL),
        meta('property', 'og:site_name', SEO_SITE_NAME),

        meta('name', 'twitter:card', 'summary'),
        meta('name', 'twitter:title', SEO_TITLE),
        meta('name', 'twitter:description', description),
        meta('name', 'twitter:image', SEO_IMAGE_URL),

        { tag: 'script', attrs: { type: 'application/ld+json' }, children: jsonLd, injectTo: 'head' },
      ]

      return {
        html: html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(SEO_TITLE)}</title>`),
        tags,
      }
    },
    generateBundle () {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: buildRobots() })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap() })
    },
  }
}
