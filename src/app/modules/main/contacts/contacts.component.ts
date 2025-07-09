import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: any[] = [];
  isLoading = true;

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.mainService.getAllContacts().subscribe({
      next: (data) => {
        this.contacts = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('فشل في جلب البيانات:', err);
        this.isLoading = false;
      }
    });
  }
}
