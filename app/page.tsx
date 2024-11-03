"use client"
import Link from "next/link"
import { Header } from "./common/Header"
import { Footer } from "./common/Footer"
import { ArrowRight, FileText, Star, Users } from "lucide-react"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"

export default function Home() {
  const [user, setIsUser]=useState(false)
  useEffect(() => {
    const token = Cookies.get('token');
    setIsUser(!!token);
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section - Updated text classes for better contrast */}
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Create Professional Resumes in Minutes
              </h1>
              <p className="text-xl mb-8 text-white font-medium">
                Stand out from the crowd with our professional resume builder. Easy to use, professionally designed templates.
              </p>
              <div className="flex gap-4">
                <Link 
                  href="/builder" 
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </Link>
                {!user && (
                  <Link 
                    href="/login" 
                    className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors border-2 border-white"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Updated for better contrast */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose Our Resume Builder?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <FileText className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Professional Templates</h3>
                <p className="text-gray-700 font-medium">
                  Choose from our collection of ATS-friendly templates designed by HR experts.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <Star className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Easy to Use</h3>
                <p className="text-gray-700 font-medium">
                  Simple drag-and-drop interface to create your perfect resume in minutes.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <Users className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Expert Tips</h3>
                <p className="text-gray-700 font-medium">
                  Get real-time suggestions and tips from our career experts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action - Updated for better contrast */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Ready to Build Your Professional Resume?</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto font-medium">
              Join thousands of job seekers who have successfully landed their dream jobs using our platform.
            </p>
            <Link 
              href="/builder" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors inline-flex items-center gap-2"
            >
              Start Building Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}