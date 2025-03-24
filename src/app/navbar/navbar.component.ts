import { Component, OnInit } from '@angular/core';
import { AuthService } from '../serveses/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DarkModeService } from '../services/dark-mode.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private _AuthServece :AuthService,private _router:Router,private translate: TranslateService,private darkModeService: DarkModeService){
    this.darkModeService.getTheme().subscribe(theme => {
      this.isDarkMode = theme === 'dark';
    });}
  isLogin:boolean=false
  
  ngOnInit(): void {
    this._AuthServece.saveUserData()
    this._AuthServece.userData.subscribe(
      {
        next: ()=>{
          if (this._AuthServece.userData.getValue() != null) {
            this.isLogin=true
          } else {
            this.isLogin=false
          }
        }
      }
    )
  }
  logout(){
    debugger
    localStorage.removeItem('userToken')
    sessionStorage.removeItem('userToken')
    this._AuthServece.userData.next(null)
    this._router.navigate(['/home'])
  }

  toggleLanguage() {
    const currentLang = this.translate.currentLang;
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    
    this.translate.use(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.lang = newLang;

    // تبديل الاتجاه للـ RTL عند اختيار العربية
    if (newLang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }

  isDarkMode = false;


  toggleDarkMode() {
    this.darkModeService.toggleTheme();
  }
}
