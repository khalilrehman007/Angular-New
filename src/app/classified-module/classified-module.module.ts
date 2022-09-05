import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassifiedModuleRoutingModule } from './classified-module-routing.module';
import { ClassifiedHomeComponent } from './classified-home/classified-home.component';


@NgModule({
  declarations: [
    ClassifiedHomeComponent
  ],
  imports: [
    CommonModule,
    ClassifiedModuleRoutingModule
  ],
  exports: [
    ClassifiedHomeComponent
  ]
})
export class ClassifiedModuleModule { }
