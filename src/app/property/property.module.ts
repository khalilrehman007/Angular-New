import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyRoutingModule } from './property-routing.module';
import { SearchComponent } from './search/search.component';
import { CommonFilesModule } from '../common-files/common-files.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    PropertyRoutingModule,
    CommonFilesModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgbModule,
    NgxPaginationModule
  ]
})
export class PropertyModule { }
