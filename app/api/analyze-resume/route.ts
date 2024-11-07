import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import mammoth from "mammoth";
import { NextResponse } from "next/server";
import PDFParser from "pdf2json";

interface ResumeAnalysis {
  points: number;
  positive: string[];
  negative: string[];
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');


export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('resume') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const text = await extractTextFromFile(file);
    console.log(text,"text");



    if (!text) {
        return NextResponse.json(
          { error: 'Failed to extract text from file' },
          { status: 400 }
        );
      }

      const analyzeData = await processWithGemini(text);
    console.log(analyzeData,"resume");

    return NextResponse.json({ 
      data:analyzeData
    }, { status: 200 });

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function processWithGemini(text: string): Promise<ResumeAnalysis> {
      try {
        const prompt = `
          Act as an experienced Technical HR Manager and Senior Resume Reviewer with 15+ years of experience in talent acquisition. 
          Analyze the following resume thoroughly and provide a detailed, professional evaluation.
          
          Evaluate the resume considering these key areas:
    
          1. FORMAT AND PRESENTATION
          - Professional layout and design
          - Consistent formatting (fonts, spacing, alignment)
          - Section organization and flow
          - Visual hierarchy and readability
          - Proper use of bullets and whitespace
    
          2. CONTENT QUALITY
          - Professional summary/objective effectiveness
          - Achievement quantification and metrics
          - Action verb usage and impact
          - Grammar, spelling, and punctuation
          - Industry-specific terminology usage
    
          3. SKILLS AND EXPERTISE
          - Technical skills relevance
          - Soft skills representation
          - Skill level indication
          - Current industry requirements alignment
          - Certification and training details
    
          4. EXPERIENCE AND ACHIEVEMENTS
          - Role responsibility clarity
          - Career progression demonstration
          - Achievement measurement and impact
          - Leadership and initiative examples
          - Project or team contributions
    
          REQUIREMENTS:
          1. Assign a total score out of 100 based on overall resume quality
          2. List specific positive points (strengths, achievements, well-presented areas)
          3. List specific negative points (areas needing improvement, missing elements, mistakes)
          4. Each feedback point should be clear, specific, and actionable
          5. Include both technical and non-technical aspects in the evaluation
          6. Consider ATS compatibility in the assessment
    
          Resume Text for Analysis:
          ${text}
    
          Respond ONLY with a valid JSON object in this exact format, with no additional text or formatting:
          {
            "points": number (0-100),
            "positive": [
              "specific strength point 1",
              "specific strength point 2",
              ...
            ],
            "negative": [
              "specific improvement point 1",
              "specific improvement point 2",
              ...
            ]
          }
    
          Each point in the positive and negative arrays should be:
          - Specific and actionable
          - No longer than 100 characters
          - Clear and professionally worded
          - Focused on a single aspect
        `;
    
        const model = genAI.getGenerativeModel({
          model: 'gemini-pro',
          safetySettings: [
            {
              category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
              threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_HARASSMENT,
              threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
              threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
              threshold: HarmBlockThreshold.BLOCK_NONE,
            },
          ],
        });
    
        // Generate the analysis
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let responseText = response.text();
    
        // Clean and parse the response
        try {
          // Remove any markdown formatting
          responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
          responseText = responseText.trim();
          
    
          // Parse the JSON response
          const analysisData = JSON.parse(responseText);
    
          // Validate the response structure
          validateAnalysisData(analysisData);
    
          // Return cleaned and validated data
          return {
            points: Math.round(analysisData.points),
            positive: cleanArrayData(analysisData.positive),
            negative: cleanArrayData(analysisData.negative)
          };
    
        } catch (parseError) {
          console.error('Error parsing Gemini response:', parseError);
          console.error('Raw response:', responseText);
          const fallbackParsedResponse = tryParseFallbackJSON(responseText);

      if (fallbackParsedResponse) {
        validateAnalysisData(fallbackParsedResponse);
        return fallbackParsedResponse;
      } else {
        throw new Error('Failed to parse resume analysis');
      }
        }
    
      } catch (error) {
        console.error('Error in resume analysis:', error);
        throw new Error('Failed to complete resume analysis');
      }
    }
    
    // Validation helper function
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function validateAnalysisData(data: any): void {
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid response format: not an object');
      }
    
      if (typeof data.points !== 'number' || data.points < 0 || data.points > 100) {
        throw new Error('Invalid points value: must be a number between 0 and 100');
      }
    
      if (!Array.isArray(data.positive) || !Array.isArray(data.negative)) {
        throw new Error('Invalid response format: positive and negative must be arrays');
      }
    
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (data.positive.some((item: any) => typeof item !== 'string')) {
        throw new Error('Invalid positive points: all items must be strings');
      }
    
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (data.negative.some((item: any) => typeof item !== 'string')) {
        throw new Error('Invalid negative points: all items must be strings');
      }
    }
    
    // Clean array data helper function
    function cleanArrayData(arr: string[]): string[] {
      return arr
        .map(item => item.trim())
        .filter(item => item.length > 0)
        .map(item => {
          // Ensure each point starts with a capital letter and ends with proper punctuation
          let cleaned = item.charAt(0).toUpperCase() + item.slice(1);
          if (!cleaned.match(/[.!?]$/)) {
            cleaned += '.';
          }
          return cleaned;
        });
    }

    function tryParseFallbackJSON(responseText: string): ResumeAnalysis | null {
      try {
        // Attempt to fix common JSON issues
        responseText = responseText
          .replace(/,(\s*])/, ']') // Remove trailing commas
          .replace(/,\s*}/, '}');  // Remove trailing commas in objects
    
        return JSON.parse(responseText) as ResumeAnalysis;
      } catch {
        return null;
      }
    }