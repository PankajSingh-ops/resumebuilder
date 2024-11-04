"use client"
import React, { useState } from 'react';
import { Send, FileText, Bot, User, Building2,} from 'lucide-react';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import CoverLetterPreview from '../preview/Preview';
import ResumeHeader from '@/app/ui/resume/ResumeHeader';

const CoverLetterGenerator = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
    companyName: '',
    hiringManager: '',
    letterDetails: '',
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);


  // Initialize Google Generative AI with public env variable
  const genAI = new GoogleGenerativeAI('AIzaSyAd1FRmYHW3rJR3bZCJKXS18GjzbTSdIks');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle navigation to preview
    setShowPreview(true);
    console.log('Form submitted:', formData);
  };

  const generateAILetter = async () => {
    setIsGenerating(true);
    setError('');

    try {
      // Validate API key

      const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings: [
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
      
      const prompt = `Generate a professional cover letter with the following details:
        First Name: ${formData.firstName}
        Last Name: ${formData.lastName}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Address: ${formData.address}
        Company Name: ${formData.companyName}
        Hiring Manager: ${formData.hiringManager}
        
        Please create a formal and compelling cover letter that highlights my interest in the position.
        The letter should be professional, concise, and well-structured. and also only return ,letter detials part and its below part dont return above part like Name, email, address,company name and hiriing manager name`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setFormData(prevState => ({
        ...prevState,
        letterDetails: text
      }));
    } catch (error) {
      console.error('Error generating letter:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate letter. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 1:
        return Boolean(formData.firstName && formData.lastName && formData.email && formData.phone && formData.address);
      case 2:
        return Boolean(formData.companyName && formData.hiringManager);
      case 3:
        return Boolean(formData.letterDetails);
      default:
        return false;
    }
  };


  return (
    <>
    <ResumeHeader/>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Professional Cover Letter Generator</h1>
          <p className="text-gray-600">Create a compelling cover letter in minutes with AI assistance</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex-1">
                <div 
                  className={`flex items-center justify-center ${
                    step < currentStep ? 'text-blue-600' :
                    step === currentStep ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 
                    ${step < currentStep ? 'bg-blue-600 border-blue-600 text-white' :
                      step === currentStep ? 'border-blue-600 text-blue-600' : 'border-gray-300'}`}
                  >
                    {step}
                  </div>
                  <div className={`hidden sm:block flex-1 h-1 ${
                    step < 3 ? (step < currentStep ? 'bg-blue-600' : 'bg-gray-300') : ''
                  }`} />
                </div>
                <div className="text-center mt-2">
                  <span className={`text-sm ${
                    step <= currentStep ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step === 1 ? 'Personal Info' : step === 2 ? 'Company Details' : 'Letter Content'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Personal Information */}
          <div className={`transition-all duration-300 ${currentStep === 1 ? 'block' : 'hidden'}`}>
            <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
              <div className="flex items-center border-b pb-4">
                <User className="w-6 h-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    required
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Company Information */}
          <div className={`transition-all duration-300 ${currentStep === 2 ? 'block' : 'hidden'}`}>
            <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
              <div className="flex items-center border-b pb-4">
                <Building2 className="w-6 h-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Company Information</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hiring Manager</label>
                  <input
                    type="text"
                    name="hiringManager"
                    value={formData.hiringManager}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Letter Content */}
          <div className={`transition-all duration-300 ${currentStep === 3 ? 'block' : 'hidden'}`}>
            <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center">
                  <FileText className="w-6 h-6 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Letter Content</h2>
                </div>
                <button
                  type="button"
                  onClick={generateAILetter}
                  disabled={isGenerating || !isStepComplete(2)}
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-white 
                    ${isGenerating || !isStepComplete(2) ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}
                    transition duration-200`}
                >
                  {isGenerating ? (
                    <>
                      <Bot className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Bot className="-ml-1 mr-2 h-5 w-5" />
                      Generate with AI
                    </>
                  )}
                </button>
              </div>
              {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
              
              <textarea
                name="letterDetails"
                value={formData.letterDetails}
                onChange={handleInputChange}
                rows={12}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                required
                placeholder="Your cover letter content will appear here..."
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(curr => Math.max(1, curr - 1))}
              className={`px-6 py-2 rounded-lg text-blue-600 border border-blue-600 hover:bg-blue-50 
                transition duration-200 ${currentStep === 1 ? 'invisible' : 'visible'}`}
            >
              Previous
            </button>
            
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(curr => Math.min(3, curr + 1))}
                disabled={!isStepComplete(currentStep)}
                className={`px-6 py-2 rounded-lg text-white 
                  ${isStepComplete(currentStep) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400'}
                  transition duration-200`}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isStepComplete(3)}
                className={`inline-flex items-center px-6 py-2 rounded-lg text-white 
                  ${isStepComplete(3) ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400'}
                  transition duration-200`}
              >
                <Send className="mr-2 h-5 w-5" />
                Preview Letter
              </button>
            )}
          </div>
        </form>
      </div>
      {showPreview && (
  <CoverLetterPreview
    formData={formData}
    onClose={() => setShowPreview(false)}
  />
)}
    </div>
    </>
  );
};

export default CoverLetterGenerator;