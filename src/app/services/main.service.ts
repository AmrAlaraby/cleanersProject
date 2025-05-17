import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcceptOrderRequest, Address, ApproveAndScheduleOrderRequest, CancelOrderRequest, categories, CreateOrderRequest, CreateOrderResponse, Order, Pagination, UpdateOrderTotalAmountRequest, workers } from '../modules/main/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private baseUrl = 'https://swipe-backend.tryasp.net/api/';
  constructor(private _HttpClient:HttpClient) { }

  getAllCategories():Observable<categories>{
    return this._HttpClient.get<categories>(`${this.baseUrl}Categories`)
  }
  getAllWorkers(pageIndex = 1, pageSize = 10, search = '', categoryId?: number): Observable<workers> {
    let params = new HttpParams()
      .set('pageIndex', pageIndex)
      .set('pageSize', pageSize)
      .set('search', search);

    if (categoryId != null) {
      params = params.set('categoryId', categoryId);
    }
    console.log(params)
    return this._HttpClient.get<workers>(`${this.baseUrl}Workers`, {params});
}


  getWorkerById(workerId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}Workers/${workerId}`);
  }

  // العامل الحالي (أنا كعامل)
  getCurrentWorker(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}Workers/me`);
}

ChooseCategories(id: number): Observable<any> {
  const token = JSON.parse(localStorage.getItem('userToken') || 'null')?.token || JSON.parse(sessionStorage.getItem('userToken') || 'null')?.token;
  const headers = { Authorization: `Bearer ${token}` };

  return this._HttpClient.post(`${this.baseUrl}Workers/category/${id}`, {}, { headers });
}
// getOrderDetails(id: number): Observable<any> {
//   const token = JSON.parse(localStorage.getItem('userToken') || 'null')?.token || 
//                 JSON.parse(sessionStorage.getItem('userToken') || 'null')?.token;
//   const headers = { Authorization: `Bearer ${token}` };

//   return this._HttpClient.get(`${this.baseUrl}orders/${id}`, { headers });
// }

 getUserAddresses(): Observable<Address[]> {
  const token = JSON.parse(localStorage.getItem('userToken') || 'null')?.token || JSON.parse(sessionStorage.getItem('userToken') || 'null')?.token;
  const headers = { Authorization: `Bearer ${token}` };
    return this._HttpClient.get<Address[]>(`${this.baseUrl}addresses`, { headers });
  }

  getCustomerAddresses(customerId: string): Observable<Address[]> {
const headers = this.getToken();
    return this._HttpClient.get<Address[]>(`${this.baseUrl}addresses/admin/${customerId}`, { headers });
  }

  createAddress(address: Omit<Address, 'addressId'>): Observable<void> {
const headers = this.getToken();
    return this._HttpClient.post<void>(`${this.baseUrl}addresses`, address, { headers });
  }

  updateAddress(address: Address): Observable<void> {
const headers = this.getToken();
    return this._HttpClient.put<void>(`${this.baseUrl}addresses`, address, { headers });
  }

  deleteAddress(addressId: number): Observable<void> {
  const headers = this.getToken();
    return this._HttpClient.delete<void>(`${this.baseUrl}addresses/${addressId}`, { headers });
  }

  createOrder(request: CreateOrderRequest): Observable<CreateOrderResponse> {
    const headers = this.getToken();
    return this._HttpClient.post<CreateOrderResponse>(`${this.baseUrl}Orders`, request, { headers });
  }

  getMyOrders(pageIndex = 1, pageSize = 10): Observable<Pagination<Order>> {
    const headers = this.getToken();
    return this._HttpClient.get<Pagination<Order>>(`${this.baseUrl}Orders/my-orders`, {
      params: {
        pageIndex: pageIndex.toString(),
        pageSize: pageSize.toString(),
        ...headers 
      }
    });
  }

  approveAndScheduleOrder(request: ApproveAndScheduleOrderRequest): Observable<any> {
    const headers = this.getToken();
    return this._HttpClient.put(`${this.baseUrl}Orders/customer/approve-and-schedule`, request, { headers });
  }

  cancelOrder(request: CancelOrderRequest): Observable<any> {
    const headers = this.getToken();
    return this._HttpClient.put(`${this.baseUrl}Orders/customer/cancel`, request, { headers });
  }

  acceptOrder(request: AcceptOrderRequest): Observable<any> {
    const headers = this.getToken();
    return this._HttpClient.put(`${this.baseUrl}Orders/worker/accept`, request, { headers });
  }

  updateTotalAmount(request: UpdateOrderTotalAmountRequest): Observable<any> {
    const headers = this.getToken();
    return this._HttpClient.put(`${this.baseUrl}Orders/worker/update-total-amount`, request, { headers });
  }
  getToken(): any {
        const token = JSON.parse(localStorage.getItem('userToken') || 'null')?.token || JSON.parse(sessionStorage.getItem('userToken') || 'null')?.token;
  const headers = { Authorization: `Bearer ${token}` };
  return headers
}


}

