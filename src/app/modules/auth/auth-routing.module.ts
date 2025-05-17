import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSigninComponent } from './login-signin/login-signin.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { WorkerSignupComponent } from './worker-signup/worker-signup.component';
import { FotgotPasswordComponent } from './fotgot-password/fotgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DashboardComponent } from '../main/dasbourd/dasbourd.component';
import { SidbearComponent } from '../main/sidbear/sidbear.component';

const routes: Routes = [

  {path:"auth",component:LayoutComponent,
    children:[

      {
        path:'',redirectTo:'loginSignin', pathMatch: "full" 
      },
      {
        path:'loginSignin',component:LoginSigninComponent,
      },  
      {
        path:'login',component:LoginComponent
      },  
      {
        path:'signup',component:SignupComponent
      },
   
      
      {
        path:'workerSignup',component:WorkerSignupComponent
      },  
      {
        path:'forgetPassword',component:FotgotPasswordComponent
      },  
      {
        path:'Verification/:identifier',component:EmailVerificationComponent
      },  
      { 
        path: 'PasswordReset', component: ResetPasswordComponent 
      },
      { 
        path: 'changePassword', component: ChangePasswordComponent 
      }

      
    ],},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
