import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {path:"", loadChildren:()=>import('./homepage-module/homepage-module.module').then(module => module.HomepageModuleModule)},
  {path:"login", loadChildren:()=>import('./login/login.module').then(module => module.LoginModule)},
  {path:"signup", loadChildren:()=>import('./signup/signup.module').then(module => module.SignupModule)},
  {path:"valuation", loadChildren:()=>import('./property-valuation/property-valuation.module').then(module => module.PropertyValuationModule),canActivate: [AuthGuard]},
  {path:"property", loadChildren:()=>import('./property/property.module').then(module => module.PropertyModule)},
  {path:"explore", loadChildren:()=>import('./explore/explore.module').then(module => module.ExploreModule)},
  {path:"blog", loadChildren:()=>import('./blog/blog.module').then(module => module.BlogModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
