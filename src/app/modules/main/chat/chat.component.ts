import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ChatMessage } from '../interfaces/interfaces';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute } from '@angular/router';

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
  messages: ChatMessage[] = [];

  toUserId: string = '';
  myToken: string = '';
  private hubConnection!: signalR.HubConnection;
  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  get isConnected(): boolean {
    return this.hubConnection?.state === signalR.HubConnectionState.Connected;
  }
  ngOnInit(): void {
    this.toUserId = this.route.snapshot.paramMap.get('id') || '';
    const storedToken = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
    const parsedToken = storedToken ? JSON.parse(storedToken) : null;
    this.myToken = parsedToken?.token ?? '';
    this.getCurrentUserId();
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://swipe-backend.tryasp.net/chathub?otherUserId=${this.toUserId}`, {
        accessTokenFactory: () => this.myToken
      })
      .withAutomaticReconnect()
      .build();
    this.hubConnection.start()
      .then(() => console.log('SignalR Connected'))
      .catch(err => console.error('Connection error:', err));

    this.hubConnection.on('ReceivePrivateMessage', (message: ChatMessage) => {
      this.messages.push(message);
    });

    this.hubConnection.on('ReceiveChatHistory', (chatId: string, oldMessages: ChatMessage[]) => {
      this.messages = oldMessages;
    });

    this.hubConnection.onreconnected(() => console.log('SignalR reconnected'));
    this.hubConnection.onclose(err => console.error('SignalR connection closed:', err));
  }

  getCurrentUserId() {
    this.authService.userData.subscribe({
      next: () => {
        const user = this.authService.userData.getValue();
        if (user) {
          this.userId = user['Id'] ?? '';
          this.username = user['name'] ?? '';
        }
      }
    });
  }

  sendMessage(): void {
    if (this.isConnected && this.toUserId && this.newMessage.trim()) {
      this.hubConnection.invoke('SendPrivateMessage', this.toUserId, this.username, this.newMessage)
        .then(() => this.newMessage = '')
        .catch(err => console.error('Send error:', err));
    }
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  submitForm() {
    if (this.finalPrice && this.finalTime) {
      const formMessage: ChatMessage = {
        context: `تم الاتفاق: السعر ${this.finalPrice} جنيه، الوقت ${this.finalTime} ساعة.`,
        senderId: this.userId,
        senderName: this.username,
        receiverId: this.toUserId,
        timestamp: new Date().toISOString(),
        status: 'sent',
        mainChatId: ''
      };
      this.hubConnection.invoke('SendPrivateMessage', this.toUserId, this.username, formMessage.context)
        .then(() => {
          this.finalPrice = null;
          this.finalTime = null;
          this.isSidebarVisible = false;
        })
        .catch(err => console.error('Send form error:', err));
    }
  }

  cancelForm() {
    this.finalPrice = null;
    this.finalTime = null;
    this.isSidebarVisible = false;
  }
}
