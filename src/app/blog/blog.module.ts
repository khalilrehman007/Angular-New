import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogComponent } from './blog/blog.component';

import { BlogRoutingModule } from './blog-routing.module';
import { CommonFilesModule } from '../common-files/common-files.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { BreadcrumbsModule } from '../breadcrumbs/breadcrumbs.module';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { TipsAdviceComponent } from './tips-advice/tips-advice.component';
import { NewsblogComponent } from './newsblog/newsblog.component';
import { ExploreblogComponent } from './exploreblog/exploreblog.component';
import { LeftAtHomeComponent } from './left-at-home/left-at-home.component';
import { LawblogComponent } from './lawblog/lawblog.component';
import { MarketTrendsComponent } from './market-trends/market-trends.component';


@NgModule({
  declarations: [
    BlogComponent,
    BlogViewComponent,
    TipsAdviceComponent,
    NewsblogComponent,
    ExploreblogComponent,
    LeftAtHomeComponent,
    LawblogComponent,
    MarketTrendsComponent
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
