import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { TipsAdviceComponent } from './tips-advice/tips-advice.component';
import { NewsblogComponent } from './newsblog/newsblog.component';
import { ExploreblogComponent } from './exploreblog/exploreblog.component';
import { LeftAtHomeComponent } from './left-at-home/left-at-home.component';
import { LawblogComponent } from './lawblog/lawblog.component';
import { MarketTrendsComponent } from './market-trends/market-trends.component';

const routes: Routes = [
  { path: "", component: BlogComponent },
  { path: 'details/:id', component: BlogViewComponent},
  { path: 'tips-advice', component: TipsAdviceComponent},
  { path: 'newsblog', component: NewsblogComponent},
  { path: 'exploreblog', component: ExploreblogComponent},
  { path: 'left-at-home',component: LeftAtHomeComponent},
  { path: 'lawblog', component: LawblogComponent},
  { path: 'market-trends', component: MarketTrendsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
