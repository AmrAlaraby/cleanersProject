
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

  