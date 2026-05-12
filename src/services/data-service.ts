import type { PersonalInfo } from '@/pages/personal-info/models'
import type { Skills } from '@/pages/skills/models'
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
    return dataApi.get<PersonalInfo>('/personal-info.json').then(response => response.data)
  },
  getSkills () {
    return dataApi.get<Skills>('/skills.json').then(response => response.data)
  },
}
