import type { PersonalInfo } from '@/pages/personal-info/models/personal-info-details.model'
import type { Skills } from '@/pages/skills/models'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => (<{
    usedLibs: string[]
    personalInfo: PersonalInfo
    skills: Skills
  }>{
    usedLibs: [],
    personalInfo: {
      positionDetails: [],
      additionalDetails: [],
    },
    skills: {},
  }),
  actions: {
    setUsedLibs (usedLibs: string[]) {
      this.usedLibs = usedLibs
    },
    setPersonalInfo (personalInfo: PersonalInfo) {
      this.personalInfo = personalInfo
    },
    setSkills (skills: Skills) {
      this.skills = skills
    },
  },
})
