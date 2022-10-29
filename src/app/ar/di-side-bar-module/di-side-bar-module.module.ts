import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiSidebarComponentComponent } from './di-sidebar-component/di-sidebar-component.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    DiSidebarComponentComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgbNavModule,
    MatIconModule
  ],
  exports: [
    DiSidebarComponentComponent
  ]
})
export class DiSideBarModuleModule { }
