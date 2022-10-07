import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentPackagesRoutingModule } from './payment-packages-routing.module';
import { PaymentPackagesComponent } from './payment-packages/payment-packages.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonFilesModule } from '../common-files/common-files.module';
import { BreadcrumbsModule } from '../breadcrumbs/breadcrumbs.module';
import { MatTabsModule } from '@angular/material/tabs';
import { AlertsModule } from '../alerts/alerts.module';



@NgModule({
  declarations: [
    PaymentPackagesComponent
  ],
  imports: [
    CommonModule,
    PaymentPackagesRoutingModule,
    MatFormFieldModule,
    MatCardModule,
    CommonFilesModule,
    BreadcrumbsModule,
    MatTabsModule,
    AlertsModule
  ]
})
export class PaymentPackagesModule { }
