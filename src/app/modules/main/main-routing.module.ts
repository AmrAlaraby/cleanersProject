import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PaymentComponent } from './payment/payment.component';
import { AllServicesComponent } from './all-services/all-services.component';
import { CleanersComponent } from './cleaners/cleaners.component';

const routes: Routes = [
  {path:"",component:LayoutComponent,
    children:[

      {
        path:'',redirectTo:'home', pathMatch: "full" 
      },
      {
        path:'home',component:HomeComponent,
      },
      {
        path:'about',component:AboutComponent,
      },
      {
        path:'services',component:ServicesComponent,children:[
          {
            path:'',redirectTo:'allservices', pathMatch: "full" 
          },
          {
            path:'allservices',component:AllServicesComponent
          },
          {
            path:'cleaners',component:CleanersComponent
          },
          {
            path:'payment',component:PaymentComponent
          }
        ]
      },
      {
        path:'contact',component:ContactUsComponent,
      }
     
    ],}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
