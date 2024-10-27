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