import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogComponent } from './blog/blog.component';

import { BlogRoutingModule } from './blog-routing.module';
import { CommonFilesModule } from '../common-files/common-files.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { BreadcrumbsModule } from '../breadcrumbs/breadcrumbs.module';


@NgModule({
  declarations: [
    BlogComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    CommonFilesModule,
    CarouselModule,
    MatTabsModule,
    NgbModule,
    BreadcrumbsModule

  ]
})
export class BlogModule { }
