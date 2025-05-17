import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
// @ts-ignore
import { Toast } from 'bootstrap';
@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent {
  identifier = '';

  verificationForm = this.fb.group({
    code: ['', Validators.required],
  });

  @ViewChild('toastBody', { static: false }) toastBody!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private _router:Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.identifier = params['identifier'];
   
      console.log(this.identifier);
    });
  }

  get code() {
    return this.verificationForm.get('code')!;
  }

  showToast(message: string, isSuccess = true) {
    const toastEl = document.getElementById('liveToast');
    if (toastEl) {
      this.toastBody.nativeElement.innerText = message;
      toastEl.classList.remove('bg-success', 'bg-danger');
      toastEl.classList.add(isSuccess ? 'bg-success' : 'bg-danger');
      const toast = new Toast(toastEl);
      toast.show();
    }
  }

  onSubmit() {
    
    if (this.verificationForm.valid) {
      this.authService
        .verifyEmail(
           this.identifier,
           this.code.value!,
        )
        .subscribe({
          next: (res) => {
            console.log(res);
            localStorage.setItem('userToken',JSON.stringify(res))
            this.authService.saveUserData()
            this.showToast('Email verified successfully! ✅')
            setTimeout(()=>{},500)
            this._router.navigate(['/home'])
          },
          error: () => this.showToast('Invalid code, try again ❌', false),
        });
    }
  }

  resendCode() {
    this.authService
      .resendOtp(this.identifier)
      .subscribe({
        next: () => this.showToast('Code resent ✅'),
        error: () => this.showToast('Failed to resend ❌', false),
      });
  }
}
