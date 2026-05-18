import type { PersonalInfoModel } from '@/pages/personal-info/models'
import type { SkillsModel } from '@/pages/skills/models'
import type { WorkTimelineDetailModel } from '@/pages/work-timeline/models'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => (<{
    usedLibs: string[]
    personalInfo: PersonalInfoModel
    skills: SkillsModel
    workTimelineDetails: WorkTimelineDetailModel[]
  }>{
    usedLibs: [],
    personalInfo: {
      positionDetails: [],
      additionalDetails: [],
    },
    skills: {},
    workTimelineDetails: [],
  }),
  actions: {
    setUsedLibs (usedLibs: string[]) {
      this.usedLibs = usedLibs
    },
    setPersonalInfo (personalInfo: PersonalInfoModel) {
      this.personalInfo = personalInfo
    },
    setSkills (skills: SkillsModel) {
      this.skills = skills
    },
    setWorkTimelineDetails (workTimelineDetails: WorkTimelineDetailModel[]) {
      this.workTimelineDetails = workTimelineDetails
    },
  },
})
