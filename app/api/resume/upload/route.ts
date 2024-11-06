import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import PDFParser from 'pdf2json';
import mammoth from 'mammoth';
import { EducationEntry, Experience, ResumeData } from '@/app/common/types';

type EducationType = 'highSchool' | 'intermediate' | 'undergraduate' | 'graduate';
type ExperienceType = 'work' | 'internship' | 'project' | 'volunteer';
type SkillProficiency = 'beginner' | 'intermediate' | 'advanced' | 'expert';
type LanguageProficiency = 'basic' | 'intermediate' | 'advanced' | 'fluent';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');


export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('resume') as File;
    console.log(file,"file name");
    
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Extract text based on file type
    const text = await extractTextFromFile(file);
    console.log(text,"text");
    
    
    if (!text) {
      return NextResponse.json(
        { error: 'Failed to extract text from file' },
        { status: 400 }
      );
    }

    // Process the text with Gemini AI
    const resumeData = await processWithGemini(text);
    console.log(resumeData,"resume");
    

    return NextResponse.json({ data: resumeData }, { status: 200 });
  } catch (error) {
    console.error('Error processing resume:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process resume' },
      { status: 500 }
    );
  }
}

async function extractTextFromFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const fileType = file.type;

  if (fileType === 'application/pdf') {
    return extractFromPDF(buffer);
  } else if (
    fileType === 'application/msword' ||
    fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return extractFromDOC(buffer);
  }

  throw new Error('Unsupported file type');
}

async function extractFromPDF(buffer: ArrayBuffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser(null, true);

    // Handle errors
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pdfParser.on('pdfParser_dataError', (errData: any) => {
      reject(new Error(errData.parserError));
    });

    // Handle successful parsing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
      try {
        // Convert PDF data to text
        let text = '';
        for (let i = 0; i < pdfData.Pages.length; i++) {
          const page = pdfData.Pages[i];
          for (let j = 0; j < page.Texts.length; j++) {
            const textItem = page.Texts[j];
            text += decodeURIComponent(textItem.R[0].T) + ' ';
          }
          text += '\n';
        }
        
        // Clean up the text
        text = text
          .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
          .replace(/\n\s*\n/g, '\n')  // Replace multiple newlines with single newline
          .trim();

        resolve(text);
      } catch (error) {
        console.log(error);
        
        reject(new Error('Failed to process PDF content'));
      }
    });

    // Parse the PDF
    try {
      pdfParser.parseBuffer(Buffer.from(buffer));
    } catch (error) {
        console.log(error);
        
      reject(new Error('Failed to parse PDF buffer'));
    }
  });
}

async function extractFromDOC(buffer: ArrayBuffer): Promise<string> {
    try {
      // Convert ArrayBuffer to Buffer if needed
      const nodeBuffer = Buffer.from(buffer);
      
      const result = await mammoth.extractRawText({
        buffer: nodeBuffer  // Use buffer instead of arrayBuffer
      });
  
      if (!result || !result.value) {
        throw new Error('No text content extracted from document');
      }
  
      // Clean up the extracted text
      const cleanedText = result.value
        .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
        .replace(/\n\s*\n/g, '\n')  // Replace multiple newlines with single newline
        .trim();
  
      if (result.messages && result.messages.length > 0) {
        console.warn('Mammoth extraction warnings:', result.messages);
      }
  
      return cleanedText;
    } catch (error: unknown) {
      console.error('Error extracting DOC text:', error);
      
      // Type guard for error objects
      if (error && typeof error === 'object') {
        // Check for TypeError
        if (error instanceof TypeError) {
          throw new Error('Invalid document format or corrupted file');
        }
        
        // Check for error message property
        if ('message' in error && typeof error.message === 'string') {
          if (error.message.includes('Could not find file')) {
            throw new Error('Invalid file buffer provided to document parser');
          }
          return Promise.reject('Failed to extract text from document: ' + error.message);
        }
      }
      
      // Generic error case
      throw new Error('An unexpected error occurred while processing the document');
    }
  }

  
  // Helper function to ensure date format is YYYY-MM-DD
  function formatDate(dateStr: string): string {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return '';
      return date.toISOString().split('T')[0];
    } catch {
      return '';
    }
  }
  
  async function processWithGemini(text: string): Promise<ResumeData> {
    try {
      const prompt = `
        Analyze the following resume text and extract information in a structured format. 
        Respond ONLY with a valid JSON object, no markdown formatting or explanation.
        
        Important Type Mappings:
        - For education type, map to one of: 'highSchool', 'intermediate', 'undergraduate', 'graduate'
          (e.g., if you see 'secondary', map it to 'intermediate')
        - For experience type, map to one of: 'work', 'internship', 'project', 'volunteer'
        - For skill type, map to either: 'technical' or 'soft'
        - For language proficiency, map to one of: 'basic', 'intermediate', 'advanced', 'fluent'
        - For skill proficiency, map to one of: 'beginner', 'intermediate', 'advanced', 'expert'

        The JSON should include these sections with proper IDs and types:

        1. personal: firstName, lastName, dateOfBirth, phone, email, linkedin, github, city, state, summary, profilePic
        
        2. experiences: Array of work experience, each with:
           - id: same as type (e.g., "work", "internship", etc.)
           - type: must be one of ['work', 'internship', 'project', 'volunteer']
           - other fields: title, organization, location, startDate, endDate, current, description, achievements[], technologies[]
        
        3. education: Array of education entries, each with:
           - id: same as type (e.g., "undergraduate", "graduate", etc.)
           - type: must be one of ['highSchool', 'intermediate', 'undergraduate', 'graduate']
           - other fields: schoolName, location, startDate, endDate, field, degree, gpa, description, achievements[], courses[]
        
        4. skills: Object containing:
           - technicalSkills[]: each with id (same as type), name, type ('technical'), proficiency
           - softSkills[]: each with id (same as type), name, type ('soft'), proficiency
           - certifications[]: name, organization, issueDate, expirationDate, doesNotExpire
           - languages[]: name, proficiency (must be 'basic', 'intermediate', 'advanced', or 'fluent')
           - hobbies[]
        
        5. additional: Object containing publications[], patents[], memberships[], awards[]

        Resume Text:
        ${text}

        Remember: Return ONLY the JSON object with no additional text, formatting, or explanation.
        Ensure all type values strictly match the specified options.
      `;

      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const responseText = response.text();
      
      // Extract JSON from the response
      let jsonStr = responseText;
      
      // Remove any markdown code block indicators
      jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      
      // Trim any whitespace
      jsonStr = jsonStr.trim();
      
      // Try to parse the JSON
      try {
        const formattedData = JSON.parse(jsonStr);
        return validateAndCleanData(formattedData);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        console.error('Raw JSON string:', jsonStr);
        throw new Error('Invalid JSON response from AI');
      }
    } catch (error) {
      console.error('Error processing with Gemini:', error);
      throw new Error('Failed to process resume content');
    }
}

// Helper function to validate and map education type
function validateEducationType(type: string): EducationType {
  const validTypes: EducationType[] = ['highSchool', 'intermediate', 'undergraduate', 'graduate'];
  const typeMapping: Record<string, EducationType> = {
      'secondary': 'intermediate',
      'high school': 'highSchool',
      'bachelors': 'undergraduate',
      'masters': 'graduate',
      'phd': 'graduate',
      'doctorate': 'graduate'
  };

  const normalizedType = type.toLowerCase();
  const mappedType = typeMapping[normalizedType] || normalizedType as EducationType;
  
  return validTypes.includes(mappedType) ? mappedType : 'undergraduate';
}

// Helper function to validate and map experience type
function validateExperienceType(type: string): ExperienceType {
  const validTypes: ExperienceType[] = ['work', 'internship', 'project', 'volunteer'];
  const typeMapping: Record<string, ExperienceType> = {
      'job': 'work',
      'employment': 'work',
      'intern': 'internship',
      'volunteering': 'volunteer'
  };

  const normalizedType = type.toLowerCase();
  const mappedType = typeMapping[normalizedType] || normalizedType as ExperienceType;
  
  return validTypes.includes(mappedType) ? mappedType : 'work';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateAndCleanData(data: any): ResumeData {
  try {
      const cleaned: ResumeData = {
          personal: {
              firstName: String(data.personal?.firstName || ''),
              lastName: String(data.personal?.lastName || ''),
              dateOfBirth: formatDate(data.personal?.dateOfBirth || ''),
              phone: String(data.personal?.phone || ''),
              email: String(data.personal?.email || ''),
              linkedin: String(data.personal?.linkedin || ''),
              github: String(data.personal?.github || ''),
              city: String(data.personal?.city || ''),
              state: String(data.personal?.state || ''),
              summary: String(data.personal?.summary || ''),
              profileImage: '',
              jobTitle:String(data.personal?.jobTitle || ''),

          },
          experiences: (data.experiences || []).map((exp: Experience) => {
              const validatedType = validateExperienceType(exp.type);
              return {
                  id: validatedType,
                  type: validatedType,
                  title: String(exp.title || ''),
                  organization: String(exp.organization || ''),
                  location: String(exp.location || ''),
                  startDate: formatDate(exp.startDate || ''),
                  endDate: formatDate(exp.endDate || ''),
                  current: Boolean(exp.current),
                  description: String(exp.description || ''),
                  achievements: Array.isArray(exp.achievements) ? exp.achievements.map(String) : [],
                  technologies: Array.isArray(exp.technologies) ? exp.technologies.map(String) : [],
              };
          }),
          education: (data.education || []).map((edu: EducationEntry) => {
              const validatedType = validateEducationType(edu.type);
              return {
                  id: validatedType,
                  type: validatedType,
                  schoolName: String(edu.schoolName || ''),
                  location: String(edu.location || ''),
                  startDate: formatDate(edu.startDate || ''),
                  endDate: formatDate(edu.endDate || ''),
                  field: String(edu.field || ''),
                  degree: String(edu.degree || ''),
                  gpa: String(edu.gpa || ''),
                  description: String(edu.description || ''),
                  achievements: Array.isArray(edu.achievements) ? edu.achievements.map(String) : [],
                  courses: Array.isArray(edu.courses) ? edu.courses.map(String) : []
              };
          }),
          skills: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              technicalSkills: (data.skills?.technicalSkills || []).map((skill: any) => ({
                  id: 'technical',
                  name: String(skill.name || ''),
                  type: 'technical' as const,
                  proficiency: validateSkillProficiency(skill.proficiency)
              })),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              softSkills: (data.skills?.softSkills || []).map((skill: any) => ({
                  id: 'soft',
                  name: String(skill.name || ''),
                  type: 'soft' as const,
                  proficiency: validateSkillProficiency(skill.proficiency)
              })),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              certifications: (data.skills?.certifications || []).map((cert: any) => ({
                  id: String(cert.id || Date.now()),
                  name: String(cert.name || ''),
                  organization: String(cert.organization || ''),
                  issueDate: formatDate(cert.issueDate || ''),
                  expirationDate: cert.doesNotExpire ? undefined : formatDate(cert.expirationDate || ''),
                  doesNotExpire: Boolean(cert.doesNotExpire)
              })),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              languages: (data.skills?.languages || []).map((lang: any) => ({
                  id: String(lang.id || Date.now()),
                  name: String(lang.name || ''),
                  proficiency: validateLanguageProficiency(lang.proficiency)
              })),
              hobbies: Array.isArray(data.skills?.hobbies) ? data.skills.hobbies.map(String) : []
          },
          additional: {
              publications: Array.isArray(data.additional?.publications) 
                  ? data.additional.publications.map(String) 
                  : [],
              patents: Array.isArray(data.additional?.patents) 
                  ? data.additional.patents.map(String) 
                  : [],
              memberships: Array.isArray(data.additional?.memberships) 
                  ? data.additional.memberships.map(String) 
                  : [],
              awards: Array.isArray(data.additional?.awards) 
                  ? data.additional.awards.map(String) 
                  : []
          }
      };

      return cleaned;
  } catch (error) {
      console.error('Error in data validation:', error);
      throw new Error('Failed to validate and clean data');
  }
}

function validateSkillProficiency(proficiency: string): SkillProficiency {
  const validProficiencies: SkillProficiency[] = ['beginner', 'intermediate', 'advanced', 'expert'];
  const normalizedProficiency = proficiency?.toLowerCase() || '';
  
  return validProficiencies.includes(normalizedProficiency as SkillProficiency)
      ? normalizedProficiency as SkillProficiency
      : 'intermediate';
}

function validateLanguageProficiency(proficiency: string): LanguageProficiency {
  const validProficiencies: LanguageProficiency[] = ['basic', 'intermediate', 'advanced', 'fluent'];
  const normalizedProficiency = proficiency?.toLowerCase() || '';
  
  return validProficiencies.includes(normalizedProficiency as LanguageProficiency)
      ? normalizedProficiency as LanguageProficiency
      : 'basic';
}
