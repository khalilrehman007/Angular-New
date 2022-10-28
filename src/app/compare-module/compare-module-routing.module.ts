import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComparepageComponent } from './comparepage/comparepage.component';

const routes: Routes = [
  { path: "", component: ComparepageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompareModuleRoutingModule { }
