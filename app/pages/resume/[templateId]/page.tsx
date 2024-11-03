'use client'
import React, { useState, useCallback, useEffect } from "react";
import { FileUp, FilePlus, Upload, Loader2, ChevronRight } from "lucide-react";
import ResumeBuilder from "../editor/[templateId]/page";

const IntegratedResumePage = () => {
  const [showBuilder, setShowBuilder] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialFormData, setInitialFormData] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const validateFile = (file:File) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload only PDF or DOC files");
      return false;
    }

    if (file.size > maxSize) {
      setError("File size should be less than 10MB");
      return false;
    }

    return true;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileUpload = async (file:any) => {
    if (!validateFile(file)) return;

    setError("");
    setSelectedFile(file);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("/api/resume/upload", {
        method: "POST",
        body: formData,
      });

      const { data, error } = await response.json();

      if (error) {
        setError(error);
        return;
      }

      setInitialFormData(data);
      setShowBuilder(true);
    } catch (error) {
      console.log(error);
      
      setError("Failed to process resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragOver = useCallback((e:any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragLeave = useCallback((e:any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDrop = useCallback((e:any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (event:any) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  if (!isMounted) {
    return null;
  }

  if (showBuilder) {
    return <ResumeBuilder initialData={initialFormData} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Resume Builder</h1>
          <p className="text-lg text-gray-600">Create or upload your professional resume in minutes</p>
        </div>

        {!showUpload ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
              onClick={() => {
                setInitialFormData(null);
                setShowBuilder(true);
              }}
            >
              <div className="p-8 md:p-12">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="bg-blue-50 p-4 rounded-full">
                    <FilePlus className="w-16 h-16 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Create New Resume</h2>
                  <p className="text-gray-600">
                    Start fresh with our intuitive resume builder and create a professional resume in minutes
                  </p>
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-sm hover:shadow-md">
                    Get Started
                  </button>
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
              onClick={() => setShowUpload(true)}
            >
              <div className="p-8 md:p-12">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="bg-green-50 p-4 rounded-full">
                    <FileUp className="w-16 h-16 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Upload Existing Resume</h2>
                  <p className="text-gray-600">
                    Have a resume ready? Upload it to enhance and optimize it further
                  </p>
                  <button className="w-full border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-sm hover:shadow-md">
                    Upload Resume
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
            <div className="p-8 md:p-12">
              <div className="flex flex-col items-center space-y-8">
                <div className="bg-blue-50 p-4 rounded-full">
                  <Upload className="w-16 h-16 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Upload Your Resume</h2>

                <div className="w-full">
                  <label className="block w-full">
                    <div
                      className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl transition-colors duration-300
                      ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-500"}`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <div className="space-y-4 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <Upload className="w-12 h-12 text-gray-400" />
                          <p className="text-base text-gray-600">
                            Drag and drop your resume or
                          </p>
                          <label className="cursor-pointer">
                            <span className="text-blue-500 hover:text-blue-600 font-semibold text-lg">
                              Browse files
                            </span>
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.doc,.docx"
                              onChange={handleInputChange}
                            />
                          </label>
                          <p className="text-sm text-gray-500">
                            PDF or DOC up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>

                {error && (
                  <div className="w-full bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg">
                    {error}
                  </div>
                )}

                {selectedFile && (
                  <div className="w-full bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-2">Selected File:</h3>
                    <p className="text-gray-600">{selectedFile.name}</p>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    className="px-6 py-3 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold rounded-lg transition-colors duration-300"
                    onClick={() => {
                      setShowUpload(false);
                      setSelectedFile(null);
                      setError("");
                    }}
                  >
                    Back
                  </button>
                  {selectedFile && !isLoading && (
                    <button 
                      className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-300 flex items-center gap-2"
                      onClick={() => setShowBuilder(true)}
                    >
                      Continue <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                  {isLoading && (
                    <div className="px-6 py-3 bg-blue-400 text-white font-semibold rounded-lg flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntegratedResumePage;