export interface response {
  text:string
}

export type categories = category[]

export interface category {
id: number
englishName: string
arabicName: string
image: string
}
export interface workers {
pageIndex: number
pageSize: number
count: number
data: worker[]
}

export interface worker {
id: string
userName: string
fullName: string
email: string
phoneNumber: string
address: string
profilePictureUrl: string
description: string
hourlyRate: number
experienceYears: number
cleaningTimes: number
rating: number
categories: WorkerCategory[]
}

export interface Toast {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export interface WorkerCategory {
categoryId: number
categoryEnglishName: string
categoryArabicName: string
}
export interface Address {
  id: number;
  addressLine: string;
  addressNote?: string;
  city: string;
  homeNumber?: string;
  floorNumber?: string;
  flatNumber?: string;
}

export interface CreateOrderRequest {
  workerId: string;
  addressId: number;
  totalAmount: number;
  categoryId: number;
}

export interface CreateOrderResponse {
  orderId: number;
  success: boolean;
}

export interface ApproveAndScheduleOrderRequest {
  orderId: number;
  totalAmount: number;
}

export interface CancelOrderRequest {
  orderId: number;
  reason: string;
}

export interface AcceptOrderRequest {
  orderId: number;
  customerId: string;
}

export interface UpdateOrderTotalAmountRequest {
  orderId: number;
  newTotalAmount: number;
}

export interface Order {
  orderId: number;
  workerId: string;
  customerId: string;
  categoryId: number;
  addressId: number;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export interface Pagination<T> {
  data: T[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
