import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditListInfoComponent } from './edit-list-info/edit-list-info.component';
import { EditComponent } from './edit/edit.component';
import { ListpropertyinfoComponent } from './listpropertyinfo/listpropertyinfo.component';
import { ListpropertymediaComponent } from './listpropertymedia/listpropertymedia.component';
import { ListpropertypublishComponent } from './listpropertypublish/listpropertypublish.component';
import { PropertyinfoComponent } from './propertyinfo/propertyinfo.component';

const routes: Routes = [
  {path: "", redirectTo: "/add-property/listingproperty", pathMatch: "full"},
  {path: "listingproperty", component: PropertyinfoComponent},
  {path: "listpropertyinfo", component: ListpropertyinfoComponent},
  {path: "listpropertymedia", component: ListpropertymediaComponent},
  {path: "listpropertypublish", component: ListpropertypublishComponent},
  {path: "edit/:id/listingproperty", component: EditComponent},
  {path: "edit/:id/listpropertyinfo", component: EditListInfoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPropertyListingRoutingModule { }
