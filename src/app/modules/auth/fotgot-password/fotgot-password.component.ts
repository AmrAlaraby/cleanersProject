import { identifierName } from '@angular/compiler';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/serveses/auth.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
declare var bootstrap: any;
@Component({
  selector: 'app-fotgot-password',
  templateUrl: './fotgot-password.component.html',
  styleUrls: ['./fotgot-password.component.css']
})
export class FotgotPasswordComponent {
  forgotForm = this.fb.group({
    identifier: ['', [Validators.required]]
  });

  loading = false;

  @ViewChild('toastForgot', { static: true }) toastForgot!: ElementRef;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) {}

  showToast(message: string, success: boolean = true) {
    const toastEl = document.createElement('div');
    toastEl.className = `toast align-items-center text-bg-${success ? 'success' : 'danger'} border-0 show`;
    toastEl.setAttribute('role', 'alert');
    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `;
    this.toastForgot.nativeElement.appendChild(toastEl);
    new bootstrap.Toast(toastEl).show();
  }

  onSubmit() {
    if (this.forgotForm.invalid) return;

    this.loading = true;

    const identifier = this.forgotForm.value.identifier!;
    this.authService.forgetPassword(identifier).subscribe({
      next: () => {
        this.showToast('Reset link sent to your email ✅');
        this.forgotForm.reset();
      },
      error: () => {
        this.showToast('Error sending reset link ❌', false);
      },
      complete: () => (this.loading = false)
    });
  }
}
