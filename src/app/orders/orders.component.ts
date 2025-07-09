import { AccountType } from './../modules/auth/interfaces/auth';
import { RatingSummaryDto, SubmitReviewRequest, worker } from './../modules/main/interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../services/main.service';
import { AuthenticationService } from '../services/authentication.service';
import {
  Order,
  Pagination,
  UpdateOrderTotalAmountRequest,
  UpdateOrderScheduledDateRequest,
  CancelOrderRequest,
  WorkerCompleteOrderRequest,
} from '../modules/main/interfaces/order.models';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  pageIndex: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  selectedStatus: string = '';
  searchQuery: string = '';
  otpInput: string = '';
  selectedOrderId: string = '';
  newTotalAmount: number = 0;
  newScheduledDate: string = '';
  cancelReason: string = '';
  workerOtpCode: string = '';
  isWorker: boolean = false;
  userData!: any;

  // ⭐️ Review
  hoveredStar: number = 0;
  ratingForm: { [orderId: string]: { rating: number; comment: string } } = {};
  reviewedOrders: string[] = [];
  ratingSummaries: { [userId: string]: { averageRating: number } } = {};

  constructor(
    private _MainService: MainService,
    private authService: AuthenticationService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.userData = this.authService.userData.getValue();
    const accountType = this.userData?.accountType?.toLowerCase();
    if (accountType === 'worker') {
      this.isWorker = true;
    }
    this.orders.forEach(order => {
  if (!this.ratingForm[order.id]) {
    this.ratingForm[order.id] = { rating: 0, comment: '' };
  }
});
    
  }


  loadOrders(): void {
    this._MainService.getMyOrders(this.pageIndex, this.pageSize).subscribe({
      next: (res: Pagination<Order>) => {
        this.orders = res.data;
        this.totalPages = Math.ceil(res.count / this.pageSize);
        console.log(this.orders);
        this.applyFilters();
        this.prefetchRatings(this.orders);
      },
      error: (err) => console.error('Error loading orders:', err)
    });
    
  }
hasUserReviewed(order: Order): boolean {
  return order.reviews?.some(r => r.reviewerId === this.userData?.Id) ?? false;
}

getMyReview(order: Order) {
  return order.reviews?.find(r => r.reviewerId === this.userData?.Id);
}
  applyFilters(): void {
    const search = this.searchQuery.toLowerCase().trim();
    this.filteredOrders = this.orders.filter(order => {
      const matchName = order.customerName?.toLowerCase().includes(search);
      const matchStatus = this.selectedStatus === '' || order.status === this.selectedStatus;
      return matchName && matchStatus;
    });
  }
deleteReview(order: Order): void {
  if (!confirm('هل أنت متأكد من حذف التقييم؟')) return;

  const revieweeId = this.userData?.accountType?.toLowerCase() === 'worker'
    ? order.customerId
    : order.workerId;

  this._MainService.deleteReview(revieweeId, order.id).subscribe({
    next: (res) => {
      console.log(res);
      
      this.reviewedOrders = this.reviewedOrders.filter(id => id !== order.id);
      this.loadRatingSummary(revieweeId);
      alert('🗑️ تم حذف التقييم بنجاح');
      this.loadOrders()
    },
    error: (err) => {
      console.error('خطأ في حذف التقييم:', err);
      alert('❌ حدث خطأ أثناء حذف التقييم');
    }
  });
}

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.pageIndex = page;
    this.loadOrders();
  }

  updateTotalAmount(orderId: string): void {
    const payload: UpdateOrderTotalAmountRequest = { newTotalAmount: this.newTotalAmount };
    this._MainService.updateOrderTotalAmount(orderId, payload).subscribe(() => this.loadOrders());
  }

  updateDate(orderId: string): void {
    const payload: UpdateOrderScheduledDateRequest = { newScheduledDate: this.newScheduledDate };
    this._MainService.updateScheduledDate(orderId, payload).subscribe(() => this.loadOrders());
  }

  cancelOrder(orderId: string): void {
    const payload: CancelOrderRequest = { cancellationReason: this.cancelReason };
    this._MainService.cancelOrder(orderId, payload).subscribe(() => this.loadOrders());
  }

  completeOrder(orderId: string): void {
    this._router.navigate(['/orderComplete', orderId]);
  }

  workerCompleteOrder(orderId: string): void {
    const payload: WorkerCompleteOrderRequest = { otpCode: this.workerOtpCode };
    this._MainService.workerCompleteOrder(orderId, payload).subscribe(() => this.loadOrders());
  }

  acceptOrder(orderId: string): void {
    this._MainService.acceptOrder(orderId).subscribe(() => this.loadOrders());
  }

  goToChat(order: Order): void {
    if (this.userData?.Id === order.customerId) {
      this._router.navigate(['/chat', order.workerId]);
    } else {
      this._router.navigate(['/chat', order.customerId]);
    }
  }

  // ⭐️ Rating
  setRating(orderId: string, rating: number): void {
    if (!this.ratingForm[orderId]) {
      this.ratingForm[orderId] = { rating: 0, comment: '' };
    }
    this.ratingForm[orderId].rating = rating;
  }

submitReview(order: Order): void {
  const form = this.ratingForm[order.id];
  if (!form?.rating) return;

  const payload: SubmitReviewRequest = {
    rating: form.rating,
    comment: form.comment,
    orderId: order.id
  };

  let revieweeId = ''; // اسم أوضح بدل review

  // ✅ تأكد أن الـ AccountType مكتوب صح و lowercase للمقارنة
  const accountType = this.userData?.accountType?.toLowerCase();
debugger
console.log(accountType);

  if (accountType === 'worker') {
    revieweeId = order.customerId;
  } else {
    revieweeId = order.workerId;
  }

  this._MainService.submitReview(revieweeId, payload).subscribe({
    next: () => {
      this.reviewedOrders.push(order.id);
      this.loadRatingSummary(revieweeId);
      alert('✅ تم إرسال التقييم بنجاح');
    },
    error: (err) => {
      console.error('❌ خطأ في إرسال التقييم:', err);
      alert('حدث خطأ أثناء إرسال التقييم');
    }
  });
}

  loadRatingSummary(userId: string): void {
    this._MainService.getUserRatingSummary(userId).subscribe({
  next: (res: RatingSummaryDto) => {
    this.ratingSummaries[userId] = res;
  },
  error: (err) => {
    console.warn('❌ لم يتم تحميل التقييم:', err);
  }
});
  }

  prefetchRatings(orders: Order[]): void {
    orders.forEach(order => {
      if (order.customerId) this.loadRatingSummary(order.customerId);
      if (order.workerId) this.loadRatingSummary(order.workerId);
    });
  }
}
