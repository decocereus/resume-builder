"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Download, Printer, PenLine } from "lucide-react";
import ResumeTemplate from "@/components/resume/resume-template";
import { initialResumeState } from "@/lib/resume-data";
import type { ResumeData } from "@/lib/types";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function Preview() {
  const router = useRouter();
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeState);
  const [isLoading, setIsLoading] = useState(true);
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      setResumeData(JSON.parse(savedData));
    }
    setIsLoading(false);
  }, []);

  const handleEdit = () => {
    router.push("/builder");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveAsPDF = async () => {
    if (!resumeRef.current) return;

    try {
      const element = resumeRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
      pdf.save("resume.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 print:p-0">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6 print:hidden">
          <h1 className="text-3xl font-bold">Resume Preview</h1>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleEdit}>
              <PenLine className="h-4 w-4 mr-2" />
              Edit Resume
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button onClick={handleSaveAsPDF}>
              <Download className="h-4 w-4 mr-2" />
              Save as PDF
            </Button>
          </div>
        </div>

        <div
          ref={resumeRef}
          className="bg-white border rounded-lg shadow-lg p-8 mb-8 print:shadow-none print:border-none print:p-6 print:m-0"
        >
          <ResumeTemplate data={resumeData} />
        </div>
      </div>
    </div>
  );
}
