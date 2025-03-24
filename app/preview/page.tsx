"use client";

import { useRef } from "react";
import ResumeTemplate from "@/components/resume/resume-template";
import InteractionOptions from "@/components/interaction-options";

export default function Preview() {
  const resumeRef = useRef<HTMLDivElement>(null);

  return (
    <div className="container mx-auto px-4 py-8 print:p-0">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6 print:hidden">
          <h1 className="text-3xl font-bold">Resume Preview</h1>
        </div>
        <InteractionOptions />
        <div
          ref={resumeRef}
          className="bg-white border rounded-lg shadow-lg p-8 my-8 print:shadow-none print:border-none print:p-6 print:m-0"
        >
          <ResumeTemplate />
        </div>
      </div>
    </div>
  );
}
