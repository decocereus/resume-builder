"use client";
import { useResumeContext } from "@/providers/ResumeBuilder";
import { Briefcase, GraduationCap, LinkIcon, Star, Users } from "lucide-react";
import Link from "next/link";
import React, { useMemo } from "react";

const FormattedText = ({ text }: { text: string }) => {
  const renderedText = useMemo(() => {
    if (!text) return null;

    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  }, [text]);

  return <>{renderedText}</>;
};

const Dot = () => {
  return (
    <div className="absolute w-1.5 h-1.5 bg-gray-300 rounded-full -left-[3.5px] top-1.5 print:bg-gray-300" />
  );
};

const TimelineItem = ({
  title,
  subtitle,
  location,
  startDate,
  endDate,
  achievements,
  icon: Icon,
}: {
  title: string;
  subtitle?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  achievements?: string[];
  icon: React.ElementType;
}) => {
  return (
    <div className="relative pl-4">
      <Dot />
      <h3 className="font-bold text-black">
        {title} {subtitle && `at ${subtitle}`}, {location}
      </h3>
      <p className="text-gray-500 mb-1.5">
        {startDate} — {endDate ?? "Present"}
      </p>
      {achievements && (
        <ul className="list-disc pl-5 space-y-1 text-black">
          {achievements.map((achievement, i) => (
            <li key={i}>
              <FormattedText text={achievement} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ProjectItem = ({
  name,
  details,
  url,
}: {
  name: string;
  details: string[];
  url?: string;
}) => {
  return (
    <div className="relative pl-4">
      <Dot />
      <h3 className="font-bold text-black">{name}</h3>
      <ul className="list-disc pl-3 space-y-1 mb-2 text-black">
        {details.map((detail, i) => (
          <li key={i}>
            <FormattedText text={detail} />
          </li>
        ))}
      </ul>
      {url && (
        <p className="flex items-center gap-1 text-black">
          <LinkIcon size={14} />
          Project:{" "}
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black underline"
          >
            {url}
          </Link>
        </p>
      )}
    </div>
  );
};

const SectionContainer = ({
  title,
  icon: Icon,
  items,
  type,
}: {
  title: string;
  icon: React.ElementType;
  items: any[];
  type: "experience" | "education" | "internships" | "projects";
}) => {
  return (
    <>
      {items.length > 0 && (
        <section>
          <h2 className="flex items-center gap-x-2 font-bold mb-1 text-black">
            <Icon size={18} className="text-gray-700" />
            {title}
          </h2>
          <div className="space-y-2 border-l-2 border-gray-300 print:border-gray-300">
            {type === "projects"
              ? items.map((project, index) => (
                  <ProjectItem
                    key={index}
                    name={project.name}
                    details={project.details}
                    url={project.url}
                  />
                ))
              : items.map((item, index) => (
                  <TimelineItem
                    key={index}
                    title={
                      type === "education"
                        ? item.degree
                        : type === "internships"
                        ? item.title
                        : item.title
                    }
                    subtitle={
                      type === "education"
                        ? item.institution
                        : type === "internships"
                        ? item.company
                        : item.company
                    }
                    location={item.location}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    achievements={
                      type === "education"
                        ? item.description
                          ? [item.description]
                          : []
                        : item.achievements
                    }
                    icon={Icon}
                  />
                ))}
          </div>
        </section>
      )}
    </>
  );
};

const RightSection = () => {
  const { resumeData } = useResumeContext();
  const { experience, education, internships, projects } = resumeData;

  return (
    <div className="md:w-3/4 space-y-3 pl-1">
      <SectionContainer
        title="EMPLOYMENT HISTORY"
        icon={Briefcase}
        items={experience.items}
        type="experience"
      />
      <SectionContainer
        title="EDUCATION AND ACADEMICS"
        icon={GraduationCap}
        items={education.items}
        type="education"
      />
      <SectionContainer
        title="INTERNSHIPS"
        icon={Users}
        items={internships.items}
        type="internships"
      />
      <SectionContainer
        title="PROJECTS"
        icon={Star}
        items={projects.items}
        type="projects"
      />
    </div>
  );
};

export default RightSection;
