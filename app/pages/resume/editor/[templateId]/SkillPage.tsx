"use client"
import React, { useState} from 'react';
import { Plus, Trash2, Award, Languages, Heart, Code, MessageSquare } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  type: 'technical' | 'soft';
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

interface Certification {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  expirationDate?: string;
  doesNotExpire: boolean;
}

interface Language {
  id: string;
  name: string;
  proficiency: 'basic' | 'intermediate' | 'advanced' | 'fluent';
}

interface SkillsData {
  technicalSkills: Skill[];
  softSkills: Skill[];
  certifications: Certification[];
  languages: Language[];
  hobbies: string[];
}

interface SkillsProjectsProps {
  formData: SkillsData;
  setFormData: (data: SkillsData) => void;
  onValidationChange: (isValid: boolean) => void;
}

const defaultData: SkillsData = {
  technicalSkills: [],
  softSkills: [],
  certifications: [],
  languages: [],
  hobbies: []
};

const SkillsProjects: React.FC<SkillsProjectsProps> = ({
  formData = defaultData,
  setFormData,
  onValidationChange
}) => {
  const [activeTab, setActiveTab] = useState<'technical' | 'soft' | 'certifications' | 'languages' | 'hobbies'>('technical');
  console.log(onValidationChange);
  

  // Add new technical skill
  const addTechnicalSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      type: 'technical',
      proficiency: 'beginner'
    };
    setFormData({
      ...formData,
      technicalSkills: [...formData.technicalSkills, newSkill]
    });
  };

  // Add new soft skill
  const addSoftSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      type: 'soft'
    };
    setFormData({
      ...formData,
      softSkills: [...formData.softSkills, newSkill]
    });
  };

  // Add new certification
  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      organization: '',
      issueDate: '',
      expirationDate: '',
      doesNotExpire: false
    };
    setFormData({
      ...formData,
      certifications: [...formData.certifications, newCertification]
    });
  };

  // Add new language
  const addLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      name: '',
      proficiency: 'basic'
    };
    setFormData({
      ...formData,
      languages: [...formData.languages, newLanguage]
    });
  };

  // Add new hobby
  const addHobby = () => {
    setFormData({
      ...formData,
      hobbies: [...formData.hobbies, '']
    });
  };

  // Remove items
  const removeItem = (type: keyof SkillsData, id: string) => {
    setFormData({
      ...formData,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [type]: formData[type].filter((item: any) => item.id !== id)
    });
  };

  // Remove hobby
  const removeHobby = (index: number) => {
    const newHobbies = [...formData.hobbies];
    newHobbies.splice(index, 1);
    setFormData({
      ...formData,
      hobbies: newHobbies
    });
  };

  // Update functions
  const updateSkill = (type: 'technicalSkills' | 'softSkills', id: string, field: string, value: string) => {
    setFormData({
      ...formData,
      [type]: formData[type].map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    });
  };

  const updateCertification = (id: string, field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    });
  };

  const updateLanguage = (id: string, field: string, value: string) => {
    setFormData({
      ...formData,
      languages: formData.languages.map(lang =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    });
  };

  const updateHobby = (index: number, value: string) => {
    const newHobbies = [...formData.hobbies];
    newHobbies[index] = value;
    setFormData({
      ...formData,
      hobbies: newHobbies
    });
  };

  const tabs = [
    { id: 'technical', label: 'Technical Skills', icon: Code },
    { id: 'soft', label: 'Soft Skills', icon: MessageSquare },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'languages', label: 'Languages', icon: Languages },
    { id: 'hobbies', label: 'Hobbies', icon: Heart }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${activeTab === tab.id 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              <Icon size={18} />
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {/* Technical Skills Section */}
        {activeTab === 'technical' && (
          <div className="space-y-4">
            {formData.technicalSkills.map((skill) => (
              <div key={skill.id} className="flex items-center space-x-4">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill('technicalSkills', skill.id, 'name', e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Python, React, AWS"
                />
                <select
                  value={skill.proficiency}
                  onChange={(e) => updateSkill('technicalSkills', skill.id, 'proficiency', e.target.value)}
                  className="rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
                <button
                  onClick={() => removeItem('technicalSkills', skill.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            <button
              onClick={addTechnicalSkill}
              className="w-full py-3 px-4 rounded-lg border-2 border-dashed border-gray-300 
                text-gray-600 hover:border-blue-500 hover:text-blue-500 
                transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Plus size={20} />
              <span>Add Technical Skill</span>
            </button>
          </div>
        )}

        {/* Soft Skills Section */}
        {activeTab === 'soft' && (
          <div className="space-y-4">
            {formData.softSkills.map((skill) => (
              <div key={skill.id} className="flex items-center space-x-4">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill('softSkills', skill.id, 'name', e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Leadership, Communication, Problem Solving"
                />
                <button
                  onClick={() => removeItem('softSkills', skill.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            <button
              onClick={addSoftSkill}
              className="w-full py-3 px-4 rounded-lg border-2 border-dashed border-gray-300 
                text-gray-600 hover:border-blue-500 hover:text-blue-500 
                transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Plus size={20} />
              <span>Add Soft Skill</span>
            </button>
          </div>
        )}

        {/* Certifications Section */}
        {activeTab === 'certifications' && (
          <div className="space-y-4">
            {formData.certifications.map((cert) => (
              <div key={cert.id} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
                    placeholder="Certification Name"
                  />
                  <input
                    type="text"
                    value={cert.organization}
                    onChange={(e) => updateCertification(cert.id, 'organization', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
                    placeholder="Issuing Organization"
                  />
                  <div>
                    <input
                      type="date"
                      value={cert.issueDate}
                      onChange={(e) => updateCertification(cert.id, 'issueDate', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <input
                      type="date"
                      value={cert.expirationDate}
                      onChange={(e) => updateCertification(cert.id, 'expirationDate', e.target.value)}
                      disabled={cert.doesNotExpire}
                      className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={cert.doesNotExpire}
                      onChange={(e) => updateCertification(cert.id, 'doesNotExpire', e.target.checked)}
                      className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">No Expiration Date</span>
                  </label>
                  <button
                    onClick={() => removeItem('certifications', cert.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={addCertification}
              className="w-full py-3 px-4 rounded-lg border-2 border-dashed border-gray-300 
                text-gray-600 hover:border-blue-500 hover:text-blue-500 
                transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Plus size={20} />
              <span>Add Certification</span>
            </button>
          </div>
        )}

        {/* Languages Section */}
        {activeTab === 'languages' && (
          <div className="space-y-4">
            {formData.languages.map((lang) => (
              <div key={lang.id} className="flex items-center space-x-4">
                <input
                  type="text"
                  value={lang.name}
                  onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., English, Spanish, French"
                />
                <select
                  value={lang.proficiency}
                  onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
                  className="rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="basic">Basic</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="fluent">Fluent</option>
                </select>
                <button
                  onClick={() => removeItem('languages', lang.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            <button
            onClick={addLanguage}
            className="w-full py-3 px-4 rounded-lg border-2 border-dashed border-gray-300 
              text-gray-600 hover:border-blue-500 hover:text-blue-500 
              transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Plus size={20} />
            <span>Add Language</span>
          </button>
        </div>
      )}

      {/* Hobbies Section */}
      {activeTab === 'hobbies' && (
        <div className="space-y-4">
          {formData.hobbies.map((hobby, index) => (
            <div key={index} className="flex items-center space-x-4">
              <input
                type="text"
                value={hobby}
                onChange={(e) => updateHobby(index, e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Photography, Cooking, Reading"
              />
              <button
                onClick={() => removeHobby(index)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          <button
            onClick={addHobby}
            className="w-full py-3 px-4 rounded-lg border-2 border-dashed border-gray-300 
              text-gray-600 hover:border-blue-500 hover:text-blue-500 
              transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Plus size={20} />
            <span>Add Hobby</span>
          </button>
        </div>
      )}
    </div>
  </div>
);
};

export default SkillsProjects;