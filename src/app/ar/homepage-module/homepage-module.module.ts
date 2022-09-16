import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageModuleRoutingModule } from './homepage-module-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { CommonFilesModule } from '../../common-files/common-files.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RentSearchModule } from '../../rent-search/rent-search.module';


@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    HomepageModuleRoutingModule,
    CarouselModule,
    CommonFilesModule,
    NgbModule,
    NgbNavModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    RentSearchModule,
  ]
})
export class HomepageModuleModule { }
