import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyCompareComponent } from './property-compare/property-compare.component';

const routes: Routes = [
  {path:"", component:PropertyCompareComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyCompareRoutingModule { }
