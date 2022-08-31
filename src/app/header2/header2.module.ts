import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Header2RoutingModule } from './header2-routing.module';
import { Header2Component } from './header2/header2.component';

import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    Header2Component
  ],
  imports: [
    CommonModule,
    MatIconModule,
    Header2RoutingModule
  ],
  exports: [
    Header2Component
  ]
})
export class Header2Module { }
