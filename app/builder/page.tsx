"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PersonalInfoForm from "@/components/resume/personal-info-form"
import SkillsForm from "@/components/resume/skills-form"
import ExperienceForm from "@/components/resume/experience-form"
import EducationForm from "@/components/resume/education-form"
import ProjectsForm from "@/components/resume/projects-form"
import InternshipsForm from "@/components/resume/internships-form"
import ExtracurricularsForm from "@/components/resume/extracurriculars-form"
import LinksForm from "@/components/resume/links-form"
import { initialResumeState } from "@/lib/resume-data"

export default function Builder() {
  const router = useRouter()
  const [resumeData, setResumeData] = useState(initialResumeState)
  const [activeTab, setActiveTab] = useState("personal")

  const updateResumeData = (section: string, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  const handleNext = () => {
    const tabs = [
      "personal",
      "links",
      "skills",
      "experience",
      "education",
      "internships",
      "projects",
      "extracurriculars",
    ]
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
    }
  }

  const handlePrevious = () => {
    const tabs = [
      "personal",
      "links",
      "skills",
      "experience",
      "education",
      "internships",
      "projects",
      "extracurriculars",
    ]
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1])
    }
  }

  const handleSubmit = () => {
    // Save resume data to localStorage
    localStorage.setItem("resumeData", JSON.stringify(resumeData))
    router.push("/preview")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Build Your Resume</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
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
            <PersonalInfoForm data={resumeData.personal} updateData={(data) => updateResumeData("personal", data)} />
          </TabsContent>

          <TabsContent value="links">
            <LinksForm data={resumeData.links} updateData={(data) => updateResumeData("links", data)} />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsForm data={resumeData.skills} updateData={(data) => updateResumeData("skills", data)} />
          </TabsContent>

          <TabsContent value="experience">
            <ExperienceForm data={resumeData.experience} updateData={(data) => updateResumeData("experience", data)} />
          </TabsContent>

          <TabsContent value="education">
            <EducationForm data={resumeData.education} updateData={(data) => updateResumeData("education", data)} />
          </TabsContent>

          <TabsContent value="internships">
            <InternshipsForm
              data={resumeData.internships}
              updateData={(data) => updateResumeData("internships", data)}
            />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsForm data={resumeData.projects} updateData={(data) => updateResumeData("projects", data)} />
          </TabsContent>

          <TabsContent value="extracurriculars">
            <ExtracurricularsForm
              data={resumeData.extracurriculars}
              updateData={(data) => updateResumeData("extracurriculars", data)}
            />
          </TabsContent>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={activeTab === "personal"}>
            Previous
          </Button>

          {activeTab === "extracurriculars" ? (
            <Button onClick={handleSubmit}>Preview Resume</Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </div>
      </Tabs>
    </div>
  )
}

