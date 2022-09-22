import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbsRoutingModule } from './breadcrumbs-routing.module';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    BreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbsRoutingModule,
    MatIconModule
  ],
  exports: [
    BreadcrumbsComponent
  ]
})
export class BreadcrumbsModule { }