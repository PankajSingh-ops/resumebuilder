import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github,
  Calendar,
  Award,
  Book,
  Star,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { ResumeData, PersonalInfoData } from '@/app/common/types';

interface ResumePreviewProps {
  formData: ResumeData;
}

const SecondResume: React.FC<ResumePreviewProps> = ({ formData }) => {
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
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gray-50 p-6 border-r border-gray-200">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <img src={personal?.profileImage} alt="" />
          </div>
          <h1 className="text-xl font-bold text-center text-gray-800 mb-1">
            {personal.firstName} {personal.lastName}
          </h1>
        </div>

        {/* Contact Information */}
        <div className="space-y-3 mb-8">
          {personal.email && (
            <div className="flex items-center space-x-3 text-gray-600">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{personal.email}</span>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center space-x-3 text-gray-600">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{personal.phone}</span>
            </div>
          )}
          {personal.city && personal.state && (
            <div className="flex items-center space-x-3 text-gray-600">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{personal.city}, {personal.state}</span>
            </div>
          )}
          {personal.linkedin && (
            <div className="flex items-center space-x-3 text-gray-600">
              <Linkedin className="w-4 h-4 text-gray-400" />
              <a href={personal.linkedin} className="text-sm hover:text-blue-600">{personal.linkedin}</a>
            </div>
          )}
          {personal.github && (
            <div className="flex items-center space-x-3 text-gray-600">
              <Github className="w-4 h-4 text-gray-400" />
              <a href={personal.github} className="text-sm hover:text-blue-600">{personal.github}</a>
            </div>
          )}
        </div>

        {/* Skills Sections */}
        {skills?.technicalSkills?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.technicalSkills.map((skill) => (
                <span key={skill.id} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {skills?.softSkills?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Soft Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.softSkills.map((skill) => (
                <span key={skill.id} className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {skills?.languages?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Languages</h2>
            <div className="space-y-2">
              {skills.languages.map((lang) => (
                <div key={lang.id} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{lang.name}</span>
                  <span className="text-xs text-gray-500">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-6">
        {/* Summary */}
        {personal.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Profile</h2>
            <p className="text-gray-600 leading-relaxed">{personal.summary}</p>
          </div>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-4 border-l-2 border-gray-200">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-white border-2 border-gray-300 rounded-full" />
                  <h3 className="text-lg font-medium text-gray-800">{edu.degree || edu.type}</h3>
                  <p className="text-gray-600 font-medium">{edu.schoolName}</p>
                  <p className="text-sm text-gray-500">{edu.location}</p>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    {edu.startDate} - {edu.endDate}
                  </p>
                  {edu.gpa && <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>}
                  {edu.description && (
                    <p className="mt-2 text-gray-600">{edu.description}</p>
                  )}
                  {edu.achievements?.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-gray-600 text-sm flex items-start">
                          <span className="mr-2">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                  {edu.courses?.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">Relevant Courses:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {edu.courses.map((course, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experiences?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-gray-200">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-white border-2 border-gray-300 rounded-full" />
                  <h3 className="text-lg font-medium text-gray-800">{exp.title}</h3>
                  <p className="text-gray-600 font-medium">{exp.organization}</p>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </p>
                  {exp.description && (
                    <p className="mt-2 text-gray-600">{exp.description}</p>
                  )}
                  {exp.achievements?.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-gray-600 text-sm flex items-start">
                          <span className="mr-2">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                  {exp.technologies && exp.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {exp.technologies.map((tech, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Information */}
        {(additional?.awards?.length > 0 || additional?.publications?.length > 0 || 
          additional?.patents?.length > 0 || additional?.memberships?.length > 0 || 
          skills?.certifications?.length > 0) && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Information</h2>
            <div className="space-y-4">
              {/* Certifications */}
              {skills?.certifications?.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    Certifications
                  </h3>
                  <ul className="space-y-1">
                    {skills.certifications.map((cert) => (
                      <li key={cert.id} className="text-sm text-gray-600">
                        • {cert.name} - {cert.organization}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Awards */}
              {additional?.awards?.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Awards
                  </h3>
                  <ul className="space-y-1">
                    {additional.awards.map((award) => (
                      <li key={award.id} className="text-sm text-gray-600">
                        • {award.title} - {award.organization}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Publications */}
              {additional?.publications?.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                    <Book className="w-4 h-4 mr-2" />
                    Publications
                  </h3>
                  <ul className="space-y-1">
                    {additional.publications.map((pub) => (
                      <li key={pub.id} className="text-sm text-gray-600">
                        • {pub.title} - {pub.authors} ({pub.journal}, {pub.date})
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

export default SecondResume;