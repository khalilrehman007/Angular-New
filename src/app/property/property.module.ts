import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyRoutingModule } from './property-routing.module';
import { SearchComponent } from './search/search.component';
import { CommonFilesModule } from '../common-files/common-files.module';
import { PropertyfilterComponent } from './propertyfilter/propertyfilter.component';
import { BreadcrumbsModule } from '../breadcrumbs/breadcrumbs.module';
import { ShortTermRentComponent } from './short-term-rent/short-term-rent.component';
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
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { ViewmapComponent } from './viewmap/viewmap.component';
import {NgChartsModule} from "ng2-charts";
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [
    SearchComponent,
    PropertyfilterComponent,
    PropertyDetailComponent,
    ViewmapComponent,
    ShortTermRentComponent
  ],
  imports: [
    CommonModule,
    PropertyRoutingModule,
    CommonFilesModule,
    BreadcrumbsModule,
    NgChartsModule,
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
    MatAutocompleteModule,
    NgxGalleryModule,
    HttpClientModule
  ]
})
export class PropertyModule { }
