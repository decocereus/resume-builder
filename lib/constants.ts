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

export const AMARTYA_SINGH: ResumeData = {
  personal: {
    fullName: "Amartya Singh",
    jobTitle: "Software Engineer",
    email: "amartyasinghkings07@gmail.com",
    phone: "+91 9837001410",
    location: "New Delhi",
    country: "India",
    dateOfBirth: "16-04-2000",
    nationality: "Indian",
  },
  links: {
    items: [
      { label: "Portfolio", url: "https://www.decocereus.dev/" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/amartyasingh07" },
      { label: "Github", url: "https://github.com/decocereus" },
    ],
  },
  skills: {
    items: [
      { name: "TypeScript", proficiency: 4.5 },
      { name: "React", proficiency: 4.5 },
      { name: "Next.js", proficiency: 4.5 },
      { name: "Node.js", proficiency: 4.0 },
      { name: "PostgreSQL", proficiency: 4.0 },
      { name: "Redux Toolkit", proficiency: 3.5 },
      { name: "Openfort / Embedded Wallets", proficiency: 4.0 },
      { name: "Swift / UIKit", proficiency: 3.5 },
    ],
  },
  // experience: {
  //   items: [
  //     {
  //       title: "Frontend Engineer",
  //       company: "Avail",
  //       location: "Remote",
  //       startDate: "April 2025",
  //       endDate: "Present",
  //       achievements: [
  //         "Architected the **Avail Nexus SDK** in **TypeScript**, building modular **React Nexus Widgets** as **npm packages** for seamless partner integration.",
  //         "Designed and shipped **Nexus Elements**, a **component library** powered by the **shadcn CLI**, enabling projects to bootstrap in minutes.",
  //         "Implemented **cross-chain flows** (**Bridge**, **Send**, **BridgeAndExecute**, **Swaps**) to simplify **user transactions** and improve developer experience.",
  //         "Automated releases with a **custom CLI** for **versioning**, **changelogs**, and **npm publishing**, reducing release overhead significantly.",
  //         "Led **codebase quality improvements** through systematic **refactoring** and **code review standards**, reducing regressions.",
  //       ],
  //       techStack: ["TypeScript", "React", "Vite", "shadcn/ui", "npm"],
  //     },
  //     {
  //       title: "Frontend Engineer II",
  //       company: "GAMP (formerly Aura)",
  //       location: "Remote",
  //       startDate: "February 2024",
  //       endDate: "April 2025",
  //       achievements: [
  //         "Led **frontend development** during company pivot from a **Web3 NFT marketplace** to a **social gaming platform**, delivering a working **MVP in 21 days**.",
  //         "Built major systems — **Rewards**, **Events**, **Buddies**, and **Notifications** — scaling the platform to **~100K users** and **10K embedded wallets**.",
  //         "Developed an **arcade-inspired, probability-based rewards UI**, boosting user engagement and retention.",
  //         "Integrated **Riot Authentication** for player data and implemented **embedded wallets** with **Openfort**, utilizing **AES-256/RSA encryption** and **session keys** for secure, gasless transactions.",
  //         "Improved **SEO** and **load performance** by implementing **Next.js 14 SSR** and **server components**, reducing wallet provisioning latency by **~60%** using **Puppeteer automation**.",
  //         "Established a **lightweight design system** and **feature-flag tooling** to accelerate **QA**, **A/B testing**, and release cycles.",
  //       ],
  //       techStack: [
  //         "Next.js 14",
  //         "React",
  //         "TypeScript",
  //         "Node.js",
  //         "PostgreSQL",
  //         "Puppeteer",
  //       ],
  //     },
  //     {
  //       title: "Full Stack Developer",
  //       company: "Mojoboxx",
  //       location: "Gurugram, India",
  //       startDate: "August 2023",
  //       endDate: "February 2024",
  //       achievements: [
  //         "Built a **hotel booking platform** in partnership with **Cleartrip**, managing full **frontend** and **backend integration**.",
  //         "Implemented core **booking** and **payment flows**, integrating **Google Maps**, **Paytm**, and **Cleartrip APIs** for real-time transactions.",
  //         "Developed and optimized **REST APIs** and **SQL queries** to improve backend performance and response times.",
  //         "Refactored **state management** with **Redux Toolkit**, improving **UI responsiveness** and minimizing redundant re-renders.",
  //       ],
  //       techStack: [
  //         "React",
  //         "Node.js",
  //         "Express",
  //         "SQL",
  //         "Redux Toolkit",
  //         "AWS",
  //       ],
  //     },
  //     {
  //       title: "iOS Developer",
  //       company: "Amadeus",
  //       location: "London, United Kingdom",
  //       startDate: "July 2022",
  //       endDate: "May 2023",
  //       achievements: [
  //         "Delivered **10+ iOS features** across **20+ airline apps** using **UIKit**, **Swift**, and **Objective-C** within Amadeus’s white-label suite.",
  //         "Refactored **networking layers** and **core modules**, improving app **stability** and **load performance** by **~15%**.",
  //         "Implemented **MVVM architecture patterns** and **feature-flag rollouts** for **client-specific customizations**.",
  //         "Collaborated with **product** and **design teams** to deliver **accessible**, **localized**, and **user-friendly** mobile experiences.",
  //       ],
  //       techStack: ["Swift", "Objective-C", "UIKit", "MVVM", "REST APIs"],
  //     },
  //   ],
  // },
  experience: {
    items: [
      {
        title: "Frontend Engineer",
        company: "Avail",
        location: "Remote",
        startDate: "April 2025",
        endDate: "Present",
        achievements: [
          "Architected the **Avail Nexus SDK** in **TypeScript**, built modular **React component**s as **npm packages** for simple integration.",
          "Designed and shipped **Nexus Elements**, a component library powered by the **shadcn CLI** to bootstrap projects in minutes.",
          "Implemented cross-chain flows (**Bridge**, **Send**, **BridgeAndExecute**, **Swaps**) to simplify user transactions.",
          "Automated releases with a **custom CLI** (versioning, changelogs, npm publishing), reducing release overhead significantly.",
          "Led codebase quality work through refactors and review standards to reduce regressions.",
        ],
        techStack: ["TypeScript", "React", "Vite", "shadcn/ui", "npm"],
      },
      {
        title: "Frontend Engineer II",
        company: "GAMP (formerly Aura)",
        location: "Remote",
        startDate: "February 2024",
        endDate: "April 2025",
        achievements: [
          "Led frontend during company pivot from Web3 NFT marketplace to social gaming; delivered a working MVP in **21 days**.",
          "Built core systems — **Rewards**, **Events**, **Buddies**, and **Notifications** — scaling to **~100K users** and **10K wallets**.",
          "Created an **arcade-inspired**, probability-based rewards UI that **boosted engagement**.",
          "Integrated **Riot Authentication** for player data and implemented smart embedded wallets with **Openfort** (AES-256/RSA + session keys).",
          "Improved **SEO and load metrics** using **Next.js 14** SSR and server components, and reduced wallet provisioning latency **~60%** via Puppeteer automation.",
          "Established a lightweight **design system** and **feature-flag tooling** to speed up QA and rollouts.",
        ],
        techStack: [
          "Next.js 14",
          "React",
          "TypeScript",
          "Node.js",
          "PostgreSQL",
          "Puppeteer",
        ],
      },
      {
        title: "Full Stack Developer",
        company: "Mojoboxx",
        location: "Gurugram, India",
        startDate: "August 2023",
        endDate: "February 2024",
        achievements: [
          "Built a hotel booking platform (partnered with Cleartrip) handling frontend and backend integration.",
          "Implemented core booking and payment flows and integrated **Google Maps**, **Paytm**, and **Cleartrip** APIs.",
          "Built REST APIs and optimized DB queries to improve response times.",
          "Refactored state management with **Redux Toolkit** to improve UI responsiveness.",
        ],
        techStack: [
          "React",
          "Node.js",
          "Express",
          "SQL",
          "Redux Toolkit",
          "AWS",
        ],
      },
      {
        title: "iOS Developer",
        company: "Amadeus",
        location: "London, United Kingdom",
        startDate: "July 2022",
        endDate: "May 2023",
        achievements: [
          "Delivered 10+ iOS features across 20+ airline apps using **UIKit**, **Swift**, and **Objective-C**.",
          "Refactored networking and core components to improve app stability and load performance (~15%).",
          "Implemented MVVM patterns and feature-flag driven rollouts for client-specific customization.",
          "Worked closely with product and design to ship accessible, localized mobile experiences.",
        ],
        techStack: ["Swift", "Objective-C", "UIKit", "MVVM", "REST APIs"],
      },
    ],
  },
  education: {
    items: [
      {
        degree: "B.Sc. (Hons) in Computer Science",
        institution: "King's College London",
        location: "London, United Kingdom",
        startDate: "2019",
        endDate: "2022",
        description: "",
      },
    ],
  },
  internships: {
    items: [
      {
        title: "Software Engineer Intern",
        company: "CSRN",
        location: "London, United Kingdom",
        startDate: "June 2020",
        endDate: "August 2020",
        achievements: [
          "Built a project-management prototype used across multiple country teams.",
        ],
      },
    ],
  },
  projects: {
    items: [
      {
        name: "Git Receipts",
        details: [
          "GitHub contribution visualiser that authenticates via NextAuth and renders a receipt-style contribution chart.",
        ],
        url: "https://gitreceipts.vercel.app/",
      },
      {
        name: "Nexus SDK",
        details: [
          "Core SDK powering cross-chain UX (bridgeless flows). Built SDK packages and developer templates for partner integration.",
        ],
        url: "https://www.npmjs.com/package/@avail-project/nexus-core",
      },
      {
        name: "Nexus Elements",
        details: [
          "Component library on top of Nexus SDK (shadcn/ui) offering ready UI blocks and templates.",
        ],
        url: "https://elements.nexus.availproject.org/",
      },
      {
        name: "Resume Builder",
        details: [
          "Resume creation tool with instant PDF export; used to generate this resume template.",
        ],
        url: "https://easy-resumes.vercel.app/",
      },
    ],
  },
  extracurriculars: {
    items: [
      "Founder-President, KCL Guitar Society",
      "Head of Events, KCL Cyber Security Society",
      "Travel Coordinator, KCL GloCiti",
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
