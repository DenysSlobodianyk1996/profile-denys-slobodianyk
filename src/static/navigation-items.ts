import type { NavigationItem } from '@/models'

export const NAVIGATION_ITEMS: NavigationItem[] = [
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
    id: 'work-experience',
    title: 'workExperience.title',
    path: '/work-experience',
    icon: 'mdi-account-group',
  },
]
