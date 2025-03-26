import FormContainer from "@/components/form-container";
import ResumeTemplate from "@/components/resume/resume-template";

export default function Builder() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Build Your Resume</h1>
      {/* <PdfUpload /> */}
      <div className="flex items-center flex-col xl:flex-row gap-x-1 w-full">
        <FormContainer />
        <div className="bg-white border rounded-lg shadow-lg p-8 my-8 print:shadow-none print:border-none print:p-6 print:m-0">
          <ResumeTemplate />
        </div>
      </div>
    </div>
  );
}
