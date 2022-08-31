import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListpropertyinfoComponent } from './listpropertyinfo/listpropertyinfo.component';
import { ListpropertymediaComponent } from './listpropertymedia/listpropertymedia.component';
import { PropertyinfoComponent } from './propertyinfo/propertyinfo.component';

const routes: Routes = [
  {path: "", redirectTo: "/add-property/listingproperty", pathMatch: "full"},
  {path: "listingproperty", component: PropertyinfoComponent},
  {path: "listpropertyinfo", component: ListpropertyinfoComponent},
  {path: "listpropertymedia", component: ListpropertymediaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPropertyListingRoutingModule { }
