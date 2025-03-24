"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Plus, Bold } from "lucide-react"
import type { Projects, ProjectItem } from "@/lib/types"

interface ProjectsFormProps {
  data: Projects
  updateData: (data: Projects) => void
}

export default function ProjectsForm({ data, updateData }: ProjectsFormProps) {
  const [formData, setFormData] = useState<Projects>(data)

  const handleAddProject = () => {
    const newProjects = [
      ...formData.items,
      {
        name: "",
        details: [""],
        url: "",
      },
    ]
    setFormData({ items: newProjects })
    updateData({ items: newProjects })
  }

  const handleRemoveProject = (index: number) => {
    const newProjects = formData.items.filter((_, i) => i !== index)
    setFormData({ items: newProjects })
    updateData({ items: newProjects })
  }

  const handleProjectChange = (index: number, field: keyof ProjectItem, value: string) => {
    const newProjects = [...formData.items]
    newProjects[index] = { ...newProjects[index], [field]: value }
    setFormData({ items: newProjects })
    updateData({ items: newProjects })
  }

  const handleAddDetail = (projectIndex: number) => {
    const newProjects = [...formData.items]
    newProjects[projectIndex].details.push("")
    setFormData({ items: newProjects })
    updateData({ items: newProjects })
  }

  const handleRemoveDetail = (projectIndex: number, detailIndex: number) => {
    const newProjects = [...formData.items]
    newProjects[projectIndex].details = newProjects[projectIndex].details.filter((_, i) => i !== detailIndex)
    setFormData({ items: newProjects })
    updateData({ items: newProjects })
  }

  const handleDetailChange = (projectIndex: number, detailIndex: number, value: string) => {
    const newProjects = [...formData.items]
    newProjects[projectIndex].details[detailIndex] = value
    setFormData({ items: newProjects })
    updateData({ items: newProjects })
  }

  const handleMakeBold = (projectIndex: number, detailIndex: number) => {
    const input = document.getElementById(`project-detail-${projectIndex}-${detailIndex}`) as HTMLInputElement
    if (!input) return

    const start = input.selectionStart
    const end = input.selectionEnd

    if (start === end) return // No text selected

    const text = input.value
    const selectedText = text.substring(start, end)
    const newText = text.substring(0, start) + `**${selectedText}**` + text.substring(end)

    // Update the detail with the new text
    const newProjects = [...formData.items]
    newProjects[projectIndex].details[detailIndex] = newText
    setFormData({ items: newProjects })
    updateData({ items: newProjects })

    // Set focus back to the input
    setTimeout(() => {
      input.focus()
      input.setSelectionRange(start + 2, end + 2)
    }, 0)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Projects</h2>
      <p className="text-muted-foreground">Add your personal or professional projects.</p>
      <p className="text-sm bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded border border-yellow-200 dark:border-yellow-900/30">
        <strong>Tip:</strong> To make text bold, select it and click the Bold button.
      </p>

      {formData.items.map((project, projIndex) => (
        <div key={projIndex} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Project {projIndex + 1}</h3>
            <Button variant="ghost" size="sm" onClick={() => handleRemoveProject(projIndex)} type="button">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`proj-name-${projIndex}`}>Project Name</Label>
              <Input
                id={`proj-name-${projIndex}`}
                value={project.name}
                onChange={(e) => handleProjectChange(projIndex, "name", e.target.value)}
                placeholder="E-commerce Website"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`proj-url-${projIndex}`}>Project URL (Optional)</Label>
              <Input
                id={`proj-url-${projIndex}`}
                value={project.url}
                onChange={(e) => handleProjectChange(projIndex, "url", e.target.value)}
                placeholder="https://project-example.com"
              />
            </div>

            <div className="space-y-2">
              <Label>Project Details</Label>
              {project.details.map((detail, detailIndex) => (
                <div key={detailIndex} className="space-y-1">
                  <div className="flex gap-2">
                    <Input
                      id={`project-detail-${projIndex}-${detailIndex}`}
                      value={detail}
                      onChange={(e) => handleDetailChange(projIndex, detailIndex, e.target.value)}
                      placeholder="Describe a feature or achievement of this project"
                    />
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleMakeBold(projIndex, detailIndex)}
                        type="button"
                        title="Make selected text bold"
                      >
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveDetail(projIndex, detailIndex)}
                        type="button"
                        disabled={project.details.length <= 1}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Preview: {detail.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAddDetail(projIndex)}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Detail
              </Button>
            </div>
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" onClick={handleAddProject}>
        Add Project
      </Button>
    </div>
  )
}

