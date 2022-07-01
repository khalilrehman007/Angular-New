import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from "./profile/dashboard/dashboard.component";
import { CarouselModule } from 'ngx-owl-carousel-o';
import {SliderModule} from 'primeng/slider';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
// import { HashLocationStrategy, LocationStrategy  } from '@angular/common';
import { SellrentpropertyComponent } from './pages/sellrentproperty/sellrentproperty.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FooterComponent } from './footer/footer.component';
import {MatIconModule} from '@angular/material/icon';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import {MatExpansionModule} from '@angular/material/expansion';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CustomerComponent } from './customer/customer.component';
import { ListingComponent } from './listing/listing.component';
import { AddnewComponent } from './addnew/addnew.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { BlogViewComponent } from './pages/blog-view/blog-view.component';

import { SecondHeaderComponent } from './second-header/second-header.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { OtpComponent } from './pages/auth/otp/otp.component';
import { ThankyouComponent } from './pages/auth/thankyou/thankyou.component';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ForgotComponent } from './pages/auth/forgot/forgot.component';
import { PropertyinfoComponent } from './pages/listproperties/propertyinfo/propertyinfo.component';
import {MatListModule} from '@angular/material/list';
import { ListpropertyinfoComponent } from './pages/listproperties/listpropertyinfo/listpropertyinfo.component';
import { ListpropertymediaComponent } from './pages/listproperties/listpropertymedia/listpropertymedia.component';
import { ListpropertyverifyComponent } from './pages/listproperties/listpropertyverify/listpropertyverify.component';
import { ListpropertypublishComponent } from './pages/listproperties/listpropertypublish/listpropertypublish.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';
import {MatTabsModule} from '@angular/material/tabs';
import { RentCommertialComponent } from './pages/listproperties/components/rent-commertial/rent-commertial.component';
import { SellCommertialComponent } from './pages/listproperties/components/sell-commertial/sell-commertial.component';
import { SellResidentialComponent } from './pages/listproperties/components/sell-residential/sell-residential.component';
import { PropertyDetailsComponent } from './pages/PropertyValuation/property-details/property-details.component';
import { PropertyTypesComponent } from './pages/PropertyValuation/property-types/property-types.component';
import { PropertyDocumentsComponent } from './pages/PropertyValuation/property-documents/property-documents.component';
import { PropertyReviewComponent } from './pages/PropertyValuation/property-review/property-review.component';
import { PropertySelectReportComponent } from './pages/PropertyValuation/property-select-report/property-select-report.component';
import { PropertyPaymentComponent } from './pages/PropertyValuation/property-payment/property-payment.component';
import { PropertyDownloadReportComponent } from './pages/PropertyValuation/property-download-report/property-download-report.component';
import { FiltersoftypeComponent } from './pages/home/filtersoftype/filtersoftype.component';
import {RentSearchComponent} from "./pages/home/rentSearch/rentSearch.component";
import { AgentDetailsComponent } from './pages/agent-details/agent-details.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    HomeComponent,
    SellrentpropertyComponent,
    FooterComponent,
    BreadcrumbComponent,
    CustomerComponent,
    ListingComponent,
    AddnewComponent,
    LoginComponent,
    BlogsComponent,
    BlogViewComponent,
    SecondHeaderComponent,
    LoginComponent,
    SignupComponent,
    OtpComponent,
    ThankyouComponent,
    ForgotComponent,
    PropertyinfoComponent,
    ListpropertyinfoComponent,
    ListpropertymediaComponent,
    ListpropertyverifyComponent,
    ListpropertypublishComponent,
    RentCommertialComponent,
    SellCommertialComponent,
    SellResidentialComponent,
    PropertyDetailsComponent,
    PropertyTypesComponent,
    PropertyDocumentsComponent,
    PropertyReviewComponent,
    PropertySelectReportComponent,
    PropertyPaymentComponent,
    PropertyDownloadReportComponent,
    FiltersoftypeComponent,
    RentSearchComponent,
    AgentDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    SliderModule,
    InputTextModule,
    FormsModule,
    NgbModule,
    NgbNavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatExpansionModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,AppRoutingModule,HttpClientModule,ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatTabsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right'
    })
  ],
  providers: [
    // CookieService,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}
    // {provide : LocationStrategy , useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
