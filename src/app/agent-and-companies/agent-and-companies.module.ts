import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentAndCompaniesRoutingModule } from './agent-and-companies-routing.module';
import { LandingComponent } from './landing/landing.component';
import { CommonFilesModule } from '../common-files/common-files.module';
import { BreadcrumbsModule } from '../breadcrumbs/breadcrumbs.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { FindAgentSearchModule } from '../find-agent-search/find-agent-search.module';
import { LoaderModule } from '../loader/loader.module';


@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    AgentAndCompaniesRoutingModule,
    CommonFilesModule,
    NgxPaginationModule,
    BreadcrumbsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    LoaderModule,
    FindAgentSearchModule
  ]
})
export class AgentAndCompaniesModule { }
