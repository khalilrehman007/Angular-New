import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassifiedHomeComponent } from './classified-home/classified-home.component';
import { AddPostComponent } from './add-post/add-post.component';
import { CarDetailsComponent } from './classified-details/car-details/car-details.component';
import { CarAddDetailsFirstComponent } from './motors/car-add-details-first/car-add-details-first.component';
import { CarAddDetailsSecondComponent } from './motors/car-add-details-second/car-add-details-second.component';
import { MotorcycleDetailFormComponent } from './motors/motorcycle-detail-form/motorcycle-detail-form.component';
import { AutoAccessoriesPartsComponent } from './motors/auto-accessories-parts/auto-accessories-parts.component';
import { HeavyVehiclesComponent } from './motors/heavy-vehicles/heavy-vehicles.component';
import { BoatsComponent } from './motors/boats/boats.component';
import { NumberPlatesComponent } from './motors/number-plates/number-plates.component';
import { JobHiringComponent } from './jobs/job-hiring/job-hiring.component';
import { JobsHiringFormComponent } from './jobs/jobs-hiring-form/jobs-hiring-form.component';
import { JobsWantedFormComponent } from './jobs/jobs-wanted-form/jobs-wanted-form.component';
import { AppliancesFormComponent } from './appliances/appliances-form/appliances-form.component';
import { FurnitureFormComponent } from './furniture/furniture-form/furniture-form.component';
import { FreelancerFormComponent } from './freelancers/freelancer-form/freelancer-form.component';
import { PhoneFormComponent } from './phones/phone-form/phone-form.component';
import { ServicesFormComponent } from './services/services-form/services-form.component';
import { CommunityFormComponent } from './community/community-form/community-form.component';
import { CommertialsFormComponent } from './commertials/commertials-form/commertials-form.component';
import { FurnitureDetailsComponent } from './classified-details/furniture-details/furniture-details.component';
import { SportsEquipmentDetailsComponent } from './classified-details/sports-equipment-details/sports-equipment-details.component';
import { PhoneTabletDetailsComponent } from './classified-details/phone-tablet-details/phone-tablet-details.component';
import { ServicesDetailsComponent } from './classified-details/services-details/services-details.component';

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
  { path: "job-hiring", component: JobsHiringFormComponent },
  { path: "job-requirement", component: JobsWantedFormComponent },
  { path: "appliances-form", component: AppliancesFormComponent },
  { path: "furniture-form", component: FurnitureFormComponent },
  { path: "freelancer-form", component: FreelancerFormComponent },
  { path: "phone-form", component: PhoneFormComponent },
  { path: "services-form", component: ServicesFormComponent },
  { path: "community-form", component: CommunityFormComponent },
  { path: "commertials-form", component: CommertialsFormComponent },
  { path: "furniture-details", component: FurnitureDetailsComponent },
  { path: "sports-equipment-details", component: SportsEquipmentDetailsComponent },
  { path: "phone-tablet-details", component: PhoneTabletDetailsComponent },
  { path: "service-details", component: ServicesDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassifiedModuleRoutingModule { }
