import React from 'react'
import { TeamMember } from '../interface/AboutUs';
import { Header } from '../common/Header';

function AboutUs() {
    const teamMembers: TeamMember[] = [
        {
          name: "Sarah Johnson",
          role: "Founder & CEO",
          description: "10+ years of experience in HR and resume consulting",
          imageUrl: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-in-shirt-smiles-and-gives-thumbs-up-to-show-approval-png-image_13146336.png"
        },
        {
          name: "Mike Chen",
          role: "AI Lead",
          description: "Expert in AI-powered content generation and optimization",
          imageUrl: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-in-shirt-smiles-and-gives-thumbs-up-to-show-approval-png-image_13146336.png"
        },
        {
          name: "Emma Wilson",
          role: "Head of Design",
          description: "Specialist in creating professional resume templates",
          imageUrl: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-in-shirt-smiles-and-gives-thumbs-up-to-show-approval-png-image_13146336.png"
        }
      ];
    
      return (
        <>
        <Header/>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                Empowering Your Career Journey
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                We combine professional expertise with cutting-edge AI technology to help you create
                standout resumes and cover letters that get you noticed.
              </p>
            </div>
    
            {/* Features Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-16">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-blue-600 text-2xl font-bold mb-4">01.</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Writing</h3>
                <p className="text-gray-600">
                  Our advanced AI helps you craft compelling content that highlights your strengths
                  and achievements.
                </p>
              </div>
    
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-blue-600 text-2xl font-bold mb-4">02.</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Templates</h3>
                <p className="text-gray-600">
                  Choose from hundreds of ATS-friendly templates designed by HR professionals.
                </p>
              </div>
    
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-blue-600 text-2xl font-bold mb-4">03.</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Support</h3>
                <p className="text-gray-600">
                  Get personalized guidance from our team of career development experts.
                </p>
              </div>
            </div>
    
            {/* Team Section */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
              <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                {teamMembers.map((member) => (
                  <div key={member.name} className="text-center">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="mx-auto rounded-full shadow-lg"
                    />
                    <h3 className="mt-6 text-xl font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-blue-600 font-medium">{member.role}</p>
                    <p className="mt-2 text-gray-600">{member.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </>
      );
    };

export default AboutUs