import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErroralertComponent } from './erroralert/erroralert.component';
import { ConfirmationboxComponent } from './confirmationbox/confirmationbox.component';
import { SuccessAlertComponent } from './success-alert/success-alert.component';

import { MatIconModule } from '@angular/material/icon';
import { EmailSubmissionComponent } from './email-submission/email-submission.component';
import { PropertyUserAlertComponent } from './property-user-alert/property-user-alert.component';


@NgModule({
  declarations: [
    ErroralertComponent,
    ConfirmationboxComponent,
    SuccessAlertComponent,
    EmailSubmissionComponent,
    PropertyUserAlertComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    ErroralertComponent,
    ConfirmationboxComponent,
    SuccessAlertComponent
  ]
})
export class AlertsModule { }
