import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { SearchComponent } from './search/search.component';
import { ViewmapComponent } from './viewmap/viewmap.component';
import { ShortTermRentComponent } from './short-term-rent/short-term-rent.component';

const routes: Routes = [
  { path: "search", component: SearchComponent },
  { path: "search/:Type", component: SearchComponent },
  { path: "detail", component: PropertyDetailComponent },
  { path: "mapview", component: ViewmapComponent },
  { path: "short-term-rent", component: ShortTermRentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyRoutingModule { }
