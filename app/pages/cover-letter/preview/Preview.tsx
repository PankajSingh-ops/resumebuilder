"use client"
import React from 'react';
import { Download, ChevronLeft } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
  hiringManager: string;
  companyName: string;
  letterDetails: string;
}

interface CoverLetterPreviewProps {
  formData: FormData;
  onClose: () => void;
}

const CoverLetterPreview: React.FC<CoverLetterPreviewProps> = ({ formData, onClose }) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = React.useState(false);
  const [error, setError] = React.useState<string>('');

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      const element = document.querySelector(".cover-letter-preview");
      if (!element) throw new Error("Cover letter preview element not found");

      const html2pdf = (await import("html2pdf.js")).default;
      
      await html2pdf().set({
        margin: [0.5, 0.5],
        filename: `${formData.firstName}_${formData.lastName}_Cover_Letter.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: true,
          letterRendering: true
        },
        jsPDF: { 
          unit: 'in', 
          format: 'letter', 
          orientation: 'portrait',
          compress: true
        }
      }).from(element).save();

      // Success toast
      const successToast = document.createElement("div");
      successToast.className = 
        "fixed bottom-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50";
      successToast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        <span>Cover letter downloaded successfully!</span>
      `;
      document.body.appendChild(successToast);
      setTimeout(() => successToast.remove(), 3000);
      onClose();
    } catch (err) {
      console.error("Error:", err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to download cover letter. Please try again.';
      
      const errorToast = document.createElement("div");
      errorToast.className = 
        "fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50";
      errorToast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
        <span>${errorMessage}</span>
      `;
      document.body.appendChild(errorToast);
      setTimeout(() => errorToast.remove(), 3000);
      setError(errorMessage);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-gray-50">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 flex items-center"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Editor
          </button>
          <div className="flex items-center space-x-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              <Download className="w-4 h-4 mr-2" />
              {isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="overflow-y-auto p-8 flex-1">
          <div className="cover-letter-preview bg-white max-w-2xl mx-auto">
            {/* Contact Information */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {formData.firstName} {formData.lastName}
              </h1>
              <div className="text-gray-600 space-y-1">
                <p>{formData.address}</p>
                <p>{formData.email}</p>
                <p>{formData.phone}</p>
              </div>
            </div>

            {/* Date */}
            <div className="mb-6">
              <p className="text-gray-600">
                {new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>

            {/* Company Details */}
            <div className="mb-6">
              <p className="font-semibold">{formData.hiringManager}</p>
              <p>{formData.companyName}</p>
            </div>

            {/* Letter Content */}
            <div className="prose max-w-none">
              {formData.letterDetails.split('\n').map((paragraph: string, index: number) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterPreview;