import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionDataComponent } from './transaction-data/transaction-data.component';
import { RentDataResidentialComponent } from './rent-data-residential/rent-data-residential.component';
import { UnitTransactionHistoryResidentialComponent } from './unit-transaction-history-residential/unit-transaction-history-residential.component';
import { MonthlyAnalysisResidentialComponent } from './monthly-analysis-residential/monthly-analysis-residential.component';
import { QuaterlyAnalysisResidentialComponent } from './quaterly-analysis-residential/quaterly-analysis-residential.component';
import { YearlyAnalysisResidentialComponent } from './yearly-analysis-residential/yearly-analysis-residential.component';
import { ListingMonitorResComponent } from './listing-monitor-res/listing-monitor-res.component';
import { ListingDataResComponent } from './listing-data-res/listing-data-res.component';
import { SupplyDataResComponent } from './supply-data-res/supply-data-res.component';
import { OccupancyDataResComponent } from './occupancy-data-res/occupancy-data-res.component';
import { ServiceChargesDataResComponent } from './service-charges-data-res/service-charges-data-res.component';

const routes: Routes = [
  {path: "", redirectTo: "/data-intelligence/data/transaction-data", pathMatch: "full"},
  {path: "transaction-data", component: TransactionDataComponent},
  {path: "rent-data-residential", component: RentDataResidentialComponent},
  {path: "unit-transaction-residential", component: UnitTransactionHistoryResidentialComponent},
  {path: "monthly-analysis-residential", component: MonthlyAnalysisResidentialComponent},
  {path: "quaterly-analysis-residential", component: QuaterlyAnalysisResidentialComponent},
  {path: "yearly-analysis-residential", component: YearlyAnalysisResidentialComponent},
  {path: "listing-monitor-residential", component: ListingMonitorResComponent},
  {path: "listing-data-residential", component: ListingDataResComponent},
  {path: "supply-data-residential", component: SupplyDataResComponent},
  {path: "occupancy-data-residential", component: OccupancyDataResComponent},
  {path: "service-data-residential", component: ServiceChargesDataResComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule { }
