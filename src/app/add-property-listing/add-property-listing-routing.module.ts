import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyinfoComponent } from './propertyinfo/propertyinfo.component';

const routes: Routes = [
  {path: "", component: PropertyinfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPropertyListingRoutingModule { }
