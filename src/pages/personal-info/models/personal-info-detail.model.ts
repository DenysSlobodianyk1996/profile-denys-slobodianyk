export interface PersonalInfoDetailModel {
  title: string
  desciption?: string
  href?: string // is used for type link
}

export interface TestimonialModel {
  name: string
  role: string
  company?: string
  quote: string // whole sentences copied exactly from the LinkedIn recommendation, cuts marked with "…"
}

export interface TestimonialsModel {
  href: string // LinkedIn recommendations page
  items: TestimonialModel[]
}

export interface PersonalInfoModel {
  bio?: string
  positionDetails: PersonalInfoDetailModel[]
  additionalDetails: PersonalInfoDetailModel[]
  testimonials?: TestimonialsModel
}
