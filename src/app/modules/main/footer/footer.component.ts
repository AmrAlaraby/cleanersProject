import { Component } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  email: string = '';
  Loader = false;
  Success:boolean=false
  failed:boolean=false


  constructor(private subscriptionService: MainService) {}

  subscribe() {
    this.Loader = true;
    
    this.subscriptionService.subscribeToNewsletter(this.email).subscribe({
      next: (res) => {
    this.failed=false
     this.Loader = false;
     this.Success=true

        console.log('✅ Subscription successful', res);
        this.email = ''; // تفريغ الحقل بعد الاشتراك
      },
      error: (err) => {
        console.error('❌ Subscription error', err);
        this.Loader = false;
        this.Success=false
        this.failed=true


      },
    });
  }
}
