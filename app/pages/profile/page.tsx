'use client'

import React, { useState, useEffect } from 'react';
import { 
  UserCircle2, 
  Pencil, 
  Save, 
  Camera, 
  Mail, 
  Calendar, 
  Users, 
  Briefcase, 
  CreditCard 
} from 'lucide-react';
import { Header } from '@/app/common/Header';
import { Footer } from '@/app/common/Footer';
import Cookies from 'js-cookie';


const publicProfileImages = [
  '/profilepics/boy1.png',
  '/profilepics/boy2.png',
  '/profilepics/boy3.png',
  '/profilepics/boy4.png',
  '/profilepics/boy5.png',
  '/profilepics/girl1.png',
  '/profilepics/girl2.png'
];

// Helper function to get auth token
const getAuthToken = () => {
  return Cookies.get('token');
};

// Helper function for API calls
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  };

  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Handle unauthorized - redirect to login
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    currentStatus: '',
    credits: 0,
    profilePicture: publicProfileImages[0]
  });

  const [editMode, setEditMode] = useState({
    firstName: false,
    lastName: false,
    gender: false,
    dateOfBirth: false,
    currentStatus: false
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSelectingProfilePic, setIsSelectingProfilePic] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await fetchWithAuth('/api/profile');
        setProfile(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleFieldEdit = (field: keyof typeof profile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateProfile = async (field: keyof typeof editMode) => {
    try {
      const data = await fetchWithAuth('/api/profile', {
        method: 'PUT',
        body: JSON.stringify(profile)
      });
      
      setProfile(data);
      setEditMode(prev => ({
        ...prev,
        [field]: false
      }));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    }
  };

  const handleProfilePictureUpdate = async (imageUrl: string) => {
    try {
      const updatedProfile = { ...profile, profilePicture: imageUrl };
      const data = await fetchWithAuth('/api/profile', {
        method: 'PUT',
        body: JSON.stringify(updatedProfile)
      });
      
      setProfile(data);
      setIsSelectingProfilePic(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile picture');
    }
  };

  const renderEditableField = (
    label: string, 
    value: string, 
    field: keyof typeof editMode, 
    icon: React.ReactNode,
    type: 'text' | 'date' | 'select' = 'text',
    options?: string[]
  ) => {
    const isEditing = editMode[field];

    return (
      <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-all duration-300">
        <div className="flex items-center space-x-3">
          {icon}
          <div>
            <p className="text-gray-600 text-sm">{label}</p>
            {isEditing ? (
              type === 'select' ? (
                <select 
                  value={value}
                  onChange={(e) => handleFieldEdit(field as keyof typeof profile, e.target.value)}
                  className="w-full border rounded px-2 py-1 mt-1"
                >
                  {options?.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input 
                  type={type}
                  value={value}
                  onChange={(e) => handleFieldEdit(field as keyof typeof profile, e.target.value)}
                  className="w-full border rounded px-2 py-1 mt-1"
                />
              )
            ) : (
              <p className="font-semibold">{value}</p>
            )}
          </div>
        </div>
        <button 
          onClick={() => {
            if (isEditing) {
              handleUpdateProfile(field);
            } else {
              setEditMode(prev => ({
                ...prev,
                [field]: true
              }));
            }
          }}
          className={`
            p-2 rounded-full transition-all duration-300
            ${isEditing 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }
          `}
        >
          {isEditing ? <Save size={18} /> : <Pencil size={18} />}
        </button>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="relative">
                <img 
                  src={profile.profilePicture} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <button 
                  onClick={() => setIsSelectingProfilePic(!isSelectingProfilePic)}
                  className="absolute bottom-0 right-0 bg-white text-blue-500 rounded-full p-2 shadow-md"
                >
                  <Camera size={20} />
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{`${profile.firstName} ${profile.lastName}`}</h2>
                <p className="text-blue-100">{profile.currentStatus}</p>
              </div>
            </div>
          </div>

          {/* Profile Picture Selection */}
          {isSelectingProfilePic && (
            <div className="bg-gray-100 p-4 flex justify-center space-x-4">
              {publicProfileImages.map((img, index) => (
                <img 
                  key={index}
                  src={img} 
                  alt={`Avatar ${index + 1}`}
                  className="w-16 h-16 rounded-full cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => handleProfilePictureUpdate(img)}
                />
              ))}
            </div>
          )}

          {/* Profile Details Grid */}
          <div className="p-6 grid md:grid-cols-2 gap-4">
            {renderEditableField(
              'First Name', 
              profile.firstName, 
              'firstName', 
              <UserCircle2 className="text-blue-500" />
            )}

            {renderEditableField(
              'Last Name', 
              profile.lastName, 
              'lastName', 
              <UserCircle2 className="text-purple-500" />
            )}

            {renderEditableField(
              'Gender', 
              profile.gender, 
              'gender', 
              <Users className="text-green-500" />,
              'select',
              ['Male', 'Female', 'Other']
            )}

            {renderEditableField(
              'Date of Birth', 
              profile.dateOfBirth, 
              'dateOfBirth', 
              <Calendar className="text-red-500" />,
              'date'
            )}

            {renderEditableField(
              'Current Status', 
              profile.currentStatus, 
              'currentStatus', 
              <Briefcase className="text-orange-500" />,
              'select',
              ['Student', 'Job', 'Freelancer', 'Unemployed']
            )}

            <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 md:col-span-2">
              <Mail className="text-gray-500" />
              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="font-semibold">{profile.email}</p>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 md:col-span-2">
              <CreditCard className="text-blue-500" />
              <div>
                <p className="text-gray-600 text-sm">Credits</p>
                <p className="font-semibold text-blue-600">{profile.credits}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;