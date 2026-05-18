export interface PersonalInfoDetailModel {
  title: string
  desciption?: string
  href?: string // is used for type link
}

export interface PersonalInfoModel {
  positionDetails: PersonalInfoDetailModel[]
  additionalDetails: PersonalInfoDetailModel[]
}
