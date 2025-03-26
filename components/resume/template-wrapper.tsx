"use client";
import { useRef, ReactNode } from "react";

const TemplateWrapper = ({ children }: { children: ReactNode }) => {
  const resumeRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={resumeRef}
      className="bg-white border rounded-lg shadow-lg p-8 print:shadow-none print:border-none print:p-6 print:m-0"
    >
      {children}
    </div>
  );
};

export default TemplateWrapper;
