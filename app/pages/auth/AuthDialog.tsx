import React, { useState } from 'react';
import {
  Dialog,
} from '@mui/material';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/app/ui/dialog';
import { Label } from '@/app/ui/label';
import { Lock, Mail } from 'lucide-react';
import { Input } from '@/app/ui/input';
import { Button } from '@/app/ui/button';
import { AuthResponse } from '@/app/api/types/BackendTypes';
import { setCredentials } from '@/redux/authSlice/authSlice';
import { useAppDispatch } from '@/redux/store/store';

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
  onToggleMode?: () => void;
}

const AuthDialog: React.FC<AuthDialogProps> = ({
    open,
    onClose,
    onToggleMode,
  }) => {
    const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const dispatch=useAppDispatch()
  
    const validateForm = () => {
      if (!formData.email || !formData.password) {
        setError('Please fill in all required fields');
        return false;
      }
      
      if (authMode === 'register') {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return false;
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters long');
          return false;
        }
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        return false;
      }
      
      return true;
    };
  
    // In AuthDialog.tsx, update handleSubmit:
const handleSubmit = async () => {
  try {
    setError(null);
    if (!validateForm()) return;
    
    setLoading(true);
    const endpoint = authMode === 'signin' ? '/api/auth/signin' : '/api/auth/register';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });
    
    const data: AuthResponse = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Authentication failed');
    }
    
    // Save to localStorage before dispatching
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    dispatch(setCredentials({
      user: data.user,
      token: data.token
    }));
    
    onClose();
  } catch (error) {
    setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    console.error('Authentication error:', error);
  } finally {
    setLoading(false);
  }
};

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'register' : 'signin');
    setFormData({ email: '', password: '', confirmPassword: '' });
    if (onToggleMode) {
      onToggleMode();
    }
  };
 
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
     <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {authMode === 'signin' ? 'Sign In' : 'Create Account'}
          </DialogTitle>
          <DialogDescription>
            {authMode === 'signin' 
              ? 'Enter your credentials to access your account'
              : 'Fill in the details below to create your account'}
          </DialogDescription>
        </DialogHeader>
        {error && (
          <div className="p-3 mb-4 text-sm text-red-800 bg-red-100 rounded-lg">
            {error}
          </div>
        )}
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="email"
                type="email"
                className="pl-10"
                placeholder="Enter your email"
                value={formData.email}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e:any) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="password"
                type="password"
                className="pl-10"
                placeholder="Enter your password"
                value={formData.password}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e:any) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>
          {authMode === 'register' && (
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="confirmPassword"
                  type="password"
                  className="pl-10"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onChange={(e:any) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>
            </div>
          )}
        </div>
        <DialogFooter className="flex-col space-y-4">
          <div className="w-full">
          <Button 
              className="w-full p-2 bg-blue-600 hover:bg-blue-700" 
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="mr-2">Loading...</span>
                </span>
              ) : (
                authMode === 'signin' ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </div>
          {authMode === 'signin' && (
            <Button
              variant="link"
              className="text-sm text-blue-600 hover:text-blue-800"
              onClick={() => {/* Add forgot password logic */}}
            >
              Forgot password?
            </Button>
          )}
          <Button
            variant="ghost"
            className="text-sm"
            onClick={toggleAuthMode}
          >
            {authMode === 'signin' 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Sign in"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


export { AuthDialog};