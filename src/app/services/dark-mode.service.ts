import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private theme = new BehaviorSubject<string>(this.getInitialTheme()); // استخدام الدالة لتحديد الثيم الافتراضي
  theme$ = this.theme.asObservable();

  constructor() {
    this.applyTheme(this.theme.value); // تطبيق الثيم عند بدء التطبيق
  }

  toggleTheme() {
    const newTheme = this.theme.value === 'dark' ? 'light' : 'dark';
    this.theme.next(newTheme);
    localStorage.setItem('theme', newTheme);
    this.applyTheme(newTheme);
  }

  getTheme() {
    return this.theme$;
  }

  private applyTheme(theme: string) {
    document.documentElement.setAttribute('data-bs-theme', theme); // ضبط الثيم على عنصر <html>
  }

  private getInitialTheme(): string {
    // إذا كان هناك ثيم محفوظ في localStorage، استخدمه
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }

    // إذا لم يكن هناك ثيم محفوظ، استخدم إعداد النظام
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
}
