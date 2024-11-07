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

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLogin = () => {
    setShowAuthDialog(false);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setShowLogoutDialog(false);
    setIsLoggedIn(false);
  };

  const Logo = () => (
    <div
      className="flex items-center space-x-3 cursor-pointer"
      onClick={() => router.push("/")}
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative bg-white rounded-lg p-2 shadow-md">
          <FileCheck className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl sm:text-2xl font-bold">
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Resume
          </span>
          <span className="text-gray-700">Builder</span>
        </h1>
        <p className="text-xs text-gray-500 font-medium hidden sm:block">
          Craft Your Career Story
        </p>
      </div>
    </div>
  );

  const DesktopNav = () => (
    <nav className="hidden lg:flex items-center space-x-6">
      {navigation.map((item) => (
        <div
          key={item.title}
          className="relative group"
          onMouseEnter={() => setActiveDropdown(item.title)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-all px-3 py-2 rounded-lg hover:bg-blue-50 group">
            {item.icon}
            <span className="font-medium">{item.title}</span>
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
              className={`absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl transform transition-all duration-200 ${
                activeDropdown === item.title
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-4"
              }`}
            >
              <div className="p-3 space-y-1">
                {item.submenu.map((subItem) => (
                  <button
                    key={subItem.title}
                    onClick={() => router.push(subItem.href)}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="font-medium text-gray-700">
                      {subItem.title}
                    </div>
                    {subItem.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {subItem.description}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );

  const MobileMenu = () => (
    <div
      className={`lg:hidden fixed inset-0 z-50 transform transition-transform duration-300 ${
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="absolute inset-0 bg-gray-800/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
      <div className="absolute right-0 top-0 h-full w-[85%] max-w-md bg-white shadow-2xl">
        <div className="flex justify-end p-4">
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="px-4 py-2 space-y-1">
          {navigation.map((item) => (
            <div key={item.title} className="space-y-1">
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
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span className="font-medium">{item.title}</span>
                </div>
                {item.submenu && (
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      activeDropdown === item.title ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {item.submenu && (
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeDropdown === item.title ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="pl-4 space-y-1">
                    {item.submenu.map((subItem) => (
                      <button
                        key={subItem.title}
                        onClick={() => {
                          router.push(subItem.href);
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <div className="font-medium">{subItem.title}</div>
                        {subItem.description && (
                          <p className="text-sm text-gray-500 mt-1">
                            {subItem.description}
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="pt-4 space-y-3">
            {isLoggedIn && (
              <button
                className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                onClick={() => {
                  router.push("/pages/profile");
                  setIsMobileMenuOpen(false);
                }}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Profile</span>
              </button>
            )}
            
            <button
              className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
              onClick={() => {
                if (isLoggedIn) {
                  setShowLogoutDialog(true);
                } else {
                  setShowAuthDialog(true);
                }
                setIsMobileMenuOpen(false);
              }}
            >
              {isLoggedIn ? (
                <>
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span className="font-medium">Sign In</span>
                </>
              )}
            </button>

            <button
              className="w-full bg-blue-600 text-white p-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors shadow-lg"
              onClick={() => {
                router.push("/pages/all-resume");
                setIsMobileMenuOpen(false);
              }}
            >
              <Download className="w-5 h-5" />
              <span className="font-medium">Create Resume</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const AuthSection = () => (
    <div className="hidden lg:flex items-center space-x-4">
      {isLoggedIn ? (
        <>
          <button
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50"
            onClick={() => setShowLogoutDialog(true)}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
          <button
            onClick={() => router.push("/pages/profile")}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            <User className="w-5 h-5 text-blue-600" />
          </button>
        </>
      ) : (
        <button
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50"
          onClick={() => setShowAuthDialog(true)}
        >
          <LogIn className="w-5 h-5" />
          <span className="font-medium">Sign In</span>
        </button>
      )}

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg flex items-center space-x-2 transition-colors shadow-md hover:shadow-lg"
        onClick={() => router.push("/pages/all-resume")}
      >
        <Download className="w-4 h-4" />
        <span className="font-medium">Create Resume</span>
      </button>
    </div>
  );

  return (
    <header
      className={`relative w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95  shadow-lg" : "bg-white/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          <Logo />
          <DesktopNav />
          <AuthSection />

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      <MobileMenu />

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