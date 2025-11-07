"use client";
import { ResumeData } from "@/lib/types";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import React from "react";
import ResumePDF from "./resume-pdf";

interface PDFDownloaderProps {
  resumeData: ResumeData;
  fileName?: string;
}

const PDFDownloader: React.FC<PDFDownloaderProps> = ({
  resumeData,
  fileName = "resume.pdf",
}) => {
  const handleManualDownload = async () => {
    const instance = pdf(<ResumePDF resumeData={resumeData} />);
    const blob = await instance.toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <PDFDownloadLink
      document={<ResumePDF resumeData={resumeData} />}
      fileName={fileName}
      className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 relative z-10 cursor-pointer"
    >
      {({ loading, error }) => {
        if (loading) return "Generating PDF...";
        if (error) {
          return (
            <button type="button" onClick={handleManualDownload} className="cursor-pointer">
              Download PDF
            </button>
          );
        }
        return "Download PDF";
      }}
    </PDFDownloadLink>
  );
};

export default PDFDownloader;
