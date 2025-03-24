import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Font,
  Image,
} from "@react-pdf/renderer";
import { ResumeData } from "@/lib/types";
import BriefCase from "../../public/briefcase.png";
import Star from "../../public/star.png";
import People from "../../public/people.png";
import GraduationCap from "../../public/graduation-cap.png";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
});

Font.register({
  family: "Roboto-Bold",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
});

// Define styles for PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 24,
    fontFamily: "Roboto",
    fontSize: 11,
    color: "#000000",
  },
  // Header styles
  header: {
    marginBottom: 6,
    textAlign: "center",
  },
  name: {
    fontSize: 20,
    fontFamily: "Roboto-Bold",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  headerInfo: {
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 12,
    color: "#4B5563", // gray-700
  },
  headerInfoItem: {
    marginHorizontal: 5,
  },
  // Main content container
  contentContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  // Left column styles (1/3 width)
  leftColumn: {
    width: "33%",
    paddingRight: 16,
  },
  // Right column styles (2/3 width)
  rightColumn: {
    width: "67%",
    paddingLeft: 16,
  },
  // Section styles
  section: {
    marginBottom: 12,
  },
  sectionHeading: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 3,
    marginBottom: 12,
  },
  // Left column section titles
  leftSectionTitle: {
    fontFamily: "Roboto-Bold",
    fontSize: 12,
    textTransform: "uppercase",
    marginBottom: 6,
    textAlign: "center",
  },
  // Right column section titles with icon space
  rightSectionTitle: {
    fontFamily: "Roboto-Bold",
    fontSize: 12,
    borderBottomWidth: 0,
  },
  // Center align for left column content
  centerAlign: {
    alignItems: "center",
  },
  // Link styling
  link: {
    color: "#000000",
    textDecoration: "underline",
  },
  // Timeline item styles for right column
  timelineItem: {
    paddingLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: "#000000", // gray-300
    borderLeftStyle: "solid",
    marginBottom: 15,
    position: "relative",
  },
  timelineDot: {
    width: 4,
    height: 4,
    backgroundColor: "#000000", // gray-300
    borderRadius: 2,
    position: "absolute",
    left: -2.5,
    top: 6,
  },
  // Content styles
  itemTitle: {
    fontFamily: "Roboto-Bold",
    fontSize: 11,
    marginBottom: 2,
  },
  dateText: {
    fontSize: 10,
    color: "#6B7280", // gray-500
    marginBottom: 5,
  },
  bulletList: {
    marginLeft: 15,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 3,
  },
  bullet: {
    width: 10,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
  },
  // Skills bar
  skillContainer: {
    marginBottom: 8,
    width: "100%",
    alignItems: "center",
  },
  skillName: {
    fontSize: 10,
    marginBottom: 3,
  },
  skillBarContainer: {
    height: 4,
    width: "100%",
    backgroundColor: "#E5E7EB", // gray-200
    borderRadius: 2,
  },
  skillBar: {
    height: 4,
    backgroundColor: "#000000",
    borderRadius: 2,
  },
  icon: {
    width: 12,
    height: 12,
  },
});

const renderRichText = (text: string, baseStyle = {}) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const content = part.slice(2, -2);
      return (
        <Text key={i} style={[baseStyle, { fontFamily: "Roboto-Bold" }]}>
          {content}
        </Text>
      );
    }
    return part ? (
      <Text key={i} style={baseStyle}>
        {part}
      </Text>
    ) : null;
  });
};

// Main PDF Component
const ResumePDF = ({ resumeData }: { resumeData: ResumeData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section - Centered at the top */}
        <View style={styles.header}>
          <Text style={styles.name}>{resumeData.personal.fullName}</Text>
          <View style={styles.headerInfo}>
            <Text style={styles.headerInfoItem}>
              {resumeData.personal.jobTitle}
            </Text>
            {resumeData.personal.location && (
              <>
                <Text style={styles.headerInfoItem}>•</Text>
                <Image src={"/location.png"} style={styles.icon} />
                <Text style={styles.headerInfoItem}>
                  {resumeData.personal.location}
                </Text>
              </>
            )}
            {resumeData.personal.phone && (
              <>
                <Text style={styles.headerInfoItem}>•</Text>
                <Image src={"/phone.png"} style={styles.icon} />
                <Text style={styles.headerInfoItem}>
                  {resumeData.personal.phone}
                </Text>
              </>
            )}
          </View>
        </View>

        {/* Content with 2 columns */}
        <View style={styles.contentContainer}>
          {/* Left Column - 1/3 width */}
          <View style={styles.leftColumn}>
            {/* Details Section */}
            <View style={[styles.section, styles.centerAlign]}>
              <Text style={styles.leftSectionTitle}>• DETAILS •</Text>
              <View style={styles.centerAlign}>
                {resumeData.personal.location && (
                  <Text style={{ marginBottom: 2 }}>
                    {resumeData.personal.location}
                  </Text>
                )}
                {resumeData.personal.country && (
                  <Text style={{ marginBottom: 2 }}>
                    {resumeData.personal.country}
                  </Text>
                )}
                {resumeData.personal.phone && (
                  <Text style={{ marginBottom: 2 }}>
                    {resumeData.personal.phone}
                  </Text>
                )}
                {resumeData.personal.email && (
                  <Link
                    src={`mailto:${resumeData.personal.email}`}
                    style={[styles.link, { marginBottom: 2 }]}
                  >
                    {resumeData.personal.email}
                  </Link>
                )}
                {resumeData.personal.dateOfBirth && (
                  <>
                    <Text
                      style={{
                        color: "#6B7280",
                        marginTop: 5,
                        marginBottom: 2,
                      }}
                    >
                      Date / Place of birth
                    </Text>
                    <Text style={{ marginBottom: 2 }}>
                      {resumeData.personal.dateOfBirth}
                    </Text>
                    {resumeData.personal.country && (
                      <Text style={{ marginBottom: 2 }}>
                        {resumeData.personal.country}
                      </Text>
                    )}
                  </>
                )}
                {resumeData.personal.nationality && (
                  <>
                    <Text
                      style={{
                        color: "#6B7280",
                        marginTop: 5,
                        marginBottom: 2,
                      }}
                    >
                      Nationality
                    </Text>
                    <Text>{resumeData.personal.nationality}</Text>
                  </>
                )}
              </View>
            </View>

            {/* Links Section */}
            {resumeData.links.items.length > 0 && (
              <View style={[styles.section, styles.centerAlign]}>
                <Text style={styles.leftSectionTitle}>• LINKS •</Text>
                <View style={styles.centerAlign}>
                  {resumeData.links.items.map((link, index) => (
                    <Link key={index} src={link.url} style={styles.link}>
                      {link.label}
                    </Link>
                  ))}
                </View>
              </View>
            )}

            {/* Skills Section */}
            {resumeData.skills.items.length > 0 && (
              <View style={[styles.section, styles.centerAlign]}>
                <Text style={styles.leftSectionTitle}>• SKILLS •</Text>
                {resumeData.skills.items.map((skill, index) => (
                  <View key={index} style={styles.skillContainer}>
                    <Text style={styles.skillName}>{skill.name}</Text>
                    <View style={styles.skillBarContainer}>
                      <View
                        style={[
                          styles.skillBar,
                          { width: `${(skill.proficiency / 5) * 100}%` },
                        ]}
                      />
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Extracurriculars Section */}
            {resumeData.extracurriculars.items.length > 0 && (
              <View style={[styles.section, styles.centerAlign]}>
                <Text style={styles.leftSectionTitle}>
                  • EXTRA-CURRICULARS •
                </Text>
                <View style={styles.centerAlign}>
                  {resumeData.extracurriculars.items.map((item, index) => (
                    <Text key={index} style={{ marginBottom: 2 }}>
                      {item}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Right Column - 2/3 width */}
          <View style={styles.rightColumn}>
            {/* Experience Section */}
            {resumeData.experience.items.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeading}>
                  <Image src={"/briefcase.png"} style={styles.icon} />
                  <Text style={styles.rightSectionTitle}>
                    EMPLOYMENT HISTORY
                  </Text>
                </View>

                {resumeData.experience.items.map((job, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.timelineDot} />
                    <Text style={styles.itemTitle}>
                      {job.title} at {job.company}, {job.location}
                    </Text>
                    <Text style={styles.dateText}>
                      {job.startDate} — {job.endDate || "Present"}
                    </Text>
                    <View style={styles.bulletList}>
                      {job.achievements.map((achievement, i) => (
                        <View key={i} style={styles.bulletItem}>
                          <Text style={styles.bullet}>• </Text>
                          <View style={styles.bulletText}>
                            {renderRichText(achievement, { fontSize: 10 })}
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Education Section */}
            {resumeData.education.items.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeading}>
                  <Image src={"/graduation-cap.png"} style={styles.icon} />
                  <Text style={styles.rightSectionTitle}>
                    EDUCATION AND ACADEMICS
                  </Text>
                </View>

                {resumeData.education.items.map((edu, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.timelineDot} />
                    <Text style={styles.itemTitle}>
                      {edu.degree}, {edu.institution}, {edu.location}
                    </Text>
                    <Text style={styles.dateText}>
                      {edu.startDate} — {edu.endDate}
                    </Text>
                    {edu.description && (
                      <View style={styles.bulletText}>
                        {renderRichText(edu.description, { fontSize: 10 })}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Internships Section */}
            {resumeData.internships.items.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeading}>
                  <Image src={"/people.png"} style={styles.icon} />
                  <Text style={styles.rightSectionTitle}>INTERNSHIPS</Text>
                </View>

                {resumeData.internships.items.map((internship, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.timelineDot} />
                    <Text style={styles.itemTitle}>
                      {internship.title} at {internship.company},{" "}
                      {internship.location}
                    </Text>
                    <Text style={styles.dateText}>
                      {internship.startDate} — {internship.endDate}
                    </Text>
                    <View style={styles.bulletList}>
                      {internship.achievements.map((achievement, i) => (
                        <View key={i} style={styles.bulletItem}>
                          <Text style={styles.bullet}>• </Text>
                          <View style={styles.bulletText}>
                            {renderRichText(achievement, { fontSize: 10 })}
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Projects Section */}
            {resumeData.projects.items.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeading}>
                  <Image src={"/star.png"} style={styles.icon} />
                  <Text style={styles.rightSectionTitle}>PROJECTS</Text>
                </View>

                {resumeData.projects.items.map((project, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.timelineDot} />
                    <Text style={styles.itemTitle}>{project.name}</Text>
                    <View style={styles.bulletList}>
                      {project.details.map((detail, i) => (
                        <View key={i} style={styles.bulletItem}>
                          <Text style={styles.bullet}>• </Text>
                          <View style={styles.bulletText}>
                            {renderRichText(detail, { fontSize: 10 })}
                          </View>
                        </View>
                      ))}
                    </View>
                    {project.url && (
                      <Link
                        src={project.url}
                        style={[styles.link, { fontSize: 10, marginTop: 3 }]}
                      >
                        Project: {project.url}
                      </Link>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDF;
