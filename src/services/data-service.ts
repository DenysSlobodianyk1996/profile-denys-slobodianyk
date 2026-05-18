import type { PersonalInfoModel } from '@/pages/personal-info/models'
import type { SkillsModel } from '@/pages/skills/models'
import type { WorkTimelineDetailModel } from '@/pages/work-timeline/models'
import axios from 'axios'

const dataApi = axios.create({
  baseURL: `${import.meta.env.BASE_URL}/data`,
  timeout: 1000,
  headers: {
    'Content-Type': 'applicattion/json',
  },
})

export const dataService = {
  getUsedLibs () {
    return dataApi.get<string[]>('/used-libs.json').then(response => response.data)
  },
  getPersonalInfo () {
    return dataApi.get<PersonalInfoModel>('/personal-info.json').then(response => response.data)
  },
  getSkills () {
    return dataApi.get<SkillsModel>('/skills.json').then(response => response.data)
  },
  getWorkTimelineDetails () {
    return dataApi.get<WorkTimelineDetailModel[]>('/work-timeline.json').then(response => response.data)
  },
}
