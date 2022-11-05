import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompareModuleRoutingModule } from './compare-module-routing.module';
import { ComparepageComponent } from './comparepage/comparepage.component';
import { CommonFilesModule } from '../common-files/common-files.module';
import { MatIconModule } from '@angular/material/icon';
import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CompareListingsComponent } from './compare-listings/compare-listings.component';
import { BreadcrumbsModule } from '../breadcrumbs/breadcrumbs.module';
import { CompareListingSelectionComponent } from './compare-listing-selection/compare-listing-selection.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule} from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CompareFilterComponent } from './compare-filter/compare-filter.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ComparepageComponent,
    CompareListingsComponent,
    CompareListingSelectionComponent,
    CompareFilterComponent
  ],
  imports: [
    CommonModule,
    CompareModuleRoutingModule,
    CommonFilesModule,
    MatIconModule,
    NgxSliderModule,
    NgxGalleryModule,
    NgbModule,
    CarouselModule,
    BreadcrumbsModule,
    NgxPaginationModule,
    MatChipsModule,
    MatTabsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CompareModuleModule { }
