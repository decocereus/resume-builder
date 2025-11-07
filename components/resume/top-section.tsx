"use client";
import { useResumeContext } from "@/providers/ResumeBuilder";
import { MapPin, Mail } from "lucide-react";
import React from "react";

const TopSection = () => {
  const { resumeData } = useResumeContext();
  return (
    <header className="text-center mb-8">
      <h1 className="text-3xl font-bold uppercase tracking-wider mb-2 text-black">
        {resumeData?.personal.fullName}
      </h1>
      <div className="flex justify-center items-center gap-x-3 text-gray-700">
        <p>{resumeData?.personal.jobTitle}</p>
        {resumeData?.personal.location && (
          <>
            <span>•</span>
            <p className="flex items-center gap-x-1">
              <MapPin size={14} />
              {resumeData?.personal.location}
            </p>
          </>
        )}
        {resumeData?.personal.email && (
          <>
            <span>•</span>
            <p className="flex items-center gap-x-1">
              <Mail size={14} />
              {resumeData?.personal.email}
            </p>
          </>
        )}
      </div>
    </header>
  );
};

export default TopSection;
