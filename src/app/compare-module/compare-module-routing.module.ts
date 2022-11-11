import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComparepageComponent } from './comparepage/comparepage.component';
import { CompareListingsComponent } from './compare-listings/compare-listings.component';
import { CompareListingSelectionComponent } from './compare-listing-selection/compare-listing-selection.component';
import { AuthGuard } from '../shared/auth.guard';


const routes: Routes = [
  { path: "", component: ComparepageComponent },
  { path: "view", component: CompareListingsComponent, canActivate: [AuthGuard]},
  { path: "selection", component: CompareListingSelectionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompareModuleRoutingModule { }
