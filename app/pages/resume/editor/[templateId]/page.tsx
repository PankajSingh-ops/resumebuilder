"use client"
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, Download, User, Briefcase, Star, Award, LucideIcon } from 'lucide-react';
import PersonalInfo from './PersonalInfo';

// Types
interface MenuItem {
  id: 'personal' | 'experience' | 'skills' | 'additional';
  label: string;
  icon: LucideIcon;
}

// Menu Items Configuration
const menuItems: MenuItem[] = [
  { id: 'personal', label: 'Personal Information', icon: User },
  { id: 'experience', label: 'Work Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills & Projects', icon: Star },
  { id: 'additional', label: 'Additional Info', icon: Award }
];

// Sidebar Component
const Sidebar = ({ 
    menuItems, 
    currentPage, 
    setCurrentPage 
  }: { 
    menuItems: MenuItem[];
    currentPage: MenuItem['id'];
    setCurrentPage: (page: MenuItem['id']) => void;
  }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<MenuItem['id'] | null>(null);
  
    return (
      <div className={`
        relative transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'}
        bg-white border-r border-gray-200
        shadow-lg
      `}>
        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 bg-white rounded-full p-1.5 
            shadow-md border border-gray-200 hover:shadow-lg
            transition-transform duration-200 hover:scale-105
            z-50"
        >
          {isCollapsed ? 
            <ChevronRight size={16} className="text-gray-600" /> : 
            <ChevronLeft size={16} className="text-gray-600" />
          }
        </button>
  
        {/* Header */}
        <div className={`
          p-6 border-b border-gray-200
          ${isCollapsed ? 'text-center' : ''}
        `}>
          <h2 className={`
            font-bold text-gray-800
            ${isCollapsed ? 'text-sm' : 'text-lg'}
            transition-all duration-200
          `}>
            {isCollapsed ? 'RB' : 'Resume Builder'}
          </h2>
        </div>
  
        {/* Menu Items */}
        <div className={`
          p-4 space-y-2 
          ${isCollapsed ? 'px-2' : 'px-4'}
        `}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            const isHovered = hoveredItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`
                  w-full rounded-xl 
                  flex items-center gap-3
                  transition-all duration-200 ease-in-out
                  ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3'}
                  ${isActive 
                    ? 'bg-blue-500 text-white shadow-md transform scale-105' 
                    : 'hover:bg-blue-50 text-gray-600 hover:text-blue-600'
                  }
                  group relative
                `}
              >
                <div className={`
                  transition-transform duration-200
                  ${(isHovered || isActive) ? 'scale-110' : ''}
                `}>
                  <Icon 
                    size={isCollapsed ? 24 : 20} 
                    className={`
                      transition-colors duration-200
                      ${isActive ? 'text-white' : 'group-hover:text-blue-500'}
                    `}
                  />
                </div>
                
                {!isCollapsed && (
                  <span className={`
                    font-medium whitespace-nowrap
                    transition-all duration-200
                    ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'}
                    ${isHovered ? 'translate-x-1' : ''}
                  `}>
                    {item.label}
                  </span>
                )}
  
                {/* Tooltip for collapsed state */}
                {isCollapsed && isHovered && (
                  <div className="
                    absolute left-full ml-2 px-3 py-2
                    bg-gray-800 text-white text-sm
                    rounded-md whitespace-nowrap z-50
                    shadow-lg
                  ">
                    {item.label}
                    <div className="
                      absolute top-1/2 -left-1 
                      transform -translate-y-1/2
                      border-4 border-transparent 
                      border-r-gray-800
                    "/>
                  </div>
                )}
              </button>
            );
          })}
        </div>
  
        {/* Progress indicator */}
        {!isCollapsed && (
          <div className="absolute bottom-6 left-4 right-4">
            <div className="text-xs text-gray-500 mb-2">
              Completion Progress
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ 
                  width: `${((menuItems.findIndex(item => item.id === currentPage) + 1) / menuItems.length) * 100}%` 
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

// Progress Bar Component
const ProgressBar = ({ 
  currentStep, 
  totalSteps 
}: { 
  currentStep: number;
  totalSteps: number;
}) => {
  const progress = Math.round((currentStep / totalSteps) * 100);
  
  return (
    <div className="mt-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-600">Progress</span>
        <span className="text-sm font-medium text-blue-600">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// Placeholder content components
const WorkExperience = () => <div>Work Experience Form</div>;
const SkillsProjects = () => <div>Skills & Projects Form</div>;
const AdditionalInfo = () => <div>Additional Information Form</div>;

// Main Resume Builder Component
const ResumeBuilder = () => {
    const [formData, setFormData] = useState({
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
        experience: [], // Will be implemented later
        skills: [], // Will be implemented later
        additional: {} // Will be implemented later
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
    
      // Update form data for a specific section
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updateFormData = (section: string, data: any) => {
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
                onValidationChange={(isValid) => updateSectionValidity('personal', isValid)}
              />
            );
          case 'experience':
            return <WorkExperience />; // To be implemented
          case 'skills':
            return <SkillsProjects />; // To be implemented
          case 'additional':
            return <AdditionalInfo />; // To be implemented
          default:
            return <PersonalInfo
              formData={formData.personal}
              setFormData={(data) => updateFormData('personal', data)}
              onValidationChange={(isValid) => updateSectionValidity('personal', isValid)}
            />;
        }
      };
    
      // Handle form submission
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add form submission logic here
        console.log('Form Data:', formData);
      };
    
      // Handle saving draft
      const handleSaveDraft = () => {
        localStorage.setItem('resumeBuilderDraft', JSON.stringify(formData));
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
                const currentIndex = menuItems.findIndex(item => item.id === currentPage);
                if (currentIndex > 0) {
                  setCurrentPage(menuItems[currentIndex - 1].id);
                }
              }}
              disabled={menuItems.findIndex(item => item.id === currentPage) === 0}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg border border-gray-300 transition-colors duration-200 ${
                menuItems.findIndex(item => item.id === currentPage) === 0
                  ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-50'
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
                  const currentIndex = menuItems.findIndex(item => item.id === currentPage);
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
            currentStep={menuItems.findIndex(item => item.id === currentPage) + 1}
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