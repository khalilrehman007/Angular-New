import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassifiedModuleRoutingModule } from './classified-module-routing.module';
import { ClassifiedHomeComponent } from './classified-home/classified-home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonFilesModule } from '../common-files/common-files.module';
import { MotorModuleModule } from '../motor-module/motor-module.module';
import { ServiceSearchModuleModule } from '../service-search-module/service-search-module.module';
import { CommunitySearchModuleModule } from '../community-search-module/community-search-module.module';
import { MatTabsModule } from '@angular/material/tabs';
import { AllSearchComponent } from '../all-search/all-search.component';
import { JobSearchComponent } from '../job-search/job-search.component';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPostComponent } from './add-post/add-post.component';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from "ng2-charts";
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbsModule } from '../breadcrumbs/breadcrumbs.module';
import { CarDetailsComponent } from './classified-details/car-details/car-details.component';
import { CarAddDetailsFirstComponent } from './motors/car-add-details-first/car-add-details-first.component';
import { CarAddDetailsSecondComponent } from './motors/car-add-details-second/car-add-details-second.component';
import { MotorcycleDetailFormComponent } from './motors/motorcycle-detail-form/motorcycle-detail-form.component';
import { AutoAccessoriesPartsComponent } from './motors/auto-accessories-parts/auto-accessories-parts.component';
import { HeavyVehiclesComponent } from './motors/heavy-vehicles/heavy-vehicles.component';
import { BoatsComponent } from './motors/boats/boats.component';
import { NumberPlatesComponent } from './motors/number-plates/number-plates.component';
import { JobHiringComponent } from './jobs/job-hiring/job-hiring.component';
import { JobsHiringFormComponent } from './jobs/jobs-hiring-form/jobs-hiring-form.component';
import { JobsWantedFormComponent } from './jobs/jobs-wanted-form/jobs-wanted-form.component';
import { AppliancesFormComponent } from './appliances/appliances-form/appliances-form.component';
import { FurnitureFormComponent } from './furniture/furniture-form/furniture-form.component';
import { FreelancerFormComponent } from './freelancers/freelancer-form/freelancer-form.component';
import { PhoneFormComponent } from './phones/phone-form/phone-form.component';
import { ServicesFormComponent } from './services/services-form/services-form.component';
import { CommunityFormComponent } from './community/community-form/community-form.component';
import { CommertialsFormComponent } from './commertials/commertials-form/commertials-form.component';
import { FurnitureDetailsComponent } from './classified-details/furniture-details/furniture-details.component';
import { SportsEquipmentDetailsComponent } from './classified-details/sports-equipment-details/sports-equipment-details.component';
import { PhoneTabletDetailsComponent } from './classified-details/phone-tablet-details/phone-tablet-details.component';
import { ServicesDetailsComponent } from './classified-details/services-details/services-details.component';
import { FurnitureListingComponent } from './classified-listings/furniture-listing/furniture-listing.component';
import { SportsListingComponent } from './classified-listings/sports-listing/sports-listing.component';
import { MobileTabletListingComponent } from './classified-listings/mobile-tablet-listing/mobile-tablet-listing.component';
import { ServicesListingComponent } from './classified-listings/services-listing/services-listing.component';
import { MotorsListingComponent } from './classified-listings/motors-listing/motors-listing.component';
import { FurnitureFilterComponent } from './classified-listings/furniture-filter/furniture-filter.component';
import { MobileTabletFilterComponent } from './classified-listings/mobile-tablet-filter/mobile-tablet-filter.component';
import { MotorsFiltersComponent } from './classified-listings/motors-filters/motors-filters.component';
import { ServiceFiltersComponent } from './classified-listings/service-filters/service-filters.component';
import { SportsFiltersComponent } from './classified-listings/sports-filters/sports-filters.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoaderModule } from '../loader/loader.module';
import { AlertsModule } from '../alerts/alerts.module';
import { AllListingFilterComponent } from './classified-listings/all-listing-filter/all-listing-filter.component';
import { AllListingsComponent } from './classified-listings/all-listings/all-listings.component';



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
    JobsHiringFormComponent,
    JobsWantedFormComponent,
    AppliancesFormComponent,
    FurnitureFormComponent,
    FreelancerFormComponent,
    PhoneFormComponent,
    ServicesFormComponent,
    CommunityFormComponent,
    CommertialsFormComponent,
    FurnitureDetailsComponent,
    SportsEquipmentDetailsComponent,
    PhoneTabletDetailsComponent,
    ServicesDetailsComponent,
    FurnitureListingComponent,
    SportsListingComponent,
    MobileTabletListingComponent,
    ServicesListingComponent,
    MotorsListingComponent,
    FurnitureFilterComponent,
    MobileTabletFilterComponent,
    MotorsFiltersComponent,
    ServiceFiltersComponent,
    SportsFiltersComponent,
    AllListingFilterComponent,
    AllListingsComponent
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
    BreadcrumbsModule,
    MatSelectModule,
    MatCheckboxModule,
    LoaderModule,
    AlertsModule
  ],
  exports: [
    ClassifiedHomeComponent,
    AddPostComponent
  ]
})
export class ClassifiedModuleModule { }
