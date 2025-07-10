import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { worker, Address, Toast, Review } from '../interfaces/interfaces';
import { CreateOrderRequest } from '../interfaces/order.models';

@Component({
  selector: 'app-worker-details',
  templateUrl: './worker-details.component.html',
  styleUrls: ['./worker-details.component.css']
})
export class WorkerDetailsComponent implements OnInit {
  Math = Math;
  workerId!: string;
  worker!: worker;
  reviews: Review[] = [];
  addresses: Address[] = [];
  modalStep = 1;
  selectedAddressId: number | null = null;
  initialPrice: number | null = null;
  showModal = false;

  toasts: Toast[] = [];
  private toastIdCounter = 0;

  constructor(private route: ActivatedRoute, private _mainService: MainService) {}

  ngOnInit(): void {
    this.workerId = this.route.snapshot.paramMap.get('id')!;
    this.loadWorkerDetails();
    this.loadReviews();
  }

  loadWorkerDetails(): void {
    this._mainService.getWorkerById(this.workerId).subscribe({
      next: (res: any) => this.worker = res
    });
  }

  loadReviews(): void {
    this._mainService.getWorkerReviews(this.workerId).subscribe({
      next: (res: any) =>{ this.reviews = res.data
        console.log('Reviews:', this.reviews);
        
      }
    });
  }

  openBookingModal(): void {
    this.showModal = true;
    this.modalStep = 1;
    this.selectedAddressId = null;
    this.initialPrice = null;
    this._mainService.getUserAddresses().subscribe({
      next: (res) => this.addresses = res,
      error: () => this.showToast('Failed to load addresses', 'Error', 'error')
    });
  }

  acceptAddress(): void {
    if (this.selectedAddressId === null) return;
    this.modalStep = 2;
  }

  acceptPriceAndCreateOrder(): void {
    const orderPayload: CreateOrderRequest = {
      workerId: this.workerId,
      addressId: this.selectedAddressId!,
      totalAmount: this.initialPrice!,
      categoryId: this.worker.categories[0]?.categoryId || 0
    };

    this._mainService.createOrder(orderPayload).subscribe({
      next: () => {
        this.showToast('Order created successfully!', 'Success', 'success');
        this.showModal = false;
      },
      error: () => this.showToast('Failed to create order', 'Error', 'error')
    });
  }

  showToast(message: string, title = 'Notification', type: 'success' | 'error' | 'warning' | 'info' = 'info', duration = 3000): void {
    const id = ++this.toastIdCounter;
    const newToast: Toast = { id, message, title, type };
    this.toasts.push(newToast);
    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id);
    }, duration);
  }

  removeToast(toast: Toast): void {
    this.toasts = this.toasts.filter(t => t.id !== toast.id);
  }

  closeModal(): void {
    this.showModal = false;
  }
}
