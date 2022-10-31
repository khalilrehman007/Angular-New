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


@NgModule({
  declarations: [
    ComparepageComponent,
    CompareListingsComponent
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
    BreadcrumbsModule
  ]
})
export class CompareModuleModule { }
