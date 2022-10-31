import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: "", loadChildren: () => import('./homepage-module/homepage-module.module').then(module => module.HomepageModuleModule) },
  { path: "login", loadChildren: () => import('./login/login.module').then(module => module.LoginModule) },
  { path: "signup", loadChildren: () => import('./signup/signup.module').then(module => module.SignupModule) },
  { path: "valuation", loadChildren: () => import('./property-valuation/property-valuation.module').then(module => module.PropertyValuationModule) },
  { path: "property", loadChildren: () => import('./property/property.module').then(module => module.PropertyModule) },
  { path: "explore", loadChildren: () => import('./explore/explore.module').then(module => module.ExploreModule) },
  { path: "sellrent", loadChildren: () => import('./sell/sell.module').then(module => module.SellModule) },
  { path: "add-property", loadChildren: () => import('./add-property-listing/add-property-listing.module').then(module => module.AddPropertyListingModule) },
  { path: "blog", loadChildren: () => import('./blog/blog.module').then(module => module.BlogModule) },
  { path: "profile", loadChildren: () => import('./dashboard/dashboard.module').then(module => module.DashboardModule), canActivate: [AuthGuard] },
  { path: "dashboard-reports", loadChildren: () => import('./dashboard-module/dashboard-module.module').then(module => module.DashboardModuleModule) },
  { path: "classified", loadChildren: () => import('./classified-module/classified-module.module').then(module => module.ClassifiedModuleModule) },
  { path: "PropertyCompare", loadChildren: () => import('./property-compare/property-compare.module').then(module => module.PropertyCompareModule) },
  { path: "find-agent", loadChildren: () => import('./agent-and-companies/agent-and-companies.module').then(module => module.AgentAndCompaniesModule) },
  { path: "find-companies", loadChildren: () => import('./agent-and-companies/agent-and-companies.module').then(module => module.AgentAndCompaniesModule) },
  { path: "agent-details/:id", loadChildren: () => import('./agent-details/agent-details.module').then(module => module.AgentDetailsModule) },
  { path: "company-details/:id", loadChildren: () => import('./company-details/company-details.module').then(module => module.CompanyDetailsModule) },
  { path: "forgot", loadChildren: () => import('./forget/forget.module').then(module => module.ForgetModule) },
  { path: "payment-packages", loadChildren: () => import('./payment-packages/payment-packages.module').then(module => module.PaymentPackagesModule) },
  { path: "payment-form", loadChildren: () => import('./payment-packages-final/payment-packages-final.module').then(module => module.PaymentPackagesFinalModule) },
  { path: "data-intelligence/data", loadChildren: () => import('./data-intelligence/data/data.module').then(module => module.DataModule) },
  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArRoutingModule { }
