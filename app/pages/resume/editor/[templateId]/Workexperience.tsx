"use client"
import React, { useState, useEffect } from 'react';
import { Plus, Briefcase, Calendar, MapPin, Trash2, HandHelping, PenTool } from 'lucide-react';

interface Experience {
    id: string;
    type: 'work' | 'internship' | 'project' | 'volunteer';
    title: string;
    organization: string;
    location?: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    achievements: string[];
    technologies?: string[];
}
  
interface WorkExperienceProps {
    formData: Experience[];
    setFormData: (data: Experience[]) => void;
    onValidationChange: (isValid: boolean) => void;
}
  

const WorkExperience: React.FC<WorkExperienceProps> = ({
  formData,
  setFormData,
  onValidationChange
}) => {
  const [activeTab, setActiveTab] = useState<'work' | 'internship' | 'project' | 'volunteer'>('work');

  const addNewExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      type: activeTab,
      title: '',
      organization: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [''],
      technologies: activeTab === 'project' ? [''] : undefined,
    };
    setFormData([...formData, newExperience]);
  };

  const updateExperience = (id: string, field: string, value: string | boolean | string[]) => {
    setFormData(formData.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    setFormData(formData.filter(exp => exp.id !== id));
  };

  const addAchievement = (id: string) => {
    setFormData(formData.map(exp => 
      exp.id === id ? { ...exp, achievements: [...exp.achievements, ''] } : exp
    ));
  };

  const updateAchievement = (expId: string, index: number, value: string) => {
    setFormData(formData.map(exp => {
      if (exp.id === expId) {
        const newAchievements = [...exp.achievements];
        newAchievements[index] = value;
        return { ...exp, achievements: newAchievements };
      }
      return exp;
    }));
  };

  const removeAchievement = (expId: string, index: number) => {
    setFormData(formData.map(exp => {
      if (exp.id === expId) {
        const newAchievements = exp.achievements.filter((_, i) => i !== index);
        return { ...exp, achievements: newAchievements };
      }
      return exp;
    }));
  };

  const addTechnology = (id: string) => {
    setFormData(formData.map(exp => 
      exp.id === id ? { ...exp, technologies: [...(exp.technologies || []), ''] } : exp
    ));
  };

  const updateTechnology = (expId: string, index: number, value: string) => {
    setFormData(formData.map(exp => {
      if (exp.id === expId) {
        const newTechnologies = [...(exp.technologies || [])];
        newTechnologies[index] = value;
        return { ...exp, technologies: newTechnologies };
      }
      return exp;
    }));
  };

  const removeTechnology = (expId: string, index: number) => {
    setFormData(formData.map(exp => {
      if (exp.id === expId) {
        const newTechnologies = (exp.technologies || []).filter((_, i) => i !== index);
        return { ...exp, technologies: newTechnologies };
      }
      return exp;
    }));
  };

  // Validate form data
  useEffect(() => {
    const validateData = () => {
      const currentExperiences = formData.filter(exp => exp.type === activeTab);
      if (currentExperiences.length === 0) return false;

      return currentExperiences.every(exp => {
        const hasBasicInfo = exp.title && exp.organization && exp.startDate;
        const hasValidDates = exp.current || (exp.endDate && new Date(exp.startDate) <= new Date(exp.endDate));
        const hasDescription = exp.description.length >= 10;
        const hasAchievements = exp.achievements.length > 0 && exp.achievements.every(a => a.length > 0);
        
        if (exp.type === 'project') {
          return hasBasicInfo && hasDescription && (exp.technologies?.length || 0) > 0;
        }
        
        return hasBasicInfo && hasValidDates && hasDescription && hasAchievements;
      });
    };

    const valid = validateData();
    onValidationChange(valid);
  }, [formData, activeTab]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'work': return Briefcase;
      case 'internship': return Briefcase;
      case 'project': return PenTool;
      case 'volunteer': return HandHelping;
      default: return Briefcase;
    }
  };

  const tabs = [
    { id: 'work', label: 'Work Experience', icon: Briefcase },
    { id: 'internship', label: 'Internships', icon: Briefcase },
    { id: 'project', label: 'Projects', icon: PenTool },
    { id: 'volunteer', label: 'Volunteer', icon: HandHelping }
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn p-2 md:p-4">
      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl overflow-x-auto md:overflow-visible">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-1 flex items-center justify-center space-x-1 md:space-x-2 px-2 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap
                ${activeTab === tab.id 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              <Icon size={16} className="md:w-5 md:h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-4 md:space-y-6">
        {formData
          .filter(exp => exp.type === activeTab)
          .map((experience, index) => {
            const Icon = getIcon(experience.type);
            return (
              <div 
                key={experience.id}
                className="bg-white rounded-xl shadow-sm p-4 md:p-6 space-y-4 md:space-y-6 relative"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <Icon className="h-5 w-5 md:h-6 md:w-6 text-blue-500" />
                    <h3 className="text-base md:text-lg font-semibold text-gray-800">
                      {experience.type === 'work' ? 'Work Experience' :
                       experience.type === 'internship' ? 'Internship' :
                       experience.type === 'project' ? 'Project' : 'Volunteer'} #{index + 1}
                    </h3>
                  </div>
                  <button
                    onClick={() => removeExperience(experience.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} className="md:w-5 md:h-5" />
                  </button>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {/* Title */}
                  <div className="col-span-2">
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      {experience.type === 'work' ? 'Job Title' :
                       experience.type === 'internship' ? 'Internship Title' :
                       experience.type === 'project' ? 'Project Title' : 'Position'} *
                    </label>
                    <input
                      type="text"
                      value={experience.title}
                      onChange={(e) => updateExperience(experience.id, 'title', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 p-2 md:p-2.5 text-sm md:text-base focus:ring-2 focus:ring-blue-500"
                      placeholder={experience.type === 'work' ? 'Software Engineer' :
                                 experience.type === 'internship' ? 'Marketing Intern' :
                                 experience.type === 'project' ? 'E-commerce Platform' : 'Volunteer Teacher'}
                    />
                  </div>

                  {/* Organization */}
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Organization *
                    </label>
                    <input
                      type="text"
                      value={experience.organization}
                      onChange={(e) => updateExperience(experience.id, 'organization', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 p-2 md:p-2.5 text-sm md:text-base focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Location */}
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                      <input
                        type="text"
                        value={experience.location}
                        onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                        className="w-full pl-8 md:pl-10 rounded-lg border border-gray-300 p-2 md:p-2.5 text-sm md:text-base focus:ring-2 focus:ring-blue-500"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                        Start Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                        <input
                          type="date"
                          value={experience.startDate}
                          onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                          className="w-full pl-8 md:pl-10 rounded-lg border border-gray-300 p-2 md:p-2.5 text-sm md:text-base focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                        End Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                        <input
                          type="date"
                          value={experience.endDate}
                          onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                          disabled={experience.current}
                          className="w-full pl-8 md:pl-10 rounded-lg border border-gray-300 p-2 md:p-2.5 text-sm md:text-base focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      <div className="mt-2">
                        <label className="flex items-center space-x-2"><input
                            type="checkbox"
                            checked={experience.current}
                            onChange={(e) => updateExperience(experience.id, 'current', e.target.checked)}
                            className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                          />
                          <span className="text-xs md:text-sm text-gray-600">Currently {experience.type === 'work' ? 'working here' : experience.type === 'internship' ? 'interning here' : 'ongoing'}</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="col-span-2">
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Description *
                    </label>
                    <textarea
                      value={experience.description}
                      onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                      rows={4}
                      className="w-full rounded-lg border border-gray-300 p-2 md:p-2.5 text-sm md:text-base focus:ring-2 focus:ring-blue-500"
                      placeholder={
                        experience.type === 'work' 
                          ? "Describe your key responsibilities and role..."
                          : experience.type === 'internship'
                          ? "Describe your internship responsibilities and what you learned..."
                          : experience.type === 'project'
                          ? "Describe the project, its goals, and your contribution..."
                          : "Describe your volunteer work and responsibilities..."
                      }
                    />
                  </div>

                  {/* Achievements */}
                  <div className="col-span-2 space-y-3 md:space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs md:text-sm font-medium text-gray-700">
                        {experience.type === 'work' ? 'Key Achievements' :
                         experience.type === 'internship' ? 'Key Learnings & Achievements' :
                         experience.type === 'project' ? 'Key Features' :
                         'Impact & Contributions'} *
                      </label>
                      <button
                        type="button"
                        onClick={() => addAchievement(experience.id)}
                        className="text-xs md:text-sm text-blue-500 hover:text-blue-600 flex items-center space-x-1"
                      >
                        <Plus size={14} className="md:w-4 md:h-4" />
                        <span>Add Achievement</span>
                      </button>
                    </div>
                    {experience.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <textarea
                          value={achievement}
                          onChange={(e) => updateAchievement(experience.id, idx, e.target.value)}
                          className="flex-1 rounded-lg border border-gray-300 p-2 md:p-2.5 text-sm md:text-base focus:ring-2 focus:ring-blue-500"
                          placeholder={
                            experience.type === 'work'
                              ? "e.g., Increased team productivity by 25% through process automation"
                              : experience.type === 'internship'
                              ? "e.g., Developed and implemented a social media strategy that increased engagement by 40%"
                              : experience.type === 'project'
                              ? "e.g., Implemented real-time chat functionality using WebSocket"
                              : "e.g., Mentored 20+ students in web development"
                          }
                          rows={2}
                        />
                        {experience.achievements.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeAchievement(experience.id, idx)}
                            className="text-gray-400 hover:text-red-500 transition-colors pt-2"
                          >
                            <Trash2 size={16} className="md:w-4 md:h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Technologies (for projects) */}
                  {experience.type === 'project' && (
                    <div className="col-span-2 space-y-3 md:space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs md:text-sm font-medium text-gray-700">
                          Technologies Used *
                        </label>
                        <button
                          type="button"
                          onClick={() => addTechnology(experience.id)}
                          className="text-xs md:text-sm text-blue-500 hover:text-blue-600 flex items-center space-x-1"
                        >
                          <Plus size={14} className="md:w-4 md:h-4" />
                          <span>Add Technology</span>
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies?.map((tech, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={tech}
                              onChange={(e) => updateTechnology(experience.id, idx, e.target.value)}
                              className="rounded-lg border border-gray-300 p-1.5 md:p-2 text-sm md:text-base focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., React"
                            />
                            {(experience.technologies?.length || 0) > 1 && (
                              <button
                                type="button"
                                onClick={() => removeTechnology(experience.id, idx)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={16} className="md:w-4 md:h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

        {/* Add New Experience Button */}
        <button
          type="button"
          onClick={addNewExperience}
          className="w-full py-2 md:py-3 px-3 md:px-4 rounded-lg border-2 border-dashed border-gray-300 
            text-gray-600 hover:border-blue-500 hover:text-blue-500 
            transition-colors duration-200 flex items-center justify-center space-x-1 md:space-x-2
            text-sm md:text-base"
        >
          <Plus size={16} className="md:w-5 md:h-5" />
          <span>Add {
            activeTab === 'work' ? 'Work Experience' :
            activeTab === 'internship' ? 'Internship' :
            activeTab === 'project' ? 'Project' : 'Volunteer Experience'
          }</span>
        </button>
      </div>
    </div>
  );
};

export default WorkExperience;