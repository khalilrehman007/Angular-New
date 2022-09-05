import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { PropertyDocumentsComponent } from './property-documents/property-documents.component';
import { PropertyDownloadReportComponent } from './property-download-report/property-download-report.component';
import { PropertyTypesComponent } from './property-types/property-types.component';

const routes: Routes = [
  {path: "", redirectTo:"/valuation/property-detail", pathMatch: 'full' },
  {path: "property-detail", component: PropertyDetailsComponent},
  {path: "PropertyType", component: PropertyTypesComponent},
  {path: "PropertyDocument", component: PropertyDocumentsComponent},
  {path: "PropertyDownloadReport", component: PropertyDownloadReportComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyValuationRoutingModule { }
