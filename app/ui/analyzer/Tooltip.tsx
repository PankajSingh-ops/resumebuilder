import React from 'react';

interface TooltipProps {
  children: React.ReactNode;
}

export const Tooltip = ({ children }: TooltipProps) => {
  return (
    <div className="relative group">
      {children}
    </div>
  );
};

export const TooltipTrigger = ({ children }: TooltipProps) => {
  return (
    <div className="cursor-pointer">{children}</div>
  );
};

export const TooltipContent = ({ children }: TooltipProps) => {
  return (
    <div className="absolute z-50 bg-gray-800 text-white py-2 px-4 rounded-md shadow-lg whitespace-nowrap transform transition-all duration-100 opacity-0 group-hover:opacity-100 group-hover:translate-y-2">
      {children}
    </div>
  );
};