import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from "./profile/dashboard/dashboard.component";
import { CarouselModule } from 'ngx-owl-carousel-o';
import {SliderModule} from 'primeng/slider';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
// import { HashLocationStrategy, LocationStrategy  } from '@angular/common';
import { SellrentpropertyComponent } from './pages/sellrentproperty/sellrentproperty.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FooterComponent } from './footer/footer.component';
import {MatIconModule} from '@angular/material/icon';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
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
// import { PropertySelectReportComponent } from './pages/PropertyValuation/property-select-report/property-select-report.component';
import { PropertyPaymentComponent } from './pages/PropertyValuation/property-payment/property-payment.component';
import { PropertyDownloadReportComponent } from './pages/PropertyValuation/property-download-report/property-download-report.component';
import { FiltersoftypeComponent } from './pages/home/filtersoftype/filtersoftype.component';
import { PropertyInnerComponent } from './pages/property-inner/property-inner.component';
import { AgentDetailsComponent } from './pages/agent-details/agent-details.component';
import { RentSearchComponent } from "./pages/home/rentSearch/rentSearch.component";
import { BuySearchComponent } from "./pages/home/buySearch/buySearch.component";
import { LandSearchComponent } from "./pages/home/landSearch/landSearch.component";
import { ComercialSearchComponent } from "./pages/home/comercialSearch/comercialSearch.component";
import {FindAgentSearchComponent} from "./pages/home/findagentSearch/findAgentSearch.component";
import { AgentLandingComponent } from './pages/agent-landing/agent-landing.component';
import { ListingpackagesComponent } from './pages/listingpackages/listingpackages.component';
import { RentpropertiesComponent } from './pages/rentproperties/rentproperties.component';
import { CompanyDetailsComponent } from './pages/company-details/company-details.component';
import { PropertyfilterComponent } from './propertyfilter/propertyfilter.component';
import { MapviewComponent } from './pages/mapview/mapview.component';
import { PropertyCompareComponent } from './pages/property-compare/property-compare.component';
import { ExploreComponent } from './pages/explore/explore/explore.component';
import { ExploreCityComponent } from './pages/explore/explore-city/explore-city.component';
import { ExploreDetailsComponent } from './pages/explore/explore-details/explore-details.component';
import { DataAnalyticsComponent } from './pages/data-analytics/data-analytics/data-analytics.component';
import { DataAnalyticsSearchResultsComponent } from './pages/data-analytics/data-analytics-search-results/data-analytics-search-results.component';
import { ChatingComponent } from './pages/chating/chating.component';
import { NgxEditorModule } from "ngx-editor";
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ChatNewMessageComponent } from './pages/chat-new-message/chat-new-message.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermConditionsComponent } from './pages/term-conditions/term-conditions.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { CookiePolicyComponent } from './pages/cookie-policy/cookie-policy.component';
import { FaqComponent } from './pages/faq/faq.component';
import { HelpCenterComponent } from './pages/help-center/help-center.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { InvestorsComponent } from './pages/investors/investors.component';
import { BuyPropertiesComponent } from './pages/buy-properties/buy-properties.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { TipsAdviceComponent } from './pages/blog-category/tips-advice/tips-advice.component';
import { NewsBlogComponent } from './pages/blog-category/news-blog/news-blog.component';
import { ExploreBlogComponent } from './pages/blog-category/explore-blog/explore-blog.component';
import { LifeAtHomeBlogComponent } from './pages/blog-category/life-at-home-blog/life-at-home-blog.component';
import { LawBlogComponent } from './pages/blog-category/law-blog/law-blog.component';
import { MarketTrendsBlogComponent } from './pages/blog-category/market-trends-blog/market-trends-blog.component';
import { LoaderComponent } from './loader/loader.component';
import { SuccessAlertComponent } from './success-alert/success-alert.component';
import { ErroralertComponent } from './erroralert/erroralert.component';
import { PaymentPackagesComponent } from './pages/payment-packages/payment-packages.component';
import { environment } from "../environments/environment";
import { initializeApp } from "firebase/app";
import { CometChatUI } from "../cometchat/CometChatWorkspace/src/components/CometChatUI/CometChat-Ui/cometchat-ui.module";
import { ComingsoomComponent } from './pages/comingsoom/comingsoom.component';
initializeApp(environment.firebase);


@NgModule({
  declarations: [
    AppComponent,
    BuySearchComponent,
    FindAgentSearchComponent,
    ComercialSearchComponent,
    LandSearchComponent,
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
    PropertyPaymentComponent,
    PropertyDownloadReportComponent,
    FiltersoftypeComponent,
    AgentDetailsComponent,
    PropertyInnerComponent,
    RentSearchComponent,
    AgentLandingComponent,
    ListingpackagesComponent,
    RentpropertiesComponent,
    CompanyDetailsComponent,
    PropertyfilterComponent,
    MapviewComponent,
    PropertyCompareComponent,
    ExploreComponent,
    ExploreCityComponent,
    ExploreDetailsComponent,
    DataAnalyticsComponent,
    DataAnalyticsSearchResultsComponent,
    ChatingComponent,
    ChatNewMessageComponent,
    PagenotfoundComponent,
    AboutusComponent,
    PrivacyPolicyComponent,
    TermConditionsComponent,
    ContactUsComponent,
    CookiePolicyComponent,
    FaqComponent,
    HelpCenterComponent,
    HowItWorksComponent,
    InvestorsComponent,
    BuyPropertiesComponent,
    TipsAdviceComponent,
    NewsBlogComponent,
    ExploreBlogComponent,
    LifeAtHomeBlogComponent,
    LawBlogComponent,
    MarketTrendsBlogComponent,
    LoaderComponent,
    SuccessAlertComponent,
    ErroralertComponent,
    PaymentPackagesComponent,
    ComingsoomComponent
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
    MatTooltipModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    NgxEditorModule,
    ScrollingModule,
    NgxSliderModule,
    CometChatUI,
    MatChipsModule,
    MatAutocompleteModule,
    NgChartsModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right'
    })
  ],
  providers: [
    CookieService,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}
    // {provide : LocationStrategy , useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


