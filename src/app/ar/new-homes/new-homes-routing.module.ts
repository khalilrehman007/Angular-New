import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { NewHomesComponent } from './new-homes/new-homes.component';

const routes: Routes = [
  { path: "", component: NewHomesComponent},
  { path: "detail", component: PropertyDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyRoutingModule { }
