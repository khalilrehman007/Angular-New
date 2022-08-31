import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { SearchComponent } from './search/search.component';
import { ViewmapComponent } from './viewmap/viewmap.component';

const routes: Routes = [
  { path: "search", component: SearchComponent },
  { path: "search/:type", component: SearchComponent },
  { path: "detail", component: PropertyDetailComponent },
  { path: "mapview", component: ViewmapComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyRoutingModule { }
