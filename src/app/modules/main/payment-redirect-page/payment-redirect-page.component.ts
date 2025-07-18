import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-redirect-page',
  templateUrl: './payment-redirect-page.component.html',
  styleUrls: ['./payment-redirect-page.component.css']
})
export class PaymentRedirectPageComponent implements OnInit {
isError: boolean = false;
  message: string = '';
  orderId: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.isError = params.get('isError') === 'true';
      this.message = params.get('message') || '';
      this.orderId = params.get('orderId');
    });
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }

  goToOrderComplete() {
    if (this.orderId) {
      this.router.navigate([`/orderComplete/${this.orderId}`]);
    }
  }
}
