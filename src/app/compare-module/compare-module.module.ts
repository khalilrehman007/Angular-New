import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompareModuleRoutingModule } from './compare-module-routing.module';
import { ComparepageComponent } from './comparepage/comparepage.component';
import { CommonFilesModule } from '../common-files/common-files.module';


@NgModule({
  declarations: [
    ComparepageComponent
  ],
  imports: [
    CommonModule,
    CompareModuleRoutingModule,
    CommonFilesModule
  ]
})
export class CompareModuleModule { }
