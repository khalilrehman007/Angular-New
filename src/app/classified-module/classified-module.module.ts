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


@NgModule({
  declarations: [
    ClassifiedHomeComponent,
    AllSearchComponent,
    JobSearchComponent
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
    ReactiveFormsModule
  ],
  exports: [
    ClassifiedHomeComponent,
    AllSearchComponent,
    JobSearchComponent
  ]
})
export class ClassifiedModuleModule { }
