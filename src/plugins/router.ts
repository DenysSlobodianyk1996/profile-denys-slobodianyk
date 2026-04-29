import { createRouter, createWebHistory } from 'vue-router'
import PersonalInfo from '@/pages/PersonalInfo.vue'
import Skills from '@/pages/Skills.vue'
import WorkExperience from '@/pages/WorkExperience.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'personal-info',
      meta: {
        title: 'personalInfo',
      },
      component: PersonalInfo,
    },
    {
      path: '/skills',
      name: 'skills',
      meta: {
        title: 'skills',
      },
      component: Skills,
    },
    {
      path: '/work-experience',
      name: 'work-experience',
      meta: {
        title: 'workExperience',
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
