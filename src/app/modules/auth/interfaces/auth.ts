
export interface register {
    email: string
    password: string
  }

  export interface ApiErrorResponse {
    errors: string[];
    statusCode: number;
    message: string;
  }
  export type ApiResponse = true | ApiErrorResponse;


  export interface LoginApiResponse {
    userName: string
    profilePictureUrl: string | null
    email: string
    token: string
  }


  export interface RegisterWorkerRequest {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    phoneNumber: string;
    dateOfBirth: string; // ISO date string
    nationalId: string;
    description: string;
    hourlyRate: number;
    experienceYears: number;
    hasAcceptedTerms: boolean;
    profileImage?: File;
  }
  export interface RegisterCustomerRequest {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    phoneNumber: string;
    dateOfBirth: string;
    hasAcceptedTerms: boolean;
    profileImage?: File;
  }
  export interface LoginRequest {
    identifier: string;
    password: string;
  }
  
  export type AccountType = 'Admin' | 'Worker' | 'RegularUser' | 'Manager';

  export interface LoginResponse {
    token?: string;
    expiresOn: string; // Date as ISO string
    isEmailConfirmed: boolean;
    isTwoFactorEnabled: boolean;
    accountType: AccountType;
  
    // مش هيوصلوا من الـ API حسب `[JsonIgnore]` في C#
    // بس ممكن نضيفهم هنا لو احتجناهم بعدين داخليًا
    refreshToken?: string;
    refreshTokenExpiration?: string;
  }
      
  export interface AuthUserData {
    name: string;
    profileImage: string;
    role?: string;
    email?: string;
    exp?: number;
    iat?: number;
    [key: string]: any;
    accountType?:string
  }
  

  