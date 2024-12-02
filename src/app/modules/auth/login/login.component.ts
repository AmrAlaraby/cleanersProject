import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/serveses/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isChecked:boolean=false
  errorMessage=''
  loginForm!:FormGroup
constructor(private _formBuilder:FormBuilder,private _authService:AuthService,private _router:Router){}
ngOnInit(): void {
  // const userPayload =localStorage.getItem('userPayload')
  // if (userPayload && JSON.parse(userPayload).data.accessToken) {
  //   this._router.navigate(['store/home']) ;}

  
  this.initLoginForm()


}
initLoginForm() {
  this.loginForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,}$/)
    ]]
  });
}
submitLogin(){
  debugger
  console.log(this.loginForm);
  if (this.loginForm.valid){
  this.callLoginApi()
  }
}
callLoginApi(){
  // this._authService.login(this.loginForm.value).subscribe({
  //   next : res=>{
  //      console.log(res)
  //      if(this.isChecked){
  //       console.log(this.isChecked);
        
  //       localStorage.setItem('userPayload',JSON.stringify(res))
  //      }
  //      else{
  //       console.log(this.isChecked);
  //       sessionStorage.setItem('userPayload',JSON.stringify(res))
  //      }
       
  //      this._router.navigate(['store/home'])
  //   },
  //   error:err=> {
  //     console.log(err);
      
  // this.errorMessage=err.error.message;
  
  //   }
    
  // })
  }

  changingIsCheck(){
    if(this.isChecked){
      this.isChecked=false
    }
    else{
      this.isChecked=true
    }
  }
}

