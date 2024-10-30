import React from 'react';

export function Dialog({ 
  children, 
  open, 
  onOpenChange 
}: { 
  children: React.ReactNode; 
  open?: boolean; 
  onOpenChange?: (open: boolean) => void;
}) {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange?.(false)} />
      <div className="relative bg-white rounded-lg w-full max-w-md mx-4 max-h-[90vh] overflow-auto">
        {children}
      </div>
    </div>
  );
}

export function DialogContent({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function DialogHeader({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`space-y-2 mb-4 ${className}`}>{children}</div>;
}

export function DialogTitle({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>;
}

export function DialogDescription({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
}

export function DialogFooter({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return <div className={`mt-6 flex justify-end space-x-2 ${className}`}>{children}</div>;
}