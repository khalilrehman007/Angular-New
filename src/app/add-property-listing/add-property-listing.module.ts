import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPropertyListingRoutingModule } from './add-property-listing-routing.module';
import { PropertyinfoComponent } from './propertyinfo/propertyinfo.component';
import { Header2Module } from '../header2/header2.module';
import { AlertsModule } from '../alerts/alerts.module';
import { LoaderModule } from '../loader/loader.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    PropertyinfoComponent
  ],
  imports: [
    CommonModule,
    AddPropertyListingRoutingModule,
    Header2Module,
    AlertsModule,
    LoaderModule,

    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule
  ]
})
export class AddPropertyListingModule { }
