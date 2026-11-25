export interface SkillDetailModel {
  description?: string
  version?: string
  yearsExperience?: number
  skills?: string[]
  additionalInfo?: string
}

export type SkillsModel = Record<string, SkillDetailModel>
