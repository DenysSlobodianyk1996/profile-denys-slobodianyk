// SEO wording and the facts it is built from.
// Facts that already live in public/data/*.json (years, versions, skills, location) are read
// from there by buildSeo(), never repeated here. build/seo-plugin.ts runs buildSeo() at build
// time and hands the result to the app as the `virtual:seo` module.
// Node imports this file directly, so keep it free of runtime imports.

export type SeoRouteId = 'personal-info' | 'skills' | 'work-timeline'

export interface SeoRouteModel {
  path: string
  title: string
  description: string
}

export interface SeoAddressModel {
  locality: string
  region: string
  country: string
}

export interface SeoModel {
  description: string
  keywords: string
  address: SeoAddressModel | null
  routes: Record<SeoRouteId, SeoRouteModel>
}

// Only the fields of public/data JSON that the SEO copy reads.
export interface SeoSkillGroup {
  skills: string[]
  version?: string
  yearsExperience?: number
}
export type SeoSkillsData = Record<string, SeoSkillGroup>
export interface SeoPersonalInfoEntry {
  title: string
  desciption?: string
  href?: string
}
export interface SeoPersonalInfoData {
  additionalDetails: SeoPersonalInfoEntry[]
}

export const SEO_CANONICAL_URL = 'https://denysslobodianyk1996.github.io/profile-denys-slobodianyk/'

// Absolute URL of a route, with the trailing slash GitHub Pages uses for prerendered folders.
export function seoRouteUrl (path: string): string {
  const relative = path.replace(/^\/+|\/+$/g, '')
  return relative ? `${SEO_CANONICAL_URL}${relative}/` : SEO_CANONICAL_URL
}

export const SEO_AUTHOR = 'Denys Slobodianyk'

export const SEO_JOB_TITLE = 'Senior Angular Developer'

export const SEO_SITE_NAME = `${SEO_AUTHOR} — ${SEO_JOB_TITLE}`

export const SEO_TITLE = `${SEO_SITE_NAME} | Frontend Engineer`

export const SEO_IMAGE_URL = `${SEO_CANONICAL_URL}data/foto.png`

export const SEO_PATHS: Record<SeoRouteId, string> = {
  'personal-info': '/',
  'skills': '/skills',
  'work-timeline': '/work-timeline',
}

// Other skills.json groups that are frameworks, with their display names.
const SECONDARY_FRAMEWORKS: Record<string, string> = { react: 'React', vue: 'Vue.js' }

function joinList (items: string[]): string {
  return items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items.at(-1)}` : items.join('')
}

// "Based in Bila Tserkva, Kyiv region, Ukraine" → locality, region, country.
function parseAddress (personalInfo: SeoPersonalInfoData): SeoAddressModel | null {
  const based = personalInfo.additionalDetails
    .map(entry => entry.desciption ?? '')
    .find(text => text.startsWith('Based in '))
  const parts = based?.replace('Based in ', '').split(',').map(part => part.trim())
  if (!parts || parts.length < 2) {
    return null
  }
  return { locality: parts[0]!, region: parts.length > 2 ? parts[1]! : '', country: parts.at(-1)! }
}

export function buildSeo (skills: SeoSkillsData, personalInfo: SeoPersonalInfoData): SeoModel {
  const angular = skills.angular ?? { skills: [] }
  const version = angular.version?.replace(/\s*-\s*/, '–')
  const years = angular.yearsExperience
  const topSkills = angular.skills.slice(0, 3)
  const moreSkills = angular.skills.slice(0, 6)
  const frameworks = Object.keys(SECONDARY_FRAMEWORKS)
    .filter(key => skills[key])
    .map(key => SECONDARY_FRAMEWORKS[key]!)
  const address = parseAddress(personalInfo)
  const location = address ? `Open to remote work, based in ${address.country}.` : 'Open to remote work.'

  const experience = [
    years ? `${years} years of experience` : '',
    version ? `(Angular ${version})` : '',
  ].filter(Boolean).join(' ')

  const description = [
    `${SEO_JOB_TITLE}${experience ? ` with ${experience}` : ''}: ${['TypeScript', ...topSkills].join(', ')}.`,
    frameworks.length > 0 ? `Also ${joinList(frameworks)}.` : '',
    location,
  ].filter(Boolean).join(' ')

  const keywords = [
    'Angular developer',
    'Senior Angular developer',
    'Angular',
    'TypeScript',
    ...topSkills,
    'Frontend engineer',
    'Frontend developer',
    ...frameworks,
    'Remote',
    ...(address ? [address.country] : []),
  ].join(', ')

  return {
    description,
    keywords,
    address,
    routes: {
      'personal-info': {
        path: SEO_PATHS['personal-info'],
        title: SEO_TITLE,
        description,
      },
      'skills': {
        path: SEO_PATHS.skills,
        title: `Skills — ${['Angular', ...topSkills].join(', ')} | ${SEO_AUTHOR}`,
        description: [
          `Angular${version ? ` ${version}` : ''} skills: ${moreSkills.join(', ')}.`,
          frameworks.length > 0 ? `Plus ${joinList(frameworks)}.` : '',
          `${SEO_JOB_TITLE}. ${location}`,
        ].filter(Boolean).join(' '),
      },
      'work-timeline': {
        path: SEO_PATHS['work-timeline'],
        title: `Work Timeline — ${SEO_JOB_TITLE} | ${SEO_AUTHOR}`,
        description: `Work history of ${SEO_AUTHOR}, ${SEO_JOB_TITLE}${years ? `: ${years} years of Angular projects` : ''}, framework upgrades and team work. ${location}`,
      },
    },
  }
}
