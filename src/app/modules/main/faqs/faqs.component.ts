import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent {
  faqs: any[] = [];
  private langChangeSubscription!: Subscription;

  constructor(private translate: TranslateService) {
    this.loadFAQs();
  }
  ngOnInit(): void {
    this.loadFAQs();

    // تحديث الأسئلة عند تغيير اللغة
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadFAQs();
    });
  }
  loadFAQs() {
    this.translate.get('FAQS.QUESTIONS').subscribe((questions: any[]) => {
      this.faqs = questions;
    });
  }
}
