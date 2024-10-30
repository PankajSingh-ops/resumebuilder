import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github,
  Award,
  Globe,
  Star,
  Briefcase,
  GraduationCap,
  FolderGit2,
  ChevronRight,
  Building2
} from 'lucide-react';
import { ResumeData, PersonalInfoData } from '@/app/common/types';

interface ResumePreviewProps {
  formData: ResumeData;
}

const FourthResume: React.FC<ResumePreviewProps> = ({ formData }) => {
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
      {/* Header Section */}
      <div className="relative bg-slate-900 text-white px-8 py-12">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-800" />
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                {personal.firstName} {personal.lastName}
              </h1>
              {experiences[0] && (
                <p className="text-slate-300 text-lg">{experiences[0].title}</p>
              )}
            </div>
            <div className="text-right space-y-2">
              {personal.email && (
                <div className="flex items-center justify-end space-x-2 text-slate-300 hover:text-white">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${personal.email}`} className="text-sm">{personal.email}</a>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center justify-end space-x-2 text-slate-300 hover:text-white">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${personal.phone}`} className="text-sm">{personal.phone}</a>
                </div>
              )}
              {personal.city && personal.state && (
                <div className="flex items-center justify-end space-x-2 text-slate-300">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{personal.city}, {personal.state}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Professional Links */}
          <div className="flex gap-4 mt-6">
            {personal.linkedin && (
              <a 
                href={personal.linkedin}
                className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-md text-sm"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            )}
            {personal.github && (
              <a 
                href={personal.github}
                className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-md text-sm"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Professional Summary */}
        {personal.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <Building2 className="w-5 h-5 mr-2" />
              Professional Summary
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {personal.summary}
            </p>
          </div>
        )}

        {/* Main Grid Layout */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Skills & Info */}
          <div className="col-span-1 space-y-8">
            {/* Technical Skills */}
            {skills?.technicalSkills?.length > 0 && (
              <div className="bg-slate-50 p-6 rounded-lg">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Technical Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.technicalSkills.map((skill) => (
                    <span 
                      key={skill.id}
                      className="px-3 py-1 bg-white border border-slate-200 text-slate-700 rounded-full text-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Soft Skills */}
            {skills?.softSkills?.length > 0 && (
              <div className="bg-slate-50 p-6 rounded-lg">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Soft Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.softSkills.map((skill) => (
                    <span 
                      key={skill.id}
                      className="px-3 py-1 bg-white border border-slate-200 text-slate-700 rounded-full text-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {skills?.languages?.length > 0 && (
              <div className="bg-slate-50 p-6 rounded-lg">
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  Languages
                </h2>
                <div className="space-y-3">
                  {skills.languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between items-center">
                      <span className="text-slate-700">{lang.name}</span>
                      <span className="text-sm text-slate-500">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {skills?.certifications?.length > 0 && (
              <div className="bg-slate-50 p-6 rounded-lg">
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  Certifications
                </h2>
                <div className="space-y-3">
                  {skills.certifications.map((cert) => (
                    <div key={cert.id} className="border-l-2 border-slate-300 pl-3">
                      <p className="font-medium text-slate-800">{cert.name}</p>
                      <p className="text-sm text-slate-600">{cert.organization}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Experience & Education */}
          <div className="col-span-2 space-y-8">
            {/* Experience Section */}
            {experiences?.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center border-b border-slate-200 pb-2">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Professional Experience
                </h2>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="relative pl-6 border-l-2 border-slate-200">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 border-slate-400 rounded-full" />
                      <div className="mb-4">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-lg font-semibold text-slate-900">{exp.title}</h3>
                          <span className="text-sm text-slate-500 whitespace-nowrap">
                            {exp.startDate} - {exp.endDate || 'Present'}
                          </span>
                        </div>
                        <p className="text-slate-700 font-medium">{exp.organization}</p>
                      </div>
                      {exp.description && (
                        <p className="text-slate-600 mb-3">{exp.description}</p>
                      )}
                      {exp.achievements?.length > 0 && (
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start text-slate-600">
                              <ChevronRight className="w-4 h-4 mr-2 mt-1 text-slate-400" />
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
                              className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education Section - Placeholder for education data */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center border-b border-slate-200 pb-2">
                <GraduationCap className="w-5 h-5 mr-2" />
                Education
              </h2>
              <div className="text-slate-600">
                {/* Education data would go here */}
                <p className="italic">Education details can be added here</p>
              </div>
            </section>

            {/* Projects Section - Placeholder for projects data */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center border-b border-slate-200 pb-2">
                <FolderGit2 className="w-5 h-5 mr-2" />
                Projects
              </h2>
              <div className="text-slate-600">
                {/* Projects data would go here */}
                <p className="italic">Project details can be added here</p>
              </div>
            </section>

            {/* Additional Achievements */}
            {(additional?.awards?.length > 0 || additional?.publications?.length > 0) && (
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center border-b border-slate-200 pb-2">
                  <Star className="w-5 h-5 mr-2" />
                  Additional Achievements
                </h2>
                
                {/* Awards */}
                {additional?.awards?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">Awards & Recognition</h3>
                    <ul className="space-y-3">
                      {additional.awards.map((award) => (
                        <li key={award.id} className="flex items-start">
                          <ChevronRight className="w-4 h-4 mr-2 mt-1 text-slate-400" />
                          <div>
                            <p className="font-medium text-slate-700">{award.title}</p>
                            <p className="text-sm text-slate-600">{award.organization}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Publications */}
                {additional?.publications?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">Publications</h3>
                    <ul className="space-y-3">
                      {additional.publications.map((pub) => (
                        <li key={pub.id} className="flex items-start">
                          <ChevronRight className="w-4 h-4 mr-2 mt-1 text-slate-400" />
                          <div>
                            <p className="font-medium text-slate-700">{pub.title}</p>
                            <p className="text-sm text-slate-600">
                              {pub.authors} • {pub.journal}, {pub.date}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourthResume;