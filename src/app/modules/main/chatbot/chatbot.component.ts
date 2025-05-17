import { Component } from '@angular/core';
import { ChatbotService } from 'src/app/serveses/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  isOpen: boolean = false;
  userInput: string = '';
  messages: { sender: 'user' | 'bot'; text: string; typing?: boolean }[] = [];

  constructor(private chatbotService: ChatbotService) {

    
  }

  toggleChatbot() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMessage = this.userInput.trim();
    this.messages.push({ sender: 'user', text: userMessage });
    this.userInput = '';

    const typingMessage: { sender: "bot"; text: string; typing: boolean } = { 
      sender: "bot", 
      text: "", 
      typing: true 
    };
    this.messages.push(typingMessage);

    this.chatbotService.getBotResponse(userMessage).subscribe({
      next: response => {
        this.messages = this.messages.filter(msg => msg !== typingMessage); // Remove the "typing" indicator
        this.addBotMessageWithTypewriter(response.text);
      },
      error: err => {
        console.error('Error:', err); // Log the error
        this.messages = this.messages.filter(msg => msg !== typingMessage); // Remove the "typing" indicator
        this.messages.push({ sender: 'bot', text: 'Error occurred while fetching response.' });
      }
    });
  }

  addBotMessageWithTypewriter(fullText: string) {
    const botMessage: { sender: 'bot'; text: string; typing?: boolean } = { 
      sender: 'bot', 
      text: '' 
    }; // Explicitly type botMessage
    this.messages.push(botMessage);
  
    let currentIndex = 0;
    const typingSpeed = 50; // Adjust typing speed (ms per character)
    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        botMessage.text += fullText[currentIndex];
        currentIndex++;
      } else {
        clearInterval(interval); // Stop the interval when done
      }
    }, typingSpeed);
  }
  
}
