"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, AlertCircle, CheckCircle } from "lucide-react";
import { useResumeContext } from "@/providers/ResumeBuilder";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useParser from "@/hooks/useParser";

export default function PdfUpload() {
  const { resetResume } = useResumeContext();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { applyExtractedData } = useParser();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const response = await fetch("/api/parse-pdf", {
        method: "POST",
        body: formData,
      });

      // Check for non-JSON responses
      const responseText = await response.text();
      let data;

      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Server returned non-JSON response:", responseText);
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to parse PDF");
      }

      // Reset current resume data and apply the extracted data
      resetResume();
      applyExtractedData(data);
      setSuccess(true);
    } catch (err) {
      console.error("Error parsing PDF:", err);
      setError(err instanceof Error ? err.message : "Failed to parse PDF");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full p-6 border rounded-lg mb-8 bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">
        Upload Your Existing Resume
      </h2>
      <p className="text-muted-foreground mb-4">
        Upload your existing resume PDF to auto-fill the form. This helps save
        time and ensures all your information is captured.
      </p>

      <div className="flex items-center gap-4">
        <Button variant="outline" className="relative" disabled={isUploading}>
          <Upload className="h-4 w-4 mr-2" />
          Upload PDF Resume
          <input
            type="file"
            accept="application/pdf"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </Button>
        {isUploading && <p>Processing your resume...</p>}
      </div>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mt-4 bg-green-50 text-green-800 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Your resume has been parsed successfully! Please review the
            information and make any necessary adjustments.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
