"use client";
import React, { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Download,
  User,
  Briefcase,
  Star,
  Award,
} from "lucide-react";
import PersonalInfo from "./PersonalInfo";
import { AdditionalInfoData, Experience, MenuItem, SkillsData } from "@/app/common/types";
import WorkExperience from "./Workexperience";
import SkillsProjects from "./SkillPage";
import AdditionalInfo from "./AdditiionalInfo";
import { Sidebar } from "@/app/ui/resume/Sidebar";
import { ProgressBar } from "@/app/ui/resume/ProgressBar";

// Menu Items Configuration
const menuItems: MenuItem[] = [
  { id: "personal", label: "Personal Information", icon: User },
  { id: "experience", label: "Work Experience", icon: Briefcase },
  { id: "skills", label: "Skills & Projects", icon: Star },
  { id: "additional", label: "Additional Info", icon: Award },
];


// Main Resume Builder Component
const ResumeBuilder = () => {
  const [formData, setFormData] = useState<{
    personal: {
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      phone: string;
      email: string;
      linkedin: string;
      github: string;
      city: string;
      state: string;
      summary: string;
    };
    experiences: Experience[];
    skills: SkillsData;
    additional: AdditionalInfoData;
  }>({
    personal: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      linkedin: '',
      github: '',
      city: '',
      state: '',
      summary: ''
    },
    experiences: [],
    skills: {
      technicalSkills: [],
      softSkills: [],
      certifications: [],
      languages: [],
      hobbies: []
    },
    additional: {
      publications: [],
      patents: [],
      memberships: [],
      awards: []
    }
  });

  // Validation state for each section
  const [sectionValidity, setSectionValidity] = useState({
    personal: false,
    experience: false,
    skills: false,
    additional: false
  });

  const [currentPage, setCurrentPage] = useState<MenuItem['id']>('personal');
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const updateFormData = (section: string, data: unknown) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  // Update validation status for a section
  const updateSectionValidity = (section: string, isValid: boolean) => {
    setSectionValidity(prev => ({
      ...prev,
      [section]: isValid
    }));
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'personal':
        return (
          <PersonalInfo
            formData={formData.personal}
            setFormData={(data) => updateFormData('personal', data)}
            onValidationChange={(isValid: boolean) => updateSectionValidity('personal', isValid)}
          />
        );
      case 'experience':
        return (
          <WorkExperience
            formData={formData.experiences}
            setFormData={(data: Experience[]) => updateFormData('experiences', data)}
            onValidationChange={(isValid: boolean) => updateSectionValidity('experience', isValid)}
          />
        );
        case 'skills':
          return (
            <SkillsProjects
              formData={formData.skills}
              setFormData={(data: SkillsData) => updateFormData('skills', data)}
              onValidationChange={(isValid: boolean) => updateSectionValidity('skills', isValid)}
            />
          );
          case 'additional':
            return (
              <AdditionalInfo
                formData={formData.additional}
                setFormData={(data: AdditionalInfoData) => updateFormData('additional', data)}
                onValidationChange={(isValid: boolean) => updateSectionValidity('additional', isValid)}
              />
            );
      default:
        return (
          <PersonalInfo
            formData={formData.personal}
            setFormData={(data) => updateFormData('personal', data)}
            onValidationChange={(isValid: boolean) => updateSectionValidity('personal', isValid)}
          />
        );
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
    console.log("Form Data:", formData);
  };

  // Handle saving draft
  const handleSaveDraft = () => {
    localStorage.setItem("resumeBuilderDraft", JSON.stringify(formData));
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  // Check if current section is valid before allowing next
  const handleDownload = () => {
    return sectionValidity[currentPage];
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        menuItems={menuItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div className="flex-1 p-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          {renderContent()}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => {
                const currentIndex = menuItems.findIndex(
                  (item) => item.id === currentPage
                );
                if (currentIndex > 0) {
                  setCurrentPage(menuItems[currentIndex - 1].id);
                }
              }}
              disabled={
                menuItems.findIndex((item) => item.id === currentPage) === 0
              }
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg border border-gray-300 transition-colors duration-200 ${
                menuItems.findIndex((item) => item.id === currentPage) === 0
                  ? "text-gray-400 bg-gray-50 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <ChevronLeft size={20} />
              <span>Previous</span>
            </button>

            {currentPage === menuItems[menuItems.length - 1].id ? (
              <button
                type="submit"
                className="flex items-center space-x-2 px-8 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors duration-200 shadow-sm"
              >
                <Check size={20} />
                <span>Complete Resume</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  const currentIndex = menuItems.findIndex(
                    (item) => item.id === currentPage
                  );
                  if (currentIndex < menuItems.length - 1) {
                    setCurrentPage(menuItems[currentIndex + 1].id);
                  }
                }}
                className="flex items-center space-x-2 px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 shadow-sm"
              >
                <span>Next</span>
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          <ProgressBar
            currentStep={
              menuItems.findIndex((item) => item.id === currentPage) + 1
            }
            totalSteps={menuItems.length}
          />

          {/* Save Draft Button */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="inline-flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <Download size={16} />
              <span>Save as Draft</span>
            </button>
          </div>
        </form>

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Resume Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  Edit
                </button>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Toast */}
        {showSuccessToast && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <Check size={20} />
            <span>Progress saved successfully!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;
