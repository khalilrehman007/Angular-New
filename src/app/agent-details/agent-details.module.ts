import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentDetailsRoutingModule } from './agent-details-routing.module';
import { AgentDetailsComponent } from './agent-details/agent-details.component';
import { CommonFilesModule } from '../common-files/common-files.module';
import { BreadcrumbsModule } from '../breadcrumbs/breadcrumbs.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AgentDetailsComponent
  ],
  imports: [
    CommonModule,
    AgentDetailsRoutingModule,
    CommonFilesModule,

    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    BreadcrumbsModule
  ]
})
export class AgentDetailsModule { }
