import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageModuleRoutingModule } from './homepage-module-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { ClassifiedModuleModule } from '../classified-module/classified-module.module';
import { CommonFilesModule } from '../common-files/common-files.module';
import { RentSearchModule } from '../rent-search/rent-search.module';
import { BuySearchModule } from '../buy-search/buy-search.module';
import { FindAgentSearchModule } from '../find-agent-search/find-agent-search.module';
import { MotorModuleModule } from '../motor-module/motor-module.module';
import { ServiceSearchModuleModule } from '../service-search-module/service-search-module.module';
import { CommunitySearchModuleModule } from '../community-search-module/community-search-module.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonFilesModule,
    RentSearchModule,
    BuySearchModule,
    FindAgentSearchModule,
    MotorModuleModule,
    ServiceSearchModuleModule,
    CommunitySearchModuleModule,
    CommonModule,
    HomepageModuleRoutingModule,
    CarouselModule,
    NgbModule,
    NgbNavModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    ClassifiedModuleModule
  ]
})
export class HomepageModuleModule { }
