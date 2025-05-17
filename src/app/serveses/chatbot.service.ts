import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { response } from '../modules/main/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private apiUrl = 'https://cleaning.runasp.net/api/Gemini/generateContent'; // Replace with your chatbot API

  constructor(private http: HttpClient) {}

  getBotResponse(message: string): Observable<response> {
    return this.http.post<any>(`https://cleaning.runasp.net/api/Gemini/generateContent?prompt=${message}`,null);
  }
}
