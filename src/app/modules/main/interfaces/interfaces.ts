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
  id: string;
  userName: string;
  fullName: string;
  email?: string; // مش ظهر في الريسبونس، خليه اختياري
  phoneNumber?: string; // مش ظهر في الريسبونس، خليه اختياري
  address: string | null; // جاي null في الريسبونس
  profilePictureUrl: string;
  description: string;
  hourlyRate: number;
  experienceYears: number;
  cleaningTimes: number;
  averageRating: number;
  ratingsCount: number;
  categories: WorkerCategory[];
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

export interface DashboardOrdersRequest {
  days: number;
}

export interface OrdersDashboardDto {
  statusCounts: { name: string; count: number }[];
  ordersPerDay: { date: string; value: number }[];
  revenuePerDay: { date: string; value: number }[];
  averageTicketSize: number;
  topCategories: {
    categoryId: number;
    categoryName: string;
    revenue: number;
  }[];
  topWorkers: {
    workerId: string;
    workerName: string;
    orders: number;
    revenue: number;
  }[];
}
export interface CustomerToReturnDto {
  id: string;
  fullName:string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth:Date
  // أضف أي خصائص إضافية هنا إن كانت موجودة من الـ API
}
export interface RatingSummaryDto {
  averageRating: number;
  totalReviews: number;
}


export interface SubmitReviewRequest {
  rating: number;
  comment: string;
  orderId: string;
}


export interface Customer {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface OrderToReturnDto {
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
  serviceDetails?: string;
  specialInstructions?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt?: string;
  scheduledDate?: string;
  completedDate?: string;
  canceledAt?: string;
}

export interface Pagination<T> {
  data: T[];
  pageIndex: number;
  pageSize: number;
  count: number;
}

export interface ChatMessage {

  id?: string;

  mainChatId?: string;

  senderId?: string;

  senderName?: string;

  receiverId?: string;

  receiverName?: string;

  context?: string;

  timestamp?: string;  // نستخدم string عشان تواريخ الـ JSON عادةً بتكون string

  status?: string;

}


export interface Review {
  reviewerId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}