import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { Order, Pagination } from '../modules/main/interfaces/interfaces';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AuthUserData } from '../modules/auth/interfaces/auth';

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

  userData!: any;

  constructor(private _MainService: MainService,private _router:Router,private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.loadOrders();


    this.authService.userData.subscribe({
      next: () => {

        if (this.authService.userData.getValue() != null) {
          console.log(this.authService.userData.getValue());
          this.userData = this.authService.userData.getValue() ;
        }
      }
    });
  }

  loadOrders(): void {
    this._MainService.getMyOrders(this.pageIndex, this.pageSize).subscribe({
      next: (res: Pagination<Order>) => {
        this.orders = res.data;
        this.totalPages = Math.ceil(res.count / this.pageSize); // ✅ نحسبها يدويًا
        this.applyFilters();
      },
      error: (err) => console.error('Error loading orders:', err)
    });
  }

  applyFilters(): void {
    const search = this.searchQuery.toLowerCase().trim();

    this.filteredOrders = this.orders.filter(order => {
      const matchName = order.customerName?.toLowerCase().includes(search);
      const matchStatus = this.selectedStatus === '' || order.status === this.selectedStatus;
      return matchName && matchStatus;
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.pageIndex = page;
    this.loadOrders();
  }

  goToChat(order:Order): void {
    debugger
    if (this.userData.Id == order.customerId) {
      this._router.navigate(['/chat', order.workerId]);
      return;
      
    }else{
      this._router.navigate(['/chat', order.customerId]);
      return;
    }

  }
}
