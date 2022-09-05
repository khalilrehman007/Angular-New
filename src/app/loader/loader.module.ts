import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderRoutingModule } from './loader-routing.module';
import { LoaderComponent } from './loader/loader.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    LoaderRoutingModule,

    MatProgressSpinnerModule
  ],
  exports: [
    LoaderComponent
  ]
})
export class LoaderModule { }
