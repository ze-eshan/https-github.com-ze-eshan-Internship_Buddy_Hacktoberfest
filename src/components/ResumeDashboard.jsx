import React from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Star,
  Code,
  Database,
  Settings,
  Layout,
  BookOpen,
  Users,
  Globe,
  Rocket,
  Shapes,
  Brain,
  Target,
  Heart,
  Cloud,
  Monitor,
} from "lucide-react";

// Card Components with theme-primary styling
export const Card = ({ className = "", children }) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm border-theme-primary/20 ${className}`}
  >
    {children}
  </div>
);

export const HalfCard = ({ className = "", children }) => (
  <div
    className={`rounded-lg w-full lg:w-1/2 border bg-card text-card-foreground shadow-sm border-theme-primary/20 ${className}`}
  >
    {children}
  </div>
);

export const CardHeader = ({ className = "", children }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

export const CardContent = ({ className = "", children }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

export const CardTitle = ({ className = "", children }) => (
  <h3
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
  >
    {children}
  </h3>
);

export const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors
                    bg-theme-primary/10 hover:bg-theme-primary/20 text-theme-primary ${className}`}
  >
    {children}
  </span>
);

// Updated icon mappings with theme-primary colors
const skillCategoryIcons = {
  "Programming Languages": Code,
  Technical: Settings,
  Professional: Brain,
  "Digital Marketing": Target,
  "Content Marketing": BookOpen,
  "Analytics & Tools": Database,
  "Social Media Marketing": Globe,
  "Brand Management": Shapes,
  "Soft Skills": Heart,
  "Web Development": Layout,
  Databases: Database,
  "Cloud & DevOps": Cloud,
  "Operating Systems": Monitor,
  "Tools & Technologies": Settings,
};

const sectionIcons = {
  summary: BookOpen,
  skills: Rocket,
  projects: Layout,
  experience: Briefcase,
  education: GraduationCap,
  certifications: Award,
  extracurricular: Users,
};

const SectionIcon = ({ name, className }) => {
  const IconComponent = sectionIcons[name] || Star;
  return <IconComponent className={className} />;
};

const ResumeDashboard = ({ data }) => {
  // Helper function to safely render content
  const safeRender = (content, fallback = "") => {
    if (content === undefined || content === null) return fallback;
    if (Array.isArray(content) && content.length === 0) return fallback;
    return content;
  };

  const renderSkillBadges = (skills) => (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <Badge
          key={index}
          className="transition-all duration-300 hover:scale-105"
        >
          {skill}
        </Badge>
      ))}
    </div>
  );

  const renderSection = (title, content, icon) => (
    <Card className="mb-6 bg-card text-card-foreground shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex flex-row items-center space-x-2">
        <SectionIcon
          name={icon}
          className="w-6 h-6 text-theme-primary"
        />
        <CardTitle className="bg-gradient-to-r from-theme-primary to-theme-primary/80 bg-clip-text text-transparent">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );

  // If no data, show message
  if (!data) {
    return (
      <div className="min-h-screen bg-background p-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">No Data Provided</h2>
          <p className="text-muted-foreground">Please provide resume data to display.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-2 text-foreground">
      {/* Header Section */}
      <div className="w-full md:flex gap-6">
        <HalfCard className="mb-6 bg-card text-card-foreground shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <h1
                className="text-4xl font-bold mb-2 bg-gradient-to-r from-theme-primary to-theme-primary/80 
                            bg-clip-text text-transparent"
              >
                {safeRender(data.personalInfo?.name, "Name Not Provided")}
              </h1>
              <div className="flex flex-wrap justify-center gap-4 text-muted-foreground">
                {data.personalInfo?.email && (
                  <a
                    href={`mailto:${data.personalInfo.email}`}
                    className="flex items-center gap-1 hover:text-theme-primary transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{data.personalInfo.email}</span>
                  </a>
                )}
                {data.personalInfo?.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    <span>{data.personalInfo.phone}</span>
                  </span>
                )}
                {data.personalInfo?.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{data.personalInfo.location}</span>
                  </span>
                )}
                {data.personalInfo?.linkedin && (
                  <a
                    href={data.personalInfo.linkedin.startsWith('http') ? data.personalInfo.linkedin : `https://${data.personalInfo.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-theme-primary transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {data.personalInfo?.github && data.personalInfo.github !== "GitHub Link (Optional)" && (
                  <a
                    href={data.personalInfo.github.startsWith('http') ? data.personalInfo.github : `https://github.com/${data.personalInfo.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-theme-primary transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
                {data.personalInfo?.portfolio && (
                  <a
                    href={
                      data.personalInfo.portfolio.startsWith("http")
                        ? data.personalInfo.portfolio
                        : `https://${data.personalInfo.portfolio}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-theme-primary transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Portfolio</span>
                  </a>
                )}
              </div>
            </div>
          </CardContent>
        </HalfCard>

        {/* Summary Section */}
        <HalfCard className="bg-card text-card-foreground shadow-lg">
          {renderSection(
            "Professional Summary",
            <p className="text-muted-foreground leading-relaxed">
              {safeRender(data.summary, "No summary provided")}
            </p>,
            "summary"
          )}
        </HalfCard>
      </div>

      {/* Skills Section */}
      {data.skills?.categories && data.skills.categories.length > 0 &&
        renderSection(
          "Skills",
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.skills.categories.map(({ category, skills }, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold text-foreground capitalize flex items-center gap-2">
                  {skillCategoryIcons[category] &&
                    React.createElement(skillCategoryIcons[category], {
                      className: "w-4 h-4 text-theme-primary",
                    })}
                  {category}
                </h3>
                {renderSkillBadges(skills)}
              </div>
            ))}
          </div>,
          "skills"
        )}

      {/* Projects Section */}
      {data.projects && data.projects.length > 0 &&
        renderSection(
          "Projects",
          <div className="space-y-6">
            {data.projects.map((project, index) => (
              <div
                key={index}
                className="border-b border-theme-primary/20 last:border-b-0 pb-4 last:pb-0"
              >
                <h3
                  className="font-semibold text-lg bg-gradient-to-r from-theme-primary to-theme-primary/80 
                           bg-clip-text text-transparent mb-2"
                >
                  {project.title}
                </h3>
                {project.details && project.details.length > 0 && (
                  <ul className="space-y-2 text-muted-foreground">
                    {project.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2">
                        <Star className="w-4 h-4 mt-1 flex-shrink-0 text-theme-primary" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-foreground mb-2">Technologies Used:</h4>
                    {renderSkillBadges(project.technologies)}
                  </div>
                )}
              </div>
            ))}
          </div>,
          "projects"
        )}

      {/* Experience Section */}
      {data.experience && data.experience.length > 0 &&
        renderSection(
          "Experience",
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-6 last:mb-0 pb-6 last:pb-0 border-b border-theme-primary/20 last:border-b-0">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                  <div>
                    <h3
                      className="font-semibold text-lg bg-gradient-to-r from-theme-primary to-theme-primary/80 
                               bg-clip-text text-transparent"
                    >
                      {exp.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {exp.company} {exp.location && `- ${exp.location}`}
                    </p>
                  </div>
                  <span className="text-muted-foreground bg-theme-primary/10 px-3 py-1 rounded-full text-sm">
                    {exp.period}
                  </span>
                </div>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="space-y-2 text-muted-foreground">
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="flex items-start gap-2">
                        <Star className="w-4 h-4 mt-1 flex-shrink-0 text-theme-primary" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>,
          "experience"
        )}

      {/* Education Section */}
      {data.education && data.education.length > 0 &&
        renderSection(
          "Education",
          <div className="space-y-6">
            {data.education.map((edu, index) => (
              <div key={index} className="mb-6 last:mb-0 pb-6 last:pb-0 border-b border-theme-primary/20 last:border-b-0">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                  <div>
                    <h3
                      className="font-semibold text-lg bg-gradient-to-r from-theme-primary to-theme-primary/80 
                               bg-clip-text text-transparent"
                    >
                      {edu.degree}
                    </h3>
                    <p className="text-muted-foreground">
                      {edu.school} {edu.location && `- ${edu.location}`}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-muted-foreground bg-theme-primary/10 px-3 py-1 rounded-full text-sm">
                      {edu.graduation}
                    </span>
                    {edu.gpa && (
                      <span className="text-muted-foreground bg-theme-primary/10 px-3 py-1 rounded-full text-sm">
                        GPA: {edu.gpa}{!String(edu.gpa).includes('/') ? '/4.00' : ''}
                      </span>
                    )}
                  </div>
                </div>
                {edu.courses && edu.courses.length > 0 && (
                  <div className="mt-4">
                    <p className="font-medium text-foreground mb-2">
                      Relevant Coursework:
                    </p>
                    {renderSkillBadges(edu.courses)}
                  </div>
                )}
              </div>
            ))}
          </div>,
          "education"
        )}

      {/* Additional Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 &&
          renderSection(
            "Certifications",
            <ul className="space-y-2">
              {data.certifications.map((cert, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-muted-foreground"
                >
                  <Award className="w-4 h-4 mt-1 flex-shrink-0 text-theme-primary" />
                  <span>{typeof cert === 'string' ? cert : cert.name}</span>
                </li>
              ))}
            </ul>,
            "certifications"
          )}

        {/* Extracurricular Activities */}
        {data.extracurricular && data.extracurricular.length > 0 &&
          renderSection(
            "Extracurricular Activities",
            <ul className="space-y-2">
              {data.extracurricular.map((activity, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-muted-foreground"
                >
                  <Users className="w-4 h-4 mt-1 flex-shrink-0 text-theme-primary" />
                  <span>{activity}</span>
                </li>
              ))}
            </ul>,
            "extracurricular"
          )}
      </div>
    </div>
  );
};

export default ResumeDashboard;