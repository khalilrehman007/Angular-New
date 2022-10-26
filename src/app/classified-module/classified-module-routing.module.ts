import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassifiedHomeComponent } from './classified-home/classified-home.component';
import { AddPostComponent } from './add-post/add-post.component';

const routes: Routes = [
  { path: "", component: ClassifiedHomeComponent },
  { path: "add-post", component: AddPostComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassifiedModuleRoutingModule { }
