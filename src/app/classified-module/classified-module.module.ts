import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassifiedModuleRoutingModule } from './classified-module-routing.module';
import { ClassifiedHomeComponent } from './classified-home/classified-home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonFilesModule } from '../common-files/common-files.module';
import { MotorModuleModule } from '../motor-module/motor-module.module';
import { ServiceSearchModuleModule } from '../service-search-module/service-search-module.module';
import { CommunitySearchModuleModule } from '../community-search-module/community-search-module.module';
import {MatTabsModule} from '@angular/material/tabs';
import { AllSearchComponent } from '../all-search/all-search.component';
import { JobSearchComponent } from '../job-search/job-search.component';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPostComponent } from './add-post/add-post.component';
import { MatCardModule } from '@angular/material/card';
import {NgChartsModule} from "ng2-charts";
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbsModule } from '../breadcrumbs/breadcrumbs.module';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CarAddDetailsFirstComponent } from './motors/car-add-details-first/car-add-details-first.component';
import { CarAddDetailsSecondComponent } from './motors/car-add-details-second/car-add-details-second.component';
import { MotorcycleDetailFormComponent } from './motors/motorcycle-detail-form/motorcycle-detail-form.component';
import { AutoAccessoriesPartsComponent } from './motors/auto-accessories-parts/auto-accessories-parts.component';
import { HeavyVehiclesComponent } from './motors/heavy-vehicles/heavy-vehicles.component';
import { BoatsComponent } from './motors/boats/boats.component';
import { NumberPlatesComponent } from './motors/number-plates/number-plates.component';
import { JobHiringComponent } from './jobs/job-hiring/job-hiring.component';
import { JobHiringPersonalComponent } from './jobs/job-hiring-personal/job-hiring-personal.component';
import { JobHiringCompanyComponent } from './jobs/job-hiring-company/job-hiring-company.component';
import { JobRequirementComponent } from './jobs/job-requirement/job-requirement.component';


@NgModule({
  declarations: [
    ClassifiedHomeComponent,
    AllSearchComponent,
    JobSearchComponent,
    AddPostComponent,
    CarDetailsComponent,
    CarAddDetailsFirstComponent,
    CarAddDetailsSecondComponent,
    MotorcycleDetailFormComponent,
    AutoAccessoriesPartsComponent,
    HeavyVehiclesComponent,
    BoatsComponent,
    NumberPlatesComponent,
    JobHiringComponent,
    JobHiringPersonalComponent,
    JobHiringCompanyComponent,
    JobRequirementComponent,
  ],
  imports: [
    CommonModule,
    ClassifiedModuleRoutingModule,
    CarouselModule,
    CommonFilesModule,
    MotorModuleModule,
    ServiceSearchModuleModule,
    CommunitySearchModuleModule,
    MatTabsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    NgxSliderModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    NgChartsModule,
    NgxGalleryModule,
    NgbModule,
    BreadcrumbsModule
  ],
  exports: [
    ClassifiedHomeComponent,
    AddPostComponent
  ]
})
export class ClassifiedModuleModule { }
