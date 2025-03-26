"use client";
import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import ResumePDF from "./resume-pdf";
import { useResumeContext } from "@/providers/ResumeBuilder";

const Viewer = () => {
  const { resumeData } = useResumeContext();
  return (
    <div className="w-full mt-5 mx-auto">
      <PDFViewer width={1371} height={900}>
        <ResumePDF resumeData={resumeData} />
      </PDFViewer>
    </div>
  );
};

export default Viewer;
