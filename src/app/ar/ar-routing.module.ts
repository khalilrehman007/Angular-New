import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/auth.guard';

const routes: Routes = [
  { path: "", loadChildren: () => import('./homepage-module/homepage-module.module').then(module => module.HomepageModuleModule) },
  { path: "login", loadChildren: () => import('./login/login.module').then(module => module.LoginModule) },
  { path: "signup", loadChildren: () => import('./signup/signup.module').then(module => module.SignupModule) },
  { path: "forgot", loadChildren: () => import('./forget/forget.module').then(module => module.ForgetModule) },
  { path: "profile", loadChildren: () => import('./dashboard/dashboard.module').then(module => module.DashboardModule), canActivate: [AuthGuard] },
  { path: "blog", loadChildren: () => import('./blog/blog.module').then(module => module.BlogModule) },
  { path: "explore", loadChildren: () => import('./explore/explore.module').then(module => module.ExploreModule) },
  { path: "property", loadChildren: () => import('./property/property.module').then(module => module.PropertyModule) },
  { path: "sellrent", loadChildren: () => import('./sell/sell.module').then(module => module.SellModule) },
  { path: "find-agent", loadChildren: () => import('./agent-and-companies/agent-and-companies.module').then(module => module.AgentAndCompaniesModule) },
  { path: "find-companies", loadChildren: () => import('./agent-and-companies/agent-and-companies.module').then(module => module.AgentAndCompaniesModule) },
  // { path: "agent-details/:id", loadChildren: () => import('./agent-details/agent-details.module').then(module => module.AgentDetailsModule) },
  // { path: "company-details/:id", loadChildren: () => import('./company-details/company-details.module').then(module => module.CompanyDetailsModule) },
  {path:"PropertyCompare", loadChildren:()=>import('./property-compare/property-compare.module').then(module => module.PropertyCompareModule)},
  {path:"classified", loadChildren:()=>import('./classified-module/classified-module.module').then(module => module.ClassifiedModuleModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArRoutingModule { }
