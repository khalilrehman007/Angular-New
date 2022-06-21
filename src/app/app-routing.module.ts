import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
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

const routes: Routes = [
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
  { path:  'listpropertypublish', component:  ListpropertypublishComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
