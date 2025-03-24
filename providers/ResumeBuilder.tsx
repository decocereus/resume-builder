"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
} from "react";
import {
  PersonalInfo,
  LinkItem,
  SkillItem,
  ExperienceItem,
  EducationItem,
  InternshipItem,
  ProjectItem,
  ResumeData,
} from "@/lib/types";
import { BASE_FROM_STATE, MOCK_DATA } from "@/lib/constants";

interface ResumeContextType {
  resumeData: ResumeData;

  // Personal information methods
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;

  // Links methods
  addLink: (link: LinkItem) => void;
  updateLink: (index: number, link: Partial<LinkItem>) => void;
  removeLink: (index: number) => void;

  // Skills methods
  addSkill: (skill: SkillItem) => void;
  updateSkill: (index: number, skill: Partial<SkillItem>) => void;
  removeSkill: (index: number) => void;

  // Experience methods
  addExperience: (experience: ExperienceItem) => void;
  updateExperience: (
    index: number,
    experience: Partial<ExperienceItem>
  ) => void;
  removeExperience: (index: number) => void;

  // Education methods
  addEducation: (education: EducationItem) => void;
  updateEducation: (index: number, education: Partial<EducationItem>) => void;
  removeEducation: (index: number) => void;

  // Internship methods
  addInternship: (internship: InternshipItem) => void;
  updateInternship: (
    index: number,
    internship: Partial<InternshipItem>
  ) => void;
  removeInternship: (index: number) => void;

  // Project methods
  addProject: (project: ProjectItem) => void;
  updateProject: (index: number, project: Partial<ProjectItem>) => void;
  removeProject: (index: number) => void;

  // Extracurricular methods
  addExtracurricular: (item: string) => void;
  updateExtracurricular: (index: number, item: string) => void;
  removeExtracurricular: (index: number) => void;

  // Reset the entire resume
  resetResume: () => void;
}

export const ResumeContext = createContext<ResumeContextType | undefined>(
  undefined
);

interface ResumeProviderProps {
  children: ReactNode;
}

export const ResumeProvider = ({ children }: ResumeProviderProps) => {
  const [resumeData, setResumeData] = useState<ResumeData>(MOCK_DATA);

  // Personal information methods
  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setResumeData((prevData) => ({
      ...prevData,
      personal: {
        ...prevData.personal,
        ...info,
      },
    }));
  };

  // Links methods
  const addLink = (link: LinkItem) => {
    setResumeData((prevData) => ({
      ...prevData,
      links: {
        items: [...prevData.links.items, link],
      },
    }));
  };

  const updateLink = (index: number, link: Partial<LinkItem>) => {
    setResumeData((prevData) => {
      const updatedLinks = [...prevData.links.items];
      updatedLinks[index] = { ...updatedLinks[index], ...link };
      return {
        ...prevData,
        links: {
          items: updatedLinks,
        },
      };
    });
  };

  const removeLink = (index: number) => {
    setResumeData((prevData) => ({
      ...prevData,
      links: {
        items: prevData.links.items.filter((_, i) => i !== index),
      },
    }));
  };

  // Skills methods
  const addSkill = (skill: SkillItem) => {
    setResumeData((prevData) => ({
      ...prevData,
      skills: {
        items: [...prevData.skills.items, skill],
      },
    }));
  };

  const updateSkill = (index: number, skill: Partial<SkillItem>) => {
    setResumeData((prevData) => {
      const updatedSkills = [...prevData.skills.items];
      updatedSkills[index] = { ...updatedSkills[index], ...skill };
      return {
        ...prevData,
        skills: {
          items: updatedSkills,
        },
      };
    });
  };

  const removeSkill = (index: number) => {
    setResumeData((prevData) => ({
      ...prevData,
      skills: {
        items: prevData.skills.items.filter((_, i) => i !== index),
      },
    }));
  };

  // Experience methods
  const addExperience = (experience: ExperienceItem) => {
    setResumeData((prevData) => ({
      ...prevData,
      experience: {
        items: [...prevData.experience.items, experience],
      },
    }));
  };

  const updateExperience = (
    index: number,
    experience: Partial<ExperienceItem>
  ) => {
    setResumeData((prevData) => {
      const updatedExperiences = [...prevData.experience.items];
      updatedExperiences[index] = {
        ...updatedExperiences[index],
        ...experience,
      };
      return {
        ...prevData,
        experience: {
          items: updatedExperiences,
        },
      };
    });
  };

  const removeExperience = (index: number) => {
    setResumeData((prevData) => ({
      ...prevData,
      experience: {
        items: prevData.experience.items.filter((_, i) => i !== index),
      },
    }));
  };

  // Education methods
  const addEducation = (education: EducationItem) => {
    setResumeData((prevData) => ({
      ...prevData,
      education: {
        items: [...prevData.education.items, education],
      },
    }));
  };

  const updateEducation = (
    index: number,
    education: Partial<EducationItem>
  ) => {
    setResumeData((prevData) => {
      const updatedEducation = [...prevData.education.items];
      updatedEducation[index] = { ...updatedEducation[index], ...education };
      return {
        ...prevData,
        education: {
          items: updatedEducation,
        },
      };
    });
  };

  const removeEducation = (index: number) => {
    setResumeData((prevData) => ({
      ...prevData,
      education: {
        items: prevData.education.items.filter((_, i) => i !== index),
      },
    }));
  };

  // Internship methods
  const addInternship = (internship: InternshipItem) => {
    setResumeData((prevData) => ({
      ...prevData,
      internships: {
        items: [...prevData.internships.items, internship],
      },
    }));
  };

  const updateInternship = (
    index: number,
    internship: Partial<InternshipItem>
  ) => {
    setResumeData((prevData) => {
      const updatedInternships = [...prevData.internships.items];
      updatedInternships[index] = {
        ...updatedInternships[index],
        ...internship,
      };
      return {
        ...prevData,
        internships: {
          items: updatedInternships,
        },
      };
    });
  };

  const removeInternship = (index: number) => {
    setResumeData((prevData) => ({
      ...prevData,
      internships: {
        items: prevData.internships.items.filter((_, i) => i !== index),
      },
    }));
  };

  // Project methods
  const addProject = (project: ProjectItem) => {
    setResumeData((prevData) => ({
      ...prevData,
      projects: {
        items: [...prevData.projects.items, project],
      },
    }));
  };

  const updateProject = (index: number, project: Partial<ProjectItem>) => {
    setResumeData((prevData) => {
      const updatedProjects = [...prevData.projects.items];
      updatedProjects[index] = { ...updatedProjects[index], ...project };
      return {
        ...prevData,
        projects: {
          items: updatedProjects,
        },
      };
    });
  };

  const removeProject = (index: number) => {
    setResumeData((prevData) => ({
      ...prevData,
      projects: {
        items: prevData.projects.items.filter((_, i) => i !== index),
      },
    }));
  };

  // Extracurricular methods
  const addExtracurricular = (item: string) => {
    setResumeData((prevData) => ({
      ...prevData,
      extracurriculars: {
        items: [...prevData.extracurriculars.items, item],
      },
    }));
  };

  const updateExtracurricular = (index: number, item: string) => {
    setResumeData((prevData) => {
      const updatedExtracurriculars = [...prevData.extracurriculars.items];
      updatedExtracurriculars[index] = item;
      return {
        ...prevData,
        extracurriculars: {
          items: updatedExtracurriculars,
        },
      };
    });
  };

  const removeExtracurricular = (index: number) => {
    setResumeData((prevData) => ({
      ...prevData,
      extracurriculars: {
        items: prevData.extracurriculars.items.filter((_, i) => i !== index),
      },
    }));
  };

  // Reset the entire resume
  const resetResume = () => {
    setResumeData(BASE_FROM_STATE);
  };

  // Create the context value with useMemo to prevent unnecessary rerenders
  const contextValue = useMemo(
    () => ({
      resumeData,
      updatePersonalInfo,
      addLink,
      updateLink,
      removeLink,
      addSkill,
      updateSkill,
      removeSkill,
      addExperience,
      updateExperience,
      removeExperience,
      addEducation,
      updateEducation,
      removeEducation,
      addInternship,
      updateInternship,
      removeInternship,
      addProject,
      updateProject,
      removeProject,
      addExtracurricular,
      updateExtracurricular,
      removeExtracurricular,
      resetResume,
    }),
    [resumeData]
  );

  return (
    <ResumeContext.Provider value={contextValue}>
      {children}
    </ResumeContext.Provider>
  );
};

// Custom hook for using the resume context
export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResumeContext must be used within a ResumeProvider");
  }
  return context;
};

export default ResumeProvider;
