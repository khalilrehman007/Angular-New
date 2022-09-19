import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunitySearchModuleComponent } from './community-search-module/community-search-module.component';

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
    CommunitySearchModuleComponent
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
  ]
})
export class CommunitySearchModuleModule { }
