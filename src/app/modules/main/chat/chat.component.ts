import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ChatMessage } from '../interfaces/interfaces';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  isSidebarVisible = false;
  newMessage = '';
  finalPrice: number | null = null;
  finalTime: number | null = null;
  userId: string = '';
  username: string = '';
  messages: Array<any> = [];

  toUserId: string = '11a4e248-bd3a-4b91-942b-41d1bc7d824c';
  myToken: string = '';
  messageInput: string = 'hii';
  private hubConnection!: signalR.HubConnection;

  constructor(private authService: AuthenticationService) {}

  get isConnected(): boolean {
    return this.hubConnection?.state === signalR.HubConnectionState.Connected;
  }

  ngOnInit(): void {
    const storedToken = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
    const parsedToken = storedToken ? JSON.parse(storedToken) : null;
    this.myToken = parsedToken?.token ?? '';

    this.getCurrentUserId();

    // Create connection
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://cleaning.runasp.net/chathub', {
        accessTokenFactory: () => this.myToken
      })
      .withAutomaticReconnect()
      .build();

    // Connection event logging
    this.hubConnection.onreconnected(() => {
      console.log('SignalR reconnected');
    });

    this.hubConnection.onclose(error => {
      console.error('SignalR connection closed with error:', error);
    });

    // Start connection and THEN call invoke
    this.hubConnection.start()
      .then(() => {
        console.log('SignalR Connected');

        // Only invoke history after connection is live
        this.hubConnection.invoke('GetPrivateChatHistory', this.toUserId)
          .then(() => {
            console.log('Requested chat history successfully');
          })
          .catch(err => {
            console.error('Error requesting chat history:', err);
          });
      })
      .catch(err => {
        console.error('Connection error:', err);
      });

    // Receive new message
    this.hubConnection.on('ReceivePrivateMessage', (message: ChatMessage) => {
      this.messages.push(
        `${message.timestamp} ${message.senderName} to ${message.receiverName}: ${message.context}`
      );
    });

    // Load old messages
    this.hubConnection.on('ReceiveChatHistory', (chatId: string, oldMessages: ChatMessage[]) => {
      this.messages = oldMessages.map(m =>
        `${m.timestamp} ${m.senderName} to ${m.receiverName}: ${m.context}`
      );
    });
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  getCurrentUserId() {
    this.authService.userData.subscribe({
      next: () => {
        const user = this.authService.userData.getValue();
        if (user) {
          this.userId = user['id'] ?? '';
          this.username = user['name'] ?? '';
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
        .catch(err => console.error('Send error:', err));
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
