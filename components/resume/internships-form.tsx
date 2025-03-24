"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Plus, Bold } from "lucide-react"
import type { Internships, InternshipItem } from "@/lib/types"

interface InternshipsFormProps {
  data: Internships
  updateData: (data: Internships) => void
}

export default function InternshipsForm({ data, updateData }: InternshipsFormProps) {
  const [formData, setFormData] = useState<Internships>(data)

  const handleAddInternship = () => {
    const newInternships = [
      ...formData.items,
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        achievements: [""],
      },
    ]
    setFormData({ items: newInternships })
    updateData({ items: newInternships })
  }

  const handleRemoveInternship = (index: number) => {
    const newInternships = formData.items.filter((_, i) => i !== index)
    setFormData({ items: newInternships })
    updateData({ items: newInternships })
  }

  const handleInternshipChange = (index: number, field: keyof InternshipItem, value: string) => {
    const newInternships = [...formData.items]
    newInternships[index] = { ...newInternships[index], [field]: value }
    setFormData({ items: newInternships })
    updateData({ items: newInternships })
  }

  const handleAddAchievement = (internshipIndex: number) => {
    const newInternships = [...formData.items]
    newInternships[internshipIndex].achievements.push("")
    setFormData({ items: newInternships })
    updateData({ items: newInternships })
  }

  const handleRemoveAchievement = (internshipIndex: number, achievementIndex: number) => {
    const newInternships = [...formData.items]
    newInternships[internshipIndex].achievements = newInternships[internshipIndex].achievements.filter(
      (_, i) => i !== achievementIndex,
    )
    setFormData({ items: newInternships })
    updateData({ items: newInternships })
  }

  const handleAchievementChange = (internshipIndex: number, achievementIndex: number, value: string) => {
    const newInternships = [...formData.items]
    newInternships[internshipIndex].achievements[achievementIndex] = value
    setFormData({ items: newInternships })
    updateData({ items: newInternships })
  }

  const handleMakeBold = (internshipIndex: number, achievementIndex: number) => {
    const textarea = document.getElementById(
      `internship-achievement-${internshipIndex}-${achievementIndex}`,
    ) as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    if (start === end) return // No text selected

    const text = textarea.value
    const selectedText = text.substring(start, end)
    const newText = text.substring(0, start) + `**${selectedText}**` + text.substring(end)

    // Update the achievement with the new text
    const newInternships = [...formData.items]
    newInternships[internshipIndex].achievements[achievementIndex] = newText
    setFormData({ items: newInternships })
    updateData({ items: newInternships })

    // Set focus back to the textarea
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + 2, end + 2)
    }, 0)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Internships</h2>
      <p className="text-muted-foreground">Add your internship experiences.</p>
      <p className="text-sm bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded border border-yellow-200 dark:border-yellow-900/30">
        <strong>Tip:</strong> To make text bold, select it and click the Bold button.
      </p>

      {formData.items.map((internship, intIndex) => (
        <div key={intIndex} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Internship {intIndex + 1}</h3>
            <Button variant="ghost" size="sm" onClick={() => handleRemoveInternship(intIndex)} type="button">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`int-title-${intIndex}`}>Position Title</Label>
              <Input
                id={`int-title-${intIndex}`}
                value={internship.title}
                onChange={(e) => handleInternshipChange(intIndex, "title", e.target.value)}
                placeholder="Software Engineer Intern"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`int-company-${intIndex}`}>Company</Label>
              <Input
                id={`int-company-${intIndex}`}
                value={internship.company}
                onChange={(e) => handleInternshipChange(intIndex, "company", e.target.value)}
                placeholder="Acme Inc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`int-location-${intIndex}`}>Location</Label>
              <Input
                id={`int-location-${intIndex}`}
                value={internship.location}
                onChange={(e) => handleInternshipChange(intIndex, "location", e.target.value)}
                placeholder="New York, USA"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor={`int-start-${intIndex}`}>Start Date</Label>
                <Input
                  id={`int-start-${intIndex}`}
                  value={internship.startDate}
                  onChange={(e) => handleInternshipChange(intIndex, "startDate", e.target.value)}
                  placeholder="Jun 2021"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`int-end-${intIndex}`}>End Date</Label>
                <Input
                  id={`int-end-${intIndex}`}
                  value={internship.endDate}
                  onChange={(e) => handleInternshipChange(intIndex, "endDate", e.target.value)}
                  placeholder="Aug 2021"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Achievements / Responsibilities</Label>
            {internship.achievements.map((achievement, achIndex) => (
              <div key={achIndex} className="space-y-1">
                <div className="flex gap-2">
                  <Textarea
                    id={`internship-achievement-${intIndex}-${achIndex}`}
                    value={achievement}
                    onChange={(e) => handleAchievementChange(intIndex, achIndex, e.target.value)}
                    placeholder="Describe your achievements or responsibilities"
                    className="min-h-[80px]"
                  />
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleMakeBold(intIndex, achIndex)}
                      type="button"
                      title="Make selected text bold"
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveAchievement(intIndex, achIndex)}
                      type="button"
                      disabled={internship.achievements.length <= 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Preview: {achievement.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleAddAchievement(intIndex)}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Achievement
            </Button>
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" onClick={handleAddInternship}>
        Add Internship
      </Button>
    </div>
  )
}

