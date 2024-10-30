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
  Globe,
  Star,
  Briefcase,
  ChevronRight
} from 'lucide-react';
import { ResumeData, PersonalInfoData } from '@/app/common/types';

interface ResumePreviewProps {
  formData: ResumeData;
}

const ThirdResume: React.FC<ResumePreviewProps> = ({ formData }) => {
  const { personal, experiences = [], skills, additional = { publications: [], patents: [], memberships: [], awards: [] } } = formData || {
    personal: {} as PersonalInfoData,
    experiences: [],
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
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg">
      {/* Header with Accent Color */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            {personal.firstName} {personal.lastName}
          </h1>
          
          {/* Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {personal.email && (
              <a href={`mailto:${personal.email}`} className="flex items-center space-x-2 hover:text-indigo-200">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{personal.email}</span>
              </a>
            )}
            {personal.phone && (
              <a href={`tel:${personal.phone}`} className="flex items-center space-x-2 hover:text-indigo-200">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{personal.phone}</span>
              </a>
            )}
            {personal.city && personal.state && (
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{personal.city}, {personal.state}</span>
              </div>
            )}
            {personal.linkedin && (
              <a href={personal.linkedin} className="flex items-center space-x-2 hover:text-indigo-200">
                <Linkedin className="w-4 h-4" />
                <span className="text-sm">LinkedIn</span>
              </a>
            )}
            {personal.github && (
              <a href={personal.github} className="flex items-center space-x-2 hover:text-indigo-200">
                <Github className="w-4 h-4" />
                <span className="text-sm">GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto p-8">
        {/* Summary */}
        {personal.summary && (
          <div className="mb-12">
            <p className="text-gray-600 text-lg leading-relaxed border-l-4 border-indigo-600 pl-4">
              {personal.summary}
            </p>
          </div>
        )}

        {/* Skills Overview */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {skills?.technicalSkills?.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Technical Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.technicalSkills.map((skill) => (
                  <span 
                    key={skill.id} 
                    className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {skills?.softSkills?.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Soft Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.softSkills.map((skill) => (
                  <span 
                    key={skill.id} 
                    className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Experience Section */}
        {experiences?.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Briefcase className="w-6 h-6 mr-2" />
              Experience
            </h2>
            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                      {exp.title}
                    </h3>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </span>
                  </div>
                  <p className="text-lg font-medium text-indigo-600 mb-2">{exp.organization}</p>
                  {exp.description && (
                    <p className="text-gray-600 mb-3">{exp.description}</p>
                  )}
                  {exp.achievements?.length > 0 && (
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start text-gray-600">
                          <ChevronRight className="w-4 h-4 mr-2 mt-1 text-indigo-600" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {exp?.technologies&&exp.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {exp.technologies.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                        >
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

        {/* Additional Qualifications Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Certifications */}
          {skills?.certifications?.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-indigo-600" />
                Certifications
              </h2>
              <ul className="space-y-3">
                {skills.certifications.map((cert) => (
                  <li key={cert.id} className="flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2 text-indigo-600" />
                    <div>
                      <p className="font-medium text-gray-800">{cert.name}</p>
                      <p className="text-sm text-gray-600">{cert.organization}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {skills?.languages?.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-indigo-600" />
                Languages
              </h2>
              <div className="space-y-3">
                {skills.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{lang.name}</span>
                    <span className="text-sm text-indigo-600">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Additional Sections */}
        {(additional?.awards?.length > 0 || additional?.publications?.length > 0) && (
          <div className="mt-12">
            {/* Awards */}
            {additional?.awards?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-indigo-600" />
                  Awards & Recognition
                </h2>
                <ul className="space-y-3">
                  {additional.awards.map((award) => (
                    <li key={award.id} className="flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 mt-1 text-indigo-600" />
                      <div>
                        <p className="font-medium text-gray-800">{award.title}</p>
                        <p className="text-sm text-gray-600">{award.organization}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Publications */}
            {additional?.publications?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Book className="w-5 h-5 mr-2 text-indigo-600" />
                  Publications
                </h2>
                <ul className="space-y-3">
                  {additional.publications.map((pub) => (
                    <li key={pub.id} className="flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 mt-1 text-indigo-600" />
                      <div>
                        <p className="font-medium text-gray-800">{pub.title}</p>
                        <p className="text-sm text-gray-600">
                          {pub.authors} • {pub.journal}, {pub.date}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThirdResume;