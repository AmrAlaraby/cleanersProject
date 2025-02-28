import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse, LoginApiResponse, register } from '../modules/auth/interfaces/auth';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClint:HttpClient
  ) { }

  userData=new BehaviorSubject(null)

  saveUserData(){
 
    const userPayload =localStorage.getItem('userToken') ||sessionStorage.getItem('userToken')
    if (userPayload && JSON.parse(userPayload).token) {
        let encodedToken =JSON.parse(userPayload).token
      let decodedToken:any = jwtDecode(encodedToken)
      this.userData.next(decodedToken)
      console.log(this.userData);
      
      }
  }

  login(payload:register):Observable<LoginApiResponse>{
    return this._httpClint.post<LoginApiResponse>('http://cleaning.runasp.net/api/Account/login',payload)
  }

  register(payload:register):Observable<ApiResponse>{
    return this._httpClint.post<ApiResponse>('http://cleaning.runasp.net/api/Account/register',payload)
  }
}
