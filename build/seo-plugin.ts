import type { HtmlTagDescriptor, Plugin } from 'vite'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  SEO_AUTHOR,
  SEO_CANONICAL_URL,
  SEO_DESCRIPTION,
  SEO_IMAGE_URL,
  SEO_JOB_TITLE,
  SEO_KEYWORDS,
  SEO_SITE_NAME,
  SEO_TITLE,
} from '../src/static/seo'

interface PersonalInfoEntry {
  title: string
  desciption?: string
  href?: string
}

interface PersonalInfoJson {
  additionalDetails: PersonalInfoEntry[]
}

type SkillsJson = Record<string, { skills: string[] }>

// Skill groups that describe technical expertise. Soft skills, workflow tools and the
// rest of the scrum/AI lists are left out of knowsAbout on purpose.
const KNOWS_ABOUT_GROUPS = ['angular', 'react', 'vue', 'general_tech_skills']
const KNOWS_ABOUT_PREFIX = ['Angular', 'React', 'Vue.js', 'TypeScript']
const KNOWS_ABOUT_SUFFIX = ['Claude Code', 'Agile (Scrum, Kanban)']
// Generic phrases from skills.json that mean nothing to a search engine on their own.
const KNOWS_ABOUT_EXCLUDED = new Set(['Base syntax', 'Hooks', 'Functional / Class components', 'React with typescript', 'Flex/Grid'])

function readJson<T> (dataDir: string, fileName: string): T {
  return JSON.parse(readFileSync(resolve(dataDir, fileName), 'utf8')) as T
}

function findEntry (personalInfo: PersonalInfoJson, title: string): PersonalInfoEntry | undefined {
  return personalInfo.additionalDetails.find(entry => entry.title === title)
}

function buildPerson (dataDir: string): Record<string, unknown> {
  const personalInfo = readJson<PersonalInfoJson>(dataDir, 'personal-info.json')
  const skills = readJson<SkillsJson>(dataDir, 'skills.json')

  const knowsAbout = [
    ...new Set([
      ...KNOWS_ABOUT_PREFIX,
      ...KNOWS_ABOUT_GROUPS.flatMap(group => skills[group]?.skills ?? []),
      ...KNOWS_ABOUT_SUFFIX,
    ]),
  ].filter(skill => !KNOWS_ABOUT_EXCLUDED.has(skill))
  const sameAs = ['LinkedIn', 'Github']
    .map(title => findEntry(personalInfo, title)?.href)
    .filter((href): href is string => !!href)
  const email = findEntry(personalInfo, 'Email')?.desciption

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': SEO_AUTHOR,
    'jobTitle': SEO_JOB_TITLE,
    'url': SEO_CANONICAL_URL,
    'image': SEO_IMAGE_URL,
    ...(email ? { email } : {}),
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Bila Tserkva',
      'addressRegion': 'Kyiv region',
      'addressCountry': 'UA',
    },
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

// Bakes the SEO head (meta, Open Graph, Twitter card, JSON-LD Person) into index.html,
// so crawlers and link previewers that do not run JavaScript still see it.
export function seoPlugin (): Plugin {
  let dataDir = ''

  return {
    name: 'seo-head',
    configResolved (config) {
      dataDir = resolve(config.publicDir, 'data')
    },
    transformIndexHtml (html) {
      // Escape "<" so the JSON can never close the <script> element early.
      const jsonLd = JSON.stringify(buildPerson(dataDir), null, 2).replaceAll('<', String.raw`<`)

      const tags: HtmlTagDescriptor[] = [
        meta('name', 'description', SEO_DESCRIPTION),
        meta('name', 'keywords', SEO_KEYWORDS),
        meta('name', 'author', SEO_AUTHOR),
        meta('name', 'robots', 'index,follow'),
        { tag: 'link', attrs: { rel: 'canonical', href: SEO_CANONICAL_URL }, injectTo: 'head' },

        meta('property', 'og:type', 'website'),
        meta('property', 'og:title', SEO_TITLE),
        meta('property', 'og:description', SEO_DESCRIPTION),
        meta('property', 'og:url', SEO_CANONICAL_URL),
        meta('property', 'og:image', SEO_IMAGE_URL),
        meta('property', 'og:site_name', SEO_SITE_NAME),

        meta('name', 'twitter:card', 'summary'),
        meta('name', 'twitter:title', SEO_TITLE),
        meta('name', 'twitter:description', SEO_DESCRIPTION),
        meta('name', 'twitter:image', SEO_IMAGE_URL),

        { tag: 'script', attrs: { type: 'application/ld+json' }, children: jsonLd, injectTo: 'head' },
      ]

      return {
        html: html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(SEO_TITLE)}</title>`),
        tags,
      }
    },
  }
}
