import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Header2Module } from '../header2/header2.module';
import { LoaderModule } from '../../loader/loader.module';
import { AlertsModule } from '../alerts/alerts.module';

import { PropertyValuationRoutingModule } from './property-valuation-routing.module';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { PropertyTypesComponent } from './property-types/property-types.component';
import { PropertyDocumentsComponent } from './property-documents/property-documents.component';
import { PropertyDownloadReportComponent } from './property-download-report/property-download-report.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMaskModule } from 'ngx-mask';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    PropertyDetailsComponent,
    PropertyTypesComponent,
    PropertyDocumentsComponent,
    PropertyDownloadReportComponent
  ],
  imports: [
    CommonModule,
    PropertyValuationRoutingModule,
    Header2Module,
    LoaderModule,
    AlertsModule,

    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    NgxMaskModule.forRoot()
  ]
})
export class PropertyValuationModule { }
