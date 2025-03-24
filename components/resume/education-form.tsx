"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Bold } from "lucide-react"
import type { Education, EducationItem } from "@/lib/types"

interface EducationFormProps {
  data: Education
  updateData: (data: Education) => void
}

export default function EducationForm({ data, updateData }: EducationFormProps) {
  const [formData, setFormData] = useState<Education>(data)

  const handleAddEducation = () => {
    const newEducation = [
      ...formData.items,
      {
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]
    setFormData({ items: newEducation })
    updateData({ items: newEducation })
  }

  const handleRemoveEducation = (index: number) => {
    const newEducation = formData.items.filter((_, i) => i !== index)
    setFormData({ items: newEducation })
    updateData({ items: newEducation })
  }

  const handleEducationChange = (index: number, field: keyof EducationItem, value: string) => {
    const newEducation = [...formData.items]
    newEducation[index] = { ...newEducation[index], [field]: value }
    setFormData({ items: newEducation })
    updateData({ items: newEducation })
  }

  const handleMakeBold = (educationIndex: number) => {
    const textarea = document.getElementById(`edu-description-${educationIndex}`) as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    if (start === end) return // No text selected

    const text = textarea.value
    const selectedText = text.substring(start, end)
    const newText = text.substring(0, start) + `**${selectedText}**` + text.substring(end)

    // Update the description with the new text
    const newEducation = [...formData.items]
    newEducation[educationIndex].description = newText
    setFormData({ items: newEducation })
    updateData({ items: newEducation })

    // Set focus back to the textarea
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + 2, end + 2)
    }, 0)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Education</h2>
      <p className="text-muted-foreground">Add your educational background, starting with the most recent.</p>
      <p className="text-sm bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded border border-yellow-200 dark:border-yellow-900/30">
        <strong>Tip:</strong> To make text bold, select it and click the Bold button.
      </p>

      {formData.items.map((education, eduIndex) => (
        <div key={eduIndex} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Education {eduIndex + 1}</h3>
            <Button variant="ghost" size="sm" onClick={() => handleRemoveEducation(eduIndex)} type="button">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`edu-degree-${eduIndex}`}>Degree / Certificate</Label>
              <Input
                id={`edu-degree-${eduIndex}`}
                value={education.degree}
                onChange={(e) => handleEducationChange(eduIndex, "degree", e.target.value)}
                placeholder="BSc Computer Science"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`edu-institution-${eduIndex}`}>Institution</Label>
              <Input
                id={`edu-institution-${eduIndex}`}
                value={education.institution}
                onChange={(e) => handleEducationChange(eduIndex, "institution", e.target.value)}
                placeholder="University of Example"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`edu-location-${eduIndex}`}>Location</Label>
              <Input
                id={`edu-location-${eduIndex}`}
                value={education.location}
                onChange={(e) => handleEducationChange(eduIndex, "location", e.target.value)}
                placeholder="New York, USA"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor={`edu-start-${eduIndex}`}>Start Date</Label>
                <Input
                  id={`edu-start-${eduIndex}`}
                  value={education.startDate}
                  onChange={(e) => handleEducationChange(eduIndex, "startDate", e.target.value)}
                  placeholder="Sep 2018"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`edu-end-${eduIndex}`}>End Date</Label>
                <Input
                  id={`edu-end-${eduIndex}`}
                  value={education.endDate}
                  onChange={(e) => handleEducationChange(eduIndex, "endDate", e.target.value)}
                  placeholder="Jun 2022"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor={`edu-description-${eduIndex}`}>Description (Optional)</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleMakeBold(eduIndex)}
                type="button"
                title="Make selected text bold"
              >
                <Bold className="h-4 w-4 mr-1" /> Bold
              </Button>
            </div>
            <Textarea
              id={`edu-description-${eduIndex}`}
              value={education.description}
              onChange={(e) => handleEducationChange(eduIndex, "description", e.target.value)}
              placeholder="Additional information about your education"
            />
            <div className="text-xs text-muted-foreground">
              Preview: {education.description.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}
            </div>
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" onClick={handleAddEducation}>
        Add Education
      </Button>
    </div>
  )
}

