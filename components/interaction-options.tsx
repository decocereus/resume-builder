"use client";
import React from "react";
import { Button } from "./ui/button";
import { PenLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { useResumeContext } from "@/providers/ResumeBuilder";
import dynamic from "next/dynamic";
const PDFDownloader = dynamic(() => import("./pdf/pdf-download"), {
  ssr: false,
});

const InteractionOptions = () => {
  const router = useRouter();
  const { resumeData } = useResumeContext();
  const handleEdit = () => router.push("/builder");
  return (
    <div className="flex gap-x-3 mb-8">
      <Button variant="outline" onClick={handleEdit}>
        <PenLine className="h-4 w-4 mr-2" />
        Edit Resume
      </Button>
      <PDFDownloader
        resumeData={resumeData}
        fileName={`${resumeData.personal.fullName.replace(
          /\s+/g,
          "_"
        )}_Resume.pdf`}
      />
    </div>
  );
};

export default InteractionOptions;
