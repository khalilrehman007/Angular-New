import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { NgChartsModule } from 'ng2-charts';
import { MatInputModule } from '@angular/material/input';
import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardReportsComponent } from './dashboard-reports/dashboard-reports.component';
import { MatFormFieldModule } from '@angular/material/form-field';


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
    MatInputModule
  ]
})
export class DashboardModuleModule { }
