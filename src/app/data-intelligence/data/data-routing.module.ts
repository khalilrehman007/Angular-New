import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionDataComponent } from './transaction-data/transaction-data.component';

const routes: Routes = [
  {path: "", redirectTo: "/data-intelligence/data/transaction-data", pathMatch: "full"},
  {path: "transaction-data", component: TransactionDataComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule { }
