import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionDataComponent } from './transaction-data/transaction-data.component';
import { RentDataResidentialComponent } from './rent-data-residential/rent-data-residential.component';

const routes: Routes = [
  {path: "", redirectTo: "/data-intelligence/data/transaction-data", pathMatch: "full"},
  {path: "transaction-data", component: TransactionDataComponent},
  {path: "rent-data-residential", component: RentDataResidentialComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule { }
