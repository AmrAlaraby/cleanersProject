import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address, categories, OrdersDashboardDto, OrderToReturnDto, RatingSummaryDto, SubmitReviewRequest, workers } from '../modules/main/interfaces/interfaces';
import {
  CreateOrderRequest,
  CreateOrderResponse,
  CancelOrderRequest,
  UpdateOrderTotalAmountRequest,
  UpdateOrderScheduledDateRequest,
  CustomerOrderCompletedResponse,
  WorkerCompleteOrderRequest,
  Order,
  Pagination
} from '../modules/main/interfaces/order.models';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private baseUrl = 'https://swipe-backend.tryasp.net/api/';
  constructor(private _HttpClient: HttpClient) { }

  getAllCategories(): Observable<categories> {
    return this._HttpClient.get<categories>(`${this.baseUrl}Categories`);
  }

  getCategoryById(id: number): Observable<any> {
    return this._HttpClient.get<any>(`${this.baseUrl}Categories/${id}`);
  }

  createCategory(body: any): Observable<any> {
    const token = JSON.parse(localStorage.getItem('userToken') || 'null')?.token || JSON.parse(sessionStorage.getItem('userToken') || 'null')?.token;
    const headers = { Authorization: `Bearer ${token}` };
    const formData = new FormData();
    if (body.image) {
      formData.append('Image', body.image);
    }
    const params = {
      Id: body.id,
      EnglishName: body.englishName?.trim(),
      ArabicName: body.arabicName?.trim()
    };
    return this._HttpClient.post(`${this.baseUrl}Categories`, formData, {
      headers,
      params
    });
  }

  updateCategory(body: any): Observable<any> {
    const token = JSON.parse(localStorage.getItem('userToken') || 'null')?.token || JSON.parse(sessionStorage.getItem('userToken') || 'null')?.token;
    const headers = { Authorization: `Bearer ${token}` };
    const formData = new FormData();
    formData.append('Id', body.id);
    formData.append('EnglishName', body.englishName?.trim());
    formData.append('ArabicName', body.arabicName?.trim());
    if (body.image) {
      formData.append('Image', body.image);
    }
    return this._HttpClient.put(`${this.baseUrl}Categories`, formData, { headers });
  }

  deleteCategory(id: number): Observable<any> {
    const token = JSON.parse(localStorage.getItem('userToken') || 'null')?.token || JSON.parse(sessionStorage.getItem('userToken') || 'null')?.token;
    const headers = { Authorization: `Bearer ${token}` };
    return this._HttpClient.delete(`${this.baseUrl}Categories/${id}`, { headers });
  }

  getAllWorkers(pageIndex = 1, pageSize = 10, search = '', categoryId?: number): Observable<workers> {
    let params = new HttpParams()
      .set('pageIndex', pageIndex)
      .set('pageSize', pageSize)
      .set('search', search);

    if (categoryId != null) {
      params = params.set('categoryId', categoryId);
    }
    return this._HttpClient.get<workers>(`${this.baseUrl}Workers`, { params });
  }

  getWorkerById(workerId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}Workers/${workerId}`);
  }

  getCurrentWorker(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}Workers/me`);
  }

  // ⭐️ تقييم (Review)
  submitReview(revieweeId: string, data: SubmitReviewRequest): Observable<void> {
    const headers = this.getToken();

return this._HttpClient.post<void>(
  `${this.baseUrl.replace(/\/$/, '')}/reviews/rate/${revieweeId}`,
  data,{headers}
);  }
deleteReview(revieweeId: string, orderId: string): Observable<void> {
    const headers = this.getToken();

    return this._HttpClient.request<void>('delete', `${this.baseUrl}reviews/delete/${revieweeId}`, {
    headers,
    body: { orderId }
  });
}
  getUserRatingSummary(userId: string): Observable<RatingSummaryDto> {
    return this._HttpClient.get<RatingSummaryDto>(`${this.baseUrl}reviews/rating-summary/${userId}`);
  }

  ChooseCategories(id: number): Observable<any> {
    const token = JSON.parse(localStorage.getItem('userToken') || 'null')?.token || JSON.parse(sessionStorage.getItem('userToken') || 'null')?.token;
    const headers = { Authorization: `Bearer ${token}` };
    return this._HttpClient.post(`${this.baseUrl}Workers/category/${id}`, {}, { headers });
  }

updateWorker(body: any): Observable<any> {
  const token = JSON.parse(localStorage.getItem('userToken') || 'null')?.token ||
                JSON.parse(sessionStorage.getItem('userToken') || 'null')?.token;

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const formData = new FormData();
  formData.append('WorkerId', body.workerId);
  formData.append('FirstName', body.firstName);
  formData.append('LastName', body.lastName);
  formData.append('UserName', body.userName);
  formData.append('PhoneNumber', body.phoneNumber);
  formData.append('HourlyRate', body.hourlyRate.toString());
  formData.append('ExperienceYears', body.experienceYears.toString());
  formData.append('NationalId', body.nationalId);
  formData.append('DateOfBirth', body.dateOfBirth);
  formData.append('Description', body.description || '');

  if (body.profileImage) {
    formData.append('ProfileImage', body.profileImage);
  }

  return this._HttpClient.put(`${this.baseUrl}Workers/admin/update-worker`, formData, { headers });
}


deleteWorker(id: string): Observable<any> {
  const token = JSON.parse(localStorage.getItem('userToken') || 'null')?.token;
  const headers = {
    Authorization:` Bearer ${token} `};
  return this._HttpClient.delete(`${this.baseUrl}workers/admin/${id}`, { headers });
}
getAllCustomers(pageIndex = 1, pageSize = 10, search = ''): Observable<any> {
  let params = new HttpParams()
    .set('pageIndex', pageIndex)
    .set('pageSize', pageSize)
    .set('search', search);

  const headers = this.getToken();
  return this._HttpClient.get(`${this.baseUrl}Customer/admin/customer-list`, { params, headers });
}

updateCustomer(customerData: any): Observable<any> {
  const headers = this.getToken();
  return this._HttpClient.put(`${this.baseUrl}Customer/admin/update-customer`, customerData, { headers });
}

deleteCustomer(id: string): Observable<any> {
  const headers = this.getToken();
  return this._HttpClient.delete(`${this.baseUrl}Customer/admin/${id}`, { headers });
}

  getUserAddresses(): Observable<Address[]> {
    const headers = this.getToken();
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

  getAllOrders(pageIndex = 1, pageSize = 10): Observable<Pagination<OrderToReturnDto>> {
    const headers = this.getToken();
    return this._HttpClient.get<Pagination<OrderToReturnDto>>(
      `${this.baseUrl}Orders/admin/all-orders?pageIndex=${pageIndex}&pageSize=${pageSize}`, { headers }
    );
  }

  getOrdersDashboard(days: number = 7): Observable<OrdersDashboardDto> {
    const headers = this.getToken();
    return this._HttpClient.get<OrdersDashboardDto>(`${this.baseUrl}orders/admin/orders/dashboard?days=${days}`, { headers });
  }

  createOrder(request: CreateOrderRequest): Observable<CreateOrderResponse> {
    const headers = this.getToken();
    return this._HttpClient.post<CreateOrderResponse>(`${this.baseUrl}Orders/Customer/CreateOrder`, request, { headers });
  }

  getMyOrders(pageIndex = 1, pageSize = 10): Observable<Pagination<Order>> {
    const headers = this.getToken();
    return this._HttpClient.get<Pagination<Order>>(`${this.baseUrl}Orders/my-orders`, {
      headers,
      params: new HttpParams()
        .set('pageIndex', pageIndex.toString())
        .set('pageSize', pageSize.toString())
    });
  }

  approveOrder(orderId: string): Observable<any> {
    const headers = this.getToken();
    return this._HttpClient.patch(`${this.baseUrl}Orders/customer/${orderId}/approve`, {}, { headers });
  }

  updateOrderTotalAmount(orderId: string, request: UpdateOrderTotalAmountRequest): Observable<any> {
    const headers = this.getToken();
    return this._HttpClient.patch(`${this.baseUrl}Orders/customer/${orderId}/TotalAmount`, request, { headers });
  }
rateUser(revieweeId: string, payload: { rating: number, comment: string, orderId: string }) {
      const headers = this.getToken();

  return this._HttpClient.post(`${this.baseUrl}Reviews/rate/${revieweeId}`, payload,{headers});
}
  getRatingSummary(userId: string): Observable<RatingSummaryDto> {
    return this._HttpClient.get<RatingSummaryDto>(`${this.baseUrl}/api/Reviews/rating-summary/${userId}`);
  }
  updateScheduledDate(orderId: string, request: UpdateOrderScheduledDateRequest): Observable<any> {
    const headers = this.getToken();
    return this._HttpClient.patch(`${this.baseUrl}Orders/customer/${orderId}/ScheduledDate`, request, { headers });
  }

  cancelOrder(orderId: string, request: CancelOrderRequest): Observable<any> {
    const headers = this.getToken();
    return this._HttpClient.patch(`${this.baseUrl}Orders/customer/${orderId}/cancel`, request, { headers });
  }

  customerCompleteOrder(orderId: string): Observable<CustomerOrderCompletedResponse> {
    const headers = this.getToken();
    return this._HttpClient.patch<CustomerOrderCompletedResponse>(`${this.baseUrl}Orders/customer/${orderId}/complete`, {}, { headers });
  }

  workerCompleteOrder(orderId: string, request: WorkerCompleteOrderRequest): Observable<any> {
    const headers = this.getToken();
    return this._HttpClient.patch(`${this.baseUrl}Orders/worker/${orderId}/complete`, request, { headers });
  }

  acceptOrder(orderId: string): Observable<any> {
    const headers = this.getToken();
    return this._HttpClient.patch(`${this.baseUrl}Orders/worker/${orderId}/accept`, {}, { headers });
  }

  subscribeToNewsletter(email: string): Observable<any> {
    const body = { email };
    return this._HttpClient.post(`${this.baseUrl}EmailSubscriber/Subscribe`, body);
  }

  getAllSubscriptions(): Observable<{ email: string }[]> {
    return this._HttpClient.get<{ email: string }[]>(`${this.baseUrl}EmailSubscriber/GetSubscribers`);
  }

  sendMessageToSubscribers(message: string): Observable<any> {
    const headers = this.getToken();
    return this._HttpClient.post(`${this.baseUrl}EmailSubscriber/SendNotifications`, { message }, { headers });
  }

  updateOrderStatus(orderId: string, status: string): Observable<any> {
    const headers = this.getToken();
    return this._HttpClient.patch(`${this.baseUrl}Orders/${orderId}/status/${status}`, {}, { headers });
  }

  getOrderById(orderId: string): Observable<Order> {
    const headers = this.getToken();
    return this._HttpClient.get<Order>(`${this.baseUrl}Orders/${orderId}`, { headers });
  }

  getWorkerOrders(pageIndex = 1, pageSize = 10): Observable<Pagination<Order>> {
    const headers = this.getToken();
    return this._HttpClient.get<Pagination<Order>>(`${this.baseUrl}Orders/worker-orders`, {
      headers,
      params: new HttpParams()
        .set('pageIndex', pageIndex.toString())
        .set('pageSize', pageSize.toString())
    });
  }

  getOtp(orderId: string): Observable<CustomerOrderCompletedResponse> {
    const headers = this.getToken();
    return this._HttpClient.get<CustomerOrderCompletedResponse>(`${this.baseUrl}Orders/customer/${orderId}/complete`, { headers });
  }

  sendOtp(orderId: string, otp: string): Observable<any> {
    const headers = this.getToken();
    return this._HttpClient.patch(`${this.baseUrl}Orders/worker/${orderId}/complete`, { otpCode: otp }, { headers });
  }

  sendContactMessage(contact: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
  }): Observable<any> {
    const token = `Bearer ${localStorage.getItem('token')}`;
    const headers = {
      'Authorization': token,
      'Content-Type': 'application/json'
    };
    return this._HttpClient.post(`${this.baseUrl}Contact`, contact, { headers });
  }

  getAllContacts(): Observable<any[]> {
    const token = `Bearer ${localStorage.getItem('token')}`;
    const headers = { Authorization: token };
    return this._HttpClient.get<any[]>(`${this.baseUrl}Contact`, { headers });
  }

  getToken(): any {
    const token = JSON.parse(localStorage.getItem('userToken') || 'null')?.token || JSON.parse(sessionStorage.getItem('userToken') || 'null')?.token;
    const headers = { Authorization: `Bearer ${token}` };
    return headers;
  }
}
