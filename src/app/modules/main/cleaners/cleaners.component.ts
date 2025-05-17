import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { Address, Toast, worker, workers } from '../interfaces/interfaces';

@Component({
  selector: 'app-cleaners',
  templateUrl: './cleaners.component.html',
  styleUrls: ['./cleaners.component.css']
})
export class CleanersComponent implements OnInit {
  workers: worker[] = [];
  totalCount = 0;
  pageIndex = 1;
  pageSize = 6;
  search = '';
  categoryId!: number;
  searchTimeout: any;

  showModal = false;
  modalStep = 1;

  selectedWorker: worker | null = null;
  addresses: Address[] = [];
  selectedAddressId: number | null = null;

  initialPrice: number | null = null;

    toasts: Toast[] = [];
  private toastIdCounter = 0;

  constructor(
    private route: ActivatedRoute,
    private _mainService: MainService
  ) {}

  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadWorkers();
  }

  loadWorkers(): void {
    this._mainService.getAllWorkers(this.pageIndex, this.pageSize, this.search, this.categoryId)
      .subscribe((res: any) => {
        this.workers = res.data;
        this.totalCount = res.count;
      });
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const searchValue = input.value;

    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      this.search = searchValue;
      this.pageIndex = 1;
      this.loadWorkers();
    }, 300);
  }

  pageChanged(newPage: number): void {
    if (newPage < 1 || newPage > this.totalPages) return;
    this.pageIndex = newPage;
    this.loadWorkers();
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  // Open modal and start booking process
  onBookNow(worker: worker): void {
    this.selectedWorker = worker;
    this.modalStep = 1;
    this.selectedAddressId = null;
    this.initialPrice = null;
    this.showModal = true;
    this.loadUserAddresses();
  }

  loadUserAddresses(): void {
    this._mainService.getUserAddresses().subscribe({
      next: (addresses: Address[]) => {
        this.addresses = addresses;
      },
      error: () => this.showToast('Failed to load addresses', 'Error', 'error'),
    });
  }

  acceptAddress(): void {
    if (this.selectedAddressId === null) {
      this.showToast('Please select an address.', 'Warning', 'warning');
      return;
    }
    this.modalStep = 2;
  }

  acceptPriceAndCreateOrder(): void {
    if (this.initialPrice === null || this.initialPrice <= 0) {
      this.showToast('Please enter a valid price.', 'Warning', 'warning');
      return;
    }

    if (!this.selectedWorker || this.selectedAddressId === null) {
       this.showToast('Invalid state. Please try again.', 'Error', 'error');
      this.showModal = false;
      return;
    }

    const orderPayload = {
      workerId: this.selectedWorker.id,
      addressId: this.selectedAddressId,
      totalAmount: this.initialPrice,
      categoryId: this.categoryId
    };

    this._mainService.createOrder(orderPayload).subscribe({
      next: () => {
        this.showToast('Order created successfully!', 'Success', 'success');
        this.showModal = false;
      },
       error: () => this.showToast('Failed to create order', 'Error', 'error'),
    });
  }

  closeModal(): void {
    this.showModal = false;
  }

  showToast(
    message: string,
    title: string = 'Notification',
    type: 'success' | 'error' | 'warning' | 'info' = 'info',
    duration = 3000
  ): void {
    const id = ++this.toastIdCounter;
    const newToast: Toast = { id, message, title, type };
    this.toasts.push(newToast);

    // Remove toast after duration
    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id);
    }, duration);
  }

  // Manually remove toast on close button click
  removeToast(toast: Toast): void {
    this.toasts = this.toasts.filter(t => t.id !== toast.id);
  }
}