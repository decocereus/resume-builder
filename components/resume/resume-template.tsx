import LeftSection from "./left-section";
import RightSection from "./right-section";
import TopSection from "./top-section";

export default function ResumeTemplate() {
  return (
    <div className="font-sans text-sm print:text-[11px] leading-normal text-black">
      <TopSection />
      <div className="flex flex-col md:flex-row gap-y-8 md:gap-x-2.5">
        <LeftSection />
        <RightSection />
      </div>
    </div>
  );
}
