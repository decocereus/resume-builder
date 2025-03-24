"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import PersonalInfoForm from "./resume/personal-info-form";
import LinksForm from "./resume/links-form";
import SkillsForm from "./resume/skills-form";
import ExperienceForm from "./resume/experience-form";
import EducationForm from "./resume/education-form";
import InternshipsForm from "./resume/internships-form";
import ProjectsForm from "./resume/projects-form";
import ExtracurricularsForm from "./resume/extracurriculars-form";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { RESUME_TABS } from "@/lib/constants";

const FormContainer = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("personal");

  const handleNext = () => {
    const currentIndex = RESUME_TABS.indexOf(activeTab);
    if (currentIndex < RESUME_TABS.length - 1) {
      setActiveTab(RESUME_TABS[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const currentIndex = RESUME_TABS.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(RESUME_TABS[currentIndex - 1]);
    }
  };

  const handleSubmit = () => {
    router.push("/preview");
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="max-w-4xl mx-auto"
    >
      <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-8">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="links">Links</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="experience">Experience</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="internships">Internships</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="extracurriculars">Extra</TabsTrigger>
      </TabsList>
      <div className="border rounded-lg p-6 mb-6">
        <TabsContent value="personal">
          <PersonalInfoForm />
        </TabsContent>

        <TabsContent value="links">
          <LinksForm />
        </TabsContent>

        <TabsContent value="skills">
          <SkillsForm />
        </TabsContent>

        <TabsContent value="experience">
          <ExperienceForm />
        </TabsContent>

        <TabsContent value="education">
          <EducationForm />
        </TabsContent>

        <TabsContent value="internships">
          <InternshipsForm />
        </TabsContent>

        <TabsContent value="projects">
          <ProjectsForm />
        </TabsContent>

        <TabsContent value="extracurriculars">
          <ExtracurricularsForm />
        </TabsContent>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={activeTab === "personal"}
        >
          Previous
        </Button>

        {activeTab === "extracurriculars" ? (
          <Button onClick={handleSubmit}>Preview Resume</Button>
        ) : (
          <Button onClick={handleNext}>Next</Button>
        )}
      </div>
    </Tabs>
  );
};

export default FormContainer;
