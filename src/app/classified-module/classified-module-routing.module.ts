import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassifiedHomeComponent } from './classified-home/classified-home.component';
import { AddPostComponent } from './add-post/add-post.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CarAddDetailsFirstComponent } from './car-add-details-first/car-add-details-first.component';
import { CarAddDetailsSecondComponent } from './car-add-details-second/car-add-details-second.component';
import { MotorcycleDetailFormComponent } from './motorcycle-detail-form/motorcycle-detail-form.component';

const routes: Routes = [
  { path: "", component: ClassifiedHomeComponent },
  { path: "ad-post", component: AddPostComponent },
  { path: "car-details", component: CarDetailsComponent },
  { path: "car-ad-details", component: CarAddDetailsFirstComponent },
  { path: "car-ad-submission", component: CarAddDetailsSecondComponent },
  { path: "motorcycle-ad-details", component: MotorcycleDetailFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassifiedModuleRoutingModule { }
