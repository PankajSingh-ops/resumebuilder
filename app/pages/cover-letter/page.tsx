"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Tag, Filter, X, ChevronDown } from 'lucide-react';
import { Skeleton } from '@mui/material';
import { templates } from './CoverTemplates';
import { Header } from '@/app/common/Header';
import { Footer } from '@/app/common/Footer';

const categories = ["All", "Professional", "IT", "Marketing", "Fresher", "Creative", "Executive", "Sales", "Internship", "Government"];

const CoverLetterTemplates = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handleTemplateClick = (id: number) => {
    router.push(`/cover-letter/template/${id}`);
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || template.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 mb-4">
            Cover Letter Templates
          </h1>
          <p className="text-lg text-gray-600">
            Find the perfect cover letter template for your next career move
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-blue-500" />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            <input
              type="text"
              className="block w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-base text-gray-900 transition-all duration-200"
              placeholder="Search templates or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="relative">
            <button
              className="bg-white rounded-lg shadow-sm px-4 py-3 flex items-center justify-between w-full text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-colors duration-200 sm:px-8"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-blue-500" />
                <span className="font-medium">Filter</span>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
            {isFilterOpen && (
              <div className="absolute z-10 top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg p-4">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsFilterOpen(false);
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap
                        ${selectedCategory === category
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-200 transform scale-105'
                          : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-500'
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <Skeleton variant="rectangular" height={192} />
                <div className="p-6">
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="80%" />
                  <div className="flex flex-wrap gap-2 mt-4">
                    {Array.from({ length: 3 }).map((_, tagIndex) => (
                      <Skeleton key={tagIndex} variant="circular" width={80} height={24} />
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-blue-200"
                onClick={() => handleTemplateClick(template.id)}
              >
                <div className="relative">
                  <img
                    src={template.image}
                    alt={template.title}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                    {template.title}
                  </h3>
                  <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors duration-200"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default CoverLetterTemplates;