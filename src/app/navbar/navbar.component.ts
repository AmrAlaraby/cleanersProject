import { worker } from './../modules/main/interfaces/interfaces';
import { AccountType } from './../modules/auth/interfaces/auth';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../serveses/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DarkModeService } from '../services/dark-mode.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  userImage: string = 'assets/images/16.webp'; // Replace with actual default image path
  userName: string = 'User Name'; // Replace with actual user name
  isDarkMode = false;
  isWorker:boolean=false;
  isAdmin:boolean=false;

  constructor(
    private _AuthServece: AuthService,
    private authService: AuthenticationService,
    private _router: Router,
    private translate: TranslateService,
    private darkModeService: DarkModeService
  ) {
    this.darkModeService.getTheme().subscribe(theme => {
      this.isDarkMode = theme === 'dark';
    });
  }

  ngOnInit(): void {
    this.authService.saveUserData();
    this.authService.userData.subscribe({
      next: () => {

        if (this.authService.userData.getValue() != null) {
          this.isLogin = true;
          const accountType = this.authService.userData.getValue()?.accountType?.toLowerCase();
          if (accountType === 'worker') {
            this.isWorker = true;
            this.isAdmin = false;

          }
          else{
            if(accountType === 'admin') {
              this.isAdmin = true;
              this.isWorker = false; 
            }
            else{
              this.isWorker = false;
              this.isAdmin = false;
            }

          }
          

          // Update userImage and userName from userData
          const userData = this.authService.userData.getValue();
          this.userImage = userData?.profileImage || this.userImage;
          this.userName = userData?.name || this.userName;
        } else {
          this.isLogin = false;
        }
      }
    });
  }

  logout(): void {
    localStorage.removeItem('userToken');
    sessionStorage.removeItem('userToken');
    this.authService.userData.next(null);
    this._router.navigate(['/home']);
  }

  toggleLanguage(): void {
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

  toggleDarkMode(): void {
    this.darkModeService.toggleTheme();
}
}