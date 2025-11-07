"use client";
import { useResumeContext } from "@/providers/ResumeBuilder";
import { Briefcase, Users } from "lucide-react";
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
  techStack,
  icon: Icon,
}: {
  title: string;
  subtitle?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  achievements?: string[];
  techStack?: string[];
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
        {techStack && techStack.length > 0 && (
          <span className="ml-2 text-xs text-gray-600">
            • Tech: {techStack.join(", ")}
          </span>
        )}
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
      <h3 className="font-bold text-black">
        {url ? (
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black underline"
          >
            {name}
          </Link>
        ) : (
          name
        )}
      </h3>
      <ul className="list-disc pl-3 space-y-1 mb-2 text-black">
        {details.map((detail, i) => (
          <li key={i}>
            <FormattedText text={detail} />
          </li>
        ))}
      </ul>
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
            <Icon size={18} className="text-gray-700 -ml-2" />
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
                    techStack={
                      type === "experience" ? item.techStack : undefined
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
  const { experience, internships, projects } = resumeData;
  const portfolioLink =
    resumeData.links.items.find(
      (l) => l.label && l.label.toLowerCase() === "portfolio"
    ) || resumeData.links.items[0];
  const portfolioDomain = portfolioLink
    ? portfolioLink.url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]
    : undefined;

  return (
    <div className="md:w-3/4 space-y-3 pl-1">
      <SectionContainer
        title="EMPLOYMENT HISTORY"
        icon={Briefcase}
        items={experience.items}
        type="experience"
      />
      {(internships.items.length > 0 || projects.items.length > 0) && (
        <section>
          <h2 className="flex items-center gap-x-2 font-bold mb-1 text-black">
            <Users size={18} className="text-gray-700 -ml-2" />
            INTERNSHIPS & PROJECTS
          </h2>
          <div className="space-y-2">
            {internships.items.map((intItem, index) => {
              const summary = (intItem.achievements || []).find(
                (a) => a && a.trim().length > 0
              );
              return (
                <div key={`int-${index}`} className="pl-4 relative">
                  <Dot />
                  <p className="font-bold text-black">
                    {intItem.title}, {intItem.company} — {intItem.location} (
                    {intItem.startDate}
                    {intItem.endDate ? `–${intItem.endDate}` : ""})
                  </p>
                  {summary && <p className="text-black mt-1">{summary}</p>}
                </div>
              );
            })}
            {projects.items.length > 0 && (
              <div className="pl-4 relative">
                <Dot />
                <p className="text-black font-bold flex flex-wrap items-center">
                  {projects.items.map((p, idx) => (
                    <span key={`projname-${idx}`} className="flex items-center">
                      {idx > 0 && <span className="mx-1">•</span>}
                      {p.url ? (
                        <Link
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-black"
                        >
                          {p.name}
                        </Link>
                      ) : (
                        <span>{p.name}</span>
                      )}
                    </span>
                  ))}
                </p>
                {portfolioDomain && (
                  <p className="text-gray-600 italic text-sm mt-1">
                    (Details and live demos at {portfolioDomain})
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default RightSection;
