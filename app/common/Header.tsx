"use client";
import React, { useState, useEffect } from "react";
import {
  Layout,
  ChevronDown,
  Menu,
  X,
  Download,
  FileCheck,
  Star,
  BookOpen,
  LogIn,
  LogOut,
  User,
} from "lucide-react";
import { NavItem } from "./types";
import { AuthDialog, LogoutDialog } from "../pages/auth/AuthDialog";

const navigation: NavItem[] = [
  {
    title: "Templates",
    href: "/templates",
    icon: <Layout className="w-5 h-5" />,
    submenu: [
      {
        title: "Professional",
        href: "/templates/professional",
        description: "Clean and modern templates for corporate jobs",
      },
      {
        title: "Creative",
        href: "/templates/creative",
        description: "Stand out with unique designs for creative fields",
      },
      {
        title: "Academic",
        href: "/templates/academic",
        description: "Specialized templates for academic positions",
      },
    ],
  },
  {
    title: "Features",
    href: "/features",
    icon: <Star className="w-5 h-5" />,
    submenu: [
      {
        title: "AI Writing Assistant",
        href: "/features/ai-assistant",
        description: "Get help writing your resume content",
      },
      {
        title: "Custom Sections",
        href: "/features/custom-sections",
        description: "Create unique sections for your resume",
      },
    ],
  },
  {
    title: "Resources",
    href: "/resources",
    icon: <BookOpen className="w-5 h-5" />,
    submenu: [
      {
        title: "Resume Guide",
        href: "/resources/guide",
        description: "Learn how to write an effective resume",
      },
      {
        title: "Career Blog",
        href: "/resources/blog",
        description: "Tips and advice for job seekers",
      },
    ],
  },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowAuthDialog(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogoutDialog(false);
  };

  const AuthButton = () => (
    <div className="relative group">
      <button
        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50"
        onClick={() =>
          isAuthenticated ? setShowLogoutDialog(true) : setShowAuthDialog(true)
        }
      >
        {isAuthenticated ? (
          <>
            <User className="w-5 h-5" />
            <span>Sign Out</span>
          </>
        ) : (
          <>
            <LogIn className="w-5 h-5" />
            <span>Sign In</span>
          </>
        )}
      </button>
    </div>
  );

  return (
    <header
      className={`w-full z-50 transition-all duration-300 relative ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl transform group-hover:rotate-6 transition-transform duration-300" />
              <div className="relative bg-white rounded-lg p-2">
                <FileCheck className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Resume
                </span>
                <span className="text-gray-700">Builder</span>
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                Craft Your Career Story
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div
                key={item.title}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50">
                  {item.icon}
                  <span>{item.title}</span>
                  {item.submenu && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        activeDropdown === item.title ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {item.submenu && (
                  <div
                    className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl transition-all duration-300 ${
                      activeDropdown === item.title
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-4"
                    }`}
                  >
                    <div className="p-4 space-y-2">
                      {item.submenu.map((subItem) => (
                        <a
                          key={subItem.title}
                          href={subItem.href}
                          className="block px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <div className="font-medium text-gray-700">
                            {subItem.title}
                          </div>
                          {subItem.description && (
                            <p className="text-sm text-gray-500 mt-1">
                              {subItem.description}
                            </p>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <AuthButton />

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full flex items-center space-x-2 transition-colors shadow-lg hover:shadow-xl">
              <Download className="w-4 h-4" />
              <span>Create Resume</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden bg-gray-50`}
      >
        <div className="px-4 py-6 space-y-4">
          {navigation.map((item) => (
            <div key={item.title} className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-2">
                  {item.icon}
                  <span>{item.title}</span>
                </div>
                {item.submenu && <ChevronDown className="w-4 h-4" />}
              </button>
              {item.submenu && (
                <div className="pl-4 space-y-2">
                  {item.submenu.map((subItem) => (
                    <a
                      key={subItem.title}
                      href={subItem.href}
                      className="block px-4 py-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50/50"
                    >
                      {subItem.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="space-y-4">
            <button
              className="w-full flex items-center justify-between p-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
              onClick={() =>
                isAuthenticated
                  ? setShowLogoutDialog(true)
                  : setShowAuthDialog(true)
              }
            >
              <div className="flex items-center space-x-2">
                {isAuthenticated ? (
                  <LogOut className="w-5 h-5" />
                ) : (
                  <LogIn className="w-5 h-5" />
                )}
                <span>{isAuthenticated ? "Sign Out" : "Sign In"}</span>
              </div>
            </button>
            <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-full flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Create Resume</span>
            </button>
          </div>
        </div>
      </div>

      {/* Auth Dialogs */}
      <AuthDialog
        open={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        onLogin={handleLogin}
        onToggleMode={() => {}}
      />

      <LogoutDialog
        open={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onLogout={handleLogout}
      />
    </header>
  );
};
