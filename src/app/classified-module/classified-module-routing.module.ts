import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassifiedHomeComponent } from './classified-home/classified-home.component';

const routes: Routes = [
  { path: "", component: ClassifiedHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassifiedModuleRoutingModule { }
