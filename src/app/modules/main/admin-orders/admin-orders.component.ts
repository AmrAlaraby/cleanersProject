import { Component } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { OrderToReturnDto } from '../interfaces/interfaces';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders: OrderToReturnDto[] = [];
  isLoading = false;

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.mainService.getAllOrders().subscribe({
      next: (res) => {
        this.orders = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading orders:', err);
        this.isLoading = false;
      }
    });
  }

}
