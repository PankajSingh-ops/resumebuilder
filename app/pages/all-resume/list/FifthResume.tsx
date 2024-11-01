import React from 'react';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Github,
  User
} from 'lucide-react';
import { ResumeData, PersonalInfoData } from '@/app/common/types';

interface ResumeFifthProps {
  formData: ResumeData;
}

const FifthResume: React.FC<ResumeFifthProps> = ({ formData }) => {
  const { 
    personal, 
    experiences = [], 
    education = [],
    skills, 
    additional = { 
      publications: [], 
      patents: [], 
      memberships: [], 
      awards: [] 
    } 
  } = formData || {
    personal: {} as PersonalInfoData,
    experiences: [],
    education: [],
    skills: {
      technicalSkills: [],
      softSkills: [],
      certifications: [],
      languages: [],
      hobbies: []
    },
    additional: { publications: [], patents: [], memberships: [], awards: [] }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg flex">
      {/* Left Sidebar - 30% Width */}
      <div className="w-[30%] bg-gradient-to-b from-blue-50 to-blue-100 p-6 border-r border-blue-200">
        {/* Profile Picture Section */}
        <div className="mb-8 text-center">
          <div className="w-36 h-36 mx-auto mb-4 bg-blue-200 rounded-full flex items-center justify-center overflow-hidden shadow-md">
            {personal?.profilePic ? (
              <img 
                src={personal.profilePic} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl font-bold text-blue-600">
                {personal.firstName?.[0]}{personal.lastName?.[0]}
              </span>
            )}
          </div>
          
          {/* Personal Details */}
          <div className="space-y-3 mt-4">
            <div className="flex items-center justify-center space-x-2 text-gray-700">
              <User className="w-4 h-4 text-blue-500" />
              <span className="text-sm">{personal?.dateOfBirth || 'Age not provided'}</span>
            </div>
            {personal.email && (
              <div className="flex items-center justify-center space-x-2 text-gray-700">
                <Mail className="w-4 h-4 text-blue-500" />
                <span className="text-sm">{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center justify-center space-x-2 text-gray-700">
                <Phone className="w-4 h-4 text-blue-500" />
                <span className="text-sm">{personal.phone}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="flex items-center justify-center space-x-2 text-gray-700">
                <Linkedin className="w-4 h-4 text-blue-500" />
                <a href={personal.linkedin} className="text-sm hover:text-blue-700 underline">LinkedIn</a>
              </div>
            )}
            {personal.github && (
              <div className="flex items-center justify-center space-x-2 text-gray-700">
                <Github className="w-4 h-4 text-blue-500" />
                <a href={personal.github} className="text-sm hover:text-blue-700 underline">GitHub</a>
              </div>
            )}
          </div>
        </div>

        {/* Education Section */}
        {education && education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-blue-800 mb-3 border-b-2 border-blue-300 pb-2">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="bg-white p-3 rounded-lg shadow-sm">
                  <h3 className="text-md font-medium text-blue-700">{edu.degree}</h3>
                  <p className="text-sm text-gray-600">{edu.schoolName}</p>
                  <p className="text-xs text-gray-500">{edu.location}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Sections */}
        {skills && (
          <div>
            {skills.technicalSkills?.length > 0 && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-blue-800 mb-3 border-b-2 border-blue-300 pb-2">
                  Technical Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.technicalSkills.map((skill) => (
                    <span 
                      key={skill.id} 
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {skills.languages?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-blue-800 mb-3 border-b-2 border-blue-300 pb-2">
                  Languages
                </h2>
                <div className="space-y-2">
                  {skills.languages.map((lang) => (
                    <div 
                      key={lang.id} 
                      className="flex justify-between bg-white p-2 rounded-lg shadow-sm"
                    >
                      <span className="text-sm text-gray-700">{lang.name}</span>
                      <span className="text-xs text-blue-600">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Content - 70% Width */}
      <div className="w-[70%] p-8">
        {/* Name Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-900 leading-tight">
            {personal.firstName} {personal.lastName}
          </h1>
          <p className="text-lg text-blue-700 font-medium mt-2">
            {'Professional'}
          </p>
        </div>

        {/* Professional Summary */}
        {personal.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-3 border-b-2 border-blue-300 pb-2">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{personal.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {experiences?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-4 border-b-2 border-blue-300 pb-2">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div 
                  key={exp.id} 
                  className="bg-blue-50 p-4 rounded-lg shadow-sm border-l-4 border-blue-500"
                >
                  <h3 className="text-lg font-medium text-blue-900">{exp.title}</h3>
                  <p className="text-gray-700 font-medium">{exp.organization}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </p>
                  {exp.description && (
                    <p className="mt-2 text-gray-700">{exp.description}</p>
                  )}
                  {exp.achievements?.length > 0 && (
                    <ul className="mt-2 space-y-1 list-disc pl-5">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-gray-700 text-sm">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Information */}
        {(additional?.awards?.length > 0 || skills?.certifications?.length > 0) && (
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-4 border-b-2 border-blue-300 pb-2">
              Additional Achievements
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {skills?.certifications?.length > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-900 mb-3">Certifications</h3>
                  <ul className="space-y-2">
                    {skills.certifications.map((cert) => (
                      <li key={cert.id} className="text-sm text-gray-700">
                        • {cert.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {additional?.awards?.length > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-900 mb-3">Awards</h3>
                  <ul className="space-y-2">
                    {additional.awards.map((award) => (
                      <li key={award.id} className="text-sm text-gray-700">
                        • {award.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FifthResume;