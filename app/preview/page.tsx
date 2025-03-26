import ResumeTemplate from "@/components/resume/resume-template";
import TemplateWrapper from "@/components/resume/template-wrapper";
import dynamic from "next/dynamic";
const InteractionOptions = dynamic(
  () => import("@/components/interaction-options"),
  {
    ssr: false,
  }
);

export default function Preview() {
  return (
    <div className="container mx-auto px-4 py-8 print:p-0">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6 print:hidden">
          <h1 className="text-3xl font-bold">Resume Preview</h1>
        </div>
        <InteractionOptions />
        <TemplateWrapper>
          <ResumeTemplate />
        </TemplateWrapper>
      </div>
    </div>
  );
}
