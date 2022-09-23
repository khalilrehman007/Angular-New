import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindcompaniesSearchComponent } from './findcompanies-search/findcompanies-search.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    FindcompaniesSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule
  ],
  exports: [
    FindcompaniesSearchComponent
  ]
})
export class FindcompaniesSearchModule { }
