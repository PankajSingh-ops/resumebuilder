import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'medium', className, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium focus:outline-none focus-visible:ring focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors duration-200';

    let variantStyles = '';
    switch (variant) {
      case 'primary':
        variantStyles =
          'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500 focus-visible:ring-offset-blue-600';
        break;
      case 'secondary':
        variantStyles =
          'bg-gray-200 text-gray-700 hover:bg-gray-300 focus-visible:ring-gray-500 focus-visible:ring-offset-gray-200';
        break;
      case 'danger':
        variantStyles =
          'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 focus-visible:ring-offset-red-600';
        break;
    }

    let sizeStyles = '';
    switch (size) {
      case 'small':
        sizeStyles = 'px-3 py-1.5 text-sm rounded-md';
        break;
      case 'medium':
        sizeStyles = 'px-4 py-2 text-base rounded-md';
        break;
      case 'large':
        sizeStyles = 'px-6 py-3 text-lg rounded-md';
        break;
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;