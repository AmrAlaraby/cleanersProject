import { Component } from '@angular/core';

interface Order 
{ id: string; customerName: string; status: string; createdAt: Date; total: number; 
  
}

@Component({ selector: 'app-orders',
   templateUrl: './orders.component.html'
   , styleUrls: ['./orders.component.css'] 
  })
   export class OrdersComponent { 
    orders: Order[] = [ 
      { id: 'ORD-1001', customerName: 'Ahmed Ali', status: 'Pending', createdAt: new Date(), total: 250 },
      { id: 'ORD-1002', customerName: 'Mona Khaled', status: 'Completed', createdAt: new Date(), total: 460 } ];

        selectedStatus: string = '';
        searchQuery: string = '';

get filteredOrders(): Order[] { return this.orders.filter(o => o.customerName.toLowerCase().includes(this.searchQuery.toLowerCase()) && (this.selectedStatus === '' || o.status === this.selectedStatus) ); } }

