import {
  MapPin,
  Phone,
  Briefcase,
  GraduationCap,
  Star,
  Users,
  LinkIcon,
} from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { useCallback } from "react";
import Link from "next/link";

interface ResumeTemplateProps {
  data: ResumeData;
}

export default function ResumeTemplate({ data }: ResumeTemplateProps) {
  const {
    personal,
    links,
    skills,
    experience,
    education,
    internships,
    projects,
    extracurriculars,
  } = data;

  const renderFormattedText = useCallback(
    (text: string) => {
      if (!text) return null;

      const parts = text.split(/(\*\*.*?\*\*)/g);
      return parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        return <span key={index}>{part}</span>;
      });
    },
    [experience, internships, projects]
  );

  return (
    <div className="font-sans text-sm print:text-[11px] leading-normal text-black">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-wider mb-2 text-black">
          {personal.fullName}
        </h1>
        <div className="flex justify-center items-center gap-x-3 text-gray-700">
          <p>{personal.jobTitle}</p>
          {personal.location && (
            <>
              <span>•</span>
              <p className="flex items-center gap-x-1">
                <MapPin size={14} />
                {personal.location}
              </p>
            </>
          )}
          {personal.phone && (
            <>
              <span>•</span>
              <p className="flex items-center gap-x-1">
                <Phone size={14} />
                {personal.phone}
              </p>
            </>
          )}
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-y-8">
        {/* Left Column */}
        <div className="md:w-1/3 space-y-6">
          {/* Details Section */}
          <section className="w-full flex flex-col items-center justify-center">
            <h2 className="text-sm font-bold uppercase flex items-center gap-2 mb-3 pb-1 text-black">
              <span>•</span> DETAILS <span>•</span>
            </h2>
            <div className="space-y-2 text-black flex flex-col items-center justify-center">
              {personal.location && <p>{personal.location}</p>}
              {personal.country && <p>{personal.country}</p>}
              {personal.phone && <p>{personal.phone}</p>}
              {personal.email && (
                <p>
                  <Link
                    href={`mailto:${personal.email}`}
                    className="text-black underline"
                  >
                    {personal.email}
                  </Link>
                </p>
              )}
              {personal.dateOfBirth && (
                <>
                  <p className="text-gray-500">Date / Place of birth</p>
                  <p>{personal.dateOfBirth}</p>
                  {personal.country && <p>{personal.country}</p>}
                </>
              )}
              {personal.nationality && (
                <>
                  <p className="text-gray-500">Nationality</p>
                  <p>{personal.nationality}</p>
                </>
              )}
            </div>
          </section>

          {/* Links Section */}
          {links.items.length > 0 && (
            <section className="w-full flex flex-col items-center justify-center">
              <h2 className="text-sm font-bold uppercase flex items-center gap-2 mb-3 pb-1 text-black">
                <span>•</span> LINKS <span>•</span>
              </h2>
              <div className="space-y-2">
                {links.items.map((link, index) => (
                  <p key={index}>
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black underline"
                    >
                      {link.label}
                    </Link>
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Skills Section */}
          {skills.items.length > 0 && (
            <section className="w-full flex flex-col items-center justify-center">
              <h2 className="text-sm font-bold uppercase flex items-center gap-2 mb-3 pb-1 text-black">
                <span>•</span> SKILLS <span>•</span>
              </h2>
              <div className="space-y-3 w-full">
                {skills.items.map((skill, index) => (
                  <div
                    key={index}
                    className="mb-2 flex flex-col items-center justify-center w-full"
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-black">{skill.name}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-sm print:bg-gray-200">
                      <div
                        className="bg-black h-1.5 rounded-sm print:bg-black w-full"
                        style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Extra-Curriculars Section */}
          {extracurriculars.items.length > 0 && (
            <section className="w-full flex flex-col items-center justify-center">
              <h2 className="text-sm font-bold uppercase flex items-center gap-2 mb-3 pb-1 text-black">
                <span>•</span> EXTRA-CURRICULARS <span>•</span>
              </h2>
              <div className="space-y-2 text-black">
                {extracurriculars.items.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="md:w-2/3 space-y-6">
          {/* Employment History Section */}
          {experience.items.length > 0 && (
            <section>
              <h2 className="flex items-center gap-2 font-bold mb-4 text-black">
                <Briefcase size={18} className="text-gray-700" />
                EMPLOYMENT HISTORY
              </h2>
              <div className="space-y-6">
                {experience.items.map((job, index) => (
                  <div
                    key={index}
                    className="relative pl-6 border-l border-gray-300 print:border-gray-300"
                  >
                    <div className="absolute w-1.5 h-1.5 bg-gray-300 rounded-full -left-[3.5px] top-1.5 print:bg-gray-300" />
                    <h3 className="font-bold text-black">
                      {job.title} at {job.company}, {job.location}
                    </h3>
                    <p className="text-gray-500 mb-2">
                      {job.startDate} — {job.endDate || "Present"}
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-black">
                      {job.achievements.map((achievement, i) => (
                        <li key={i}>{renderFormattedText(achievement)}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education Section */}
          {education.items.length > 0 && (
            <section>
              <h2 className="flex items-center gap-2 font-bold mb-4 text-black">
                <GraduationCap size={18} className="text-gray-700" />
                EDUCATION AND ACADEMICS
              </h2>
              <div className="space-y-6">
                {education.items.map((edu, index) => (
                  <div
                    key={index}
                    className="relative pl-6 border-l border-gray-300 print:border-gray-300"
                  >
                    <div className="absolute w-1.5 h-1.5 bg-gray-300 rounded-full -left-[3.5px] top-1.5 print:bg-gray-300" />
                    <h3 className="font-bold text-black">
                      {edu.degree}, {edu.institution}, {edu.location}
                    </h3>
                    <p className="text-gray-500 mb-2">
                      {edu.startDate} — {edu.endDate}
                    </p>
                    {edu.description && (
                      <p className="text-black">
                        {renderFormattedText(edu.description)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Internships Section */}
          {internships.items.length > 0 && (
            <section>
              <h2 className="flex items-center gap-2 font-bold mb-4 text-black">
                <Users size={18} className="text-gray-700" />
                INTERNSHIPS
              </h2>
              <div className="space-y-6">
                {internships.items.map((internship, index) => (
                  <div
                    key={index}
                    className="relative pl-6 border-l border-gray-300 print:border-gray-300"
                  >
                    <div className="absolute w-1.5 h-1.5 bg-gray-300 rounded-full -left-[3.5px] top-1.5 print:bg-gray-300" />
                    <h3 className="font-bold text-black">
                      {internship.title} at {internship.company},{" "}
                      {internship.location}
                    </h3>
                    <p className="text-gray-500 mb-2">
                      {internship.startDate} — {internship.endDate}
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-black">
                      {internship.achievements.map((achievement, i) => (
                        <li key={i}>{renderFormattedText(achievement)}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects Section */}
          {projects.items.length > 0 && (
            <section>
              <h2 className="flex items-center gap-2 font-bold mb-4 text-black">
                <Star size={18} className="text-gray-700" />
                PROJECTS
              </h2>
              <div className="space-y-6">
                {projects.items.map((project, index) => (
                  <div
                    key={index}
                    className="relative pl-6 border-l border-gray-300 print:border-gray-300"
                  >
                    <div className="absolute w-1.5 h-1.5 bg-gray-300 rounded-full -left-[3.5px] top-1.5 print:bg-gray-300" />
                    <h3 className="font-bold text-black">{project.name}</h3>
                    <ul className="list-disc pl-5 space-y-1 mb-2 text-black">
                      {project.details.map((detail, i) => (
                        <li key={i}>{renderFormattedText(detail)}</li>
                      ))}
                    </ul>
                    {project.url && (
                      <p className="flex items-center gap-1 text-black">
                        <LinkIcon size={14} />
                        Project:{" "}
                        <Link
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black underline"
                        >
                          {project.url}
                        </Link>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
