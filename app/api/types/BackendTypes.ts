export interface IUser {
    _id: string;
    email: string;
    password: string;
    createdAt: Date;
  }
  
  export interface IUserMethods {
    comparePassword(candidatePassword: string): Promise<boolean>;
  }
  

  // types/auth.ts
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials extends LoginCredentials {
    confirmPassword?: string;
  }
  
  export interface RegisterCredentials {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    message: string;
    token: string;
    user: {
      id: string;
      email: string;
      credits: number;
    };
  }