export function AlertDialog({ 
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
        <div className="relative bg-white rounded-lg w-full max-w-md mx-4">
          {children}
        </div>
      </div>
    );
  }
  
  export function AlertDialogContent({ children }: { children: React.ReactNode }) {
    return <div className="p-6">{children}</div>;
  }
  
  export function AlertDialogHeader({ children }: { children: React.ReactNode }) {
    return <div className="space-y-2 mb-4">{children}</div>;
  }
  
  export function AlertDialogTitle({ children }: { children: React.ReactNode }) {
    return <h2 className="text-lg font-semibold">{children}</h2>;
  }
  
  export function AlertDialogDescription({ children }: { children: React.ReactNode }) {
    return <p className="text-sm text-gray-500">{children}</p>;
  }
  
  export function AlertDialogFooter({ children }: { children: React.ReactNode }) {
    return <div className="mt-6 flex justify-end space-x-2">{children}</div>;
  }
  
  export function AlertDialogAction({ 
    children,
    onClick
  }: { 
    children: React.ReactNode;
    onClick?: () => void;
  }) {
    return (
      <button
        onClick={onClick}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        {children}
      </button>
    );
  }
  
  export function AlertDialogCancel({ 
    children = "Cancel",
    onClick
  }: { 
    children?: React.ReactNode;
    onClick?: () => void;
  }) {
    return (
      <button
        onClick={onClick}
        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        {children}
      </button>
    );
  }
  