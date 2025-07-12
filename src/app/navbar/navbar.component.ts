
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DarkModeService } from '../services/dark-mode.service';
import { AuthenticationService } from '../services/authentication.service';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  userImage: string = 'assets/images/16.webp'; // Replace with actual default image path
  name: string = 'User Name'; // Replace with actual user name
  isDarkMode = false;
  isWorker:boolean=false;
  isAdmin:boolean=false;
  currentLang: string = 'en';
  isActive: boolean = true; 
  
  isAccountVerified: boolean = true; // Default value, can be updated based on user data


  constructor(

    private authService: AuthenticationService,
    private _router: Router,
    private translate: TranslateService,
    private darkModeService: DarkModeService,
    private _mainService: MainService
  ) {
    this.darkModeService.getTheme().subscribe(theme => {
      this.isDarkMode = theme === 'dark';
    });
    this.currentLang = this.translate.currentLang;

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
      console.log(`Language changed to: ${this.currentLang}`);
      
    });
  }

  ngOnInit(): void {
    this.authService.saveUserData();


    



    this.authService.userData.subscribe({
      next: () => {

        if (this.authService.userData.getValue() != null) {
          console.log(this.authService.userData.getValue());
          
          this.isLogin = true;
          const accountType = this.authService.userData.getValue()?.accountType?.toLowerCase();
          if (accountType === 'worker') {
            this.isWorker = true;
            this.isAdmin = false;
            const token = JSON.parse(localStorage.getItem('userToken') || 'null')|| JSON.parse(sessionStorage.getItem('userToken') || 'null');
            if (token.isAccountActive === false) {
              this.isActive = false;
            }else{
              this.isActive = true;
            }
            if (token.isAccountVerified === false) {
              console.log(token.isIsAccountVerified);
              
              this.isAccountVerified = false;
            }else{
              this.isAccountVerified = true;
            }

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
          this.name = userData?.UserName || this.name;
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
    this.isActive = true; 
  
  this.isAccountVerified = true;
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

navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  payNow() {
      this._mainService.payPlatformFee().subscribe({
    next: (res) => {
      console.log(res);
      

      if (!res.iframeUrl) {
        this._router.navigate(['/paymentComplete'], {
          queryParams: {
            isError: false,
            message: res.message,

          },
        });
      } else {
        window.location.href = res.iframeUrl;
      }
    },
    error: (err) => {
    
      const errorMsg = err?.error?.message || 'حدث خطأ أثناء تنفيذ عملية الدفع';
      this._router.navigate(['/paymentComplete'], {
        queryParams: {
          isError: true,
          message: errorMsg,
       
        },
      });
    }
  });
}

goToVerify() {
  this._router.navigate(['/verify-account']); // غير اللينك ده حسب صفحة التفعيل عندك
}

}