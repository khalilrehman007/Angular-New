import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"", loadChildren:()=>import('./homepage-module/homepage-module.module').then(module => module.HomepageModuleModule)},
  {path:"**", loadChildren:()=>import('./homepage-module/homepage-module.module').then(module => module.HomepageModuleModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArRoutingModule { }
