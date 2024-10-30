export function Button({ 
    children,
    className = "",
    variant = "default",
    onClick,
    ...props
  }: { 
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'ghost' | 'link';
    onClick?: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }) {
    const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variantStyles = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      ghost: "hover:bg-gray-100 hover:text-gray-900",
      link: "text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline"
    };
  
    return (
      <button
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
  