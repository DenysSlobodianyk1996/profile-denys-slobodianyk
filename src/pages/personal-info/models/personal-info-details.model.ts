export interface PersonalInfoDetails {
  title: string
  desciption?: string
  href?: string // is used for type link
}

export interface PersonalInfo {
  positionDetails: PersonalInfoDetails[]
  additionalDetails: PersonalInfoDetails[]
}
