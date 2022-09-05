import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErroralertComponent } from './erroralert/erroralert.component';
import { ConfirmationboxComponent } from './confirmationbox/confirmationbox.component';

import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ErroralertComponent,
    ConfirmationboxComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    ErroralertComponent,
    ConfirmationboxComponent
  ]
})
export class AlertsModule { }
