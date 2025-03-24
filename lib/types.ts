export interface PersonalInfo {
  fullName: string
  jobTitle: string
  email: string
  phone: string
  location: string
  country: string
  dateOfBirth: string
  nationality: string
}

export interface LinkItem {
  label: string
  url: string
}

export interface Links {
  items: LinkItem[]
}

export interface SkillItem {
  name: string
  proficiency: number
}

export interface Skills {
  items: SkillItem[]
}

export interface ExperienceItem {
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  achievements: string[]
}

export interface Experience {
  items: ExperienceItem[]
}

export interface EducationItem {
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  description: string
}

export interface Education {
  items: EducationItem[]
}

export interface InternshipItem {
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  achievements: string[]
}

export interface Internships {
  items: InternshipItem[]
}

export interface ProjectItem {
  name: string
  details: string[]
  url: string
}

export interface Projects {
  items: ProjectItem[]
}

export interface Extracurriculars {
  items: string[]
}

export interface ResumeData {
  personal: PersonalInfo
  links: Links
  skills: Skills
  experience: Experience
  education: Education
  internships: Internships
  projects: Projects
  extracurriculars: Extracurriculars
}

