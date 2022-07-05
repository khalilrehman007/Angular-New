
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
  { path:  'listingproperty', component:  PropertyinfoComponent},
  { path:  'listpropertyinfo', component:  ListpropertyinfoComponent},
  { path:  'listpropertymedia', component:  ListpropertymediaComponent},
  { path:  'listpropertyverify', component:  ListpropertyverifyComponent},
  { path:  'listpropertypublish', component:  ListpropertypublishComponent},
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
  { path: "blogs/:id", component: BlogViewComponent },
  { path: "agent-details/:id", component: AgentDetailsComponent },
  { path: "company-details/:id", component: CompanyDetailsComponent },
  { path: "find-agent", component: AgentLandingComponent },
  { path: "listing-packages", component: ListingpackagesComponent },
  { path: "rent-properties", component: RentpropertiesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
