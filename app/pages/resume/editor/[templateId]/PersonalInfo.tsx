"use client"
import React, { useState, useEffect } from 'react';
import { AlertCircle, Calendar,  GithubIcon, Linkedin, Mail, Phone, User } from 'lucide-react';
import { FormErrors, FormTouched, PersonalInfoData } from '@/app/common/types';

interface PersonalInfoProps {
  formData: PersonalInfoData;
  setFormData: (data: PersonalInfoData) => void;
  onValidationChange: (isValid: boolean) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ 
  formData, 
  setFormData,
  onValidationChange 
}) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.trim() === '' ? `${name === 'firstName' ? 'First' : 'Last'} name is required` : '';
      case 'email':
        return !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? 'Please enter a valid email address' : '';
      case 'phone':
        return !value.match(/^\+?[\d\s-()]{10,}$/) ? 'Please enter a valid phone number' : '';
      case 'dateOfBirth':
        if (!value) return 'Date of birth is required';
        const date = new Date(value);
        const now = new Date();
        if (date > now) return 'Date of birth cannot be in the future';
        return '';
      default:
        return '';
    }
  };

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof PersonalInfoData]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (touched[name as keyof FormTouched]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Validate form and update parent component
  useEffect(() => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth'];
    const hasErrors = Object.values(errors).some(error => error !== '');
    const allRequiredFieldsFilled = requiredFields.every(
      field => formData[field as keyof PersonalInfoData]
    );
    
    const valid = !hasErrors && allRequiredFieldsFilled;
    setIsFormValid(valid);
    onValidationChange(valid);
  }, [formData, errors]);

  // Input field component for reusability
  const InputField = ({ 
    label, 
    name, 
    type = 'text', 
    required = false,
    icon: Icon,
    placeholder,
    value,
    pattern,
  }: {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon?: React.ComponentType<any>;
    placeholder?: string;
    value: string;
    pattern?: string;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && '*'}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={() => handleBlur(name)}
          pattern={pattern}
          className={`${Icon ? 'pl-10' : 'pl-3'} w-full rounded-lg border 
            ${errors[name as keyof FormErrors] && touched[name as keyof FormTouched] 
              ? 'border-red-300' 
              : 'border-gray-300'
            } p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition duration-150 ease-in-out
          `}
          placeholder={placeholder}
        />
        {errors[name as keyof FormErrors] && touched[name as keyof FormTouched] && (
          <p className="mt-1 text-sm text-red-600">{errors[name as keyof FormErrors]}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <User className="h-6 w-6 text-blue-500" />
          Personal Information
        </h2>
        
        {/* Required Fields Notice */}
        <div className="bg-blue-50 text-blue-800 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <p className="text-sm">
            Fields marked with an asterisk (*) are required for your resume
          </p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 gap-6">
          {/* Name Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="First Name"
              name="firstName"
              icon={User}
              required
              placeholder="John"
              value={formData.firstName}
            />
            <InputField
              label="Last Name"
              name="lastName"
              icon={User}
              required
              placeholder="Doe"
              value={formData.lastName}
            />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Email Address"
              name="email"
              type="email"
              icon={Mail}
              required
              placeholder="john.doe@example.com"
              value={formData.email}
            />
            <InputField
              label="Phone Number"
              name="phone"
              type="tel"
              icon={Phone}
              required
              placeholder="+1 (123) 456-7890"
              value={formData.phone}
              pattern="^\+?[\d\s-()]{10,}$"
            />
          </div>

          {/* Date of Birth */}
          <InputField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            icon={Calendar}
            required
            value={formData.dateOfBirth}
          />

          {/* Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="LinkedIn Profile"
              name="linkedin"
              type="url"
              icon={Linkedin}
              placeholder="https://linkedin.com/in/johndoe"
              value={formData.linkedin}
            />
            <InputField
              label="GitHub Profile"
              name="github"
              type="url"
              icon={GithubIcon}
              placeholder="https://github.com/johndoe"
              value={formData.github}
            />
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="City"
              name="city"
              placeholder="New York"
              value={formData.city}
            />
            <InputField
              label="State"
              name="state"
              placeholder="NY"
              value={formData.state}
            />
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Professional Summary
            </label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief overview of your professional background and career objectives..."
            />
          </div>
        </div>

        {/* Form Status */}
        {!isFormValid && Object.keys(touched).length > 0 && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              Please fill in all required fields correctly to proceed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;