import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { CleanersComponent } from './cleaners/cleaners.component';
import { PaymentComponent } from './payment/payment.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqsComponent } from './faqs/faqs.component';
import { AllServicesComponent } from './all-services/all-services.component';
import { DiscountComponent } from './discount/discount.component';
import { BestCleanerComponent } from './best-cleaner/best-cleaner.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ChooseCatrgoryComponent } from './choose-catrgory/choose-catrgory.component';
import { ChatComponent } from './chat/chat.component';
import { LayoutDashbordComponent } from './layout-dashbord/layout-dashbord.component';
import { SidbearComponent } from './sidbear/sidbear.component';
import { DashboardComponent } from './dasbourd/dasbourd.component';
import { NgChartsModule } from 'ng2-charts';
import { AddressesComponent } from './addresses/addresses.component';



@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    CleanersComponent,
    PaymentComponent,
    ContactUsComponent,
    FaqsComponent,
    AllServicesComponent,
    DiscountComponent,
    BestCleanerComponent,
    ChatbotComponent,
    ChooseCatrgoryComponent,
    ChatComponent,
    LayoutDashbordComponent,
    SidbearComponent,
    DashboardComponent,
    AddressesComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    HttpClientModule,
    TranslateModule,
    NgChartsModule,
    ReactiveFormsModule
    
  ]
})
export class MainModule{ }
