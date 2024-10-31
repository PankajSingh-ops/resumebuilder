import React, { useState } from 'react';
import { Plus, Trash2, GraduationCap, Book, Award } from 'lucide-react';
import { EducationEntry } from '@/app/common/types';

interface EducationProps {
  formData: EducationEntry[];
  setFormData: (data: EducationEntry[]) => void;
  onValidationChange: (isValid: boolean) => void;
}

const Education: React.FC<EducationProps> = ({
  formData = [],
  setFormData,
}) => {
  const [activeType, setActiveType] = useState<EducationEntry['type']>('undergraduate');

  const educationTypes = [
    { id: 'highSchool', label: 'High School', icon: GraduationCap },
    { id: 'intermediate', label: 'Intermediate', icon: Book },
    { id: 'undergraduate', label: 'Undergraduate', icon: GraduationCap },
    { id: 'graduate', label: 'Graduate', icon: Award },
  ];

  const addEducation = () => {
    const newEntry: EducationEntry = {
      id: Date.now().toString(),
      type: activeType,
      schoolName: '',
      location: '',
      startDate: '',
      endDate: '',
      field: '',
      degree: '',
      gpa: '',
      description: '',
      achievements: [],
      courses: []
    };
    setFormData([...formData, newEntry]);
  };

  const removeEducation = (id: string) => {
    setFormData(formData.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof EducationEntry, value: string | string[]) => {
    setFormData(formData.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const addArrayItem = (id: string, field: 'achievements' | 'courses') => {
    setFormData(formData.map(edu => {
      if (edu.id === id) {
        return {
          ...edu,
          [field]: [...edu[field], '']
        };
      }
      return edu;
    }));
  };

  const updateArrayItem = (id: string, field: 'achievements' | 'courses', index: number, value: string) => {
    setFormData(formData.map(edu => {
      if (edu.id === id) {
        const newArray = [...edu[field]];
        newArray[index] = value;
        return {
          ...edu,
          [field]: newArray
        };
      }
      return edu;
    }));
  };

  const removeArrayItem = (id: string, field: 'achievements' | 'courses', index: number) => {
    setFormData(formData.map(edu => {
      if (edu.id === id) {
        const newArray = [...edu[field]];
        newArray.splice(index, 1);
        return {
          ...edu,
          [field]: newArray
        };
      }
      return edu;
    }));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Education Type Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl overflow-x-auto">
        {educationTypes.map(type => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id as EducationEntry['type'])}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${activeType === type.id 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              <Icon size={18} />
              <span className="hidden md:inline">{type.label}</span>
            </button>
          );
        })}
      </div>

      {/* Education Entries */}
      <div className="space-y-6">
        {formData.filter(edu => edu.type === activeType).map((edu) => (
          <div key={edu.id} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={edu.schoolName}
                onChange={(e) => updateEducation(edu.id, 'schoolName', e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5"
                placeholder="Institution Name"
              />
              <input
                type="text"
                value={edu.location}
                onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5"
                placeholder="Location"
              />
              <input
                type="date"
                value={edu.startDate}
                onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5"
              />
              <input
                type="date"
                value={edu.endDate}
                onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5"
              />
              <input
                type="text"
                value={edu.gpa || ''}
                onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5"
                placeholder="GPA (optional)"
              />
            </div>

            <textarea
              value={edu.description}
              onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2.5"
              placeholder="Description or Additional Details"
              rows={3}
            />

            {/* Achievements */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Achievements</label>
              {edu.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => updateArrayItem(edu.id, 'achievements', index, e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 p-2.5"
                    placeholder="Achievement"
                  />
                  <button
                    onClick={() => removeArrayItem(edu.id, 'achievements', index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addArrayItem(edu.id, 'achievements')}
                className="text-blue-500 hover:text-blue-600 text-sm flex items-center space-x-1"
              >
                <Plus size={16} />
                <span>Add Achievement</span>
              </button>
            </div>

            {/* Courses */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Relevant Courses</label>
              {edu.courses.map((course, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={course}
                    onChange={(e) => updateArrayItem(edu.id, 'courses', index, e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 p-2.5"
                    placeholder="Course Name"
                  />
                  <button
                    onClick={() => removeArrayItem(edu.id, 'courses', index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addArrayItem(edu.id, 'courses')}
                className="text-blue-500 hover:text-blue-600 text-sm flex items-center space-x-1"
              >
                <Plus size={16} />
                <span>Add Course</span>
              </button>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => removeEducation(edu.id)}
                className="text-red-500 hover:text-red-600 flex items-center space-x-1"
              >
                <Trash2 size={16} />
                <span>Remove Entry</span>
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={addEducation}
          className="w-full py-3 px-4 rounded-lg border-2 border-dashed border-gray-300 
            text-gray-600 hover:border-blue-500 hover:text-blue-500 
            transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Plus size={20} />
          <span>Add {educationTypes.find(t => t.id === activeType)?.label} Entry</span>
        </button>
      </div>
    </div>
  );
};

export default Education;