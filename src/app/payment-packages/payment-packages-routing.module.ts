import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentPackagesComponent } from './payment-packages/payment-packages.component';
import { AuthGuard } from '../shared/auth.guard';

const routes: Routes = [
  { path:"", component:PaymentPackagesComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentPackagesRoutingModule { }
