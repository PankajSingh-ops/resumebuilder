import React from 'react';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Briefcase, 
  Award,
  BarChart2,
  TrendingUp,
  Target
} from 'lucide-react';
import { ResumeData, PersonalInfoData } from '@/app/common/types';

interface ResumeSixthProps {
  formData: ResumeData;
}

const SixthResume: React.FC<ResumeSixthProps> = ({ formData }) => {
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
    <div className="w-full max-w-4xl mx-auto bg-white shadow-2xl border border-gray-200 grid grid-cols-3">
      {/* Left Sidebar - Professional Profile */}
      <div className="col-span-1 bg-gradient-to-b from-indigo-600 to-indigo-800 p-8 text-white">
        {/* Profile Picture */}
        <div className="mb-8 text-center">
          <div className="w-32 h-32 mx-auto mb-4 border-4 border-white rounded-full overflow-hidden shadow-lg">
            {personal?.profilePic ? (
              <img 
                src={personal.profilePic} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-indigo-500 flex items-center justify-center text-3xl font-bold">
                {personal.firstName?.[0]}{personal.lastName?.[0]}
              </div>
            )}
          </div>
          
          <h2 className="text-xl font-bold mb-2">
            {personal.firstName} {personal.lastName}
          </h2>
          <p className="text-indigo-200">Sales & Marketing Professional</p>
        </div>

        {/* Contact Information */}
        <div className="space-y-4 border-t border-indigo-500 pt-6">
          {personal.email && (
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-indigo-300" />
              <span className="text-sm">{personal.email}</span>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-indigo-300" />
              <span className="text-sm">{personal.phone}</span>
            </div>
          )}
          {personal.linkedin && (
            <div className="flex items-center space-x-3">
              <Linkedin className="w-5 h-5 text-indigo-300" />
              <a 
                href={personal.linkedin} 
                className="text-sm hover:text-white underline"
              >
                LinkedIn Profile
              </a>
            </div>
          )}
        </div>

        {/* Key Sales Skills */}
        {skills?.technicalSkills?.length > 0 && (
          <div className="mt-8 border-t border-indigo-500 pt-6">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Sales & Marketing Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.technicalSkills.map((skill) => (
                <span 
                  key={skill.id} 
                  className="bg-indigo-500 text-white px-2 py-1 rounded-md text-xs"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content - Professional Details */}
      <div className="col-span-2 p-8">
        {/* Professional Summary */}
        {personal.summary && (
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Target className="w-6 h-6 mr-3 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Professional Profile
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {personal.summary}
            </p>
          </section>
        )}

        {/* Professional Experience */}
        {experiences?.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Briefcase className="w-6 h-6 mr-3 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Professional Experience
              </h2>
            </div>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div 
                  key={exp.id} 
                  className="border-l-4 border-indigo-500 pl-4 py-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {exp.title}
                      </h3>
                      <p className="text-gray-700 font-medium">
                        {exp.organization}
                      </p>
                    </div>
                    <span className="text-sm text-gray-600">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="mt-2 text-gray-700 text-sm">
                      {exp.description}
                    </p>
                  )}
                  {exp.achievements?.length > 0 && (
                    <ul className="mt-2 space-y-1 list-disc pl-5 text-sm text-gray-700">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx}>
                          <div className="flex items-center">
                            <TrendingUp className="w-4 h-4 mr-2 text-indigo-500" />
                            {achievement}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements & Certifications */}
        <section className="grid grid-cols-2 gap-6">
          {skills?.certifications?.length > 0 && (
            <div>
              <div className="flex items-center mb-4">
                <Award className="w-6 h-6 mr-3 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Certifications
                </h2>
              </div>
              <ul className="space-y-2">
                {skills.certifications.map((cert) => (
                  <li 
                    key={cert.id} 
                    className="text-sm text-gray-700 flex items-center"
                  >
                    <BarChart2 className="w-4 h-4 mr-2 text-indigo-500" />
                    {cert.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {additional?.awards?.length > 0 && (
            <div>
              <div className="flex items-center mb-4">
                <Award className="w-6 h-6 mr-3 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Awards
                </h2>
              </div>
              <ul className="space-y-2">
                {additional.awards.map((award) => (
                  <li 
                    key={award.id} 
                    className="text-sm text-gray-700 flex items-center"
                  >
                    <Award className="w-4 h-4 mr-2 text-indigo-500" />
                    {award.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Education */}
        {education && education.length > 0 && (
          <section className="mt-8 border-t pt-6 border-gray-200">
            <div className="flex items-center mb-4">
              <Briefcase className="w-6 h-6 mr-3 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Education
              </h2>
            </div>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-md font-medium text-gray-900">
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-gray-700">
                        {edu.schoolName}
                      </p>
                    </div>
                    <span className="text-xs text-gray-600">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SixthResume;