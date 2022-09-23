import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindAgentSearchComponent } from './find-agent-search/find-agent-search.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    FindAgentSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    NgxSliderModule,
    MatInputModule
  ],
  exports: [
    FindAgentSearchComponent
  ]
})
export class FindAgentSearchModule { }
