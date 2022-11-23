import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassifiedHomeComponent } from './classified-home/classified-home.component';
import { AddPostComponent } from './add-post/add-post.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CarAddDetailsFirstComponent } from './motors/car-add-details-first/car-add-details-first.component';
import { CarAddDetailsSecondComponent } from './motors/car-add-details-second/car-add-details-second.component';
import { MotorcycleDetailFormComponent } from './motors/motorcycle-detail-form/motorcycle-detail-form.component';
import { AutoAccessoriesPartsComponent } from './motors/auto-accessories-parts/auto-accessories-parts.component';
import { HeavyVehiclesComponent } from './motors/heavy-vehicles/heavy-vehicles.component';
import { BoatsComponent } from './motors/boats/boats.component';
import { NumberPlatesComponent } from './motors/number-plates/number-plates.component';
import { JobHiringComponent } from './jobs/job-hiring/job-hiring.component';
import { JobHiringPersonalComponent } from './jobs/job-hiring-personal/job-hiring-personal.component';
import { JobHiringCompanyComponent } from './jobs/job-hiring-company/job-hiring-company.component';
import { JobRequirementComponent } from './jobs/job-requirement/job-requirement.component';

const routes: Routes = [
  { path: "", component: ClassifiedHomeComponent },
  { path: "ad-post", component: AddPostComponent },
  { path: "car-details", component: CarDetailsComponent },
  { path: "car-ad-details", component: CarAddDetailsFirstComponent },
  { path: "car-ad-submission", component: CarAddDetailsSecondComponent },
  { path: "motorcycle-ad-details", component: MotorcycleDetailFormComponent },
  { path: "auto-parts-ad-details", component: AutoAccessoriesPartsComponent },
  { path: "heavy-vehicles-ad-details", component: HeavyVehiclesComponent },
  { path: "boats-ad-details", component: BoatsComponent },
  { path: "number-plates-ad-details", component: NumberPlatesComponent },
  { path: "job-type-selection", component: JobHiringComponent },
  { path: "job-hire-personal", component: JobHiringPersonalComponent },
  { path: "job-hire-company", component: JobHiringCompanyComponent },
  { path: "job-requirement", component: JobRequirementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassifiedModuleRoutingModule { }
