import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComparepageComponent } from './comparepage/comparepage.component';
import { CompareListingsComponent } from './compare-listings/compare-listings.component';

const routes: Routes = [
  { path: "", component: ComparepageComponent },
  { path: "view", component: CompareListingsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompareModuleRoutingModule { }