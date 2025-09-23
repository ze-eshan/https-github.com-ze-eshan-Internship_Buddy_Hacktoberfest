import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Initialize the API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const internshipSchema = {
  description: "Internship description data structure",
  type: SchemaType.OBJECT,
  properties: {
    jobTitle: {
      type: SchemaType.STRING,
      description: "The title of the internship position"
    },
    company: {
      type: SchemaType.OBJECT,
      properties: {
        name: { type: SchemaType.STRING, description: "Name of the company or organization" },
        overview: { type: SchemaType.STRING, description: "Brief overview of the company", nullable: true },
        industry: { type: SchemaType.STRING, description: "Industry sector", nullable: true }
      },
      required: ["name"]
    },
    locationAndType: {
      type: SchemaType.OBJECT,
      properties: {
        location: { type: SchemaType.STRING, description: "City, state, country or 'Remote'" },
        workType: { type: SchemaType.STRING, description: "Type of work (e.g., 'On-site', 'Remote', 'Hybrid')" },
        timeZone: { type: SchemaType.STRING, description: "Relevant time zone for remote positions", nullable: true },
        tools: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING },
          description: "Collaboration tools mentioned (e.g., 'Slack', 'Zoom')",
          nullable: true
        }
      },
      required: ["location", "workType"]
    },
    duration: {
      type: SchemaType.OBJECT,
      properties: {
        length: { type: SchemaType.STRING, description: "Duration of the internship (e.g., '3 months', 'Summer program')" },
        startDate: { type: SchemaType.STRING, description: "Start date (e.g., 'June 2026')" },
        endDate: { type: SchemaType.STRING, description: "End date", nullable: true },
        hoursPerWeek: { type: SchemaType.STRING, description: "Weekly hours (e.g., '40 hours full-time')" }
      },
      required: ["length", "startDate", "hoursPerWeek"]
    },
    responsibilities: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "List of job responsibilities and daily tasks"
    },
    qualifications: {
      type: SchemaType.OBJECT,
      properties: {
        education: { type: SchemaType.STRING, description: "Required education level (e.g., 'Current undergraduate in Computer Science')", nullable: true },
        experience: { type: SchemaType.STRING, description: "Required prior experience", nullable: true },
        requiredSkills: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING },
          description: "List of must-have skills and technologies"
        },
        preferredSkills: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING },
          description: "List of preferred skills",
          nullable: true
        },
        softSkills: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING },
          description: "List of soft skills (e.g., 'Team player')",
          nullable: true
        }
      },
      required: ["requiredSkills"]
    },
    eligibility: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "Eligibility criteria (e.g., 'Must be a current student', 'Eligible to work in the US')",
      nullable: true
    },
    compensation: {
      type: SchemaType.OBJECT,
      properties: {
        stipend: { type: SchemaType.STRING, description: "Compensation details (e.g., '$20/hour' or 'Unpaid with academic credit')", nullable: true },
        benefits: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING },
          description: "List of benefits (e.g., 'Mentorship', 'Free lunches')",
          nullable: true
        }
      }
    },
    application: {
      type: SchemaType.OBJECT,
      properties: {
        instructions: { type: SchemaType.STRING, description: "How to apply (e.g., 'Submit resume via portal')" },
        deadline: { type: SchemaType.STRING, description: "Application deadline", nullable: true },
        requiredDocuments: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING },
          description: "List of required documents (e.g., 'Resume', 'Cover letter')",
          nullable: true
        },
        contact: { type: SchemaType.STRING, description: "Contact information", nullable: true }
      },
      required: ["instructions"]
    }
  },
  required: ["jobTitle", "company", "locationAndType", "duration", "responsibilities", "qualifications", "application"]
};

// Configure the model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: internshipSchema,
  },
});

// Example usage
const generateDigitalInternship = async (internshipText) => {
  try {
    const result = await model.generateContent(
      `Parse the following internship description into a structured format: ${internshipText}`
    );
    return result.response.text()
  } catch (error) {
    console.error("Error parsing internship description:", error);
    throw error;
  }
};

export { generateDigitalInternship, internshipSchema };