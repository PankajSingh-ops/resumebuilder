"use client"
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white mb-5">
      {/* Modern Header Section */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 py-20 mb-20 lg:py-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-6">
              Contact Us
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-200 leading-relaxed">
              Let&apos;s create something amazing together
            </p>
          </div>
        </div>
      </div>

      {/* Elegant Form Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
            {/* Form Side */}
            <div className="lg:col-span-3 p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3.5 text-gray-800 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3.5 text-gray-800 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3.5 text-gray-800 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                    placeholder="How can we help?"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3.5 text-gray-800 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold px-8 py-4 rounded-lg flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Info Side */}
            <div className="lg:col-span-2 relative bg-gradient-to-br from-gray-900 to-gray-800 text-white">
              <div className="absolute inset-0 bg-[url('/api/placeholder/800/600')] opacity-10"></div>
              <div className="relative h-full p-8 lg:p-12 flex flex-col justify-between">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Our team of experts is ready to help bring your vision to life. Reach out to us and let&apos;s create something extraordinary together.
                    </p>
                  </div>
                  
                  <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
                    <div className="space-y-2 text-gray-300">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday - Sunday</span>
                        <span>10:00 AM - 4:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="text-sm text-gray-400">
                    Response Time
                    <p className="text-white mt-1">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ContactUs;