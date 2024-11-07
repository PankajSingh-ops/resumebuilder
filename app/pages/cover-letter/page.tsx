"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Tag, Filter, X, ChevronDown, Sparkles } from 'lucide-react';
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

  // Initialize category from URL query parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const categoryFromQuery = searchParams.get('category');
    if (categoryFromQuery && categories.includes(categoryFromQuery)) {
      setSelectedCategory(categoryFromQuery);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handleTemplateClick = (id: number) => {
    router.push(`/pages/cover-letter/edit/${id}`);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setIsFilterOpen(false);

    // Update URL with new category
    const newUrl = category === 'All' 
      ? '/pages/cover-letter'
      : `/pages/cover-letter/?category=${category}`;
    router.push(newUrl);
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
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-30" />
          <h1 className="text-5xl font-bold mb-6 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 animate-gradient">
              Cover Letter Templates
            </span>
            <Sparkles className="inline-block ml-2 h-8 w-8 text-yellow-400 animate-pulse" />
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover professionally crafted templates to make your application stand out
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:gap-6">
          <div className="relative flex-1 max-w-2xl mx-auto lg:mx-0">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-blue-500" />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
              </button>
            )}
            <input
              type="text"
              className="block w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl text-lg bg-white/80 backdrop-blur-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-gray-900 transition-all duration-200 shadow-sm hover:shadow-md"
              placeholder="Search templates or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ fontSize: '16px' }}
            />
          </div>

          <div className="relative w-full lg:w-auto">
            <button
              className="w-full lg:w-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm px-6 py-4 flex items-center justify-between text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 hover:shadow-md"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <div className="flex items-center gap-3">
                <Filter className="h-5 w-5 text-blue-500" />
                <span className="font-medium">Filter by Category</span>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
            {isFilterOpen && (
              <div className="absolute z-20 top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-gray-100 animate-slideDown">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300
                        ${selectedCategory === category
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-200/50 transform scale-105'
                          : 'bg-white/80 border-2 border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-500 hover:scale-105'
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
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden">
                <Skeleton variant="rectangular" height={240} />
                <div className="p-8">
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
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
                onClick={() => handleTemplateClick(template.id)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={template.image}
                    alt={template.title}
                    className="w-full h-60 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {template.title}
                  </h3>
                  <p className="mt-3 text-gray-600 text-base leading-relaxed">
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors duration-300"
                      >
                        <Tag className="h-3.5 w-3.5 mr-1.5" />
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
    <Footer />
    </>
  );
};

export default CoverLetterTemplates;