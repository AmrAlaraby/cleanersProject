import { isIdentifier } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/serveses/auth.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
// @ts-ignore
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  isChecked:boolean=false
  errorMessage=''
  loginForm!:FormGroup
  showPassword:boolean=false
  toastMessage: string = '';


constructor(private _formBuilder:FormBuilder, private authService: AuthenticationService,private _authService:AuthService,private _router:Router){}
ngOnInit(): void {
  // const userPayload =localStorage.getItem('userPayload')
  // if (userPayload && JSON.parse(userPayload).data.accessToken) {
  //   this._router.navigate(['store/home']) ;}

  
  this.initLoginForm()


}
initLoginForm() {
  this.loginForm = this._formBuilder.group({
    identifier: ['', [Validators.required]],
    password: ['', [
      Validators.required
    ]]
  });
}
submitLogin(){
  this.isLoading=true
  console.log(this.loginForm);
  if (this.loginForm.valid){
    this.isLoading = true;
  this.callLoginApi()
  }
}
callLoginApi(){
   this.authService.login(this.loginForm.value).subscribe({
    next : res=>{
      if (!res.isEmailConfirmed) {
     
          this._router.navigate(['/auth/Verification',this.loginForm.value.identifier])
        return
      }
      this.isLoading = false;
      this.showToast('Login successful! ✅');
       console.log(res)
       if(this.isChecked){
        localStorage.setItem('userToken',JSON.stringify(res))
       }
       else{
        sessionStorage.setItem('userToken',JSON.stringify(res))
       }
       this.authService.saveUserData()
       setTimeout(()=>{this._router.navigate(['/home'])},500)
       
       
    },
    error:err=> {
      this.isLoading = false;
      this.showToast('Login failed! ❌');
      console.log(err);
      
  // this.errorMessage=err.error.message;
  
    }
    
  })
  }

  changingIsCheck(){
    if(this.isChecked){
      this.isChecked=false
    }
    else{
      this.isChecked=true
    }
  }

  showToast(message: string) {
    this.toastMessage = message;
    const toastEl = document.getElementById('loginToast');
    if (toastEl) {
      const toast = new Toast(toastEl);
      toast.show();
    }
  }

  togglePassword(){
    this.showPassword=!this.showPassword
    
  }
}

