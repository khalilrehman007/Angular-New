import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyRoutingModule } from './property-routing.module';
import { SearchComponent } from './search/search.component';
import { CommonFilesModule } from '../common-files/common-files.module';
import { PropertyfilterComponent } from './propertyfilter/propertyfilter.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    SearchComponent,
    PropertyfilterComponent
  ],
  imports: [
    CommonModule,
    PropertyRoutingModule,
    CommonFilesModule,

    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgbModule,
    NgxPaginationModule,
    MatChipsModule,
    MatIconModule,
    MatTabsModule,
    NgxSliderModule,
    MatAutocompleteModule
  ]
})
export class PropertyModule { }
