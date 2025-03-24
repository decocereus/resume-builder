"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import type { LinkItem } from "@/lib/types";
import { useResumeContext } from "@/providers/ResumeBuilder";

export default function LinksForm() {
  const { resumeData, addLink, updateLink, removeLink } = useResumeContext();
  const [newLink, setNewLink] = useState<LinkItem>({ label: "", url: "" });
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleAddLink = () => {
    if (isAddingNew) {
      addLink(newLink);
      setNewLink({ label: "", url: "" });
      setIsAddingNew(false);
    } else {
      setIsAddingNew(true);
    }
  };

  const handleCancelAdd = () => {
    setIsAddingNew(false);
    setNewLink({ label: "", url: "" });
  };

  const handleRemoveLink = (index: number) => {
    removeLink(index);
  };

  const handleLinkChange = (
    index: number,
    field: keyof LinkItem,
    value: string
  ) => {
    updateLink(index, { [field]: value });
  };

  const handleNewLinkChange = (field: keyof LinkItem, value: string) => {
    setNewLink({ ...newLink, [field]: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links</h2>
      <p className="text-muted-foreground">
        Add your portfolio, LinkedIn, GitHub, or other relevant links.
      </p>

      {resumeData.links.items.map((link, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end border-b pb-4"
        >
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
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleRemoveLink(index)}
                type="button"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      {isAddingNew && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end border-b pb-4">
          <div className="space-y-2">
            <Label htmlFor="new-link-label">Label</Label>
            <Input
              id="new-link-label"
              value={newLink.label}
              onChange={(e) => handleNewLinkChange("label", e.target.value)}
              placeholder="Portfolio"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-link-url">URL</Label>
            <div className="flex gap-2">
              <Input
                id="new-link-url"
                value={newLink.url}
                onChange={(e) => handleNewLinkChange("url", e.target.value)}
                placeholder="https://yourportfolio.com"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCancelAdd}
                type="button"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {isAddingNew ? (
        <Button
          type="button"
          onClick={handleAddLink}
          disabled={!newLink.label || !newLink.url}
        >
          Save Link
        </Button>
      ) : (
        <Button type="button" variant="outline" onClick={handleAddLink}>
          Add Link
        </Button>
      )}
    </div>
  );
}
