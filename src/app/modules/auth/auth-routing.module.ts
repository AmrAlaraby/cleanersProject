import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSigninComponent } from './login-signin/login-signin.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

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
    ],},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
