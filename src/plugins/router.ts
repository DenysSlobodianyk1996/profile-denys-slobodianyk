import { createRouter, createWebHistory } from 'vue-router'
import PersonalInfo from '@/pages/personal-info'
import Skills from '@/pages/Skills.vue'
import WorkExperience from '@/pages/WorkExperience.vue'
import { NAVIGATION_ITEMS } from '@/static/navigation-items'

const PersonalInfoNavigationItem = NAVIGATION_ITEMS.find(({ id }) => id === 'personal-info')!
const SkillsNavigationItem = NAVIGATION_ITEMS.find(({ id }) => id === 'skills')!
const WorkExperienceNavigationItem = NAVIGATION_ITEMS.find(({ id }) => id === 'work-experience')!

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: PersonalInfoNavigationItem.path,
      name: PersonalInfoNavigationItem.id,
      meta: {
        title: PersonalInfoNavigationItem.title,
      },
      component: PersonalInfo,
    },
    {
      path: SkillsNavigationItem.path,
      name: SkillsNavigationItem.id,
      meta: {
        title: SkillsNavigationItem.title,
      },
      component: Skills,
    },
    {
      path: WorkExperienceNavigationItem.path,
      name: WorkExperienceNavigationItem.id,
      meta: {
        title: WorkExperienceNavigationItem.title,
      },
      component: WorkExperience,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
