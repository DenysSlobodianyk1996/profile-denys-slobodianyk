// Single source of SEO copy, shared by the build-time head plugin (build/seo-plugin.ts)
// and the runtime head. Node imports this file directly, so keep it free of runtime imports.

export type SeoRouteId = 'personal-info' | 'skills' | 'work-timeline'

export interface SeoRouteModel {
  path: string
  title: string
  description: string
}

export const SEO_CANONICAL_URL = 'https://denysslobodianyk1996.github.io/profile-denys-slobodianyk/'

export const SEO_AUTHOR = 'Denys Slobodianyk'

export const SEO_JOB_TITLE = 'Senior Angular Developer'

export const SEO_SITE_NAME = 'Denys Slobodianyk — Senior Angular Developer'

export const SEO_TITLE = 'Denys Slobodianyk — Senior Angular Developer | Frontend Engineer'

export const SEO_DESCRIPTION = 'Senior Angular Developer with 8 years of experience (Angular 5–21): TypeScript, RxJS, NgRx, Signals. Also React and Vue. Open to remote work, based in Ukraine.'

export const SEO_KEYWORDS = [
  'Angular developer',
  'Senior Angular developer',
  'Angular',
  'TypeScript',
  'RxJS',
  'NgRx',
  'Signals',
  'Frontend engineer',
  'Frontend developer',
  'React',
  'Vue.js',
  'Remote',
  'Ukraine',
].join(', ')

export const SEO_IMAGE_URL = `${SEO_CANONICAL_URL}data/foto.png`

export const SEO_ROUTES: Record<SeoRouteId, SeoRouteModel> = {
  'personal-info': {
    path: '/',
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
  },
  'skills': {
    path: '/skills',
    title: 'Skills — Angular, RxJS, NgRx, Signals | Denys Slobodianyk',
    description: 'Angular 5–21 skills: RxJS, Signals, NgRx, Angular Material, PrimeNG, Jest. Plus React, Vue.js, TypeScript, SCSS and Tailwind. Senior Angular Developer, remote, Ukraine.',
  },
  'work-timeline': {
    path: '/work-timeline',
    title: 'Work Timeline — Senior Angular Developer | Denys Slobodianyk',
    description: 'Work history of Denys Slobodianyk, Senior Angular Developer: 8 years of Angular projects, framework upgrades and team work. Open to remote work, based in Ukraine.',
  },
}
