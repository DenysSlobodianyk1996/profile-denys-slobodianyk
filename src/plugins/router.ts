import { createRouter, createWebHistory } from 'vue-router'
import PersonalInfo from '@/pages/personal-info'
import Skills from '@/pages/Skills.vue'
import WorkExperience from '@/pages/WorkExperience.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'personal-info',
      meta: {
        title: 'personalInfo.title',
      },
      component: PersonalInfo,
    },
    {
      path: '/skills',
      name: 'skills',
      meta: {
        title: 'skills.title',
      },
      component: Skills,
    },
    {
      path: '/work-experience',
      name: 'work-experience',
      meta: {
        title: 'workExperience.title',
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
