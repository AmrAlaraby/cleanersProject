import { AccountType } from './../modules/auth/interfaces/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterCustomerRequest, RegisterWorkerRequest } from '../modules/auth/interfaces/auth';
import { jwtDecode } from 'jwt-decode';
import { AuthUserData } from '../modules/auth/interfaces/auth'; // استيراد الموديل

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private readonly BASE_URL = 'https://swipe-backend.tryasp.net/api/Authentication/';
  private readonly my_url = 'http://localhost:4200/cleanersProject/#/auth';

  // 👇 تم تحديد نوع userData
  userData = new BehaviorSubject<AuthUserData | null>(null);
  
  constructor(private http: HttpClient) {}

  saveUserData() {
    const userPayload = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
    if (userPayload) {
      const parsedPayload = JSON.parse(userPayload);
      const encodedToken = parsedPayload.token;
      const accountType = parsedPayload.accountType;
  
      if (encodedToken) {
        const decodedToken: AuthUserData = jwtDecode(encodedToken);
        const userDataWithAccountType = { ...decodedToken, accountType };
        this.userData.next(userDataWithAccountType);
        console.log('Decoded User Data:', userDataWithAccountType);
      }
    }
  }
  
  registerWorker(data: RegisterWorkerRequest): Observable<any> {
    const formData = this.toFormData(data);
    return this.http.post(`${this.BASE_URL}register/worker`, formData);
  }

  registerCustomer(data: RegisterCustomerRequest): Observable<any> {
    const formData = this.toFormData(data);
    return this.http.post(`${this.BASE_URL}register/customer`, formData);
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.BASE_URL}Login`, data);
  }

  verifyEmail(identifier: string, code: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.BASE_URL}EmailVerification`, { identifier, code });
  }

  resendOtp(identifier: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}ResendOTP`, { identifier });
  }

  refreshToken(): Observable<LoginResponse> {
    return this.http.get<LoginResponse>(`${this.BASE_URL}RefreshToken`, { withCredentials: true });
  }

  revokeToken(token?: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}RevokeToken`, token, { withCredentials: true });
  }

  forgetPassword(identifier: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}ForgetPassword/request`, { identifier, url: this.my_url });
  }

  resetPassword(userId: string, token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}ForgetPassword/confirm`, { userId, token, newPassword });
  }

  changePassword(data: { oldPassword: string, newPassword: string, confirmPassword: string }): Observable<any> {
    const token = JSON.parse(localStorage.getItem('userToken') || 'null')?.token || JSON.parse(sessionStorage.getItem('userToken') || 'null')?.token;
    const headers = { Authorization: `Bearer ${token}` };
    
    return this.http.post(`${this.BASE_URL}ChangePassword`, data, { headers }); }
    
    

  private toFormData(obj: any): FormData {
    const formData = new FormData();
    for (const key in obj) {
      if (obj[key] != null) {
        formData.append(key, obj[key]);
      }
    }
    return formData;
  }
}
