import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { MenuItem } from "@/app/common/types";

interface SidebarProps {
  menuItems: MenuItem[];
  currentPage: MenuItem["id"];
  setCurrentPage: (page: MenuItem["id"]) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  currentPage,
  setCurrentPage,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<MenuItem["id"] | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const handleResize = () => {
      const mobile = window.innerWidth <= 600;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`relative transition-all duration-300 ease-in-out
      ${isCollapsed ? "w-20" : "w-64"}
      bg-white border-r border-gray-200 shadow-lg`}
    >
      {isClient && !isMobile && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 bg-white rounded-full p-1.5 
            shadow-md border border-gray-200 hover:shadow-lg
            transition-transform duration-200 hover:scale-105
            z-50 hidden sm:block"
        >
          {isCollapsed ? (
            <ChevronRight size={16} className="text-gray-600" />
          ) : (
            <ChevronLeft size={16} className="text-gray-600" />
          )}
        </button>
      )}

      <div className={`p-6 border-b border-gray-200 ${isCollapsed ? "text-center" : ""}`}>
        <h2 className={`font-bold text-gray-800
          ${isCollapsed ? "text-sm" : "text-lg"}
          transition-all duration-200`}
        >
          {isCollapsed ? "RB" : "Resume Builder"}
        </h2>
      </div>

      <div className={`p-4 space-y-2 ${isCollapsed ? "px-2" : "px-4"}`}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          const isHovered = hoveredItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`w-full rounded-xl flex items-center gap-3
                transition-all duration-200 ease-in-out
                ${isCollapsed ? "justify-center p-3" : "px-4 py-3"}
                ${isActive
                  ? "bg-blue-500 text-white shadow-md transform scale-105"
                  : "hover:bg-blue-50 text-gray-600 hover:text-blue-600"
                }
                group relative`}
            >
              <div className={`transition-transform duration-200
                ${isHovered || isActive ? "scale-110" : ""}`}
              >
                <Icon
                  size={isCollapsed ? 24 : 20}
                  className={`transition-colors duration-200
                    ${isActive ? "text-white" : "group-hover:text-blue-500"}`}
                />
              </div>

              {!isCollapsed && (
                <span className={`font-medium whitespace-nowrap
                  transition-all duration-200
                  ${isActive
                    ? "text-white"
                    : "text-gray-600 group-hover:text-blue-600"
                  }
                  ${isHovered ? "translate-x-1" : ""}`}
                >
                  {item.label}
                </span>
              )}

              {isClient && isCollapsed && isHovered && (
                <div className="absolute left-full ml-2 px-3 py-2
                  bg-gray-800 text-white text-sm
                  rounded-md whitespace-nowrap z-50 shadow-lg"
                >
                  {item.label}
                  <div className="absolute top-1/2 -left-1 
                    transform -translate-y-1/2
                    border-4 border-transparent 
                    border-r-gray-800"
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {!isCollapsed && (
        <div className="absolute bottom-6 left-4 right-4">
          <div className="text-xs text-gray-500 mb-2">Completion Progress</div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{
                width: `${((menuItems.findIndex((item) => item.id === currentPage) + 1) / menuItems.length) * 100}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;