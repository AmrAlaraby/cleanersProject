import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../serveses/auth.service';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    const userData = this.authService.userData.getValue();

    if (userData?.accountType === 'Admin') {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
