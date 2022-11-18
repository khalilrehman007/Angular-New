import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project/project.component';
import { CommonFilesModule } from '../common-files/common-files.module';
import { BreadcrumbsModule } from '../breadcrumbs/breadcrumbs.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { CityComponent } from './city/city.component';
// import { DetailsComponent } from './details/details.component';
import { LuxuryComponent } from './luxury/luxury.component';
import { UltraLuxuryComponent } from './ultraluxury/ultraluxury.component';
import { ScoresComponent } from './scores/scores.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
// Import ng-circle-progress
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProjectFilterComponent } from './project-filter/project-filter.component';
import { DetailsComponent } from './details/details.component';
import { NgChartsModule } from "ng2-charts";

@NgModule({
  declarations: [
    ProjectComponent,
    // CityComponent,
    DetailsComponent,
    LuxuryComponent,
    UltraLuxuryComponent,
    ScoresComponent,
    ProjectFilterComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    CommonFilesModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    BreadcrumbsModule,
    CarouselModule,
    NgbModule,
    NgxPaginationModule,
    MatTabsModule,
    NgxSliderModule,
    NgxGalleryModule,
    HttpClientModule,
    MatDatepickerModule,
    NgChartsModule,
    MatNativeDateModule,
    // Specify ng-circle-progress as an import
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      titleFontWeight: "700"
    })
  ]
})
export class ExploreModule { }
