// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './pages/home/home.component';
// import { SellrentpropertyComponent } from './pages/sellrentproperty/sellrentproperty.component';

// const routes: Routes = [
//   { path:  '', component:  HomeComponent},
//   { path:  'sellrent', component:  SellrentpropertyComponent}
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes,{useHash:false})],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddnewComponent } from './addnew/addnew.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './pages/home/home.component';
import { ListingComponent } from './listing/listing.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { RoleGuard } from './shared/role.guard';
import { SellrentpropertyComponent } from './pages/sellrentproperty/sellrentproperty.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { BlogViewComponent } from './pages/blog-view/blog-view.component';

const routes: Routes = [
  { path:  'sellrent', component:  SellrentpropertyComponent},
  { path: '', component: HomeComponent },
  { path: "blogs", component: BlogsComponent },
  { path: "blogs/:id", component: BlogViewComponent },
  // ,canActivate:[AuthGuard]
  {
    path: "customer", component: CustomerComponent,
    children: [{
      path: "", component: ListingComponent
    },
    { path: "create", component: AddnewComponent },
    { path: "Edit/:id", component: AddnewComponent }
    ],canActivate:[RoleGuard]
  },
  {path:"login",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
