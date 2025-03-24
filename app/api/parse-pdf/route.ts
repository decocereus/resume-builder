import { parseResumeText } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

import * as pdfjsLib from "pdfjs-dist";

// @ts-ignore - Ignoring type check for worker setting
pdfjsLib.GlobalWorkerOptions.workerSrc = null;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const pdfFile = formData.get("pdf") as File;

    if (!pdfFile) {
      return NextResponse.json(
        { message: "No PDF file provided" },
        { status: 400 }
      );
    }

    // Read the PDF file
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdfData = new Uint8Array(arrayBuffer);

    // Load the PDF document using the Node-compatible API
    const loadingTask = pdfjsLib.getDocument({ data: pdfData });
    const pdf = await loadingTask.promise;

    // Rest of your code remains the same...
    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(" ");
      fullText += pageText + "\n";
    }

    // Parse the extracted text
    const extractedData = parseResumeText(fullText);

    return NextResponse.json(extractedData, { status: 200 });
  } catch (error) {
    console.error("PDF parsing error:", error);
    return NextResponse.json(
      { message: "Failed to parse PDF", error: String(error) },
      { status: 500 }
    );
  }
}
