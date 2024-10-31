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
  GraduationCap
} from 'lucide-react';
import { PersonalInfoData, ResumeData } from '@/app/common/types';

interface ResumePreviewProps {
  formData: ResumeData;
}

const FirstResume: React.FC<ResumePreviewProps> = ({ formData }) => {
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
    additional: { 
      publications: [], 
      patents: [], 
      memberships: [], 
      awards: [] 
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg">
      {/* Header Section */}
      <header className="bg-gray-800 text-white px-8 py-6">
        <h1 className="text-3xl font-bold">
          {personal.firstName} {personal.lastName}
        </h1>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {personal.email && (
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{personal.email}</span>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span className="text-sm">{personal.phone}</span>
            </div>
          )}
          {personal.city && personal.state && (
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{personal.city}, {personal.state}</span>
            </div>
          )}
          {personal.linkedin && (
            <div className="flex items-center space-x-2">
              <Linkedin className="w-4 h-4" />
              <a href={personal.linkedin} className="text-sm hover:underline">{personal.linkedin}</a>
            </div>
          )}
          {personal.github && (
            <div className="flex items-center space-x-2">
              <Github className="w-4 h-4" />
              <a href={personal.github} className="text-sm hover:underline">{personal.github}</a>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        {/* Summary */}
        {personal.summary && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
              Professional Summary
            </h2>
            <p className="text-gray-600">{personal.summary}</p>
          </section>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-gray-200 pl-4">
                  <h3 className="text-lg font-medium text-gray-800">{edu.degree || edu.type}</h3>
                  <div className="text-gray-600">
                    <p className="font-medium">{edu.schoolName}</p>
                    <p className="text-sm">{edu.location}</p>
                    <p className="text-sm flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{edu.startDate} - {edu.endDate}</span>
                    </p>
                    {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                  </div>
                  {edu.description && <p className="text-gray-600 mt-2">{edu.description}</p>}
                  {edu.achievements?.length > 0 && (
                    <ul className="mt-2 list-disc list-inside text-gray-600">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                  {edu.courses?.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">Relevant Courses:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {edu.courses.map((course, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {experiences && experiences.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
              Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-l-2 border-gray-200 pl-4">
                  <h3 className="text-lg font-medium text-gray-800">{exp.title}</h3>
                  <div className="text-gray-600">
                    <p className="font-medium">{exp.organization}</p>
                    {exp.location && <p className="text-sm">{exp.location}</p>}
                    <p className="text-sm flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                    </p>
                  </div>
                  {exp.description && <p className="text-gray-600 mt-2">{exp.description}</p>}
                  {exp.achievements?.length > 0 && (
                    <ul className="mt-2 list-disc list-inside text-gray-600">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                  {exp.technologies && exp.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {exp.technologies.map((tech, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
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

        {/* Skills Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Technical Skills */}
          {skills?.technicalSkills?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
                Technical Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.technicalSkills.map((skill) => (
                  <span key={skill.id} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Soft Skills */}
          {skills?.softSkills?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
                Soft Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.softSkills.map((skill) => (
                  <span key={skill.id} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Additional Information */}
        {(skills?.certifications?.length > 0 || 
          additional?.awards?.length > 0 || 
          additional?.publications?.length > 0 ||
          additional?.patents?.length > 0 ||
          additional?.memberships?.length > 0) && (
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
              Additional Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Certifications */}
              {skills?.certifications?.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    Certifications
                  </h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {skills.certifications.map((cert) => (
                      <li key={cert.id}>{cert.name} - {cert.organization}</li>
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
                  <ul className="list-disc list-inside text-gray-600">
                    {additional.awards.map((award) => (
                      <li key={award.id}>{award.title} - {award.organization}</li>
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
                  <ul className="list-disc list-inside text-gray-600">
                    {additional.publications.map((pub) => (
                      <li key={pub.id}>{pub.title} - {pub.authors} ({pub.journal}, {pub.date})</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Patents */}
              {additional?.patents?.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    Patents
                  </h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {additional.patents.map((patent) => (
                      <li key={patent.id}>{patent.title} - {patent.patentNumber}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Memberships */}
              {additional?.memberships?.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    Memberships
                  </h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {additional.memberships.map((membership) => (
                      <li key={membership.id}>{membership.organization} - {membership.membershipLevel}</li>
                    ))}
                  </ul>
                </div>
              )}
              </div>
          </section>
        )}

        {/* Languages */}
        {skills?.languages?.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2 flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Languages
            </h2>
            <div className="flex flex-wrap gap-4">
              {skills.languages.map((lang) => (
                <span key={lang.id} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {lang.name} - {lang.proficiency}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Hobbies */}
        {skills?.hobbies?.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
              Hobbies
            </h2>
            <div className="flex flex-wrap gap-4">
              {skills.hobbies.map((hobby, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {hobby}
                </span>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default FirstResume;