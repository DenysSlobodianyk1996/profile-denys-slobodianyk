import type { PersonalInfo } from '@/pages/personal-info/models/personal-info-details.model'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => (<{
    usedLibs: string[]
    personalInfo: PersonalInfo
  }>{
    usedLibs: [],
    personalInfo: {
      positionDetails: [],
      additionalDetails: [],
    },
  }),
  actions: {
    setUsedLibs (usedLibs: string[]) {
      this.usedLibs = usedLibs
    },
    setPersonalInfo (personalInfo: PersonalInfo) {
      this.personalInfo = personalInfo
    },
  },
})
