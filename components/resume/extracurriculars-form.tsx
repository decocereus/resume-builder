"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import type { Extracurriculars } from "@/lib/types"

interface ExtracurricularsFormProps {
  data: Extracurriculars
  updateData: (data: Extracurriculars) => void
}

export default function ExtracurricularsForm({ data, updateData }: ExtracurricularsFormProps) {
  const [formData, setFormData] = useState<Extracurriculars>(data)
  const [newItem, setNewItem] = useState("")

  const handleAddItem = () => {
    if (newItem.trim() === "") return

    const newItems = [...formData.items, newItem]
    setFormData({ items: newItems })
    updateData({ items: newItems })
    setNewItem("")
  }

  const handleRemoveItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index)
    setFormData({ items: newItems })
    updateData({ items: newItems })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddItem()
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Extra-Curricular Activities</h2>
      <p className="text-muted-foreground">Add your leadership roles, volunteer work, clubs, etc.</p>

      <div className="flex gap-2">
        <Input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add an activity (e.g., Club President, Volunteer)"
        />
        <Button type="button" onClick={handleAddItem}>
          Add
        </Button>
      </div>

      <div className="space-y-2 mt-4">
        {formData.items.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
            <span>{item}</span>
            <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(index)} type="button">
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

