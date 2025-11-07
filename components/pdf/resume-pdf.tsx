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

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
});

Font.register({
  family: "Roboto-Bold",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
});

// Add italic variant so fontStyle: "italic" resolves correctly
Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf",
  fontStyle: "italic",
});

// Define styles for PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 16,
    fontFamily: "Roboto",
    fontSize: 11,
    color: "#000000",
  },
  // Header styles
  header: {
    marginBottom: 2,
    textAlign: "center",
  },
  name: {
    fontSize: 16,
    fontFamily: "Roboto-Bold",
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.1,
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
    marginTop: 12,
  },
  // Left column styles (1/3 width)
  leftColumn: {
    width: "25%",
    paddingRight: 4,
    textAlign: "center",
  },
  // Right column styles (2/3 width)
  rightColumn: {
    width: "75%",
    paddingLeft: 4,
  },
  // Section styles
  section: {
    width: "100%",
    marginBottom: 4,
    marginTop: 4,
  },
  sectionHeading: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 2,
  },
  // Left column section titles
  leftSectionTitle: {
    fontFamily: "Roboto-Bold",
    fontSize: 12,
    textTransform: "uppercase",
    marginBottom: 4,
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
    marginBottom: 2,
  },
  // Timeline item styles for right column
  timelineItem: {
    paddingLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: "#000000", // gray-300
    borderLeftStyle: "solid",
    marginBottom: 5,
    position: "relative",
    width: "100%",
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
    marginBottom: 3,
  },
  bulletList: {
    paddingLeft: 4,
    width: "100%",
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 2,
    width: "100%",
  },
  bullet: {
    width: 10,
    fontSize: 10,
    marginTop: 1,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.35,
  },
  // Skills bar
  skillContainer: {
    marginBottom: 6,
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
    marginLeft: -4,
  },
});

const renderRichText = (text: string, baseStyle = {}) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) {
      const content = part.slice(2, -2);
      return (
        <Text key={i} style={[baseStyle, { fontFamily: "Roboto-Bold" }]}>
          {content}
        </Text>
      );
    }
    return (
      <Text key={i} style={baseStyle}>
        {part}
      </Text>
    );
  });
};

// Main PDF Component
const ResumePDF = ({ resumeData }: { resumeData: ResumeData }) => {
  // const portfolioLink =
  //   resumeData.links.items.find(
  //     (l) => l.label && l.label.toLowerCase() === "portfolio"
  //   ) || resumeData.links.items[0];
  // const portfolioDomain = portfolioLink
  //   ? portfolioLink.url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]
  //   : undefined;
  const portfolioDomain = undefined;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
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
            {resumeData.personal.email && (
              <>
                <Text style={styles.headerInfoItem}>•</Text>
                <Link
                  src={`mailto:${resumeData.personal.email}`}
                  style={[styles.link, { marginBottom: 0 }]}
                >
                  {resumeData.personal.email}
                </Link>
              </>
            )}
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.leftColumn}>
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
                {/* phone and DOB removed; email shown in header */}
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

            {/* Education Section moved to left */}
            {resumeData.education.items.length > 0 && (
              <View style={[styles.section, styles.centerAlign]}>
                <Text style={styles.leftSectionTitle}>• EDUCATION •</Text>
                <View style={styles.centerAlign}>
                  {resumeData.education.items.map((edu, index) => (
                    <View
                      key={index}
                      style={{
                        marginBottom: 4,
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Text style={styles.itemTitle}>{edu.degree}</Text>
                      <Text style={{ fontSize: 10 }}>
                        {edu.institution}
                        {edu.location ? `, ${edu.location}` : ""}
                      </Text>
                      <Text style={styles.dateText}>
                        {edu.startDate} — {edu.endDate}
                      </Text>
                      {edu.description ? (
                        <Text style={styles.bulletText}>
                          {renderRichText(edu.description, { fontSize: 10 })}
                        </Text>
                      ) : null}
                    </View>
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
                      {job.techStack && job.techStack.length > 0 && (
                        <Text style={{ fontSize: 9, color: "#6B7280" }}>
                          {"  • Tech: "}
                          {job.techStack.join(", ")}
                        </Text>
                      )}
                    </Text>
                    <View style={styles.bulletList}>
                      {job.achievements.map((achievement, i) => (
                        <View key={i} style={styles.bulletItem}>
                          <Text style={styles.bullet}>• </Text>
                          <Text style={styles.bulletText}>
                            {renderRichText(achievement, { fontSize: 10 })}
                          </Text>
                        </View>
                      ))}
                    </View>
                    {/* inline tech stack handled above */}
                  </View>
                ))}
              </View>
            )}

            {/* Education Section moved to left - removed here */}

            {/* Internships & Projects (compact combined) */}
            {(resumeData.internships.items.length > 0 ||
              resumeData.projects.items.length > 0) && (
              <View style={styles.section}>
                <View style={styles.sectionHeading}>
                  <Image src={"/people.png"} style={styles.icon} />
                  <Text style={styles.rightSectionTitle}>
                    INTERNSHIPS & PROJECTS
                  </Text>
                </View>
                {resumeData.internships.items.map((internship, index) => {
                  const firstAchievement = (internship.achievements || []).find(
                    (a) => a && a.trim().length > 0
                  );
                  return (
                    <View
                      key={`int-${index}`}
                      style={{ paddingLeft: 12, marginBottom: 4 }}
                    >
                      <Text style={styles.itemTitle}>
                        {internship.title}, {internship.company} —{" "}
                        {internship.location} ({internship.startDate}
                        {internship.endDate ? `–${internship.endDate}` : ""})
                      </Text>
                      {firstAchievement ? (
                        <Text style={{ fontSize: 10 }}>
                          {renderRichText(firstAchievement, { fontSize: 10 })}
                        </Text>
                      ) : null}
                    </View>
                  );
                })}
                {resumeData.projects.items.length > 0 && (
                  <View style={{ paddingLeft: 12 }}>
                    <Text style={styles.itemTitle}>
                      {resumeData.projects.items.map((p, i) => (
                        <Text key={`projname-${i}`}>
                          {i > 0 ? " • " : ""}
                          {p.url ? (
                            <Link
                              src={p.url}
                              style={{
                                textDecoration: "underline",
                                color: "#000000",
                              }}
                            >
                              {p.name}
                            </Link>
                          ) : (
                            p.name
                          )}
                        </Text>
                      ))}
                    </Text>
                    {portfolioDomain ? (
                      <Text
                        style={{
                          fontSize: 10,
                          color: "#6B7280",
                          fontStyle: "italic",
                        }}
                      >
                        (Details and live demos at {portfolioDomain})
                      </Text>
                    ) : null}
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDF;
