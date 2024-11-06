import React from 'react';
import { CheckCircle, Archive, BarChart, Award } from 'lucide-react';
import { Header } from '@/app/common/Header';
import { Footer } from '@/app/common/Footer';

const ResumeAnalyzerAbout = () => {
  return (
    <>
    <Header/>
    <div className="bg-gray-100 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 animate-gradient">Elevate Your Resume, Unlock Your Career Potential</h1>
        <p className="text-lg text-gray-600 mb-12">
          Our AI-powered Resume Analyzer is your secret weapon to creating a standout resume that showcases your unique
          strengths and sets you apart from the competition. By analyzing your resume&apos;s content, structure, and
          formatting, we provide personalized insights to help you land your dream job.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start gap-6">
            <div className="bg-blue-500 text-white p-4 rounded-full">
              <CheckCircle size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-medium mb-2 text-gray-800">Highlight Strengths</h3>
              <p className="text-gray-600">
                Our AI analyzes your resume to identify your key strengths and accomplishments, helping you showcase
                your most valuable skills.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <div className="bg-purple-500 text-white p-4 rounded-full">
              <Archive size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-medium mb-2 text-gray-800">Optimize Structure</h3>
              <p className="text-gray-600">
                We provide recommendations to improve the organization and formatting of your resume, making it
                easier to read and more impactful.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <div className="bg-green-500 text-white p-4 rounded-full">
              <BarChart size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-medium mb-2 text-gray-800">Personalized Insights</h3>
              <p className="text-gray-600">
                Our AI algorithms analyze your resume in-depth and provide tailored feedback to help you enhance your
                job application.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <div className="bg-yellow-500 text-white p-4 rounded-full">
              <Award size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-medium mb-2 text-gray-800">Boost Your Chances</h3>
              <p className="text-gray-600">
                The better your resume, the higher your chances of landing your dream job. Our Resume Analyzer is your
                secret weapon to outshine the competition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ResumeAnalyzerAbout;