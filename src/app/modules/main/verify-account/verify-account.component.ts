import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MainService } from 'src/app/services/main.service';


@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
})
export class VerifyAccountComponent {
  verifyForm: FormGroup;
  idImageFile!: File;
  selfieImageFile!: File;
  idImagePreview: string | ArrayBuffer | null = null;
  selfieImagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private service: MainService,private authService: AuthenticationService,
      private _router: Router,) {
    this.verifyForm = this.fb.group({
      idImage: [null, Validators.required],
      selfieImage: [null, Validators.required],
    });
  }

  onIdImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.idImageFile = file;
      this.verifyForm.patchValue({ idImage: file });

      const reader = new FileReader();
      reader.onload = () => (this.idImagePreview = reader.result);
      reader.readAsDataURL(file);
    }
  }

  onSelfieImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selfieImageFile = file;
      this.verifyForm.patchValue({ selfieImage: file });

      const reader = new FileReader();
      reader.onload = () => (this.selfieImagePreview = reader.result);
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.verifyForm.invalid) return;

    const formData = new FormData();
    formData.append('IdImage', this.idImageFile);
    formData.append('SelfieImage', this.selfieImageFile);

    this.service.verifyAccount(formData).subscribe({
      next: (res) => {alert(res.message || 'Success')
        this.logout()
      },
      error: (err) => alert(err.error?.message || 'Something went wrong'),
    });
  }
   logout(): void {
    localStorage.removeItem('userToken');
    sessionStorage.removeItem('userToken');
    this.authService.userData.next(null);
    this._router.navigate(['/home']);
  }
}
