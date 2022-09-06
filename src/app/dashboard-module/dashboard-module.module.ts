import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { BrowserModule } from "@angular/platform-browser";
import { MatSelectModule } from '@angular/material/select';
import { NgChartsModule } from 'ng2-charts';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardReportsComponent } from './dashboard-reports/dashboard-reports.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import { CommonFilesModule } from '../common-files/common-files.module';


@NgModule({
  declarations: [
    DashboardHeaderComponent,
    DashboardReportsComponent
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    NgChartsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NgbModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatDatepickerModule,
    MatMenuModule,
    NgxSliderModule,
    BrowserModule,
    MatIconModule,
    CommonFilesModule
  ]
})
export class DashboardModuleModule { }
