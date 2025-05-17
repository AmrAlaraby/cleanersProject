import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  isSidebarVisible = false;
  newMessage = '';
  finalPrice: number | null = null;
  finalTime: number | null = null;

  messages: Array<any> = [];

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ content: this.newMessage, isSent: true, type: 'text' });
      this.newMessage = '';
    }
  }

  submitForm() {
    if (this.finalPrice && this.finalTime) {
      this.messages.push({
        type: 'form',
        isSent: true,
        data: {
          finalPrice: this.finalPrice,
          finalTime: this.finalTime
        }
      });
      this.finalPrice = null;
      this.finalTime = null;
      this.isSidebarVisible = false;
    }
  }

  cancelForm() {
    this.finalPrice = null;
    this.finalTime = null;
    this.isSidebarVisible = false;
  }
}
