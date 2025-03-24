import { useResumeContext } from "@/providers/ResumeBuilder";
import { ResumeData } from "@/lib/types";

const useParser = () => {
  // Inside PdfUpload component
  const {
    updatePersonalInfo,
    addSkill,
    addEducation,
    addExperience,
    addProject,
    addLink,
  } = useResumeContext();

  // Function to apply extracted data to the resume context
  const applyExtractedData = (data: ResumeData) => {
    // Update personal info
    updatePersonalInfo(data.personal);

    // Add skills
    data.skills.items.forEach((skill) => {
      addSkill(skill);
    });

    // Add education
    data.education.items.forEach((education) => {
      addEducation(education);
    });

    // Add experience
    data.experience.items.forEach((experience) => {
      addExperience(experience);
    });

    // Add projects
    data.projects.items.forEach((project) => {
      addProject(project);
    });

    // Add links
    data.links.items.forEach((link) => {
      addLink(link);
    });
  };
  return { applyExtractedData };
};

export default useParser;
