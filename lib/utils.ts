import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ResumeData } from "./types";
import { BASE_FROM_STATE } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to parse resume text and extract structured data
export function parseResumeText(text: string): ResumeData {
  // Start with empty resume data (from initial state)
  const resumeData: ResumeData = { ...BASE_FROM_STATE };

  // BASIC INFO EXTRACTION
  // Name (usually appears at the top, often in larger font)
  const nameMatch = text.match(/^([A-Z][a-z]+(\s[A-Z][a-z]+)+)/m);
  if (nameMatch) {
    resumeData.personal.fullName = nameMatch[0].trim();
  }

  // Email
  const emailMatch = text.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  );
  if (emailMatch) {
    resumeData.personal.email = emailMatch[0];
  }

  // Phone
  const phoneMatch = text.match(
    /(\+\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/
  );
  if (phoneMatch) {
    resumeData.personal.phone = phoneMatch[0];
  }

  // Location (city, state/country format)
  const locationMatch = text.match(
    /([A-Z][a-z]+(\s[A-Z][a-z]+)?(,\s[A-Z]{2})?)/
  );
  if (locationMatch) {
    resumeData.personal.location = locationMatch[0];
  }

  const titleMatches = [
    "Software Engineer",
    "Web Developer",
    "Data Scientist",
    "Project Manager",
    "Product Manager",
    "UX Designer",
    "UI Designer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
  ];

  for (const title of titleMatches) {
    if (text.includes(title)) {
      resumeData.personal.jobTitle = title;
      break;
    }
  }

  // SECTION EXTRACTION

  // Extract education
  const educationSection = extractSection(text, "Education", [
    "Experience",
    "Skills",
    "Projects",
  ]);
  if (educationSection) {
    const educationItems = extractEducationItems(educationSection);
    resumeData.education.items = educationItems;
  }

  // Extract experience
  const experienceSection = extractSection(text, "Experience", [
    "Education",
    "Skills",
    "Projects",
  ]);
  if (experienceSection) {
    const experienceItems = extractExperienceItems(experienceSection);
    resumeData.experience.items = experienceItems;
  }

  // Extract skills
  const skillsSection = extractSection(text, "Skills", [
    "Education",
    "Experience",
    "Projects",
  ]);
  if (skillsSection) {
    const skillItems = extractSkillItems(skillsSection);
    resumeData.skills.items = skillItems;
  }

  // Extract projects
  const projectsSection = extractSection(text, "Projects", [
    "Education",
    "Experience",
    "Skills",
  ]);
  if (projectsSection) {
    const projectItems = extractProjectItems(projectsSection);
    resumeData.projects.items = projectItems;
  }

  // Extract links
  const linkRegex =
    /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/g;
  let linkMatch;
  while ((linkMatch = linkRegex.exec(text)) !== null) {
    const url = linkMatch[0].startsWith("http")
      ? linkMatch[0]
      : `https://${linkMatch[0]}`;
    let label = linkMatch[1].split(".")[0];

    // Make label more readable
    if (label === "github") label = "GitHub";
    if (label === "linkedin") label = "LinkedIn";

    resumeData.links.items.push({
      label,
      url,
    });
  }

  return resumeData;
}

// Helper function to extract a section from the resume text
function extractSection(
  text: string,
  sectionName: string,
  otherSections: string[]
): string | null {
  const sectionRegex = new RegExp(
    `${sectionName}[:\\s]*(.*?)(?:${otherSections.join("|")}|$)`,
    "is"
  );
  const match = text.match(sectionRegex);
  return match ? match[1].trim() : null;
}

// Helper function to extract education items
function extractEducationItems(educationText: string) {
  const items = [];
  const institutions = educationText.split(/\n\n|\r\n\r\n/);

  for (const institution of institutions) {
    if (institution.trim() === "") continue;

    // Try to extract degree, institution name, and dates
    const degreeMatch = institution.match(
      /([A-Z][A-Za-z\s]+in\s[A-Za-z\s]+|[A-Za-z]+\s[Dd]egree|Bachelor'?s|Master'?s|PhD|Doctorate)/
    );
    const institutionMatch = institution.match(
      /([A-Z][a-zA-Z\s]+University|College|Institute|School)/
    );
    const dateMatch = institution.match(
      /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)(\s\d{4})?(\s-\s|\sto\s)?(Present|(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)(\s\d{4})?)/i
    );

    const item = {
      degree: degreeMatch ? degreeMatch[0] : "",
      institution: institutionMatch ? institutionMatch[0] : "",
      location: "",
      startDate: dateMatch ? dateMatch[1] + (dateMatch[2] || "") : "",
      endDate:
        dateMatch && dateMatch[4]
          ? dateMatch[4] === "Present"
            ? "Present"
            : dateMatch[4] + (dateMatch[6] || "")
          : "",
      description: "",
    };

    items.push(item);
  }

  return items;
}

// Helper function to extract experience items
function extractExperienceItems(experienceText: string) {
  const items = [];
  const positions = experienceText.split(/\n\n|\r\n\r\n/);

  for (const position of positions) {
    if (position.trim() === "") continue;

    // Try to extract title, company, and dates
    const titleMatch = position.match(
      /([A-Z][a-z]+(\s[A-Z][a-z]+)*\s[A-Za-z]+)/
    );
    const companyMatch = position.match(/at\s([A-Z][a-zA-Z\s&]+)/);
    const dateMatch = position.match(
      /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)(\s\d{4})?(\s-\s|\sto\s)?(Present|(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)(\s\d{4})?)/i
    );

    // Extract achievements (bullet points)
    const achievements = [];
    const lines = position.split("\n");
    for (const line of lines) {
      if (
        line.trim().startsWith("•") ||
        line.trim().startsWith("-") ||
        line.trim().startsWith("*")
      ) {
        achievements.push(line.replace(/^[•\-*]\s*/, "").trim());
      }
    }

    const item = {
      title: titleMatch ? titleMatch[0] : "",
      company: companyMatch ? companyMatch[1] : "",
      location: "",
      startDate: dateMatch ? dateMatch[1] + (dateMatch[2] || "") : "",
      endDate:
        dateMatch && dateMatch[4]
          ? dateMatch[4] === "Present"
            ? "Present"
            : dateMatch[4] + (dateMatch[6] || "")
          : "",
      achievements: achievements.length > 0 ? achievements : [""],
    };

    items.push(item);
  }

  return items;
}

// Helper function to extract skill items
function extractSkillItems(skillsText: string) {
  const items = [];
  const skills = skillsText.split(/,|\n|•|-/);

  for (const skill of skills) {
    const trimmedSkill = skill.trim();
    if (trimmedSkill === "") continue;

    items.push({
      name: trimmedSkill,
      proficiency: 3, // Default proficiency level since we can't determine this from the PDF
    });
  }

  return items;
}

// Helper function to extract project items
function extractProjectItems(projectsText: string) {
  const items = [];
  const projects = projectsText.split(/\n\n|\r\n\r\n/);

  for (const project of projects) {
    if (project.trim() === "") continue;

    // Try to extract project name and URL
    const nameMatch = project.match(/^([A-Z][a-z]+(\s[A-Za-z]+)*)/m);
    const urlMatch = project.match(
      /(https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}[^\s]*)/
    );

    // Extract details (bullet points)
    const details = [];
    const lines = project.split("\n");
    for (const line of lines) {
      if (
        line.trim().startsWith("•") ||
        line.trim().startsWith("-") ||
        line.trim().startsWith("*")
      ) {
        details.push(line.replace(/^[•\-*]\s*/, "").trim());
      }
    }

    const item = {
      name: nameMatch ? nameMatch[0] : "",
      details: details.length > 0 ? details : [""],
      url: urlMatch ? urlMatch[0] : "",
    };

    items.push(item);
  }

  return items;
}
