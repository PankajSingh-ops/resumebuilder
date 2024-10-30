import { LucideIcon } from "lucide-react";

export interface ResumeData {
  personal: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phone: string;
    email: string;
    linkedin: string;
    github: string;
    city: string;
    state: string;
    summary: string;
  };
  experiences: Experience[];
  skills: SkillsData;
  additional: AdditionalInfoData;
}


export interface PersonalInfoData {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phone: string;
    email: string;
    linkedin: string;
    github: string;
    city: string;
    state: string;
    summary: string;
  }
  
  export interface FormErrors {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    phone?: string;
    email?: string;
  }
  
  export interface FormTouched {
    firstName?: boolean;
    lastName?: boolean;
    dateOfBirth?: boolean;
    phone?: boolean;
    email?: boolean;
  }

  export interface Experience {
    id: string;
    type: 'work' | 'education' | 'project' | 'volunteer';
    title: string;
    organization: string;
    location?: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    achievements: string[];
    technologies?: string[];
    gpa?: string;
    major?: string;
  }
  export interface Skill {
    id: string;
    name: string;
    type: 'technical' | 'soft';
    proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  }
  
  export interface Certification {
    id: string;
    name: string;
    organization: string;
    issueDate: string;
    expirationDate?: string;
    doesNotExpire: boolean;
  }
  
  export interface Language {
    id: string;
    name: string;
    proficiency: 'basic' | 'intermediate' | 'advanced' | 'fluent';
  }
  
   export interface SkillsData {
    technicalSkills: Skill[];
    softSkills: Skill[];
    certifications: Certification[];
    languages: Language[];
    hobbies: string[];
  }
  export interface Publication {
    id: string;
    title: string;
    authors: string;
    journal: string;
    date: string;
    doi: string;
  }
  
  export interface Patent {
    id: string;
    title: string;
    patentNumber: string;
    issueDate: string;
    description: string;
  }
  
  export interface Membership {
    id: string;
    organization: string;
    membershipLevel: string;
    startDate: string;
    endDate: string;
  }
  
  export interface Award {
    id: string;
    title: string;
    organization: string;
    dateAwarded: string;
    description: string;
  }
  
  export interface AdditionalInfoData {
    publications: Publication[];
    patents: Patent[];
    memberships: Membership[];
    awards: Award[];
  }

  export interface MenuItem {
    id: "personal" | "experience" | "skills" | "additional";
    label: string;
    icon: LucideIcon;
  }

  export interface NavItem {
    title: string;
    href: string;
    icon: React.ReactNode;
    submenu?: Array<{
      title: string;
      href: string;
      description?: string;
    }>;
  }
  
  export interface FooterSection {
    title: string;
    links: Array<{
      title: string;
      href: string;
    }>;
  }
  
  export interface SocialLink {
    platform: string;
    href: string;
    icon: React.ReactNode;
  }
  