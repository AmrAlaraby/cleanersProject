
export interface CreateOrderRequest {
addressId: number;
categoryId: number;
workerId: string;
totalAmount: number;
specialInstructions?: string;
serviceDetails?: string;
scheduledDate?: string; // ISO format (yyyy-mm-dd)
}

export interface CreateOrderResponse {
orderId: string;
chatLink: string;
}

export interface GetOrderRequest {
pageIndex: number;
pageSize: number;
}

export interface CancelOrderRequest {
cancellationReason: string;
}

export interface UpdateOrderTotalAmountRequest {
newTotalAmount: number;
}

export interface UpdateOrderScheduledDateRequest {
newScheduledDate: string;
}

export interface CustomerOrderCompletedResponse {
otpCode: string;
}

export interface WorkerCompleteOrderRequest {
otpCode: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  workerId: string;
  workerName: string;
  serviceEnglishName: string;
  serviceArabicName: string;
  address: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  scheduledDate?: string;
  reviews?: {
    reviewerId: string;
    reviewerName: string;
    rating: number;
    comment: string;
    createdAt: string;
  }[];
}

export interface Pagination<T> {
data: T[];
count: number;
}

