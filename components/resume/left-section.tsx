"use client";
import { useResumeContext } from "@/providers/ResumeBuilder";
import Link from "next/link";
import React, { Fragment } from "react";

const LinkItem = ({ label, url }: { label: string; url: string }) => {
  return (
    <p className="text-center">
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-black underline"
      >
        {label}
      </Link>
    </p>
  );
};

const SkillItem = ({
  name,
  proficiency,
}: {
  name: string;
  proficiency: number;
}) => {
  return (
    <div className="mb-2 flex flex-col items-center justify-center w-full">
      <div className="flex justify-between mb-1">
        <span className="text-black">{name}</span>
      </div>
      <div className="w-full bg-gray-200 h-1.5 rounded-sm print:bg-gray-200">
        <div
          className="bg-black h-1.5 rounded-sm print:bg-black w-full"
          style={{ width: `${(proficiency / 5) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

const TextItem = ({ text }: { text: string }) => {
  return <p className="text-center">{text}</p>;
};

const PersonalItems = ({ items }: { items: any }) => {
  return (
    <>
      {items.location && <p>{items.location}</p>}
      {items.country && <p>{items.country}</p>}
      {items.phone && <p>{items.phone}</p>}
      {items.email && (
        <p className="px-2 text-center">
          <Link href={`mailto:${items.email}`} className="text-black underline">
            {items.email}
          </Link>
        </p>
      )}
      {items.dateOfBirth && (
        <>
          <p className="text-gray-500">Date of birth</p>
          <p>{items.dateOfBirth}</p>
        </>
      )}
      {items.nationality && (
        <>
          <p className="text-gray-500">Nationality</p>
          <p>{items.nationality}</p>
        </>
      )}
    </>
  );
};

const SectionContainer = ({
  heading,
  items,
  type,
}: {
  heading: string;
  items: any;
  type: "text" | "link" | "skill" | "personal";
}) => {
  return (
    <section className="w-full flex flex-col items-center justify-center space-y-1">
      <h2 className="text-sm font-bold uppercase flex items-center gap-x-2 text-black">
        <span>•</span> {heading} <span>•</span>
      </h2>
      <div className="space-y-1 text-black flex flex-col items-center justify-center w-full">
        {type !== "personal" &&
          items.map((item: any, idx: number) => (
            <Fragment key={idx}>
              {type === "text" && <TextItem text={item} />}
              {type === "link" && (
                <LinkItem label={item.label} url={item.url} />
              )}
              {type === "skill" && (
                <SkillItem name={item.name} proficiency={item.proficiency} />
              )}
            </Fragment>
          ))}
        {type === "personal" && <PersonalItems items={items} />}
      </div>
    </section>
  );
};

const LeftSection = () => {
  const { resumeData } = useResumeContext();
  const { personal, links, skills, extracurriculars } = resumeData;
  return (
    <div className="md:w-1/4 space-y-4">
      <SectionContainer heading="DETAILS" items={personal} type="personal" />

      {/* Links Section */}
      {links.items.length > 0 && (
        <SectionContainer heading="Links" items={links?.items} type="link" />
      )}

      {/* Skills Section */}
      {skills.items.length > 0 && (
        <SectionContainer heading="Skills" items={skills?.items} type="skill" />
      )}

      {/* Extra-Curriculars Section */}
      {extracurriculars.items.length > 0 && (
        <SectionContainer
          heading="Extra-Curriculars"
          items={extracurriculars?.items}
          type="text"
        />
      )}
    </div>
  );
};

export default LeftSection;
