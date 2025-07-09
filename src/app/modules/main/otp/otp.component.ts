import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { CustomerOrderCompletedResponse } from '../interfaces/order.models';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  orderId: string = '';
  otpCode: string = '';
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private _mainService: MainService
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id') || '';

    if (this.orderId) {
      this._mainService.customerCompleteOrder(this.orderId).subscribe({
        next: (res: CustomerOrderCompletedResponse) => {
          this.otpCode = res.otpCode;
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to complete order:', err);
          this.loading = false;
        }
      });
    }
  }
}
