import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CityComponent } from './city/city.component';
import { DetailsComponent } from './details/details.component';
import { ProjectComponent } from './project/project.component';
import { LuxuryComponent } from './luxury/luxury.component';
import { UltraLuxuryComponent } from './ultraluxury/ultraluxury.component';
import { ScoresComponent } from './scores/scores.component';

const routes: Routes = [
  { path: "", component: ProjectComponent },
  { path: "luxury", component: LuxuryComponent },
  { path: "ultraluxury", component: UltraLuxuryComponent },
  { path: "scores", component: ScoresComponent },
  // { path: "city/:id", component: CityComponent },
  { path: "details/:id", component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
