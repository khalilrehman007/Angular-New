import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThankyouPaymentRoutingModule } from './thankyou-payment-routing.module';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { Header2Module } from '../header2/header2.module';


@NgModule({
  declarations: [
    ThankyouComponent
  ],
  imports: [
    CommonModule,
    ThankyouPaymentRoutingModule,
    Header2Module
  ]
})
export class ThankyouPaymentModule { }
