import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import mammoth from "mammoth";
import { NextResponse } from "next/server";
import PDFParser from "pdf2json";

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
    async function processWithGemini(text: string): Promise<{
        points: number;
        positive: string[];
        negative: string[];
      }> {
        try {
          const prompt = `
            Analyze the following resume as an HR professional or hiring manager. 
            Evaluate the content thoroughly, considering:
      
            1. Overall presentation and formatting
            2. Clarity and professionalism of writing
            3. Relevance and strength of experience
            4. Education and qualifications
            5. Technical skills and competencies
            6. Achievements and impact
            7. Grammar, spelling, and punctuation
            8. Consistency in formatting and style
            9. Use of action verbs and quantifiable results
            10. Completeness of information
      
            Provide a comprehensive evaluation that includes:
            1. A numerical score out of 100 based on overall quality
            2. Key positive points (strengths, impressive achievements, well-presented areas)
            3. Areas for improvement (weaknesses, errors, missing information, formatting issues)
      
            Each point in the feedback should be concise and specific, not exceeding two lines.
            
            Resume Text:
            ${text}
      
            Respond ONLY with a valid JSON object in this exact format:
            {
              "points": number (0-100),
              "positive": string[] (array of positive points),
              "negative": string[] (array of areas for improvement)
            }
          `;
      
          const model = genAI.getGenerativeModel({ model: 'gemini-pro',safetySettings: [
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
          ], });
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const responseText = response.text();
          
          // Extract JSON from the response
          let jsonStr = responseText;
          
          // Remove any markdown code block indicators
          jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?/g, '');
          
          // Trim any whitespace
          jsonStr = jsonStr.trim();
          
          // Parse and validate the JSON
          const analysisData = JSON.parse(jsonStr);
          
          // Ensure the response matches the expected format
          if (
            typeof analysisData.points !== 'number' ||
            !Array.isArray(analysisData.positive) ||
            !Array.isArray(analysisData.negative) ||
            analysisData.points < 0 ||
            analysisData.points > 100
          ) {
            throw new Error('Invalid response format from AI');
          }
      
          return {
            points: Math.round(analysisData.points), // Round to nearest integer
            positive: analysisData.positive,
            negative: analysisData.negative
          };
      
        } catch (error) {
          console.error('Error processing with Gemini:', error);
          throw new Error('Failed to analyze resume content');
        }
      }