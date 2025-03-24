"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import type { Links, LinkItem } from "@/lib/types"

interface LinksFormProps {
  data: Links
  updateData: (data: Links) => void
}

export default function LinksForm({ data, updateData }: LinksFormProps) {
  const [formData, setFormData] = useState<Links>(data)

  const handleAddLink = () => {
    const newLinks = [...formData.items, { label: "", url: "" }]
    setFormData({ items: newLinks })
    updateData({ items: newLinks })
  }

  const handleRemoveLink = (index: number) => {
    const newLinks = formData.items.filter((_, i) => i !== index)
    setFormData({ items: newLinks })
    updateData({ items: newLinks })
  }

  const handleLinkChange = (index: number, field: keyof LinkItem, value: string) => {
    const newLinks = [...formData.items]
    newLinks[index] = { ...newLinks[index], [field]: value }
    setFormData({ items: newLinks })
    updateData({ items: newLinks })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links</h2>
      <p className="text-muted-foreground">Add your portfolio, LinkedIn, GitHub, or other relevant links.</p>

      {formData.items.map((link, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end border-b pb-4">
          <div className="space-y-2">
            <Label htmlFor={`link-label-${index}`}>Label</Label>
            <Input
              id={`link-label-${index}`}
              value={link.label}
              onChange={(e) => handleLinkChange(index, "label", e.target.value)}
              placeholder="Portfolio"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`link-url-${index}`}>URL</Label>
            <div className="flex gap-2">
              <Input
                id={`link-url-${index}`}
                value={link.url}
                onChange={(e) => handleLinkChange(index, "url", e.target.value)}
                placeholder="https://yourportfolio.com"
              />
              <Button variant="outline" size="icon" onClick={() => handleRemoveLink(index)} type="button">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" onClick={handleAddLink}>
        Add Link
      </Button>
    </div>
  )
}

