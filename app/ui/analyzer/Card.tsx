import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={`bg-white shadow-lg rounded-lg ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children }: CardProps) => {
  return (
    <div className="p-6 border-b">
      {children}
    </div>
  );
};

export const CardTitle = ({ children }: CardProps) => {
  return (
    <h2 className="text-2xl font-bold">{children}</h2>
  );
};

export const CardContent = ({ children }: CardProps) => {
  return (
    <div className="p-6">
      {children}
    </div>
  );
};

export const CardFooter = ({ children }: CardProps) => {
  return (
    <div className="p-6 border-t">
      {children}
    </div>
  );
};