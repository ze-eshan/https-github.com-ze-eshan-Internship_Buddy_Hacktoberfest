import { GoogleGenAI, Type } from "@google/genai";

const resumeSchema = {
  description: "Structured resume data with comprehensive professional information extraction",
  type: Type.OBJECT,
  properties: {
    resume_data: {
      type: Type.OBJECT,
      description: "Complete structured resume information",
      properties: {
        personalInfo: {
          type: Type.OBJECT,
          description: "Personal contact and profile information",
          properties: {
            name: { 
              type: Type.STRING, 
              description: "Full name of the person" 
            },
            email: { 
              type: Type.STRING, 
              description: "Email address", 
              nullable: true 
            },
            phone: { 
              type: Type.STRING, 
              description: "Contact number", 
              nullable: true 
            },
            linkedin: { 
              type: Type.STRING, 
              description: "LinkedIn profile URL", 
              nullable: true 
            },
            github: { 
              type: Type.STRING, 
              description: "GitHub profile URL", 
              nullable: true 
            },
            location: { 
              type: Type.STRING, 
              description: "Current location", 
              nullable: true 
            },
            portfolio: { 
              type: Type.STRING, 
              description: "Portfolio website URL", 
              nullable: true 
            }
          },
          required: ["name"]
        },
        summary: {
          type: Type.STRING,
          description: "Professional summary or objective statement"
        },
        education: {
          type: Type.ARRAY,
          description: "Educational background and academic achievements",
          items: {
            type: Type.OBJECT,
            properties: {
              degree: { 
                type: Type.STRING, 
                description: "Name of the degree" 
              },
              school: { 
                type: Type.STRING, 
                description: "Name of the institution" 
              },
              location: { 
                type: Type.STRING, 
                description: "Location of the institution", 
                nullable: true 
              },
              graduation: { 
                type: Type.STRING, 
                description: "Graduation date" 
              },
              gpa: { 
                type: Type.NUMBER, 
                description: "Grade Point Average", 
                nullable: true 
              },
              courses: {
                type: Type.ARRAY,
                description: "List of relevant courses",
                items: { type: Type.STRING },
                nullable: true
              }
            },
            required: ["degree", "school", "graduation"]
          }
        },
        skills: {
          type: Type.OBJECT,
          description: "Professional skills categorized by domain",
          properties: {
            categories: {
              type: Type.ARRAY,
              description: "Grouped skill categories",
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { 
                    type: Type.STRING, 
                    description: "Skill category name" 
                  },
                  skills: {
                    type: Type.ARRAY,
                    description: "List of skills in this category",
                    items: { type: Type.STRING }
                  }
                },
                required: ["category", "skills"]
              }
            }
          },
          required: ["categories"]
        },
        projects: {
          type: Type.ARRAY,
          description: "Professional projects and portfolio work",
          items: {
            type: Type.OBJECT,
            properties: {
              title: { 
                type: Type.STRING, 
                description: "Project title" 
              },
              details: {
                type: Type.ARRAY,
                description: "Project details and achievements",
                items: { type: Type.STRING }
              },
              technologies: {
                type: Type.ARRAY,
                description: "Technologies used",
                items: { type: Type.STRING },
                nullable: true
              }
            },
            required: ["title", "details"]
          },
          nullable: true
        },
        experience: {
          type: Type.ARRAY,
          description: "Professional work experience and achievements",
          items: {
            type: Type.OBJECT,
            properties: {
              title: { 
                type: Type.STRING, 
                description: "Job title" 
              },
              company: { 
                type: Type.STRING, 
                description: "Company name" 
              },
              location: { 
                type: Type.STRING, 
                description: "Job location", 
                nullable: true 
              },
              period: { 
                type: Type.STRING, 
                description: "Employment period" 
              },
              achievements: {
                type: Type.ARRAY,
                description: "Key achievements and responsibilities",
                items: { type: Type.STRING }
              }
            },
            required: ["title", "company", "period", "achievements"]
          },
          nullable: true
        },
        certifications: {
          type: Type.ARRAY,
          description: "Professional certifications and credentials",
          items: {
            type: Type.STRING,
            description: "Professional certification name and details"
          },
          nullable: true
        },
        extracurricular: {
          type: Type.ARRAY,
          description: "Extracurricular activities and volunteer work",
          items: {
            type: Type.STRING,
            description: "Extracurricular activity or volunteer experience"
          },
          nullable: true
        }
      },
      required: ["personalInfo", "summary", "education", "skills"]
    }
  },
  required: ["resume_data"]
};

// Initialize the API
const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY
});

// Configure the model
const generateDigitalResume = async (resumeText) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Parse the following resume into a structured format: ${resumeText}`,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: resumeSchema,
      },
    });
    
    // Handle the response properly - it might be a stream
    let responseText = '';
    
    // If response.text is a function that returns a stream
    if (typeof response.text === 'function') {
      const textStream = await response.text();
      for await (const chunk of textStream.stream) {
        responseText += chunk;
      }
    } else {
      // If it's a direct string
      responseText = await response.text;
    }
    
    // Clean the response text
    responseText = responseText.trim();
    
    // Remove any markdown code block markers
    responseText = responseText.replace(/^```json\s*\n?/, '').replace(/\n?```$/, '');
    
    console.log('Raw response:', responseText);
    
    // Parse the cleaned JSON
    const parsedData = JSON.parse(responseText);
    
    return parsedData;
    
  } catch (error) {
    console.error("Error parsing resume:", error);
    console.error("Response that failed to parse:", responseText);
    throw error;
  }
};

export { generateDigitalResume, resumeSchema };