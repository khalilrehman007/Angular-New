import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataRoutingModule } from './data-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { NgChartsModule } from 'ng2-charts';
import { TransactionDataComponent } from './transaction-data/transaction-data.component';
import { CommonFilesModule } from '../../common-files/common-files.module';
import { DiSideBarModuleModule } from '../../di-side-bar-module/di-side-bar-module.module';
import { RentDataResidentialComponent } from './rent-data-residential/rent-data-residential.component';
import { UnitTransactionHistoryResidentialComponent } from './unit-transaction-history-residential/unit-transaction-history-residential.component';
import { MonthlyAnalysisResidentialComponent } from './monthly-analysis-residential/monthly-analysis-residential.component';
import { QuaterlyAnalysisResidentialComponent } from './quaterly-analysis-residential/quaterly-analysis-residential.component';
import { YearlyAnalysisResidentialComponent } from './yearly-analysis-residential/yearly-analysis-residential.component';
import { MatSelectModule } from '@angular/material/select';
import { LoaderModule } from 'src/app/loader/loader.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListingMonitorResComponent } from './listing-monitor-res/listing-monitor-res.component';
import { ListingDataResComponent } from './listing-data-res/listing-data-res.component';
import { NgCircleProgressModule } from 'ng-circle-progress';


@NgModule({
  declarations: [
    TransactionDataComponent,
    RentDataResidentialComponent,
    UnitTransactionHistoryResidentialComponent,
    MonthlyAnalysisResidentialComponent,
    QuaterlyAnalysisResidentialComponent,
    YearlyAnalysisResidentialComponent,
    ListingMonitorResComponent,
    ListingDataResComponent
  ],
  imports: [
    CommonModule,
    DataRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    NgxSliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatNativeDateModule,
    NgChartsModule,
    CommonFilesModule,
    DiSideBarModuleModule,
    MatSelectModule,
    LoaderModule,
    NgxPaginationModule,
      // Specify ng-circle-progress as an import
      NgCircleProgressModule.forRoot({
        // set defaults here
        radius: 100,
        outerStrokeWidth: 16,
        innerStrokeWidth: 8,
        outerStrokeColor: "#78C000",
        innerStrokeColor: "#C7E596",
        animationDuration: 300,
        titleFontWeight: "700"
      })
  ]
})
export class DataModule { }
