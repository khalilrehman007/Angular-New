import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup/signup.component';
import { Header2Module } from '../header2/header2.module';
import { AlertsModule } from '../alerts/alerts.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { OtpComponent } from './otp/otp.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    SignupComponent,
    OtpComponent,
    ThankYouComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    Header2Module,
    AlertsModule,

    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    NgxIntlTelInputModule,
    
  ]
})
export class SignupModule { }
