import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataRoutingModule } from './data-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';

import { TransactionDataComponent } from './transaction-data/transaction-data.component';
import { CommonFilesModule } from '../../common-files/common-files.module';
import { DiSideBarModuleModule } from '../../di-side-bar-module/di-side-bar-module.module';
import { RentDataResidentialComponent } from './rent-data-residential/rent-data-residential.component';


@NgModule({
  declarations: [
    TransactionDataComponent,
    RentDataResidentialComponent
  ],
  imports: [
    CommonModule,
    DataRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    NgxSliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatNativeDateModule,

    CommonFilesModule,
    DiSideBarModuleModule
  ]
})
export class DataModule { }
