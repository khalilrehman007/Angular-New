import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentPackagesComponent } from './payment-packages/payment-packages.component';

const routes: Routes = [
  { path: "", component: PaymentPackagesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentPackagesRoutingModule { }
