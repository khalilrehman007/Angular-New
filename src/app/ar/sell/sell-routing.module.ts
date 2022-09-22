import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellrentComponent } from './sellrent/sellrent.component';

const routes: Routes = [
  {path: "", component: SellrentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellRoutingModule { }
