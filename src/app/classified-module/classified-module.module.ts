import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassifiedModuleRoutingModule } from './classified-module-routing.module';
import { ClassifiedHomeComponent } from './classified-home/classified-home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonFilesModule } from '../common-files/common-files.module';

@NgModule({
  declarations: [
    ClassifiedHomeComponent
  ],
  imports: [
    CommonModule,
    ClassifiedModuleRoutingModule,
    CarouselModule,
    CommonFilesModule
  ],
  exports: [
    ClassifiedHomeComponent
  ]
})
export class ClassifiedModuleModule { }
