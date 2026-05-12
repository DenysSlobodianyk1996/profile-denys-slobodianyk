export interface Skill {
  version?: string
  yearsExperience?: number
  skills?: string[]
  additionalInfo?: string
}

export type Skills = Record<string, Skill>
