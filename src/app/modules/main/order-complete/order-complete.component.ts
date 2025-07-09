import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../interfaces/order.models';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css']
})
export class OrderCompleteComponent implements OnInit {
  orderId: string = '';
  order: Order | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _mainService: MainService
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id') || '';
    if (this.orderId) {
      this._mainService.getMyOrders(1, 100).subscribe({
        next: (res) => {
          this.order = res.data.find(o => o.id === this.orderId) || null;
        },
        error: (err) => {
          console.error('Failed to load orders', err);
        }
      });
    }
  }

  payWithCash(): void {
      this.router.navigate(['/otp', this.orderId]);

  }

  payWithVisa(): void {
    alert('تم اختيار الدفع بالفيزا للطلب #' + this.orderId);
  }
}
