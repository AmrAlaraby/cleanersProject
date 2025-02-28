import { register } from 'swiper/element/bundle';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/serveses/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
isChecked:boolean=false
  errorMessage=''
  registerForm!:FormGroup
  showPassword:boolean=false
constructor(private _formBuilder:FormBuilder,private _authService:AuthService,private _router:Router){}
ngOnInit(): void {
  // const userPayload =localStorage.getItem('userPayload')
  // if (userPayload && JSON.parse(userPayload).data.accessToken) {
  //   this._router.navigate(['store/home']) ;}

  
  this.initRegisterForm()


}
initRegisterForm() {
  this.registerForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,}$/)
    ]]
  });
}
submitRegister(){
  debugger
  console.log(this.registerForm);
  if (this.registerForm.valid){
  this.callLoginApi()
  }
}
callLoginApi(){
  this._authService.register(this.registerForm.value).subscribe({
    next : res=>{
       console.log(res)
       
    },
    error:err=> {
      console.log(err);
      
  this.errorMessage=err.errors[0];
  
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

  togglePassword(){
    this.showPassword=!this.showPassword
    
  }
}
