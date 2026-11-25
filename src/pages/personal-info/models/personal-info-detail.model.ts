export interface PersonalInfoDetailModel {
  title: string
  desciption?: string
  href?: string // is used for type link
}

export interface PersonalInfoModel {
  // ISO date of the last human edit to the profile content; the JSON-LD ProfilePage dateModified.
  dateModified?: string
  bio?: string
  positionDetails: PersonalInfoDetailModel[]
  additionalDetails: PersonalInfoDetailModel[]
}
