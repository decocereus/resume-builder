import type { ResumeData } from "./types"

export const initialResumeState: ResumeData = {
  personal: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    country: "",
    dateOfBirth: "",
    nationality: "",
  },
  links: {
    items: [],
  },
  skills: {
    items: [],
  },
  experience: {
    items: [],
  },
  education: {
    items: [],
  },
  internships: {
    items: [],
  },
  projects: {
    items: [],
  },
  extracurriculars: {
    items: [],
  },
}

