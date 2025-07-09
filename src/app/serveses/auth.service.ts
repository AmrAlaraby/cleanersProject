import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse, LoginApiResponse, register } from '../modules/auth/interfaces/auth';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(private _httpClint:HttpClient
  ) { }



  login(payload:register):Observable<LoginApiResponse>{
    return this._httpClint.post<LoginApiResponse>('http://cleaning.runasp.net/api/Account/login',payload)
  }

  register(payload:register):Observable<ApiResponse>{
    return this._httpClint.post<ApiResponse>('http://cleaning.runasp.net/api/Account/register',payload)
  }
}
