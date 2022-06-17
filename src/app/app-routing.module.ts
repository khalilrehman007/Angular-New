import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SellrentpropertyComponent } from './pages/sellrentproperty/sellrentproperty.component';

const routes: Routes = [
  { path:  '', component:  HomeComponent},
  { path:  'sellrent', component:  SellrentpropertyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
