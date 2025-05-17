import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
// @ts-ignore
import { Toast } from 'bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  isLoading = false;
  changePasswordForm: FormGroup;
  submitted = false;
  toastMessage: string = '';


  constructor(private fb: FormBuilder,private authService: AuthenticationService,private _router:Router) {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  changePassword() {
    if (this.changePasswordForm.invalid) return;
  
    this.isLoading = true;
  
    this.authService.changePassword(this.changePasswordForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.showToast('Password changed successfully! ✅');
        console.log(res);
        setTimeout(()=>{this._router.navigate(['/home'])},500)


  
        // لو عايز كمان تنقل لصفحة معينة بعد التغيير:
        // this._router.navigate(['/profile']);
      },
      error: (err) => {
        this.isLoading = false;
        this.showToast('Password change failed! ❌');
        console.error(err);
  
        // لو عايز تطلع مسج خطأ من السيرفر:
        // this.errorMessage = err.error.message;
      }
    });
  }
  showToast(message: string) {
    this.toastMessage = message;
    const toastEl = document.getElementById('loginToast');
    if (toastEl) {
      const toast = new Toast(toastEl);
      toast.show();
    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.changePasswordForm.valid) {
    this.changePassword()

      const data = this.changePasswordForm.value;
      console.log('Form Data:', data);
      
      // هنا تبعت الداتا على الـ API
    }
  }

  get f() {
    return this.changePasswordForm.controls;
  }
}
