import { register } from 'swiper/element/bundle';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/serveses/auth.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RegisterCustomerRequest, RegisterWorkerRequest } from '../interfaces/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  loading:boolean=false
  isChecked:boolean=false
  registerForm!: FormGroup;
  selectedFile?: File;
  successMessage = '';
  errorMessage = '';
  showPassword:boolean=false
  profileImagePreview: string | ArrayBuffer | null = null;
  showTermsModal = false;
constructor(private fb:FormBuilder,private _authService:AuthService,private _router:Router,private authService: AuthenticationService){}
 
ngOnInit(): void {
  this.initRegisterForm()


}
initRegisterForm() {
  // this.registerForm = this._formBuilder.group({
  //   email: ['', [Validators.required, Validators.email]],
  //   password: ['', [
  //     Validators.required,
  //     Validators.minLength(3),
  //     Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,}$/)
  //   ]]
  // });
  this.registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    hasAcceptedTerms: [false, Validators.requiredTrue],
    profileImage: [null]
  });
}

onSubmit() {
  this.loading=true
  if (this.registerForm.invalid){this.errorMessage = 'not valid form';
     return;}

  const data: RegisterCustomerRequest = {
    ...this.registerForm.value,
    profileImage: this.selectedFile
  };
  
  this.authService.registerCustomer(data).subscribe({
    next: (res) => {
      
      console.log(res);
      
      this.successMessage = 'تم التسجيل بنجاح ✅';
      this.errorMessage = '';
      this.loading=false
      setTimeout(()=>{},500)
      this._router.navigate(['/auth/Verification',res.email])
    },
    error: (err) => {
      this.errorMessage = err.error.message;
      this.successMessage = '';
      console.error(err);
      this.loading=false
    }
  });
  
}
// submitRegister(){
//   debugger
//   console.log(this.registerForm);
//   if (this.registerForm.valid){
//   this.callLoginApi()
//   }
// }
// callLoginApi(){
//   this._authService.register(this.registerForm.value).subscribe({
//     next : res=>{
//        console.log(res)
       
//     },
//     error:err=> {
//       console.log(err);
      
//   this.errorMessage=err.errors[0];
  
//     }
    
//   })
//   }

  changingIsCheck(){
    if(this.isChecked){
      this.isChecked=false
    }
    else{
      this.isChecked=true
    }
  }

  togglePassword(){
    this.showPassword=!this.showPassword
    
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      // User cancelled, do nothing (preview remains)
      console.log('File selection cancelled, keeping last photo.');
    }
  }

  triggerProfileImageInput() {
    const fileInput = document.getElementById('profileImage') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  openTermsModal(event: Event) {
    event.preventDefault();
    this.showTermsModal = true;
  }
  closeTermsModal() {
    this.showTermsModal = false;
  }
}
