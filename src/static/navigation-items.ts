import type { NavigationItemModel } from '@/models'

export const NAVIGATION_ITEMS: NavigationItemModel[] = [
  {
    id: 'personal-info',
    title: 'personalInfo.title',
    path: '/',
    icon: 'mdi-account-tie',
  },
  {
    id: 'skills',
    title: 'skills.title',
    path: '/skills',
    icon: 'mdi-network-pos',
  },
  {
    id: 'work-timeline',
    title: 'workTimeline.title',
    path: '/work-timeline',
    icon: 'mdi-account-group',
  },
]
