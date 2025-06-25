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
import { SidbearComponent } from './sidbear/sidbear.component';
import { AddressesComponent } from './addresses/addresses.component';
import { AdminWorkersComponent } from './admin-workers/admin-workers.component';
import { AdminCatigoriesComponent } from './admin-catigories/admin-catigories.component';

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
        path:'chooseCategory',component:ChooseCatrgoryComponent,
      },
      {
        path:'address',component:AddressesComponent,
      },
      {
        path:'orders',component:OrdersComponent,
      },
      {
        path:'chat/:id',component:ChatComponent,
      },
      {
        path:'dashboard',component:LayoutDashbordComponent,children:[
          {path:'',redirectTo:'home', pathMatch: "full" },
          {
            path:'home',component:DashboardComponent,
          },
          {
            path:'workers',component:AdminWorkersComponent,
          },
          {
            path:'Categories',component:AdminCatigoriesComponent,
          },
        ]

        
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
