import { Component } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-email-sub',
  templateUrl: './email-sub.component.html',
  styleUrls: ['./email-sub.component.css']
})
export class EmailSubComponent {
  subscribers: string[] = [];
  message: string = '';
  isLoading: boolean = false;

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.loadSubscribers();
  }

  loadSubscribers() {
    this.isLoading = true;
    this.mainService.getAllSubscriptions().subscribe({
      next: (res) => {
        this.subscribers = res.map(sub => sub.email);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  sendMessage() {
    if (!this.message.trim()) return;

    this.mainService.sendMessageToSubscribers(this.message).subscribe({
      next: () => {
        alert('✅ تم إرسال الرسالة بنجاح');
        this.message = '';
      },
      error: (err) => {
        console.error(err);
        alert('❌ حدث خطأ أثناء الإرسال');
      }
    });
  }
}
