import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './pages/home/home.component';
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


@NgModule({
  declarations: [
    AppComponent,
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
    ListpropertypublishComponent    
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
    ToastrModule.forRoot()
  ],
  providers: [
    // CookieService,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}
    // {provide : LocationStrategy , useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
