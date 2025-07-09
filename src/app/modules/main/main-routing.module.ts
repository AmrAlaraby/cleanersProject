import { LayoutDashbordComponent } from './layout-dashbord/layout-dashbord.component';
import { ChatComponent } from './chat/chat.component';
import { ChooseCatrgoryComponent } from './choose-catrgory/choose-catrgory.component';
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
import { OrdersComponent } from 'src/app/orders/orders.component';
import { DashboardComponent } from './dasbourd/dasbourd.component';
import { AddressesComponent } from './addresses/addresses.component';
import { AdminWorkersComponent } from './admin-workers/admin-workers.component';
import { AdminCatigoriesComponent } from './admin-catigories/admin-catigories.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { OtpComponent } from './otp/otp.component';
import { EmailSubComponent } from './email-sub/email-sub.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { CustomersComponent } from './customers/customers.component';
import { AdminGuard } from 'src/app/Gaurds/admin-guard.guard';
import { WorkerGuard } from 'src/app/Gaurds/worker-guard.guard';
import { RegularUserGuard } from 'src/app/Gaurds/regular-user-guard.guard';
import { UserTypeOrGuard } from 'src/app/Gaurds/user-type-or.guard';

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
        path:'profile',component:ProfileComponent,canActivate: [RegularUserGuard]
      },
      {
        path:'about',component:AboutComponent,
      },
      {
        path:'chooseCategory',component:ChooseCatrgoryComponent,canActivate: [WorkerGuard]
      },
      {
        path:'address',component:AddressesComponent,canActivate: [RegularUserGuard]
      },
      {
        path:'orders',component:OrdersComponent,canActivate: [UserTypeOrGuard],
      },
       {
        path:'otp/:id',component:OtpComponent,canActivate: [RegularUserGuard]
      },
      {
        path:'chat/:id',component:ChatComponent,canActivate: [UserTypeOrGuard]
      },
       {
        path:'orderComplete/:id',component:OrderCompleteComponent,canActivate: [RegularUserGuard]
      },
      {
        path:'dashboard',component:LayoutDashbordComponent,children:[
          {path:'',redirectTo:'home', pathMatch: "full" },
          {
            path:'home',component:DashboardComponent,
          },
           {
            path:'emailSub',component:EmailSubComponent,
        },
           {
            path:'orders',component:AdminOrdersComponent,
          },
           {
            path:'contacts',component:ContactsComponent,
          },
          {
            path:'workers',component:AdminWorkersComponent,
          },
           {
            path:'customers',component:CustomersComponent,
          },
          {
            path:'Categories',component:AdminCatigoriesComponent,
          },
        ],canActivate: [AdminGuard]

        
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
            path:'cleaners/:id',component:CleanersComponent
          },
          {
            path:'payment',component:PaymentComponent
          }
        ]
      },
      {
        path:'contact',component:ContactUsComponent,
      },
    ],}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
