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
    fullName: "Alex Carter",
    jobTitle: "Full Stack Developer",
    email: "alex.carter@example.com",
    phone: "555-1234-567",
    location: "San Francisco",
    country: "USA",
    dateOfBirth: "05-12-1995",
    nationality: "American",
  },
  links: {
    items: [
      {
        label: "Portfolio",
        url: "https://alexdevportfolio.com/",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/alexcarterdev/",
      },
      {
        label: "Github",
        url: "https://github.com/alexcarterdev",
      },
      {
        label: "Certifications",
        url: "https://certifications.example.com/alex-carter",
      },
    ],
  },
  skills: {
    items: [
      {
        name: "JavaScript",
        proficiency: 5,
      },
      {
        name: "React",
        proficiency: 4,
      },
      {
        name: "Node.js",
        proficiency: 4,
      },
      {
        name: "GraphQL",
        proficiency: 3,
      },
      {
        name: "Docker",
        proficiency: 3,
      },
      {
        name: "AWS",
        proficiency: 4,
      },
      {
        name: "SQL",
        proficiency: 4,
      },
      {
        name: "Web3",
        proficiency: 3,
      },
    ],
  },
  experience: {
    items: [
      {
        title: "Software Engineer",
        company: "TechSolutions Inc.",
        location: "Remote",
        startDate: "January 2023",
        endDate: "Present",
        achievements: [
          "Developed a **real-time chat application** with **WebSockets**",
          "Improved API performance by **30%** with optimized queries",
          "Led a **migration to microservices architecture**",
          "Implemented **CI/CD pipelines**, reducing deployment time by **50%**",
        ],
      },
      {
        title: "Frontend Developer",
        company: "Innovate Labs",
        location: "New York",
        startDate: "June 2021",
        endDate: "December 2022",
        achievements: [
          "Developed a **dashboard UI** using **React & Tailwind CSS**",
          "Integrated **OAuth authentication** with Google and GitHub",
          "Boosted application speed by **40%** through code-splitting",
        ],
      },
    ],
  },
  education: {
    items: [
      {
        degree: "B.Sc. in Computer Science",
        institution: "University of California, Berkeley",
        location: "Berkeley, USA",
        startDate: "2014",
        endDate: "2018",
        description: "",
      },
    ],
  },
  internships: {
    items: [
      {
        title: "Software Developer Intern",
        company: "StartupX",
        location: "San Francisco, USA",
        startDate: "May 2017",
        endDate: "August 2017",
        achievements: [
          "Developed a **REST API** for a fintech startup",
          "Implemented a **React-based dashboard** for admin users",
        ],
      },
    ],
  },
  projects: {
    items: [
      {
        name: "AI-Powered Resume Builder",
        details: [
          "Built a **resume generation tool** using **Next.js & OpenAI API**",
          "Implemented **PDF export functionality** for users",
        ],
        url: "https://resume-builder.ai/",
      },
      {
        name: "Crypto Price Tracker",
        details: [
          "Developed a **real-time crypto price tracker** using **React & Web3.js**",
          "Integrated **CoinGecko API** for fetching live market data",
        ],
        url: "https://crypto-tracker.example.com/",
      },
    ],
  },
  extracurriculars: {
    items: [
      "Co-organizer of SF Dev Meetup",
      "Volunteer mentor at CodeForAll",
      "Contributor to open-source Web3 projects",
    ],
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
