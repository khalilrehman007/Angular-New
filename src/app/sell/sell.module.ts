import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellRoutingModule } from './sell-routing.module';
import { SellrentComponent } from './sellrent/sellrent.component';
import { CommonFilesModule } from '../common-files/common-files.module';
import { BreadcrumbsModule } from '../breadcrumbs/breadcrumbs.module';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    SellrentComponent
  ],
  imports: [
    CommonModule,
    SellRoutingModule,
    CommonFilesModule,
    BreadcrumbsModule,
    MatExpansionModule
  ]
})
export class SellModule { }
