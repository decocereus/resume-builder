"use client";
import { ResumeData } from "@/lib/types";
import { PDFDownloadLink } from "@react-pdf/renderer";
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
  return (
    <PDFDownloadLink
      document={<ResumePDF resumeData={resumeData} />}
      fileName={fileName}
      className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
    >
      {({ blob, url, loading, error }) =>
        loading ? "Generating PDF..." : "Download PDF"
      }
    </PDFDownloadLink>
  );
};

export default PDFDownloader;
