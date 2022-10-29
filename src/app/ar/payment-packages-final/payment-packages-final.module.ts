import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentPackagesFinalRoutingModule } from './payment-packages-final-routing.module';
import { PaymentFormScreenComponent } from './payment-form-screen/payment-form-screen.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonFilesModule } from '../common-files/common-files.module';
import { BreadcrumbsModule } from '../breadcrumbs/breadcrumbs.module';
import { MatTabsModule } from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LoaderModule } from 'src/app/loader/loader.module';
import { AlertsModule } from 'src/app/alerts/alerts.module';


@NgModule({
  declarations: [
    PaymentFormScreenComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    CommonFilesModule,
    BreadcrumbsModule,
    MatTabsModule,
    PaymentPackagesFinalRoutingModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    LoaderModule,
    AlertsModule
  ]
})
export class PaymentPackagesFinalModule { }
