import * as React from 'react';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant = 'primary', className = '', children, ...props }, ref) {
    const variants = {
      primary:
        'bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md',
      secondary:
        'bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md',
      ghost: 'text-gray-500 hover:text-gray-700 transition-colors',
    };

    return (
      <button
        ref={ref}
        className={`${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';