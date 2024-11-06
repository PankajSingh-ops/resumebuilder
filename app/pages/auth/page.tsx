"use client"
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { AlertDialog, AlertDialogDescription, AlertDialogTitle } from '@/app/ui/alert';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/store/store';
import { setCredentials } from '@/redux/authSlice/authSlice';

interface AuthResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  token: string;
  message?: string;
}

const SignInAndRegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');



  const dispatch = useAppDispatch();
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      if (!showRegister) {
        // Sign In
        const response = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        const data: AuthResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Authentication failed');
        }

        dispatch(setCredentials({
          user: data.user,
          token: data.token
        }));

        router.push('/pages/profile');
      } else {
        // Register
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }

        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        const data: AuthResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Registration failed');
        }

        dispatch(setCredentials({
          user: data.user,
          token: data.token
        }));

        router.push('/pages/profile');
      }
    } catch (err) {
      console.log(err);
      
      setError("Not able to resgister");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {error && (
          <AlertDialog>
            <AlertDialogTitle>Error</AlertDialogTitle>
            <AlertDialogDescription>{error}</AlertDialogDescription>
          </AlertDialog>
        )}
        {!showRegister ? (
          // Sign In Section
          <div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 animate-gradient">
              Sign In
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-2 text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block font-medium mb-2 text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <a href="#" className="text-indigo-500 hover:text-indigo-600">
                    Forgot Password?
                  </a>
                </div>
                <div>
                  <button
                    type="button"
                    className="text-indigo-500 hover:text-indigo-600"
                    onClick={() => setShowRegister(true)}
                  >
                    Register
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Sign In
              </button>
            </form>
          </div>
        ) : (
          // Register Section
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-2 text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block font-medium mb-2 text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="confirm-password" className="block font-medium mb-2 text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirm-password"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <button
                    type="button"
                    className="text-indigo-500 hover:text-indigo-600"
                    onClick={() => setShowRegister(false)}
                  >
                    Sign In
                  </button>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignInAndRegisterPage;