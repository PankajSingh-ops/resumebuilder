"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Briefcase, UserCheck, Building2, LineChart, Code2, Users, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Header } from '@/app/common/Header';
import { Footer } from '@/app/common/Footer';
import { templates } from './ResumeTemplate';

const categories = [
  { id: 'all', label: 'All Templates', icon: Filter, count: 45 },
  { id: 'professional', label: 'Professional', icon: Briefcase, count: 12 },
  { id: 'fresher', label: 'Freshers', icon: UserCheck, count: 8 },
  { id: 'mnc', label: 'MNC', icon: Building2, count: 10 },
  { id: 'business', label: 'Business', icon: LineChart, count: 6 },
  { id: 'technical', label: 'Technical', icon: Code2, count: 5 },
  { id: 'jobseeker', label: 'Job Seeker', icon: Users, count: 4 }
];

const ITEMS_PER_PAGE = 6;

const ResumeTemplateSelector = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Initialize category from query parameter
  useEffect(() => {
    const categoryFromQuery = searchParams.get('category');
    if (categoryFromQuery && categories.some(cat => cat.id === categoryFromQuery)) {
      setSelectedCategory(categoryFromQuery);
    }
  }, [searchParams]);

  // Update URL when category changes
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    setIsSidebarOpen(false);
    
    // Update URL with new category
    const newUrl = categoryId === 'all' 
      ? '/pages/all-resume'
      : `/pages/all-resume?category=${categoryId}`;
    router.push(newUrl);
  };

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.categories.includes(selectedCategory);
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTemplates = filteredTemplates.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleTemplateSelect = (templateId: number) => {
    router.push(`/pages/resume/editor/${templateId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header/>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 animate-gradient">
              Choose Your Resume Template
            </h1>
            <p className="text-base md:text-lg text-gray-600 mt-4">
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

          {/* Mobile Category Toggle */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full px-4 py-3 bg-white rounded-lg shadow-sm flex items-center justify-between"
            >
              <span className="font-medium">Categories</span>
              <Filter size={20} className={`transform transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Category Sidebar */}
            <div className={`lg:w-64 space-y-2 ${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedTemplates.map((template) => (
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`w-10 h-10 rounded-lg ${
                        currentPage === index + 1
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ResumeTemplateSelector;