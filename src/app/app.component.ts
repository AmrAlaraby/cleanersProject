import { DarkModeService } from './services/dark-mode.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'cleanersProject';
  constructor(private translate: TranslateService,private darkModeService: DarkModeService) {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');

    const savedLang = localStorage.getItem('lang') || 'en';
    this.translate.use(savedLang);
    document.documentElement.lang = savedLang;
    if (savedLang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }

  ngOnInit() {
    this.darkModeService.getTheme().subscribe(theme => {
      document.documentElement.setAttribute('data-bs-theme', theme);
      document.body.className = theme;
    });}

  toggleLanguage() {
    const currentLang = this.translate.currentLang;
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    this.translate.use(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.lang = newLang;

    if (newLang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }
}
