
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
// @ts-ignore
import { Toast } from 'bootstrap';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetForm!: FormGroup;
  userId: string = '';
  token: string = '';
  done:boolean =false

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.token = decodeURIComponent(params['token']);
    });

    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordsMatch });
  }

  passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    return group.get('newPassword')!.value === group.get('confirmPassword')!.value
      ? null : { mismatch: true };
  }

  showToast(message: string, type: 'success' | 'danger' | 'warning' = 'success') {
    const toastEl = document.getElementById('mainToast')!;
    const toastBody = document.getElementById('toastMessage')!;
    
    toastBody.innerText = message;
    
    toastEl.classList.remove('bg-success', 'bg-danger', 'bg-warning');
    toastEl.classList.add(`bg-${type}`);

    const toast = new Toast(toastEl);
    toast.show();
  }

  onSubmit() {
    if (this.resetForm.invalid) return;

    const { newPassword } = this.resetForm.value;

    console.log('userId:', this.userId);
console.log('token:', this.token);
console.log('newPassword:', newPassword);

    

    this.authService.resetPassword(this.userId, this.token, newPassword).subscribe({
      next: () => {
        // Show success toast
       
        this.done=true
        this.showToast('تمت إعادة تعيين كلمة المرور بنجاح ✅', 'success');

        
      },
      error: (err) => {
        // Show error toast
        console.log(err);
        

this.showToast('حدث خطأ أثناء المعالجة ❌', 'danger');
      }
    });
  }
}
