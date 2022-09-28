import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditListInfoComponent } from './edit-list-info/edit-list-info.component';
import { EditComponent } from './edit/edit.component';
import { ListpropertyinfoComponent } from './listpropertyinfo/listpropertyinfo.component';
import { ListpropertymediaComponent } from './listpropertymedia/listpropertymedia.component';
import { ListpropertypublishComponent } from './listpropertypublish/listpropertypublish.component';
import { PropertyinfoComponent } from './propertyinfo/propertyinfo.component';
import { AuthGuard } from '../../shared/auth.guard';

const routes: Routes = [
  {path: "", redirectTo: "/add-property/listingproperty", pathMatch: "full"},
  {path: "listingproperty", component: PropertyinfoComponent},
  {path: "listpropertyinfo", component: ListpropertyinfoComponent,canActivate: [AuthGuard]},
  {path: "listpropertymedia", component: ListpropertymediaComponent,canActivate: [AuthGuard]},
  {path: "listpropertypublish", component: ListpropertypublishComponent,canActivate: [AuthGuard]},
  {path: "edit/:id/listingproperty", component: EditComponent,canActivate: [AuthGuard]},
  {path: "edit/:id/listpropertyinfo", component: EditListInfoComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPropertyListingRoutingModule { }
