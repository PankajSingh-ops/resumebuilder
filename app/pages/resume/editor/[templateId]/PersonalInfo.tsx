"use client";
import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  Calendar,
  Camera,
  GithubIcon,
  Linkedin,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { FormErrors, FormTouched, PersonalInfoData } from "@/app/common/types";

interface PersonalInfoProps {
  formData: PersonalInfoData;
  setFormData: (data: PersonalInfoData) => void;
  onValidationChange: (isValid: boolean) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  formData,
  setFormData,
  onValidationChange,
}) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [isFormValid, setIsFormValid] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profileImage, setProfileImage] = useState<any>(null);


  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "firstName":
      case "lastName":
        return value.trim() === ""
          ? `${name === "firstName" ? "First" : "Last"} name is required`
          : "";
      case "email":
        return !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
          ? "Please enter a valid email address"
          : "";
      case "phone":
        return !value.match(/^\+?[\d\s-()]{10,}$/)
          ? "Please enter a valid phone number"
          : "";
      case "jobTitle":
        return value.trim() === "" ? "Job title is required" : "";
      case "dateOfBirth":
        if (!value) return "Date of birth is required";
        const date = new Date(value);
        const now = new Date();
        if (date > now) return "Date of birth cannot be in the future";
        return "";
      default:
        return "";
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof PersonalInfoData] ?? "");
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const convertToBase64 = (file: File): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result as string);
      };
      fileReader.onerror = (error) => {
        reject(error);
        console.error("Error converting to base64:", error);
      };
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);
    if (touched[name as keyof FormTouched]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
    if (e.target.name === "profileImage") {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        convertToBase64(file).then((base64) => {
          setFormData({ ...formData, profileImage: base64 });
          setProfileImage(base64);
        });
      } else {
        setFormData({ ...formData, profileImage: null });
        setProfileImage(null);
      }
    }
  };
  console.log(profileImage,"profile");
  


  // Validate form and update parent component
  useEffect(() => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "dateOfBirth",
    ];
    const hasErrors = Object.values(errors).some((error) => error !== "");
    const allRequiredFieldsFilled = requiredFields.every(
      (field) => formData[field as keyof PersonalInfoData]
    );

    const valid = !hasErrors && allRequiredFieldsFilled;
    setIsFormValid(valid);
    onValidationChange(valid);
  }, [formData, errors]);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <User className="h-6 w-6 text-blue-500" />
          Personal Information
        </h2>
        <div className="relative">
    <label
      htmlFor="profileImage"
      className="cursor-pointer flex items-center justify-center h-16 w-16 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
    >
      {typeof profileImage === "string" ? (
        <img
          src={profileImage}
          alt="Profile"
          className="h-16 w-16 rounded-full object-cover"
        />
      ) : profileImage ? (
        <img
          src={URL.createObjectURL(profileImage)}
          alt="Profile"
          className="h-16 w-16 rounded-full object-cover"
        />
      ) : (
        <Camera className="h-6 w-6" />
      )}
    </label>
    <input
      id="profileImage"
      type="file"
      name="profileImage"
      accept="image/*"
      className="hidden"
      onChange={handleChange}
    />
  </div>

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
            {/* First Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                First Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={() => handleBlur("firstName")}
                  className="pl-10 w-full rounded-lg border border-gray-300 p-3 text-base text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out bg-white"
                  placeholder="John"
                />
                {errors.firstName && touched.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstName}
                  </p>
                )}
              </div>
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                Last Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={() => handleBlur("lastName")}
                  className="pl-10 w-full rounded-lg border border-gray-300 p-3 text-base text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out bg-white"
                  placeholder="Doe"
                />
                {errors.lastName && touched.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                Job Title *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  onBlur={() => handleBlur("jobTitle")}
                  className="pl-10 w-full rounded-lg border border-gray-300 p-3 text-base text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out bg-white"
                  placeholder="Software Engineer"
                />
                {errors.jobTitle && touched.jobTitle && (
                  <p className="mt-1 text-sm text-red-600">{errors.jobTitle}</p>
                )}
              </div>
            </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-600" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur("email")}
                  className="pl-10 w-full rounded-lg border border-gray-300 p-3 text-base text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out bg-white"
                  placeholder="john.doe@example.com"
                />
                {errors.email && touched.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                Phone Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-600" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={() => handleBlur("phone")}
                  pattern="^\+?[\d\s-()]{10,}$"
                  className="pl-10 w-full rounded-lg border border-gray-300 p-3 text-base text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out bg-white"
                  placeholder="+1 (123) 456-7890"
                />
                {errors.phone && touched.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              Date of Birth *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-600" />
              </div>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                onBlur={() => handleBlur("dateOfBirth")}
                className="pl-10 w-full rounded-lg border border-gray-300 p-3 text-base text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out bg-white"
              />
              {errors.dateOfBirth && touched.dateOfBirth && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.dateOfBirth}
                </p>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LinkedIn */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                LinkedIn Profile
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Linkedin className="h-5 w-5 text-gray-600" />
                </div>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  onBlur={() => handleBlur("linkedin")}
                  className="pl-10 w-full rounded-lg border border-gray-300 p-3 text-base text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out bg-white"
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </div>
            </div>

            {/* GitHub */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                GitHub Profile
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <GithubIcon className="h-5 w-5 text-gray-600" />
                </div>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  onBlur={() => handleBlur("github")}
                  className="pl-10 w-full rounded-lg border border-gray-300 p-3 text-base text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out bg-white"
                  placeholder="https://github.com/johndoe"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* City */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                onBlur={() => handleBlur("city")}
                className="pl-3 w-full rounded-lg border border-gray-300 p-3 text-base text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out bg-white"
                placeholder="New York"
              />
            </div>

            {/* State */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                onBlur={() => handleBlur("state")}
                className="pl-3 w-full rounded-lg border border-gray-300 p-3 text-base text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out bg-white"
                placeholder="NY"
              />
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              Professional Summary
            </label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              onBlur={() => handleBlur("summary")}
              rows={4}
              className="w-full rounded-lg border border-gray-300 p-3 text-base text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out bg-white resize-y"
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
