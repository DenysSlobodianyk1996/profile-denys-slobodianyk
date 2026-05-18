interface CompanyModel {
  name: string
  timeline: string
  position: string
}

interface ProjectModel {
  name: string
  timeline: string
  description: string
  skills: string[]
}

export interface WorkTimelineDetailModel {
  company: CompanyModel
  projects: ProjectModel[]
}
