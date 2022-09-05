import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardReportsComponent } from './dashboard-reports/dashboard-reports.component';

const routes: Routes = [
  { path: "", component: DashboardReportsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
