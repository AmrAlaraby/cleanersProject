import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserTypeOrGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    debugger
    const userData = this.authService.userData.getValue();

    if (!userData) {
      this.router.navigate(['/home']);
      return false;
    }

    const accountType = userData.accountType;

    if (accountType === 'RegularUser' || accountType === 'Worker') {
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
}
