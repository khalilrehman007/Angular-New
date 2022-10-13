import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentdataResComponentComponent } from './rentdata-res-component/rentdata-res-component.component';

const routes: Routes = [
  { path: "", component: RentdataResComponentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentDataResRoutingModule { }
