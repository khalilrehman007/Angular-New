
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddnewComponent } from './addnew/addnew.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './pages/home/home.component';
import { ListingComponent } from './listing/listing.component';
import { AuthGuard } from './shared/auth.guard';
import { RoleGuard } from './shared/role.guard';
import { SellrentpropertyComponent } from './pages/sellrentproperty/sellrentproperty.component';




import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { OtpComponent } from './pages/auth/otp/otp.component';
import { ThankyouComponent } from './pages/auth/thankyou/thankyou.component';
import { ForgotComponent } from './pages/auth/forgot/forgot.component';
import { PropertyinfoComponent } from './pages/listproperties/propertyinfo/propertyinfo.component';
import { ListpropertyinfoComponent } from './pages/listproperties/listpropertyinfo/listpropertyinfo.component';
import { ListpropertymediaComponent } from './pages/listproperties/listpropertymedia/listpropertymedia.component';
import { ListpropertyverifyComponent } from './pages/listproperties/listpropertyverify/listpropertyverify.component';
import { ListpropertypublishComponent } from './pages/listproperties/listpropertypublish/listpropertypublish.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { BlogViewComponent } from './pages/blog-view/blog-view.component';
import { RentCommertialComponent } from './pages/listproperties/components/rent-commertial/rent-commertial.component';
import { SellCommertialComponent } from './pages/listproperties/components/sell-commertial/sell-commertial.component';
import { SellResidentialComponent } from './pages/listproperties/components/sell-residential/sell-residential.component';
import { PropertyDetailsComponent } from './pages/PropertyValuation/property-details/property-details.component';
import { PropertyTypesComponent } from './pages/PropertyValuation/property-types/property-types.component';
import { PropertyDocumentsComponent } from './pages/PropertyValuation/property-documents/property-documents.component';
import { PropertyReviewComponent } from './pages/PropertyValuation/property-review/property-review.component';
import { PropertyPaymentComponent } from './pages/PropertyValuation/property-payment/property-payment.component';
import { PropertyDownloadReportComponent } from './pages/PropertyValuation/property-download-report/property-download-report.component';
import {DashboardComponent} from "./profile/dashboard/dashboard.component";
import { AgentDetailsComponent } from './pages/agent-details/agent-details.component';
import { PropertyInnerComponent } from './pages/property-inner/property-inner.component';
import { AgentLandingComponent } from './pages/agent-landing/agent-landing.component';
import { ListingpackagesComponent } from './pages/listingpackages/listingpackages.component';
import { RentpropertiesComponent } from './pages/rentproperties/rentproperties.component';
import { CompanyDetailsComponent } from './pages/company-details/company-details.component';
import { MapviewComponent } from './pages/mapview/mapview.component';
import { PropertyCompareComponent } from './pages/property-compare/property-compare.component';
import { ExploreComponent } from './pages/explore/explore/explore.component';
import { ExploreCityComponent } from './pages/explore/explore-city/explore-city.component';
import { ExploreDetailsComponent } from './pages/explore/explore-details/explore-details.component';
import { DataAnalyticsComponent } from './pages/data-analytics/data-analytics/data-analytics.component';
import { DataAnalyticsSearchResultsComponent } from './pages/data-analytics/data-analytics-search-results/data-analytics-search-results.component';
import { ChatingComponent } from './pages/chating/chating.component';
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
import { TipsAdviceComponent } from './pages/blog-category/tips-advice/tips-advice.component';
import { NewsBlogComponent } from './pages/blog-category/news-blog/news-blog.component';
import { ExploreBlogComponent } from './pages/blog-category/explore-blog/explore-blog.component';
import { LifeAtHomeBlogComponent } from './pages/blog-category/life-at-home-blog/life-at-home-blog.component';
import { LawBlogComponent } from './pages/blog-category/law-blog/law-blog.component';
import { MarketTrendsBlogComponent } from './pages/blog-category/market-trends-blog/market-trends-blog.component';


// import {RoleGuardService} from "./role-guard-service.service";

const routes: Routes = [

  //first only check login => AuthGuard
  // { path:  '', component:  HomeComponent, canActivate: [AuthGuard]},
  //second check roles & login => RoleGuard
  // { path:  '', component:  HomeComponent, canActivate: [RoleGuard]},

  // { path:  'profile', component:  DashboardComponent,canActivate: [RoleGuard]},
  { path:  'profile', component:  DashboardComponent,canActivate: [AuthGuard]},
  { path:  '', component:  HomeComponent},
  { path:  'sellrent', component:  SellrentpropertyComponent},
  { path:  'login', component:  LoginComponent},
  { path:  'signup', component:  SignupComponent},
  { path:  'otp', component:  OtpComponent},
  { path:  'thanku', component:  ThankyouComponent},
  { path:  'forgot', component:  ForgotComponent},
  { path:  'listingproperty', component:  PropertyinfoComponent,canActivate: [AuthGuard]},
  { path:  'listpropertyinfo', component:  ListpropertyinfoComponent,canActivate: [AuthGuard]},
  { path:  'listpropertymedia', component:  ListpropertymediaComponent,canActivate: [AuthGuard]},
  { path:  'listpropertyverify', component:  ListpropertyverifyComponent},
  { path:  'listpropertypublish', component:  ListpropertypublishComponent,canActivate: [AuthGuard]},
  { path:  'RentCommertial', component:  RentCommertialComponent},
  { path:  'SellCommertial', component:  SellCommertialComponent},
  { path:  'SellResidential', component:  SellResidentialComponent},
  { path:  'PropertyDetail', component:  PropertyDetailsComponent},
  { path:  'PropertyType', component:  PropertyTypesComponent},
  { path:  'PropertyDocument', component:  PropertyDocumentsComponent},
  { path:  'PropertyReview', component:  PropertyReviewComponent},
  { path:  'PropertyPayment', component:  PropertyPaymentComponent},
  { path:  'PropertyDownloadReport', component:  PropertyDownloadReportComponent},
  { path:  'PropertDetailsPage', component:  PropertyInnerComponent},
  { path: "blogs", component: BlogsComponent },
  { path: "tips-advice", component: TipsAdviceComponent },
  { path: "newsblog", component: NewsBlogComponent },
  { path: "exploreblog", component: ExploreBlogComponent },
  { path: "left-at-home", component: LifeAtHomeBlogComponent },
  { path: "lawblog", component: LawBlogComponent },
  { path: "market-trends", component: MarketTrendsBlogComponent },
  // { path: "blogs/:id", component: BlogViewComponent },
  { path: "blogs-details/:id", component: BlogViewComponent },
  { path: "agent-details/:id", component: AgentDetailsComponent },
  { path: "company-details/:id", component: CompanyDetailsComponent },
  { path: "find-agent", component: AgentLandingComponent },
  { path: "find-companies", component: AgentLandingComponent },
  { path: "listing-packages", component: ListingpackagesComponent },
  { path: "search", component: RentpropertiesComponent },
  { path: "search/:type", component: RentpropertiesComponent },
  { path: "mapview", component: MapviewComponent },
  { path: "PropertyCompare", component: PropertyCompareComponent },
  { path: "explore", component: ExploreComponent },
  { path: "explore-city", component: ExploreCityComponent },
  { path: "explore-details", component: ExploreDetailsComponent },
  { path: "data-analytics", component: DataAnalyticsComponent },
  { path: "data-analytics-search-result", component: DataAnalyticsSearchResultsComponent },
  { path: "chat", component: ChatingComponent },
  { path: "chat-new-message", component: ChatNewMessageComponent },
  { path: "about-us", component: AboutusComponent },
  { path: "privacy-policy", component: PrivacyPolicyComponent },
  { path: "term-condition", component: TermConditionsComponent },
  { path: "contact", component: ContactUsComponent },
  { path: "cookie", component: CookiePolicyComponent },
  { path: "faq", component: FaqComponent },
  { path: "help-center", component: HelpCenterComponent },
  { path: "how-it-works", component: HowItWorksComponent },
  { path: "investors", component: InvestorsComponent },
  { path: "buy-properties", component: BuyPropertiesComponent },
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
