import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ChatMessage } from '../interfaces/interfaces';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent  implements OnInit{
  isSidebarVisible = false;
  newMessage = '';
  finalPrice: number | null = null;
  finalTime: number | null = null;
  userId: string = '';
username: string = '';
  messages: Array<any> = [];

  toUserId: string = '11a4e248-bd3a-4b91-942b-41d1bc7d824c';
  myToken: string = 'eyJhbGciOi...'; // ضيف التوكن هنا
  messageInput: string = 'hii';
  private hubConnection!: signalR.HubConnection;
   constructor(private authService: AuthenticationService){}
  get isConnected(): boolean {
    return this.hubConnection?.state === signalR.HubConnectionState.Connected;
  }


  ngOnInit(): void {
     const token = JSON.parse(localStorage.getItem('userToken') || 'null')?.token || JSON.parse(sessionStorage.getItem('userToken') || 'null')?.token;
     this.myToken = token;
    this.getCurrentUserId()
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://cleaning.runasp.net/api/chathub', {
        accessTokenFactory: () => this.myToken
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start()
      .then(() => console.log('SignalR Connected'))
      .catch(err => console.error('Connection error: ', err));

    this.hubConnection.on('ReceivePrivateMessage', (message: ChatMessage) => {
      this.messages.push(
        `${message.timestamp} ${message.senderName} to ${message.receiverName}: ${message.context}`
      );
    });

    this.hubConnection.on('ReceiveChatHistory', (chatId: string, oldMessages: ChatMessage[]) => {
      this.messages = oldMessages.map(m =>
        `${m.timestamp} ${m.senderName} to ${m.receiverName}: ${m.context}`
      );
    });
    this.hubConnection.invoke('GetPrivateChatHistory', this.toUserId)
  .then(() => {
    console.log('Requested chat history successfully');
  })
  .catch(err => {
    console.error('Error requesting chat history:', err);
  });
  }

  
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  getCurrentUserId(){
  this.authService.userData.subscribe({
      next: () => {

        if (this.authService.userData.getValue() != null) {
        this.userId = this.authService.userData.getValue()?.['id'] ?? '';
        this.username = this.authService.userData.getValue()?.['name'] ?? '';
        } else {
          
        }
      }
    });
  }

  sendMessage(): void {
    if (this.isConnected && this.toUserId && this.newMessage) {
      this.hubConnection.invoke('SendPrivateMessage', this.toUserId, 'Ahmed', this.newMessage)
        .then(() => {
          this.messages.push(`You to ${this.toUserId}: ${this.newMessage}`);
          this.newMessage = '';
        })
        .catch(err => console.error('Send error: ', err));
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
