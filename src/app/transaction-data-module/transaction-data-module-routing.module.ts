import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionDataComponent } from './transaction-data/transaction-data.component';

const routes: Routes = [
  { path: "", component: TransactionDataComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionDataModuleRoutingModule { }
