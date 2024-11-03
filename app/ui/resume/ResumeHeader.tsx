import { logout } from "@/redux/authSlice/authSlice";
import { useAppDispatch } from "@/redux/store/store";
import { CreditCard, FileCheck, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

interface User {
  id: string;
  email: string;
  credits: number;
}

function ResumeHeader() {
  // Parse the URL-encoded cookie
  const userCookie = Cookies.get("user");
  const user: User | null = userCookie ? 
    JSON.parse(decodeURIComponent(userCookie)) : null;

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
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
        <div className="hidden sm:block">
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

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
          <CreditCard className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-blue-600" suppressHydrationWarning>
            {user?.credits || 0} Credits
          </span>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 hover:bg-gray-100 rounded-full p-2 transition-colors"
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.email}
                </p>
              </div>
              <a
                href="/settings"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </a>
              <button
                className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-3" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default ResumeHeader;