"use client"
import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Menu,
  X,
  Download,
  FileCheck,
  LogIn,
  LogOut,
  User,
} from "lucide-react";
import { AuthDialog } from "../pages/auth/AuthDialog";
import { LogoutDialog } from "../pages/auth/LogoutDialog";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { navigation } from "../data/Navigation";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = Cookies.get('token');
    setIsLoggedIn(!!token);
  }, []);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    setShowAuthDialog(false);
  };

  const handleLogout = () => {
    setShowLogoutDialog(false);
    setIsLoggedIn(false)
  };

  const ProfileButton = () => (
    <button
      onClick={() => router.push("/pages/profile")}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
    >
      <User className="w-5 h-5 text-blue-600" />
    </button>
  );

  const AuthButton = () => (
    <div className="relative group">
      {isLoggedIn ? (
        <div className="flex items-center space-x-4">
          <button
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50"
            onClick={() => setShowLogoutDialog(true)}
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
          <ProfileButton />
        </div>
      ) : (
        <button
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50"
          onClick={() => setShowAuthDialog(true)}
        >
          <LogIn className="w-5 h-5" />
          <span>Sign In</span>
        </button>
      )}
    </div>
  );

  return (
    <header
      className={`w-full z-50 transition-all duration-300 sticky top-0 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="w-full mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => router.push("/")}
          >
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
                          onClick={() => router.push(`${subItem.href}`)}
                          className="block px-4 py-3 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
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

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full flex items-center space-x-2 transition-colors shadow-lg hover:shadow-xl" onClick={() => router.push("/pages/all-resume")}>
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
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-white z-50 overflow-auto transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {navigation.map((item) => (
            <div key={item.title} className="space-y-2">
              <button
                className="w-full flex items-center justify-between p-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                onClick={() => {
                  if (item.submenu) {
                    setActiveDropdown(
                      activeDropdown === item.title ? null : item.title
                    );
                  } else {
                    router.push(item.href);
                    setIsMobileMenuOpen(false);
                  }
                }}
              >
                <div className="flex items-center space-x-2">
                  {item.icon}
                  <span>{item.title}</span>
                </div>
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
                  className={`pl-4 space-y-2 transition-all duration-300 ${
                    activeDropdown === item.title ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {item.submenu.map((subItem) => (
                    <a
                      key={subItem.title}
                      onClick={() => {
                        router.push(`${subItem.href}`);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block px-4 py-2 text-gray-600 cursor-pointer hover:text-blue-600 rounded-lg hover:bg-blue-50/50"
                    >
                      {subItem.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="space-y-4">
            {isLoggedIn && (
              <button
                className="w-full flex items-center space-x-2 p-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                onClick={() => {
                  router.push("/pages/profile");
                  setIsMobileMenuOpen(false);
                }}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </button>
            )}
            <button
              className="w-full flex items-center justify-between p-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
              onClick={() => {
                if (isLoggedIn) {
                  setShowLogoutDialog(true);
                  setIsMobileMenuOpen(false);
                } else {
                  setShowAuthDialog(true);
                  setIsMobileMenuOpen(false);
                }
              }}
            >
              <div className="flex items-center space-x-2">
                {isLoggedIn ? (
                  <LogOut className="w-5 h-5" />
                ) : (
                  <LogIn className="w-5 h-5" />
                )}
                <span>{isLoggedIn ? "Sign Out" : "Sign In"}</span>
              </div>
            </button>
            <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-full flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors" onClick={() => {
              router.push("/pages/all-resume");
              setIsMobileMenuOpen(false);
            }}>
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