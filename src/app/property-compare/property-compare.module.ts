import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyCompareRoutingModule } from './property-compare-routing.module';
import { PropertyCompareComponent } from './property-compare/property-compare.component';
import { Header2Module } from '../header2/header2.module';

@NgModule({
  declarations: [
    PropertyCompareComponent
  ],
  imports: [
    CommonModule,
    PropertyCompareRoutingModule,
    Header2Module
  ]
})
export class PropertyCompareModule { }
