import { createRouter, createWebHistory } from 'vue-router'
import PersonalInfoPage from '@/pages/personal-info'
import SkillsPage from '@/pages/skills'
import WorkTimelinePage from '@/pages/work-timeline'
import { NAVIGATION_ITEMS } from '@/static/navigation-items'

const PersonalInfoNavigationItem = NAVIGATION_ITEMS.find(({ id }) => id === 'personal-info')!
const SkillsNavigationItem = NAVIGATION_ITEMS.find(({ id }) => id === 'skills')!
const WorkTimelineNavigationItem = NAVIGATION_ITEMS.find(({ id }) => id === 'work-timeline')!

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: PersonalInfoNavigationItem.path,
      name: PersonalInfoNavigationItem.id,
      meta: {
        title: PersonalInfoNavigationItem.title,
      },
      component: PersonalInfoPage,
    },
    {
      path: SkillsNavigationItem.path,
      name: SkillsNavigationItem.id,
      meta: {
        title: SkillsNavigationItem.title,
      },
      component: SkillsPage,
    },
    {
      path: WorkTimelineNavigationItem.path,
      name: WorkTimelineNavigationItem.id,
      meta: {
        title: WorkTimelineNavigationItem.title,
      },
      component: WorkTimelinePage,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
