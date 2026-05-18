export interface CompanyModel {
  name: string
  timeline: string
  position: string
}

export interface ProjectModel {
  name: string
  timeline: string
  description: string
  skills: string[]
}

export interface WorkTimelineDetailModel {
  company: CompanyModel
  projects: ProjectModel[]
}
