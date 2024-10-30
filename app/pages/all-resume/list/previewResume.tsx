import React from 'react';
import FirstResume from './FirstResume';
import { ResumeData } from '@/app/common/types';
import SecondResume from './SecondResume';
import ThirdResume from './ThirdResume';
import FourthResume from './FourthResume';

interface ResumePreviewProps {
    formData: ResumeData;
    resumeId: string | string[];
}
  
const ResumePreview:React.FC<ResumePreviewProps> = ({ formData, resumeId }) => {
    const templateId = Array.isArray(resumeId) 
    ? parseInt(resumeId[0], 10) 
    : parseInt(resumeId, 10);
  const renderTemplate = () => {
    switch (templateId) {
      case 1:
        return <FirstResume formData={formData} />;
      case 2:
        return <SecondResume formData={formData} />;
      case 3:
        return <ThirdResume formData={formData}  />;
      case 4:
        return <FourthResume formData={formData}  />;
      default:
        return (
          <div className="mt-4">
            <p>
              Template not found. Please select a valid template ID (1-4).
            </p>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full">
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;