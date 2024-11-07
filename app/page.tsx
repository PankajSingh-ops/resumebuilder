"use client"
import Link from "next/link"
import { Header } from "./common/Header"
import { Footer } from "./common/Footer"
import { ArrowRight, FileText, Star, Users, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import FeaturesGrid from "./ui/home/FeatureCard"
import { useRouter } from "next/navigation"

export default function Home() {
  const [user, setIsUser] = useState(false)
  useEffect(() => {
    const token = Cookies.get('token');
    setIsUser(!!token);
  }, [user]);
  const router=useRouter()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section - Modern gradient background with pattern */}
      <main className="flex-grow">
        <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-purple-600 py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIC8+PC9zdmc+')] opacity-30" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
                Craft Your Future with <span className="text-yellow-300">Professional Resumes</span>
              </h1>
              <p className="text-xl mb-8 text-gray-100 font-medium">
                Transform your career journey with our intelligent resume builder. 
                Create ATS-friendly resumes that capture attention and land interviews.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  onClick={()=>router.push("/pages/all-resume")}
                  className="bg-white text-blue-600 px-8 py-4 cursor-pointer rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 text-lg"
                >
                  Build Your Resume <ArrowRight className="w-5 h-5" />
                </a>
                {!user && (
                  <a 
                    onClick={()=>router.push("/pages/auth")} 
                    className="bg-transparent text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all border-2 border-white flex items-center justify-center gap-2 text-lg cursor-pointer"
                  >
                    Sign In to Get Started
                  </a>
                )}
              </div>
              <div className="mt-12 flex gap-8 flex-wrap">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-300" />
                  <span className="text-gray-100">ATS-Optimized</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-300" />
                  <span className="text-gray-100">Expert-Approved Templates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-300" />
                  <span className="text-gray-100">AI-Powered Suggestions</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Modern cards with hover effects */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
              Why Professionals Choose Our Platform
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Smart Templates</h3>
                <p className="text-gray-600 leading-relaxed">
                  Choose from our collection of ATS-friendly templates designed by HR experts and tailored for your industry.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="bg-yellow-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Star className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Intuitive Builder</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our drag-and-drop interface makes resume creation effortless. Build your perfect resume in minutes, not hours.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">AI-Powered Tips</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get real-time suggestions and improvements from our AI-powered system trained on successful resumes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <FeaturesGrid/>

        {/* Call to Action - Gradient background with pattern */}
        <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-blue-800 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIC8+PC9zdmc+')] opacity-30" />
          <div className="container mx-auto px-6 text-center relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Launch Your Career Forward?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join over 100,000+ professionals who have accelerated their career growth using our platform.
            </p>
            <Link 
              href="/builder" 
              className="bg-white text-blue-600 px-10 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2 text-lg"
            >
              Create Your Resume Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}