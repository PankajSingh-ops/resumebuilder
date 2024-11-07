"use client";
import React from "react";
import { Download, ChevronLeft } from "lucide-react";

interface CoverLetterPreviewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pdfUrl:any;
}

const CoverLetterPreview: React.FC<CoverLetterPreviewProps> = ({
  formData,
  onClose,
  pdfUrl,
}) => {
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
            <button
              onClick={formData}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="overflow-y-auto p-8 flex-1">
          <div className="cover-letter-preview bg-white max-w-2xl mx-auto">
            {pdfUrl && (
              <div className="pdf-preview mt-8">
                <iframe
                  src={pdfUrl}
                  className="w-full h-[500px] border border-gray-300 rounded-lg"
                  title="Cover Letter Preview"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterPreview;
