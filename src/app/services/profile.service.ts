import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'https://swipe-backend.tryasp.net/api/Customer';

  constructor(private http: HttpClient) {}

  getCurrentCustomerInfo(): Observable<any> {
    const headers = this.getToken();
    return this.http.get(`${this.baseUrl}/GetCurrentCustomerInfo`,{headers});
  }

updateCustomerInfo(data: FormData): Observable<any> {
    const headers = this.getToken();
 

  return this.http.put(`${this.baseUrl}`, data, {
    headers,
    observe: 'response'
  });
}

 getToken(): any {
        const token = JSON.parse(localStorage.getItem('userToken') || 'null')?.token || JSON.parse(sessionStorage.getItem('userToken') || 'null')?.token;
       const headers = { Authorization: `Bearer ${token}` };
       return headers
}
}
