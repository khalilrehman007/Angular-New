import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './city/city.component';
import { DetailsComponent } from './details/details.component';
import { ExploreComponent } from './explore/explore.component';

const routes: Routes = [
  { path: "", component: ExploreComponent },
  { path: "city/:id", component: CityComponent },
  { path: "details/:id", component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExploreRoutingModule { }
