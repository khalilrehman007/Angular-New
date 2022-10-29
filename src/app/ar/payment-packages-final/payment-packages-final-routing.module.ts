import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentFormScreenComponent } from './payment-form-screen/payment-form-screen.component';
const routes: Routes = [
  { path:"", component:PaymentFormScreenComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentPackagesFinalRoutingModule { }
