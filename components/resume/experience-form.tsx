"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Bold } from "lucide-react";
import type { ExperienceItem } from "@/lib/types";
import { useResumeContext } from "@/providers/ResumeBuilder";

export default function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, removeExperience } =
    useResumeContext();

  const handleAddExperience = () => {
    addExperience({
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      achievements: [""],
    });
  };

  const handleRemoveExperience = (index: number) => {
    removeExperience(index);
  };

  const handleExperienceChange = (
    index: number,
    field: keyof ExperienceItem,
    value: string
  ) => {
    updateExperience(index, { [field]: value } as Partial<ExperienceItem>);
  };

  const handleAddAchievement = (experienceIndex: number) => {
    const currentExperience = resumeData.experience.items[experienceIndex];
    if (!currentExperience) return;

    // Create a new achievements array with an additional empty string
    const updatedAchievements = [...currentExperience.achievements, ""];

    // Update the experience with the new achievements array
    updateExperience(experienceIndex, {
      achievements: updatedAchievements,
    });
  };

  const handleRemoveAchievement = (
    experienceIndex: number,
    achievementIndex: number
  ) => {
    const currentExperience = resumeData.experience.items[experienceIndex];
    if (!currentExperience) return;

    // Filter out the achievement at the specified index
    const updatedAchievements = currentExperience.achievements.filter(
      (_, i) => i !== achievementIndex
    );

    // Update the experience with the new achievements array
    updateExperience(experienceIndex, {
      achievements: updatedAchievements,
    });
  };

  const handleAchievementChange = (
    experienceIndex: number,
    achievementIndex: number,
    value: string
  ) => {
    const currentExperience = resumeData.experience.items[experienceIndex];
    if (!currentExperience) return;

    // Create a new achievements array with the updated value
    const updatedAchievements = [...currentExperience.achievements];
    updatedAchievements[achievementIndex] = value;

    // Update the experience with the new achievements array
    updateExperience(experienceIndex, {
      achievements: updatedAchievements,
    });
  };

  const handleMakeBold = (
    experienceIndex: number,
    achievementIndex: number
  ) => {
    const textarea = document.getElementById(
      `achievement-${experienceIndex}-${achievementIndex}`
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end) return; // No text selected

    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const newText =
      text.substring(0, start) + `**${selectedText}**` + text.substring(end);

    // Update the achievement with the new text
    handleAchievementChange(experienceIndex, achievementIndex, newText);

    // Set focus back to the textarea
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 2, end + 2);
    }, 0);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Work Experience</h2>
      <p className="text-muted-foreground">
        Add your work experience, starting with the most recent.
      </p>
      <p className="text-sm bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded border border-yellow-200 dark:border-yellow-900/30">
        <strong>Tip:</strong> To make text bold, select it and click the Bold
        button.
      </p>

      {resumeData.experience.items.map((experience, expIndex) => (
        <div key={expIndex} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Experience {expIndex + 1}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveExperience(expIndex)}
              type="button"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`exp-title-${expIndex}`}>Job Title</Label>
              <Input
                id={`exp-title-${expIndex}`}
                value={experience.title}
                onChange={(e) =>
                  handleExperienceChange(expIndex, "title", e.target.value)
                }
                placeholder="Software Engineer"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`exp-company-${expIndex}`}>Company</Label>
              <Input
                id={`exp-company-${expIndex}`}
                value={experience.company}
                onChange={(e) =>
                  handleExperienceChange(expIndex, "company", e.target.value)
                }
                placeholder="Acme Inc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`exp-location-${expIndex}`}>Location</Label>
              <Input
                id={`exp-location-${expIndex}`}
                value={experience.location}
                onChange={(e) =>
                  handleExperienceChange(expIndex, "location", e.target.value)
                }
                placeholder="New York, USA"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor={`exp-start-${expIndex}`}>Start Date</Label>
                <Input
                  id={`exp-start-${expIndex}`}
                  value={experience.startDate}
                  onChange={(e) =>
                    handleExperienceChange(
                      expIndex,
                      "startDate",
                      e.target.value
                    )
                  }
                  placeholder="Jan 2020"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`exp-end-${expIndex}`}>End Date</Label>
                <Input
                  id={`exp-end-${expIndex}`}
                  value={experience.endDate}
                  onChange={(e) =>
                    handleExperienceChange(expIndex, "endDate", e.target.value)
                  }
                  placeholder="Present"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Achievements / Responsibilities</Label>
            {experience.achievements.map((achievement, achIndex) => (
              <div key={achIndex} className="space-y-1">
                <div className="flex gap-2">
                  <Textarea
                    id={`achievement-${expIndex}-${achIndex}`}
                    value={achievement}
                    onChange={(e) =>
                      handleAchievementChange(
                        expIndex,
                        achIndex,
                        e.target.value
                      )
                    }
                    placeholder="Describe your achievements, responsibilities, or projects"
                    className="min-h-[80px]"
                  />
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleMakeBold(expIndex, achIndex)}
                      type="button"
                      title="Make selected text bold"
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleRemoveAchievement(expIndex, achIndex)
                      }
                      type="button"
                      disabled={experience.achievements.length <= 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div
                  className="text-xs text-muted-foreground"
                  dangerouslySetInnerHTML={{
                    __html: achievement.replace(
                      /\*\*(.*?)\*\*/g,
                      "<strong>$1</strong>"
                    ),
                  }}
                ></div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleAddAchievement(expIndex)}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Achievement
            </Button>
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" onClick={handleAddExperience}>
        Add Work Experience
      </Button>
    </div>
  );
}
