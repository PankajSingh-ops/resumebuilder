import React, { useState, useEffect } from 'react';
import { Plus, Trash2, BookOpen, Lightbulb, Users, Award } from 'lucide-react';
import { AdditionalInfoData, Award as AwardType, Membership, Patent, Publication } from '@/app/common/types';

interface Props {
  formData: AdditionalInfoData;
  setFormData: (data: AdditionalInfoData) => void;
  onValidationChange: (isValid: boolean) => void;
}
type SectionType<T extends keyof AdditionalInfoData> = AdditionalInfoData[T][number];

const AdditionalInfo: React.FC<Props> = ({ formData, setFormData, onValidationChange }) => {
  const [activeTab, setActiveTab] = useState<keyof AdditionalInfoData>('publications');
  const [localData, setLocalData] = useState<AdditionalInfoData>(formData);

  useEffect(() => {
    setLocalData(formData);
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const isValid = Object.values(localData).some(array => array.length > 0);
    onValidationChange(isValid);
  };

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleAddItem = (section: keyof AdditionalInfoData) => {
    const newData = { ...localData };

    switch (section) {
      case 'publications':
        newData.publications.push({
          id: generateId(),
          title: '',
          authors: '',
          journal: '',
          date: '',
          doi: ''
        });
        break;
      case 'patents':
        newData.patents.push({
          id: generateId(),
          title: '',
          patentNumber: '',
          issueDate: '',
          description: ''
        });
        break;
      case 'memberships':
        newData.memberships.push({
          id: generateId(),
          organization: '',
          membershipLevel: '',
          startDate: '',
          endDate: ''
        });
        break;
      case 'awards':
        newData.awards.push({
          id: generateId(),
          title: '',
          organization: '',
          dateAwarded: '',
          description: ''
        });
        break;
    }

    setLocalData(newData);
    setFormData(newData);
  };

  const handleRemoveItem = <T extends keyof AdditionalInfoData>(section: T, id: string) => {
    const newData = { ...localData };
    newData[section] = newData[section].filter(
      (item: SectionType<T>) => item.id !== id
    ) as AdditionalInfoData[T];
    setLocalData(newData);
    setFormData(newData);
  };

  const handleInputChange = <T extends keyof AdditionalInfoData>(
    section: T,
    id: string,
    field: keyof AdditionalInfoData[T][number],
    value: string
  ) => {
    const newData = { ...localData };
    const index = newData[section].findIndex(item => item.id === id);
    if (index !== -1) {
      newData[section][index] = {
        ...newData[section][index],
        [field]: value
      };
    }
    setLocalData(newData);
    setFormData(newData);
  };

  const tabs = [
    { id: 'publications', label: 'Publications', icon: BookOpen },
    { id: 'patents', label: 'Patents', icon: Lightbulb },
    { id: 'memberships', label: 'Memberships', icon: Users },
    { id: 'awards', label: 'Awards', icon: Award }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'publications': return BookOpen;
      case 'patents': return Lightbulb;
      case 'memberships': return Users;
      case 'awards': return Award;
      default: return BookOpen;
    }
  };

  const getSingularName = (section: keyof AdditionalInfoData): string => {
    const names: Record<keyof AdditionalInfoData, string> = {
      publications: 'Publication',
      patents: 'Patent',
      memberships: 'Membership',
      awards: 'Award'
    };
    return names[section];
  };

  const renderFields = (item: Publication | Patent | Membership | AwardType) => {
    switch (activeTab) {
      case 'publications':
        const pub = item as Publication;
        return (
          <>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                value={pub.title}
                onChange={(e) => handleInputChange('publications', pub.id, 'title', e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Authors *</label>
              <input
                type="text"
                value={pub.authors}
                onChange={(e) => handleInputChange('publications', pub.id, 'authors', e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Journal *</label>
              <input
                type="text"
                value={pub.journal}
                onChange={(e) => handleInputChange('publications', pub.id, 'journal', e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Publication Date *</label>
              <input
                type="date"
                value={pub.date}
                onChange={(e) => handleInputChange('publications', pub.id, 'date', e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">DOI</label>
              <input
                type="text"
                value={pub.doi}
                onChange={(e) => handleInputChange('publications', pub.id, 'doi', e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        );

      case 'patents':
        const pat = item as Patent;
        return (
          <>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Patent Title *</label>
              <input
                type="text"
                value={pat.title}
                onChange={(e) => handleInputChange('patents', pat.id, 'title', e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Patent Number *</label>
              <input
                type="text"
                value={pat.patentNumber}
                onChange={(e) => handleInputChange('patents', pat.id, 'patentNumber', e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date *</label>
              <input
                type="date"
                value={pat.issueDate}
                onChange={(e) => handleInputChange('patents', pat.id, 'issueDate', e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                value={pat.description}
                onChange={(e) => handleInputChange('patents', pat.id, 'description', e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
          </>
        );

      case 'memberships':
        const mem = item as Membership;
        return (
          <>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name *</label>
              <input
                type="text"
                value={mem.organization}
                onChange={(e) => handleInputChange('memberships', mem.id, 'organization', e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Membership Level *</label>
              <input
                type="text"
                value={mem.membershipLevel}
                onChange={(e) => handleInputChange('memberships', mem.id, 'membershipLevel', e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
              <input
                type="date"
                value={mem.startDate}
                onChange={(e) => handleInputChange('memberships', mem.id, 'startDate', e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={mem.endDate}
                onChange={(e) => handleInputChange('memberships', mem.id, 'endDate', e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        );

      case 'awards':
        const awd = item as AwardType;
        return (
          <>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Award Title *</label>
              <input
                type="text"
                value={awd.title}
                onChange={(e) => handleInputChange('awards', awd.id, 'title', e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization *</label>
              <input
                type="text"
                value={awd.organization}
                onChange={(e) => handleInputChange('awards', awd.id, 'organization', e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Awarded *</label>
              <input
                type="date"
                value={awd.dateAwarded}
                onChange={(e) => handleInputChange('awards', awd.id, 'dateAwarded', e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                value={awd.description}
                onChange={(e) => handleInputChange('awards', awd.id, 'description', e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as keyof AdditionalInfoData)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${activeTab === tab.id 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-6">
        {localData[activeTab].map((item, index) => {
          const Icon = getIcon(activeTab);
          return (
            <div 
              key={item.id}
              className="bg-white rounded-xl shadow-sm p-6 space-y-6 relative"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon className="h-6 w-6 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {getSingularName(activeTab)} #{index + 1}
                  </h3>
                </div>
                <button
                  onClick={() => handleRemoveItem(activeTab, item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderFields(item)}
              </div>
            </div>
          );
        })}
        <button
          type="button"
          onClick={() => handleAddItem(activeTab)}
          className="w-full py-3 px-4 rounded-lg border-2 border-dashed border-gray-300 
            text-gray-600 hover:border-blue-500 hover:text-blue-500 
            transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Plus size={20} />
          <span>Add {getSingularName(activeTab)}</span>
        </button>
      </div>
    </div>
  );
};

export default AdditionalInfo;