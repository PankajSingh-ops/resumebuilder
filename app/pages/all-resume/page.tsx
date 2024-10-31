"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Briefcase, UserCheck, Building2, LineChart, Code2, Users, Filter } from 'lucide-react';
import { Header } from '@/app/common/Header';
import { Footer } from '@/app/common/Footer';

const categories = [
  { id: 'all', label: 'All Templates', icon: Filter, count: 45 },
  { id: 'professional', label: 'Professional', icon: Briefcase, count: 12 },
  { id: 'fresher', label: 'Freshers', icon: UserCheck, count: 8 },
  { id: 'mnc', label: 'MNC', icon: Building2, count: 10 },
  { id: 'business', label: 'Business', icon: LineChart, count: 6 },
  { id: 'technical', label: 'Technical', icon: Code2, count: 5 },
  { id: 'jobseeker', label: 'Job Seeker', icon: Users, count: 4 }
];

const templates = [
  {
    id: 1,
    title: 'Modern Professional',
    description: 'Clean and contemporary design perfect for corporate roles',
    image: 'https://marketplace.canva.com/EAFjRZP7Qy4/1/0/1131w/canva-minimalist-modern-professional-cv-resume-xkDELtpQH94.jpg',
    categories: ['professional', 'mnc'],
    color: '#2563eb'
  },
  {
    id: 2,
    title: 'Fresh Graduate',
    description: 'Highlight your academic achievements and potential',
    image: 'https://marketplace.canva.com/EAFjRZP7Qy4/1/0/1131w/canva-minimalist-modern-professional-cv-resume-xkDELtpQH94.jpg',
    categories: ['fresher', 'jobseeker'],
    color: '#16a34a'
  },
  {
    id: 3,
    title: 'Tech Expert',
    description: 'Showcase your technical skills and projects',
    image: 'https://marketplace.canva.com/EAFjRZP7Qy4/1/0/1131w/canva-minimalist-modern-professional-cv-resume-xkDELtpQH94.jpg',
    categories: ['technical', 'professional'],
    color: '#9333ea'
  },
  {
    id: 4,
    title: 'Creative Designer',
    description: 'Perfect for showcasing your creative projects and portfolio',
    image: 'https://marketplace.canva.com/EAFjRZP7Qy4/1/0/1131w/canva-minimalist-modern-professional-cv-resume-xkDELtpQH94.jpg',
    categories: ['creative', 'portfolio'],
    color: '#f97316'
},
{
    id: 5,
    title: 'Sales Specialist',
    description: 'Highlight your sales experience and accomplishments',
    image: 'https://marketplace.canva.com/EAFjRZP7Qy4/1/0/1131w/canva-minimalist-modern-professional-cv-resume-xkDELtpQH94.jpg',
    categories: ['sales', 'professional'],
    color: '#facc15'
},
{
    id: 6,
    title: 'Education Professional',
    description: 'Designed for educators and academic professionals',
    image: 'https://marketplace.canva.com/EAFjRZP7Qy4/1/0/1131w/canva-minimalist-modern-professional-cv-resume-xkDELtpQH94.jpg',
    categories: ['mnc', 'academic'],
    color: '#10b981'
}
];

const ResumeTemplateSelector = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.categories.includes(selectedCategory);
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleTemplateSelect = (templateId: number) => {
    router.push(`/pages/resume/editor/${templateId}`);
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Resume Template
          </h1>
          <p className="text-lg text-gray-600">
            Select from our professionally designed templates to create your perfect resume
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Category Sidebar */}
          <div className="lg:w-64 space-y-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-200'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} />
                    <span className="font-medium">{category.label}</span>
                  </div>
                  <span className="bg-opacity-20 px-2 py-1 rounded-full text-sm">
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Templates Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <div className="aspect-w-3 aspect-h-4">
                    <img
                      src={template.image}
                      alt={template.title}
                      className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-semibold mb-2">{template.title}</h3>
                    <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {template.description}
                    </p>
                  </div>
                  <div
                    className="absolute top-4 right-4 w-3 h-3 rounded-full"
                    style={{ backgroundColor: template.color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ResumeTemplateSelector;