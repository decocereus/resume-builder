"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import type { SkillItem } from "@/lib/types";
import { useResumeContext } from "@/providers/ResumeBuilder";

export default function SkillsForm() {
  const { resumeData, addSkill, updateSkill, removeSkill } = useResumeContext();
  const [newSkill, setNewSkill] = useState("");
  const [newProficiency, setNewProficiency] = useState(3);

  const handleAddSkill = () => {
    if (newSkill.trim() === "") return;
    addSkill({
      name: newSkill,
      proficiency: newProficiency,
    });
    setNewSkill("");
    setNewProficiency(3);
  };

  const handleRemoveSkill = (index: number) => {
    removeSkill(index);
  };

  const handleUpdateSkill = (
    index: number,
    updatedSkill: Partial<SkillItem>
  ) => {
    updateSkill(index, updatedSkill);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Skills</h2>
      <p className="text-muted-foreground">
        Add your technical skills, programming languages, tools, etc.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="skill-name">Skill Name</Label>
          <Input
            id="skill-name"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a skill (e.g., React, JavaScript, Python)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="skill-proficiency">Proficiency (0-5)</Label>
          <div className="flex items-center gap-4">
            <Slider
              id="skill-proficiency"
              min={0}
              max={5}
              step={1}
              value={[newProficiency]}
              onValueChange={(value) => setNewProficiency(value[0])}
              className="flex-1"
            />
            <span className="w-8 text-center font-medium">
              {newProficiency}
            </span>
          </div>
        </div>
      </div>

      <Button
        type="button"
        onClick={handleAddSkill}
        disabled={newSkill.trim() === ""}
      >
        Add Skill
      </Button>

      <div className="space-y-3 mt-4">
        {resumeData.skills.items.map((skill, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md"
          >
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{skill.name}</span>
                <span className="text-sm text-muted-foreground">
                  Level: {skill.proficiency}/5
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                ></div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveSkill(index)}
              type="button"
              className="ml-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
