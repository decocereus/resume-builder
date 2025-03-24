import { ResumeData } from "./types";

export const RESUME_TABS = [
  "personal",
  "links",
  "skills",
  "experience",
  "education",
  "internships",
  "projects",
  "extracurriculars",
];

export const MOCK_DATA: ResumeData = {
  personal: {
    fullName: "Amartya Singh",
    jobTitle: "Fronted Developer",
    email: "amartyasingh84@gmail.com",
    phone: "+919837001410",
    location: "New Delhi",
    country: "India",
    dateOfBirth: "16-04-2000",
    nationality: "Indian",
  },
  links: {
    items: [
      {
        label: "Portfolio",
        url: "https://decocereus.vercel.app/",
      },
    ],
  },
  skills: {
    items: [
      {
        name: "React",
        proficiency: 3,
      },
    ],
  },
  experience: {
    items: [
      {
        title: "Software Development Engineer (Swift, SwiftUI, Objective-C)",
        company: "Amadeus",
        location: "London, United Kingdom",
        startDate: "July 2022",
        endDate: "May 2023",
        achievements: [
          "Devised 10+ features for **20+ global airlines** to enhance traveler experience",
          "Integrated market leaders into app code base to optimize agent workflow by 25%",
          "Integrated market leaders into app code base to optimize agent workflow by 25%",
          "Integrated market leaders into app code base to optimize agent workflow by 25%",
          "Integrated market leaders into app code base to optimize agent workflow by 25%",
          "Integrated market leaders into app code base to optimize agent workflow by 25%",
          "Integrated market leaders into app code base to optimize agent workflow by 25%",
        ],
      },
    ],
  },
  education: {
    items: [
      {
        degree: "Computer Science ",
        institution: "KCL",
        location: "London",
        startDate: "2019",
        endDate: "2022",
        description: "",
      },
    ],
  },
  internships: {
    items: [
      {
        title: "Something",
        company: "somewhere",
        location: "Somtime",
        startDate: "Hun 2021",
        endDate: "Aug 2020",
        achievements: [
          "Integrated market leaders into app code base to optimize agent workflow by 25%",
          "Integrated market leaders into app code base to optimize agent workflow by 25%",
          "Integrated market leaders into app code base to optimize agent workflow by 25%",
        ],
      },
    ],
  },
  projects: {
    items: [
      {
        name: "Web",
        details: ["Visited something"],
        url: "https://visited-client.vercel.app/",
      },
    ],
  },
  extracurriculars: {
    items: ["yeah", "lets go", "builder"],
  },
};

export const BASE_FROM_STATE: ResumeData = {
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
};
