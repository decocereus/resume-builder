import FormContainer from "@/components/form-container";

export default function Builder() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Build Your Resume</h1>
      {/* <PdfUpload /> */}
      <FormContainer />
    </div>
  );
}
